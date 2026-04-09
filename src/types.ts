export interface MarketCondition {
  indicator: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
  impact: 'high' | 'medium' | 'low';
}

export interface Supplier {
  id: string;
  name: string;
  category: string;
  performanceScore: number;
  reliability: number;
  leadTime: number; // in days
  riskLevel: 'high' | 'medium' | 'low';
}

export interface LogisticsMetric {
  route: string;
  costPerUnit: number;
  transitTime: number;
  delayProbability: number;
  status: 'optimal' | 'congested' | 'delayed';
}

export interface DemandPattern {
  period: string;
  actual: number;
  forecast: number;
}

export interface OptimizationStrategy {
  title: string;
  category: 'Procurement' | 'Inventory' | 'Distribution' | 'Risk Mitigation';
  description: string;
  actions: string[];
  expectedImpact: {
    costReduction: string;
    efficiencyGain: string;
    riskReduction: string;
  };
  priority: 'Critical' | 'High' | 'Medium';
}

export interface ScenarioResult {
  name: string;
  description: string;
  metrics: {
    totalCost: number;
    serviceLevel: number;
    inventoryTurnover: number;
    riskExposure: number;
  };
}
