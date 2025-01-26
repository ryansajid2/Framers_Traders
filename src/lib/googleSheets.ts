import { google } from 'googleapis';

interface InventoryItem {
  id: string;
  product_name: string;
  category: string;
  quantity: number;
  price_per_unit: number;
  unit: string;
  min_stock_level: number;
  owner_type: 'farmer' | 'retailer';
}

interface ProductItem {
  id: string;
  name: string;
  category: string;
  description: string;
  base_price: number;
  unit: string;
  available_for: 'farmer' | 'retailer' | 'both';
}

interface TradeHistoryItem {
  id: string;
  date: string;
  product_name: string;
  quantity: number;
  price_per_unit: number;
  total_amount: number;
  status: string;
  buyer_id: string;
  seller_id: string;
}

interface ProfileItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  type: 'farmer' | 'retailer';
  rating: number;
  joined_date: string;
}

class GoogleSheetsService {
  private sheets;

  constructor() {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: import.meta.env.VITE_GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: import.meta.env.VITE_GOOGLE_SHEETS_API_KEY,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    this.sheets = google.sheets({ version: 'v4', auth });
  }

  async getInventoryData(): Promise<InventoryItem[]> {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: import.meta.env.VITE_INVENTORY_SHEET_ID,
        range: 'Sheet1',
      });

      const rows = response.data.values || [];
      const [headers, ...dataRows] = rows;

      return dataRows.map((row) => {
        const item: any = {};
        headers.forEach((header: string, index: number) => {
          item[header.toLowerCase().replace(/ /g, '_')] = row[index];
        });
        return item as InventoryItem;
      });
    } catch (error) {
      console.error('Error fetching inventory data:', error);
      return [];
    }
  }

  async getProductData(): Promise<ProductItem[]> {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: import.meta.env.VITE_PRODUCT_SHEET_ID,
        range: 'Sheet1',
      });

      const rows = response.data.values || [];
      const [headers, ...dataRows] = rows;

      return dataRows.map((row) => {
        const item: any = {};
        headers.forEach((header: string, index: number) => {
          item[header.toLowerCase().replace(/ /g, '_')] = row[index];
        });
        return item as ProductItem;
      });
    } catch (error) {
      console.error('Error fetching product data:', error);
      return [];
    }
  }

  async getTradeHistoryData(): Promise<TradeHistoryItem[]> {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: import.meta.env.VITE_TRADE_HISTORY_SHEET_ID,
        range: 'Sheet1',
      });

      const rows = response.data.values || [];
      const [headers, ...dataRows] = rows;

      return dataRows.map((row) => {
        const item: any = {};
        headers.forEach((header: string, index: number) => {
          item[header.toLowerCase().replace(/ /g, '_')] = row[index];
        });
        return item as TradeHistoryItem;
      });
    } catch (error) {
      console.error('Error fetching trade history data:', error);
      return [];
    }
  }

  async getProfileData(): Promise<ProfileItem[]> {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: import.meta.env.VITE_PROFILE_SHEET_ID,
        range: 'Sheet1',
      });

      const rows = response.data.values || [];
      const [headers, ...dataRows] = rows;

      return dataRows.map((row) => {
        const item: any = {};
        headers.forEach((header: string, index: number) => {
          item[header.toLowerCase().replace(/ /g, '_')] = row[index];
        });
        return item as ProfileItem;
      });
    } catch (error) {
      console.error('Error fetching profile data:', error);
      return [];
    }
  }
}

export const googleSheetsService = new GoogleSheetsService();
