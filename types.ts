
export interface CreatorParams {
  minPrice: number; // in ETH
  royaltyPercentage: number;
  durationDays: number;
  allowCommercial: boolean;
  exclusive: boolean;
}

export interface Asset {
  id: string;
  name: string;
  creator: string;
  type: 'audio' | 'video' | 'image';
  params: CreatorParams;
  thumbnail: string;
}

export interface NegotiationMessage {
  role: 'user' | 'agent' | 'system';
  content: string;
  timestamp: number;
}

export interface License {
  id: string;
  assetId: string;
  licensee: string;
  price: number;
  duration: number;
  startDate: number;
  status: 'active' | 'expired' | 'pending';
}

export interface RevenueData {
  month: string;
  revenue: number;
  forecast: number;
}
