// Google Sheets Configuration
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const SERVICE_ACCOUNT = process.env.REACT_APP_GOOGLE_SERVICE_ACCOUNT;

// Google Sheets IDs
const SHEET_IDS = {
  INVENTORY: process.env.REACT_APP_INVENTORY_SHEET_ID,
  PRODUCTS: process.env.REACT_APP_PRODUCTS_SHEET_ID,
  TRADE_HISTORY: process.env.REACT_APP_TRADE_HISTORY_SHEET_ID,
  PROFILES: process.env.REACT_APP_PROFILES_SHEET_ID
};

// Base URL for the Google Sheets API
const BASE_URL = 'https://sheets.googleapis.com/v4/spreadsheets';

interface SheetResponse {
  values: any[][];
}

// Function to fetch data from a specific sheet
export async function fetchSheetData(sheetId: string, range: string): Promise<any[][]> {
  try {
    const url = new URL(`${BASE_URL}/${sheetId}/values/${range}`);
    url.searchParams.append('key', API_KEY!);
    url.searchParams.append('majorDimension', 'ROWS');

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch sheet data: ${errorData.error?.message || response.statusText}`);
    }

    const data: SheetResponse = await response.json();
    return data.values || [];
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    throw error;
  }
}

// Function to update sheet data
export async function updateSheetData(
  sheetId: string,
  range: string,
  values: any[][],
  valueInputOption: 'RAW' | 'USER_ENTERED' = 'USER_ENTERED'
): Promise<void> {
  try {
    const url = new URL(`${BASE_URL}/${sheetId}/values/${range}`);
    url.searchParams.append('key', API_KEY!);
    url.searchParams.append('valueInputOption', valueInputOption);

    const response = await fetch(url.toString(), {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        range,
        majorDimension: 'ROWS',
        values,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to update sheet data: ${errorData.error?.message || response.statusText}`);
    }
  } catch (error) {
    console.error('Error updating sheet data:', error);
    throw error;
  }
}

// Helper function to parse date strings
function parseDate(dateStr: string): Date {
  return new Date(dateStr);
}

// Helper function to parse numbers
function parseNumber(value: string): number {
  return parseFloat(value) || 0;
}

// Inventory types
export interface InventoryItem {
  productId: string;
  productName: string;
  category: string;
  quantity: number;
  listPrice: number;
  costPrice: number;
  status: string;
}

// Product types
export interface Product {
  productId: string;
  name: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
}

// Trade types
export interface Trade {
  date: Date;
  tradeId: string;
  farmerUid: string;
  retailerUid: string;
  amount: number;
  status: string;
  details: string;
}

// Profile types
export interface Profile {
  uid: string;
  name: string;
  role: 'farmer' | 'retailer';
  division: string;
  district: string;
  subDistrict: string;
  contact: string;
  about: string;
  avatarUrl: string;
}

// Helper functions for each sheet
export async function fetchInventory(): Promise<InventoryItem[]> {
  const data = await fetchSheetData(SHEET_IDS.INVENTORY!, 'A2:G');
  return data.map(row => ({
    productId: row[0],
    productName: row[1],
    category: row[2],
    quantity: parseNumber(row[3]),
    listPrice: parseNumber(row[4]),
    costPrice: parseNumber(row[5]),
    status: row[6]
  }));
}

export async function fetchProducts(): Promise<Product[]> {
  const data = await fetchSheetData(SHEET_IDS.PRODUCTS!, 'A2:F');
  return data.map(row => ({
    productId: row[0],
    name: row[1],
    category: row[2],
    description: row[3],
    price: parseNumber(row[4]),
    imageUrl: row[5]
  }));
}

export async function fetchTradeHistory(): Promise<Trade[]> {
  const data = await fetchSheetData(SHEET_IDS.TRADE_HISTORY!, 'A2:G');
  return data.map(row => ({
    date: parseDate(row[0]),
    tradeId: row[1],
    farmerUid: row[2],
    retailerUid: row[3],
    amount: parseNumber(row[4]),
    status: row[5],
    details: row[6]
  }));
}

export async function fetchProfiles(): Promise<Profile[]> {
  const data = await fetchSheetData(SHEET_IDS.PROFILES!, 'A2:I');
  return data.map(row => ({
    uid: row[0],
    name: row[1],
    role: row[2] as 'farmer' | 'retailer',
    division: row[3],
    district: row[4],
    subDistrict: row[5],
    contact: row[6],
    about: row[7],
    avatarUrl: row[8]
  }));
}

// Function to filter trade history by user ID and role
export async function fetchUserTradeHistory(userId: string, role: 'farmer' | 'retailer'): Promise<Trade[]> {
  const trades = await fetchTradeHistory();
  return trades.filter(trade => 
    role === 'farmer' ? trade.farmerUid === userId : trade.retailerUid === userId
  );
}

// Function to filter inventory by user ID
export async function fetchUserInventory(userId: string): Promise<InventoryItem[]> {
  const inventory = await fetchInventory();
  return inventory.filter(item => item.productId.startsWith(userId));
}

// Function to filter products by user ID
export async function fetchUserProducts(userId: string): Promise<Product[]> {
  const products = await fetchProducts();
  return products.filter(product => product.productId.startsWith(userId));
}

// Function to get user profile
export async function fetchUserProfile(userId: string): Promise<Profile | undefined> {
  const profiles = await fetchProfiles();
  return profiles.find(profile => profile.uid === userId);
}

// Function to add a new trade
export async function addNewTrade(trade: Omit<Trade, 'tradeId'>): Promise<void> {
  const trades = await fetchTradeHistory();
  const newTradeId = `TRD${trades.length + 1}`.padStart(6, '0');
  const newTrade = {
    ...trade,
    tradeId: newTradeId,
  };

  const values = [
    [
      newTrade.date.toISOString(),
      newTrade.tradeId,
      newTrade.farmerUid,
      newTrade.retailerUid,
      newTrade.amount.toString(),
      newTrade.status,
      newTrade.details
    ]
  ];

  await updateSheetData(SHEET_IDS.TRADE_HISTORY!, `A${trades.length + 2}`, values);
}

// Function to update inventory
export async function updateInventory(productId: string, updates: Partial<InventoryItem>): Promise<void> {
  const inventory = await fetchInventory();
  const index = inventory.findIndex(item => item.productId === productId);
  
  if (index === -1) {
    throw new Error('Product not found in inventory');
  }

  const updatedItem = { ...inventory[index], ...updates };
  const values = [
    [
      updatedItem.productId,
      updatedItem.productName,
      updatedItem.category,
      updatedItem.quantity.toString(),
      updatedItem.listPrice.toString(),
      updatedItem.costPrice.toString(),
      updatedItem.status
    ]
  ];

  await updateSheetData(SHEET_IDS.INVENTORY!, `A${index + 2}`, values);
}

// Function to update profile
export async function updateProfile(userId: string, updates: Partial<Profile>): Promise<void> {
  const profiles = await fetchProfiles();
  const index = profiles.findIndex(profile => profile.uid === userId);
  
  if (index === -1) {
    throw new Error('Profile not found');
  }

  const updatedProfile = { ...profiles[index], ...updates };
  const values = [
    [
      updatedProfile.uid,
      updatedProfile.name,
      updatedProfile.role,
      updatedProfile.division,
      updatedProfile.district,
      updatedProfile.subDistrict,
      updatedProfile.contact,
      updatedProfile.about,
      updatedProfile.avatarUrl
    ]
  ];

  await updateSheetData(SHEET_IDS.PROFILES!, `A${index + 2}`, values);
}
