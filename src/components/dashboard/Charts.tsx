import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  ComposedChart,
} from "recharts";
import { aadhaarData, formatNumber, generatePredictions, getStateData } from "@/data/aadhaarData";

const chartColors = {
  primary: "hsl(222, 47%, 20%)",
  secondary: "hsl(25, 95%, 53%)",
  accent: "hsl(160, 84%, 39%)",
  destructive: "hsl(0, 84%, 60%)",
  warning: "hsl(38, 92%, 50%)",
  info: "hsl(199, 89%, 48%)",
  muted: "hsl(220, 9%, 46%)",
};

export function TrendsChart() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={aadhaarData.monthlyTrends}>
          <defs>
            <linearGradient id="enrolmentsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartColors.secondary} stopOpacity={0.3} />
              <stop offset="95%" stopColor={chartColors.secondary} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="updatesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartColors.primary} stopOpacity={0.3} />
              <stop offset="95%" stopColor={chartColors.primary} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 87%)" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12, fill: chartColors.muted }}
            tickLine={false}
          />
          <YAxis 
            tickFormatter={(value) => formatNumber(value)}
            tick={{ fontSize: 12, fill: chartColors.muted }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip 
            formatter={(value: number) => formatNumber(value)}
            contentStyle={{
              backgroundColor: "hsl(0, 0%, 100%)",
              border: "1px solid hsl(220, 13%, 87%)",
              borderRadius: "12px",
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
            }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="enrolments"
            name="Enrolments"
            stroke={chartColors.secondary}
            strokeWidth={3}
            fill="url(#enrolmentsGradient)"
          />
          <Area
            type="monotone"
            dataKey="updates"
            name="Updates"
            stroke={chartColors.primary}
            strokeWidth={3}
            fill="url(#updatesGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export function AgeAnalysisChart() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={aadhaarData.ageAnalysis}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 87%)" />
          <XAxis 
            dataKey="ageGroup" 
            tick={{ fontSize: 11, fill: chartColors.muted }}
            tickLine={false}
          />
          <YAxis 
            yAxisId="left"
            tick={{ fontSize: 12, fill: chartColors.muted }}
            tickLine={false}
            axisLine={false}
            label={{ value: 'Failure Rate (%)', angle: -90, position: 'insideLeft', fontSize: 12 }}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 12, fill: chartColors.muted }}
            tickLine={false}
            axisLine={false}
            label={{ value: 'Risk Score', angle: 90, position: 'insideRight', fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: "hsl(0, 0%, 100%)",
              border: "1px solid hsl(220, 13%, 87%)",
              borderRadius: "12px",
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
            }}
          />
          <Legend />
          <Bar 
            yAxisId="left"
            dataKey="failureRate" 
            name="Failure Rate (%)" 
            fill={chartColors.destructive}
            radius={[4, 4, 0, 0]}
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="riskScore" 
            name="Risk Score"
            stroke={chartColors.info}
            strokeWidth={3}
            dot={{ fill: chartColors.info, strokeWidth: 2 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export function PredictionsChart() {
  const predictions = generatePredictions();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={predictions}>
          <defs>
            <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartColors.primary} stopOpacity={0.2} />
              <stop offset="95%" stopColor={chartColors.primary} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 87%)" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12, fill: chartColors.muted }}
            tickLine={false}
          />
          <YAxis 
            tickFormatter={(value) => formatNumber(value)}
            tick={{ fontSize: 12, fill: chartColors.muted }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip 
            formatter={(value: number) => formatNumber(value)}
            contentStyle={{
              backgroundColor: "hsl(0, 0%, 100%)",
              border: "1px solid hsl(220, 13%, 87%)",
              borderRadius: "12px",
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
            }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="upperBound"
            name="Upper Bound"
            stroke={chartColors.primary}
            strokeDasharray="5 5"
            strokeOpacity={0.5}
            fill="url(#confidenceGradient)"
          />
          <Line
            type="monotone"
            dataKey="predicted"
            name="Predicted Updates"
            stroke={chartColors.accent}
            strokeWidth={3}
            dot={{ fill: chartColors.accent, strokeWidth: 2 }}
          />
          <Area
            type="monotone"
            dataKey="lowerBound"
            name="Lower Bound"
            stroke={chartColors.primary}
            strokeDasharray="5 5"
            strokeOpacity={0.5}
            fill="transparent"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export function StateComparisonChart() {
  const stateData = getStateData();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={stateData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 87%)" />
          <XAxis 
            type="number"
            tickFormatter={(value) => formatNumber(value)}
            tick={{ fontSize: 12, fill: chartColors.muted }}
            tickLine={false}
          />
          <YAxis 
            type="category"
            dataKey="state" 
            tick={{ fontSize: 11, fill: chartColors.muted }}
            tickLine={false}
            axisLine={false}
            width={100}
          />
          <Tooltip 
            formatter={(value: number) => formatNumber(value)}
            contentStyle={{
              backgroundColor: "hsl(0, 0%, 100%)",
              border: "1px solid hsl(220, 13%, 87%)",
              borderRadius: "12px",
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
            }}
          />
          <Legend />
          <Bar 
            dataKey="enrolments" 
            name="Enrolments" 
            fill={chartColors.secondary}
            radius={[0, 4, 4, 0]}
          />
          <Bar 
            dataKey="updates" 
            name="Updates" 
            fill={chartColors.primary}
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export function DemographicsChart() {
  const data = aadhaarData.ageAnalysis.map(item => ({
    ...item,
    total: item.enrolments + item.updates,
  }));
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="h-[350px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 87%)" />
          <XAxis 
            dataKey="ageGroup" 
            tick={{ fontSize: 11, fill: chartColors.muted }}
            tickLine={false}
          />
          <YAxis 
            tickFormatter={(value) => formatNumber(value)}
            tick={{ fontSize: 12, fill: chartColors.muted }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip 
            formatter={(value: number) => formatNumber(value)}
            contentStyle={{
              backgroundColor: "hsl(0, 0%, 100%)",
              border: "1px solid hsl(220, 13%, 87%)",
              borderRadius: "12px",
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
            }}
          />
          <Legend />
          <Bar 
            dataKey="enrolments" 
            name="Enrolments" 
            fill={chartColors.secondary}
            radius={[4, 4, 0, 0]}
            stackId="a"
          />
          <Bar 
            dataKey="updates" 
            name="Updates" 
            fill={chartColors.primary}
            radius={[4, 4, 0, 0]}
            stackId="a"
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
