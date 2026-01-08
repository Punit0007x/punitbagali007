import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, RefreshCw, AlertTriangle, MapPin, Building2, Activity, Calendar, TrendingUp } from "lucide-react";
import { Header } from "./Header";
import { TabNavigation } from "./TabNavigation";
import { StatCard } from "./StatCard";
import { ChartCard } from "./ChartCard";
import { DistrictHeatmap } from "./DistrictHeatmap";
import { AnomaliesTable } from "./AnomaliesTable";
import { MethodologySection } from "./MethodologySection";
import { Footer } from "./Footer";
import {
  TrendsChart,
  AgeAnalysisChart,
  PredictionsChart,
  StateComparisonChart,
  DemographicsChart,
} from "./Charts";
import { calculateStats, formatNumber, aadhaarData } from "@/data/aadhaarData";

const tabContent: Record<string, React.ReactNode> = {};

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const stats = calculateStats();

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                label="Total Enrolments"
                value={formatNumber(stats.totalEnrolments)}
                change="+12.5%"
                positive
                icon={Users}
                variant="secondary"
                index={0}
              />
              <StatCard
                label="Total Updates"
                value={formatNumber(stats.totalUpdates)}
                change="+8.3%"
                positive
                icon={RefreshCw}
                variant="primary"
                index={1}
              />
              <StatCard
                label="Avg Failure Rate"
                value={stats.avgFailureRate + "%"}
                change="-0.5%"
                positive
                icon={Activity}
                variant="accent"
                index={2}
              />
              <StatCard
                label="High-Risk Districts"
                value={stats.highRiskDistricts}
                change="+2"
                positive={false}
                icon={AlertTriangle}
                variant="destructive"
                index={3}
              />
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                label="Total Districts"
                value={stats.totalDistricts}
                icon={MapPin}
                variant="primary"
                index={4}
              />
              <StatCard
                label="States Covered"
                value={stats.totalStates}
                icon={Building2}
                variant="secondary"
                index={5}
              />
              <StatCard
                label="Total Requests"
                value={formatNumber(stats.totalRequests)}
                change="+15.2%"
                positive
                icon={Activity}
                variant="accent"
                index={6}
              />
              <StatCard
                label="Data Period"
                value="2022-2024"
                icon={Calendar}
                variant="primary"
                index={7}
              />
            </div>

            {/* Quick Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard
                title="Enrolment vs Update Trends"
                description="Monthly transaction volume comparison (2022-2025)"
                index={0}
              >
                <TrendsChart />
              </ChartCard>
              <ChartCard
                title="State-wise Transaction Volume"
                description="Comparison of enrolments vs updates across states"
                index={1}
              >
                <StateComparisonChart />
              </ChartCard>
            </div>
          </motion.div>
        );

      case "analytics":
        return (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard
                title="Enrolment vs Update Trends"
                description="Monthly transaction volume comparison (2022-2025)"
                index={0}
              >
                <TrendsChart />
              </ChartCard>
              <ChartCard
                title="Age-wise Biometric Failure Risk"
                description="Failure rates and risk scores by age group"
                index={1}
              >
                <AgeAnalysisChart />
              </ChartCard>
              <ChartCard
                title="State-wise Transaction Volume"
                description="Comparison of enrolments vs updates across states"
                index={2}
              >
                <StateComparisonChart />
              </ChartCard>
              <ChartCard
                title="Predicted Update Demand (6 Months)"
                description="Linear regression forecast with confidence intervals"
                index={3}
              >
                <PredictionsChart />
              </ChartCard>
            </div>
          </motion.div>
        );

      case "districts":
        return (
          <motion.div
            key="districts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ChartCard
              title="District Failure Rate Heatmap"
              description="Color-coded failure rates across all districts. Hover for detailed statistics."
              fullWidth
            >
              <DistrictHeatmap />
            </ChartCard>
          </motion.div>
        );

      case "demographics":
        return (
          <motion.div
            key="demographics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard
                title="Age-wise Transaction Distribution"
                description="Total enrolments and updates by age group"
                index={0}
              >
                <DemographicsChart />
              </ChartCard>
              <ChartCard
                title="Age-wise Biometric Failure Risk"
                description="Failure rates and risk scores by age group"
                index={1}
              >
                <AgeAnalysisChart />
              </ChartCard>
            </div>
            
            {/* Age group insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {aadhaarData.ageAnalysis.slice(0, 3).map((age, index) => (
                <div
                  key={age.ageGroup}
                  className="p-5 rounded-xl bg-card border border-border shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-muted-foreground">{age.ageGroup}</span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      age.riskScore > 70 ? 'bg-destructive/10 text-destructive' :
                      age.riskScore > 40 ? 'bg-warning/10 text-warning' :
                      'bg-success/10 text-success'
                    }`}>
                      Risk: {age.riskScore}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{formatNumber(age.enrolments + age.updates)}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {age.failureRate}% failure rate
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        );

      case "anomalies":
        return (
          <motion.div
            key="anomalies"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ChartCard
              title="Detected Anomalies"
              description="Districts with statistically significant failure rate deviations (Z-score method)"
              fullWidth
            >
              <AnomaliesTable />
            </ChartCard>
          </motion.div>
        );

      case "predictions":
        return (
          <motion.div
            key="predictions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <ChartCard
              title="Predicted Update Demand (6 Months)"
              description="Linear regression forecast with 95% confidence intervals"
              fullWidth
            >
              <PredictionsChart />
            </ChartCard>
            
            {/* Prediction insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-2xl bg-accent/5 border border-accent/20"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl gradient-emerald">
                  <TrendingUp className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg">Forecast Insights</h3>
                  <p className="text-muted-foreground mt-2">
                    Based on historical trends, we predict a <span className="font-semibold text-accent">15-20% increase</span> in 
                    update requests over the next 6 months. Peak demand expected in April-May 2025 
                    coinciding with financial year end. Infrastructure scaling recommended for 
                    high-volume districts.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Apr Peak: +25%", "Confidence: 95%", "R²: 0.89"].map((tag) => (
                      <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        );

      case "methodology":
        return (
          <motion.div
            key="methodology"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <MethodologySection />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
