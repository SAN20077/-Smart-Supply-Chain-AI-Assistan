import { useState } from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  Truck, 
  Zap, 
  ShieldAlert, 
  BrainCircuit,
  Menu,
  X,
  ChevronRight,
  RefreshCw,
  BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  Line
} from 'recharts';
import { 
  mockMarketConditions, 
  mockSuppliers, 
  mockLogistics, 
  mockDemandPatterns 
} from './lib/mockData';
import { runScenarioAnalysis, generateStrategies } from './services/gemini';
import ReactMarkdown from 'react-markdown';
import { Input } from '@/components/ui/input';
import { OptimizationStrategy } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [strategies, setStrategies] = useState<OptimizationStrategy[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [scenarioInput, setScenarioInput] = useState('');
  const [scenarioResult, setScenarioResult] = useState('');
  const [isAnalyzingScenario, setIsAnalyzingScenario] = useState(false);

  const handleRunScenario = async () => {
    if (!scenarioInput) return;
    setIsAnalyzingScenario(true);
    const result = await runScenarioAnalysis(scenarioInput, {
      market: mockMarketConditions,
      suppliers: mockSuppliers,
      logistics: mockLogistics
    });
    setScenarioResult(result);
    setIsAnalyzingScenario(false);
  };

  const handleGenerateStrategies = async () => {
    setIsGenerating(true);
    const result = await generateStrategies(
      mockMarketConditions,
      mockSuppliers,
      mockLogistics,
      mockDemandPatterns
    );
    setStrategies(result);
    setIsGenerating(false);
    setActiveTab('strategies');
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className="border-r bg-card flex flex-col z-20"
      >
        <div className="p-6 flex items-center gap-3 border-b">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
            <BrainCircuit size={20} />
          </div>
          {isSidebarOpen && (
            <span className="font-bold tracking-tight text-lg">Nexus AI</span>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <SidebarItem 
            icon={<LayoutDashboard size={20} />} 
            label="Overview" 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')}
            isOpen={isSidebarOpen}
          />
          <SidebarItem 
            icon={<TrendingUp size={20} />} 
            label="Market Intelligence" 
            active={activeTab === 'market'} 
            onClick={() => setActiveTab('market')}
            isOpen={isSidebarOpen}
          />
          <SidebarItem 
            icon={<Users size={20} />} 
            label="Supplier Network" 
            active={activeTab === 'suppliers'} 
            onClick={() => setActiveTab('suppliers')}
            isOpen={isSidebarOpen}
          />
          <SidebarItem 
            icon={<Truck size={20} />} 
            label="Logistics & Routes" 
            active={activeTab === 'logistics'} 
            onClick={() => setActiveTab('logistics')}
            isOpen={isSidebarOpen}
          />
          <SidebarItem 
            icon={<Zap size={20} />} 
            label="AI Strategies" 
            active={activeTab === 'strategies'} 
            onClick={() => setActiveTab('strategies')}
            isOpen={isSidebarOpen}
          />
          <SidebarItem 
            icon={<ShieldAlert size={20} />} 
            label="Risk Mitigation" 
            active={activeTab === 'risk'} 
            onClick={() => setActiveTab('risk')}
            isOpen={isSidebarOpen}
          />
          <SidebarItem 
            icon={<BarChart3 size={20} />} 
            label="Scenario Planning" 
            active={activeTab === 'scenario'} 
            onClick={() => setActiveTab('scenario')}
            isOpen={isSidebarOpen}
          />
        </nav>

        <div className="p-4 border-t">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            {isSidebarOpen && <span>Collapse Sidebar</span>}
          </Button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b bg-card px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold capitalize">{activeTab.replace('-', ' ')}</h1>
            <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-wider">Live Analysis</Badge>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              onClick={handleGenerateStrategies} 
              disabled={isGenerating}
              className="gap-2"
            >
              <RefreshCw size={16} className={isGenerating ? "animate-spin" : ""} />
              Generate Optimization
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <ScrollArea className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div 
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard 
                      title="Supply Chain Health" 
                      value="94.2%" 
                      change="+2.1%" 
                      trend="up" 
                      description="Aggregate performance index"
                    />
                    <StatCard 
                      title="Total Logistics Cost" 
                      value="$1.24M" 
                      change="-5.4%" 
                      trend="down" 
                      description="Monthly operational spend"
                    />
                    <StatCard 
                      title="Inventory Turnover" 
                      value="8.4x" 
                      change="+0.8x" 
                      trend="up" 
                      description="Efficiency ratio"
                    />
                    <StatCard 
                      title="Active Risks" 
                      value="3" 
                      change="Stable" 
                      trend="stable" 
                      description="Critical alerts requiring action"
                    />
                  </div>

                  {/* Charts Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Card className="lg:col-span-2">
                      <CardHeader>
                        <CardTitle className="text-sm font-medium data-grid-header">Demand Forecasting vs Actual</CardTitle>
                      </CardHeader>
                      <CardContent className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={mockDemandPatterns}>
                            <defs>
                              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                            <XAxis 
                              dataKey="period" 
                              axisLine={false} 
                              tickLine={false} 
                              tick={{ fontSize: 12, fill: '#666' }}
                            />
                            <YAxis 
                              axisLine={false} 
                              tickLine={false} 
                              tick={{ fontSize: 12, fill: '#666' }}
                            />
                            <Tooltip 
                              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                            <Area 
                              type="monotone" 
                              dataKey="actual" 
                              stroke="var(--primary)" 
                              fillOpacity={1} 
                              fill="url(#colorActual)" 
                              strokeWidth={2}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="forecast" 
                              stroke="#adb5bd" 
                              strokeDasharray="5 5" 
                              dot={false}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm font-medium data-grid-header">Supplier Risk Distribution</CardTitle>
                      </CardHeader>
                      <CardContent className="h-[350px] flex flex-col justify-center">
                        <div className="space-y-6">
                          <RiskBar label="Low Risk" value={75} color="bg-green-500" />
                          <RiskBar label="Medium Risk" value={20} color="bg-yellow-500" />
                          <RiskBar label="High Risk" value={5} color="bg-red-500" />
                        </div>
                        <div className="mt-8 p-4 bg-muted rounded-lg">
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            AI Recommendation: Diversify "High Risk" category suppliers to mitigate potential disruptions in the electronics sector.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              )}

              {activeTab === 'market' && (
                <motion.div 
                  key="market"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockMarketConditions.map((condition, i) => (
                      <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">{condition.indicator}</CardTitle>
                          <Badge variant={condition.impact === 'high' ? 'destructive' : 'outline'}>
                            {condition.impact} impact
                          </Badge>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold mono-value">{condition.value}</div>
                          <p className={`text-xs mt-1 ${condition.trend === 'up' ? 'text-red-500' : 'text-green-500'}`}>
                            {condition.trend === 'up' ? '↑' : '↓'} {Math.abs(condition.change)}% from last month
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'suppliers' && (
                <motion.div 
                  key="suppliers"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium data-grid-header">Supplier Performance Matrix</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b text-left">
                              <th className="pb-3 font-medium">Supplier</th>
                              <th className="pb-3 font-medium">Category</th>
                              <th className="pb-3 font-medium">Score</th>
                              <th className="pb-3 font-medium">Lead Time</th>
                              <th className="pb-3 font-medium">Risk</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {mockSuppliers.map((supplier) => (
                              <tr key={supplier.id} className="hover:bg-muted/50 transition-colors">
                                <td className="py-4 font-medium">{supplier.name}</td>
                                <td className="py-4 text-muted-foreground">{supplier.category}</td>
                                <td className="py-4">
                                  <div className="flex items-center gap-2">
                                    <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                                      <div 
                                        className="h-full bg-primary" 
                                        style={{ width: `${supplier.performanceScore}%` }} 
                                      />
                                    </div>
                                    <span className="mono-value">{supplier.performanceScore}</span>
                                  </div>
                                </td>
                                <td className="py-4 mono-value">{supplier.leadTime}d</td>
                                <td className="py-4">
                                  <Badge variant={
                                    supplier.riskLevel === 'high' ? 'destructive' : 
                                    supplier.riskLevel === 'medium' ? 'secondary' : 'outline'
                                  }>
                                    {supplier.riskLevel}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {activeTab === 'logistics' && (
                <motion.div 
                  key="logistics"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockLogistics.map((route, i) => (
                      <Card key={i}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-sm font-bold">{route.route}</CardTitle>
                            <Badge variant={
                              route.status === 'optimal' ? 'outline' : 
                              route.status === 'congested' ? 'secondary' : 'destructive'
                            }>
                              {route.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-[10px] uppercase text-muted-foreground font-semibold">Cost per Unit</p>
                              <p className="text-lg font-bold mono-value">${route.costPerUnit}</p>
                            </div>
                            <div>
                              <p className="text-[10px] uppercase text-muted-foreground font-semibold">Transit Time</p>
                              <p className="text-lg font-bold mono-value">{route.transitTime} days</p>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] uppercase text-muted-foreground font-semibold">
                              <span>Delay Probability</span>
                              <span>{Math.round(route.delayProbability * 100)}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${route.delayProbability > 0.3 ? 'bg-red-500' : 'bg-primary'}`}
                                style={{ width: `${route.delayProbability * 100}%` }} 
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'risk' && (
                <motion.div 
                  key="risk"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <Card className="border-destructive/20 bg-destructive/5">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-destructive">
                        <ShieldAlert size={20} />
                        Critical Risk Alerts
                      </CardTitle>
                      <CardDescription>Immediate attention required for these supply chain vulnerabilities.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <RiskAlert 
                        title="Energy Price Surge" 
                        description="Energy costs in the EU region have increased by 4.1% this month, impacting manufacturing costs for hardware components."
                        severity="High"
                      />
                      <RiskAlert 
                        title="Logistics Congestion: Singapore" 
                        description="Port congestion in Singapore is causing average delays of 4.5 days for transshipments to Dubai."
                        severity="Medium"
                      />
                      <RiskAlert 
                        title="Supplier Reliability Drop" 
                        description="Precision Metals Inc (S2) has shown a 12% decrease in reliability over the last 60 days."
                        severity="High"
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {activeTab === 'scenario' && (
                <motion.div 
                  key="scenario"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Scenario Simulation</CardTitle>
                      <CardDescription>Describe a potential event to analyze its impact on your supply chain.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-4">
                        <Input 
                          placeholder="e.g., 20% increase in raw material costs or 2-week port strike in LA" 
                          value={scenarioInput}
                          onChange={(e) => setScenarioInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleRunScenario()}
                        />
                        <Button onClick={handleRunScenario} disabled={isAnalyzingScenario || !scenarioInput}>
                          {isAnalyzingScenario ? <RefreshCw className="animate-spin mr-2" size={16} /> : <Zap className="mr-2" size={16} />}
                          Analyze
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {scenarioResult && (
                    <Card className="bg-muted/30">
                      <CardHeader>
                        <CardTitle className="text-sm font-medium data-grid-header">AI Impact Assessment</CardTitle>
                      </CardHeader>
                      <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown>{scenarioResult}</ReactMarkdown>
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              )}

              {activeTab === 'strategies' && (
                <motion.div 
                  key="strategies"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="space-y-6"
                >
                  {strategies.length === 0 && !isGenerating && (
                    <div className="text-center py-20 border-2 border-dashed rounded-xl">
                      <BrainCircuit className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No Strategies Generated</h3>
                      <p className="text-muted-foreground mb-6">Click the button above to generate AI-powered optimization strategies.</p>
                      <Button onClick={handleGenerateStrategies}>Generate Now</Button>
                    </div>
                  )}

                  {isGenerating && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[1, 2, 3, 4].map(i => (
                        <Card key={i} className="animate-pulse">
                          <div className="h-48 bg-muted rounded-t-xl" />
                          <div className="p-6 space-y-4">
                            <div className="h-4 w-1/2 bg-muted rounded" />
                            <div className="h-4 w-full bg-muted rounded" />
                            <div className="h-4 w-3/4 bg-muted rounded" />
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {strategies.map((strategy, i) => (
                      <Card key={i} className="overflow-hidden border-l-4 border-l-primary">
                        <CardHeader>
                          <div className="flex justify-between items-start mb-2">
                            <Badge variant="secondary">{strategy.category}</Badge>
                            <Badge variant={strategy.priority === 'Critical' ? 'destructive' : 'outline'}>
                              {strategy.priority}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl">{strategy.title}</CardTitle>
                          <CardDescription>{strategy.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                              <ChevronRight size={14} /> Recommended Actions
                            </h4>
                            <ul className="text-sm space-y-1 text-muted-foreground list-disc pl-5">
                              {strategy.actions.map((action, j) => (
                                <li key={j}>{action}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="grid grid-cols-3 gap-2 pt-4 border-t">
                            <ImpactStat label="Cost" value={strategy.expectedImpact.costReduction} />
                            <ImpactStat label="Efficiency" value={strategy.expectedImpact.efficiencyGain} />
                            <ImpactStat label="Risk" value={strategy.expectedImpact.riskReduction} />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick, isOpen }: { 
  icon: React.ReactNode, 
  label: string, 
  active: boolean, 
  onClick: () => void,
  isOpen: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
        active 
          ? 'bg-primary text-primary-foreground shadow-sm' 
          : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
      }`}
    >
      {icon}
      {isOpen && <span className="text-sm font-medium">{label}</span>}
    </button>
  );
}

function StatCard({ title, value, change, trend, description }: {
  title: string,
  value: string,
  change: string,
  trend: 'up' | 'down' | 'stable',
  description: string
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xs font-medium data-grid-header">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mono-value">{value}</div>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-xs font-medium ${
            trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-muted-foreground'
          }`}>
            {change}
          </span>
          <span className="text-[10px] text-muted-foreground">{description}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function RiskBar({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-medium">
        <span>{label}</span>
        <span className="mono-value">{value}%</span>
      </div>
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          className={`h-full ${color}`} 
        />
      </div>
    </div>
  );
}

function RiskAlert({ title, description, severity }: { title: string, description: string, severity: 'High' | 'Medium' | 'Low' }) {
  return (
    <div className="p-4 border rounded-lg bg-card flex gap-4">
      <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
        severity === 'High' ? 'bg-red-500' : severity === 'Medium' ? 'bg-yellow-500' : 'bg-blue-500'
      }`} />
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h5 className="font-semibold text-sm">{title}</h5>
          <Badge variant="outline" className="text-[10px] h-4">{severity}</Badge>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function ImpactStat({ label, value }: { label: string, value: string }) {
  return (
    <div className="text-center">
      <div className="text-[10px] uppercase text-muted-foreground font-semibold">{label}</div>
      <div className="text-xs font-bold text-green-600">{value}</div>
    </div>
  );
}

