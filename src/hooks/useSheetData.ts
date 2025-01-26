import { useState, useEffect } from 'react';
import * as sheetsApi from '@/lib/sheets';

interface UseSheetDataOptions {
  userId: string;
  role: 'farmer' | 'retailer';
}

export function useSheetData({ userId, role }: UseSheetDataOptions) {
  const [inventory, setInventory] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [trades, setTrades] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [
          inventoryData,
          productsData,
          tradesData,
          profileData
        ] = await Promise.all([
          sheetsApi.fetchUserInventory(userId),
          sheetsApi.fetchUserProducts(userId),
          sheetsApi.fetchUserTradeHistory(userId, role),
          sheetsApi.fetchUserProfile(userId)
        ]);

        setInventory(inventoryData);
        setProducts(productsData);
        setTrades(tradesData);
        setProfile(profileData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch data'));
      } finally {
        setLoading(false);
      }
    };

    if (userId && role) {
      fetchData();
    }
  }, [userId, role]);

  const refreshData = async () => {
    try {
      setLoading(true);
      const [
        inventoryData,
        productsData,
        tradesData,
        profileData
      ] = await Promise.all([
        sheetsApi.fetchUserInventory(userId),
        sheetsApi.fetchUserProducts(userId),
        sheetsApi.fetchUserTradeHistory(userId, role),
        sheetsApi.fetchUserProfile(userId)
      ]);

      setInventory(inventoryData);
      setProducts(productsData);
      setTrades(tradesData);
      setProfile(profileData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch data'));
    } finally {
      setLoading(false);
    }
  };

  return {
    inventory,
    products,
    trades,
    profile,
    loading,
    error,
    refreshData
  };
}
