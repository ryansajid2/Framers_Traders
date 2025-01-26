import { useQuery } from '@tanstack/react-query';
import { googleSheetsService } from '@/lib/googleSheets';

export const useInventoryData = () => {
  return useQuery({
    queryKey: ['inventory'],
    queryFn: () => googleSheetsService.getInventoryData(),
  });
};

export const useProductData = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => googleSheetsService.getProductData(),
  });
};

export const useTradeHistoryData = () => {
  return useQuery({
    queryKey: ['tradeHistory'],
    queryFn: () => googleSheetsService.getTradeHistoryData(),
  });
};

export const useProfileData = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => googleSheetsService.getProfileData(),
  });
};
