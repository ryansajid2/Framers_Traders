import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, User, Settings, LogOut, SwitchCamera } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Database } from "@/integrations/supabase/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Profile = Database['public']['Tables']['profiles']['Row'] & {
  division?: string;
  district?: string;
  subDistrict?: string;
};

// Sample location data
const divisions = ["Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barisal", "Sylhet", "Rangpur", "Mymensingh"];
const districts = {
  "Dhaka": ["Dhaka", "Gazipur", "Narayanganj"],
  "Chittagong": ["Chittagong", "Cox's Bazar", "Comilla"],
  // Add more districts as needed
};
const subDistricts = {
  "Dhaka": ["Mirpur", "Mohammadpur", "Gulshan", "Dhanmondi"],
  "Gazipur": ["Gazipur Sadar", "Kapasia", "Sreepur"],
  // Add more sub-districts as needed
};

const Profile = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [formData, setFormData] = useState<Partial<Profile>>({});
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setProfile(data);
      setFormData(data);
      setImageUrl(data.avatar_url);
    } catch (error) {
      console.error('Error loading profile:', error);
      toast({
        title: "Error loading profile",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (key: keyof Profile, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      // Validate file size
      if (file.size > maxSize) {
        throw new Error('File size must be less than 5MB');
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('File must be an image');
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      // Create a unique file name
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;

      // First, try to delete the old avatar if it exists
      if (profile?.avatar_url) {
        try {
          const oldFileName = profile.avatar_url.split('/').pop();
          if (oldFileName) {
            await supabase.storage
              .from('avatars')
              .remove([oldFileName]);
          }
        } catch (error) {
          console.error('Error deleting old avatar:', error);
        }
      }

      // Upload the new file
      const { error: uploadError, data } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        throw uploadError;
      }

      if (!data) {
        throw new Error('Upload failed');
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      // Update the profile with the new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

      if (updateError) {
        throw updateError;
      }

      setImageUrl(publicUrl);
      setFormData(prev => ({ ...prev, avatar_url: publicUrl }));

      toast({
        title: "Success",
        description: "Profile picture updated successfully",
      });

    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error uploading image",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('profiles')
        .update(formData)
        .eq('id', user.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, ...formData } : null);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error updating profile",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Profile Settings</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SwitchCamera className="mr-2 h-4 w-4" />
              <span>Switch Profile</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 md:col-span-1">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-32 w-32">
                <AvatarImage src={imageUrl || ''} />
                <AvatarFallback><User className="w-12 h-12" /></AvatarFallback>
              </Avatar>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="icon" className="absolute bottom-0 right-0 rounded-full">
                    <Camera className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update Profile Picture</DialogTitle>
                    <DialogDescription>
                      Choose a new profile picture to upload
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                    />
                    {uploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <h2 className="text-xl font-semibold">{profile?.full_name || 'Anonymous'}</h2>
            <p className="text-sm text-muted-foreground capitalize">{profile?.role}</p>
          </div>
        </Card>
        
        <Card className="p-6 md:col-span-2">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input 
                  placeholder="Enter your name" 
                  value={formData?.full_name || ''} 
                  onChange={(e) => handleInputChange('full_name', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>User ID</Label>
                <Input 
                  value={formData?.id || ''} 
                  disabled
                  className="bg-muted"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Role</Label>
                <Input 
                  value={formData?.role || ''} 
                  disabled
                  className="bg-muted capitalize"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Contact</Label>
                <Input 
                  placeholder="Enter your contact" 
                  value={formData?.contact || ''} 
                  onChange={(e) => handleInputChange('contact', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Location Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Division</Label>
                  <Select 
                    value={formData?.division} 
                    onValueChange={(value) => handleInputChange('division', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select division" />
                    </SelectTrigger>
                    <SelectContent>
                      {divisions.map((division) => (
                        <SelectItem key={division} value={division}>
                          {division}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>District</Label>
                  <Select 
                    value={formData?.district} 
                    onValueChange={(value) => handleInputChange('district', value)}
                    disabled={!formData?.division}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData?.division && districts[formData.division]?.map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Sub-district</Label>
                  <Select 
                    value={formData?.subDistrict} 
                    onValueChange={(value) => handleInputChange('subDistrict', value)}
                    disabled={!formData?.district}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select sub-district" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData?.district && subDistricts[formData.district]?.map((subDistrict) => (
                        <SelectItem key={subDistrict} value={subDistrict}>
                          {subDistrict}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>About</Label>
              <Textarea
                placeholder="Tell us about yourself"
                value={formData?.about || ''}
                onChange={(e) => handleInputChange('about', e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSubmit}>
                Save Changes
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Profile;