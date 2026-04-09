import { MarketCondition, Supplier, LogisticsMetric, DemandPattern } from "../types";

export const mockMarketConditions: MarketCondition[] = [
  { indicator: "Raw Material Index", value: 124.5, trend: 'up', change: 2.4, impact: 'high' },
  { indicator: "Freight Cost Index", value: 98.2, trend: 'down', change: -1.5, impact: 'medium' },
  { indicator: "Currency Volatility", value: 0.12, trend: 'stable', change: 0.05, impact: 'low' },
  { indicator: "Energy Price Index", value: 156.7, trend: 'up', change: 4.1, impact: 'high' },
];

export const mockSuppliers: Supplier[] = [
  { id: "S1", name: "Global Tech Components", category: "Electronics", performanceScore: 92, reliability: 0.95, leadTime: 14, riskLevel: 'low' },
  { id: "S2", name: "Precision Metals Inc", category: "Hardware", performanceScore: 78, reliability: 0.82, leadTime: 21, riskLevel: 'medium' },
  { id: "S3", name: "Eco-Friendly Plastics", category: "Materials", performanceScore: 65, reliability: 0.75, leadTime: 30, riskLevel: 'high' },
  { id: "S4", name: "Swift Logistics Partners", category: "Services", performanceScore: 88, reliability: 0.90, leadTime: 5, riskLevel: 'low' },
];

export const mockLogistics: LogisticsMetric[] = [
  { route: "Shanghai -> Los Angeles", costPerUnit: 4.5, transitTime: 18, delayProbability: 0.15, status: 'optimal' },
  { route: "Rotterdam -> New York", costPerUnit: 3.8, transitTime: 12, delayProbability: 0.05, status: 'optimal' },
  { route: "Singapore -> Dubai", costPerUnit: 5.2, transitTime: 10, delayProbability: 0.35, status: 'congested' },
  { route: "Mumbai -> London", costPerUnit: 4.1, transitTime: 22, delayProbability: 0.45, status: 'delayed' },
];

export const mockDemandPatterns: DemandPattern[] = [
  { period: "Jan", actual: 4500, forecast: 4200 },
  { period: "Feb", actual: 4800, forecast: 4600 },
  { period: "Mar", actual: 5200, forecast: 5000 },
  { period: "Apr", actual: 4900, forecast: 5300 },
  { period: "May", actual: 5500, forecast: 5400 },
  { period: "Jun", actual: 6100, forecast: 5800 },
];
