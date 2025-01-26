import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

class GoogleSheetsService {
  private sheets;

  constructor() {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: import.meta.env.VITE_GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: import.meta.env.VITE_GOOGLE_SHEETS_API_KEY,
      },
      scopes: SCOPES,
    });

    this.sheets = google.sheets({ version: 'v4', auth });
  }

  async getInventoryData() {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: import.meta.env.VITE_INVENTORY_SHEET_ID,
        range: 'Sheet1', // Update this based on your sheet name
      });
      return this.processSheetData(response.data.values);
    } catch (error) {
      console.error('Error fetching inventory data:', error);
      return [];
    }
  }

  async getProductData() {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: import.meta.env.VITE_PRODUCT_SHEET_ID,
        range: 'Sheet1', // Update this based on your sheet name
      });
      return this.processSheetData(response.data.values);
    } catch (error) {
      console.error('Error fetching product data:', error);
      return [];
    }
  }

  async getTradeHistoryData() {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: import.meta.env.VITE_TRADE_HISTORY_SHEET_ID,
        range: 'Sheet1', // Update this based on your sheet name
      });
      return this.processSheetData(response.data.values);
    } catch (error) {
      console.error('Error fetching trade history data:', error);
      return [];
    }
  }

  async getProfileData() {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: import.meta.env.VITE_PROFILE_SHEET_ID,
        range: 'Sheet1', // Update this based on your sheet name
      });
      return this.processSheetData(response.data.values);
    } catch (error) {
      console.error('Error fetching profile data:', error);
      return [];
    }
  }

  private processSheetData(values: any[][] | null | undefined) {
    if (!values || values.length === 0) {
      return [];
    }

    const headers = values[0];
    return values.slice(1).map(row => {
      const item: Record<string, any> = {};
      headers.forEach((header, index) => {
        item[header] = row[index];
      });
      return item;
    });
  }
}

export const googleSheetsService = new GoogleSheetsService();
