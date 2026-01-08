export interface District {
  state: string;
  district: string;
  enrolments: number;
  updates: number;
  failures: number;
  totalRequests: number;
  failureRate: number;
}

export interface MonthlyTrend {
  month: string;
  enrolments: number;
  updates: number;
}

export interface AgeAnalysis {
  ageGroup: string;
  enrolments: number;
  updates: number;
  failures: number;
  failureRate: number;
  riskScore: number;
}

export interface Prediction {
  month: string;
  predicted: number;
  upperBound: number;
  lowerBound: number;
}

export interface Anomaly extends District {
  zScore: number;
  severity: 'Critical' | 'High' | 'Medium';
}

export const aadhaarData = {
  districts: [
    { state: "Maharashtra", district: "Mumbai", enrolments: 125000, updates: 89000, failures: 3200, totalRequests: 217200, failureRate: 1.47 },
    { state: "Maharashtra", district: "Pune", enrolments: 98000, updates: 67000, failures: 2100, totalRequests: 167100, failureRate: 1.26 },
    { state: "Maharashtra", district: "Nagpur", enrolments: 45000, updates: 32000, failures: 1800, totalRequests: 78800, failureRate: 2.28 },
    { state: "Maharashtra", district: "Thane", enrolments: 78000, updates: 54000, failures: 1500, totalRequests: 133500, failureRate: 1.12 },
    { state: "Maharashtra", district: "Nashik", enrolments: 52000, updates: 38000, failures: 2400, totalRequests: 92400, failureRate: 2.60 },
    { state: "Uttar Pradesh", district: "Lucknow", enrolments: 112000, updates: 78000, failures: 4500, totalRequests: 194500, failureRate: 2.31 },
    { state: "Uttar Pradesh", district: "Kanpur", enrolments: 89000, updates: 62000, failures: 3800, totalRequests: 154800, failureRate: 2.45 },
    { state: "Uttar Pradesh", district: "Varanasi", enrolments: 67000, updates: 48000, failures: 5200, totalRequests: 120200, failureRate: 4.33 },
    { state: "Uttar Pradesh", district: "Agra", enrolments: 54000, updates: 39000, failures: 2900, totalRequests: 95900, failureRate: 3.02 },
    { state: "Uttar Pradesh", district: "Prayagraj", enrolments: 61000, updates: 43000, failures: 3100, totalRequests: 107100, failureRate: 2.89 },
    { state: "Karnataka", district: "Bengaluru", enrolments: 145000, updates: 98000, failures: 2800, totalRequests: 245800, failureRate: 1.14 },
    { state: "Karnataka", district: "Mysuru", enrolments: 58000, updates: 41000, failures: 1900, totalRequests: 100900, failureRate: 1.88 },
    { state: "Karnataka", district: "Hubli", enrolments: 42000, updates: 29000, failures: 2200, totalRequests: 73200, failureRate: 3.01 },
    { state: "Karnataka", district: "Mangalore", enrolments: 51000, updates: 36000, failures: 1600, totalRequests: 88600, failureRate: 1.81 },
    { state: "Karnataka", district: "Belgaum", enrolments: 47000, updates: 33000, failures: 2500, totalRequests: 82500, failureRate: 3.03 },
    { state: "Tamil Nadu", district: "Chennai", enrolments: 138000, updates: 95000, failures: 3100, totalRequests: 236100, failureRate: 1.31 },
    { state: "Tamil Nadu", district: "Coimbatore", enrolments: 72000, updates: 51000, failures: 2300, totalRequests: 125300, failureRate: 1.84 },
    { state: "Tamil Nadu", district: "Madurai", enrolments: 64000, updates: 45000, failures: 2800, totalRequests: 111800, failureRate: 2.50 },
    { state: "Tamil Nadu", district: "Trichy", enrolments: 48000, updates: 34000, failures: 1700, totalRequests: 83700, failureRate: 2.03 },
    { state: "Tamil Nadu", district: "Salem", enrolments: 41000, updates: 29000, failures: 2100, totalRequests: 72100, failureRate: 2.91 },
    { state: "Rajasthan", district: "Jaipur", enrolments: 95000, updates: 66000, failures: 4200, totalRequests: 165200, failureRate: 2.54 },
    { state: "Rajasthan", district: "Jodhpur", enrolments: 52000, updates: 37000, failures: 3800, totalRequests: 92800, failureRate: 4.09 },
    { state: "Rajasthan", district: "Udaipur", enrolments: 43000, updates: 30000, failures: 3200, totalRequests: 76200, failureRate: 4.20 },
    { state: "Rajasthan", district: "Kota", enrolments: 38000, updates: 27000, failures: 2600, totalRequests: 67600, failureRate: 3.85 },
    { state: "Rajasthan", district: "Ajmer", enrolments: 35000, updates: 25000, failures: 2900, totalRequests: 62900, failureRate: 4.61 },
    { state: "Gujarat", district: "Ahmedabad", enrolments: 118000, updates: 82000, failures: 2900, totalRequests: 202900, failureRate: 1.43 },
    { state: "Gujarat", district: "Surat", enrolments: 89000, updates: 62000, failures: 2400, totalRequests: 153400, failureRate: 1.56 },
    { state: "Gujarat", district: "Vadodara", enrolments: 61000, updates: 43000, failures: 1800, totalRequests: 105800, failureRate: 1.70 },
    { state: "Gujarat", district: "Rajkot", enrolments: 52000, updates: 37000, failures: 1500, totalRequests: 90500, failureRate: 1.66 },
    { state: "Gujarat", district: "Gandhinagar", enrolments: 34000, updates: 24000, failures: 900, totalRequests: 58900, failureRate: 1.53 },
    { state: "West Bengal", district: "Kolkata", enrolments: 132000, updates: 91000, failures: 4800, totalRequests: 227800, failureRate: 2.11 },
    { state: "West Bengal", district: "Howrah", enrolments: 68000, updates: 47000, failures: 3200, totalRequests: 118200, failureRate: 2.71 },
    { state: "West Bengal", district: "Durgapur", enrolments: 45000, updates: 32000, failures: 2800, totalRequests: 79800, failureRate: 3.51 },
    { state: "West Bengal", district: "Siliguri", enrolments: 52000, updates: 36000, failures: 4100, totalRequests: 92100, failureRate: 4.45 },
    { state: "West Bengal", district: "Asansol", enrolments: 41000, updates: 29000, failures: 3500, totalRequests: 73500, failureRate: 4.76 },
    { state: "Bihar", district: "Patna", enrolments: 87000, updates: 61000, failures: 6200, totalRequests: 154200, failureRate: 4.02 },
    { state: "Bihar", district: "Gaya", enrolments: 52000, updates: 37000, failures: 5800, totalRequests: 94800, failureRate: 6.12 },
    { state: "Bihar", district: "Muzaffarpur", enrolments: 48000, updates: 34000, failures: 7200, totalRequests: 89200, failureRate: 8.07 },
    { state: "Bihar", district: "Bhagalpur", enrolments: 41000, updates: 29000, failures: 5100, totalRequests: 75100, failureRate: 6.79 },
    { state: "Bihar", district: "Darbhanga", enrolments: 38000, updates: 27000, failures: 6800, totalRequests: 71800, failureRate: 9.47 }
  ] as District[],
  
  monthlyTrends: [
    { month: "Jan 2022", enrolments: 2800000, updates: 1900000 },
    { month: "Apr 2022", enrolments: 3200000, updates: 2100000 },
    { month: "Jul 2022", enrolments: 2900000, updates: 2000000 },
    { month: "Oct 2022", enrolments: 3100000, updates: 2200000 },
    { month: "Jan 2023", enrolments: 3400000, updates: 2400000 },
    { month: "Apr 2023", enrolments: 3800000, updates: 2600000 },
    { month: "Jul 2023", enrolments: 3500000, updates: 2500000 },
    { month: "Oct 2023", enrolments: 3700000, updates: 2700000 },
    { month: "Jan 2024", enrolments: 4000000, updates: 2900000 },
    { month: "Apr 2024", enrolments: 4400000, updates: 3200000 },
    { month: "Jul 2024", enrolments: 4100000, updates: 3000000 },
    { month: "Oct 2024", enrolments: 4300000, updates: 3100000 }
  ] as MonthlyTrend[],
  
  ageAnalysis: [
    { ageGroup: "0-5 Years", enrolments: 1200000, updates: 150000, failures: 48000, failureRate: 3.56, riskScore: 72 },
    { ageGroup: "5-18 Years", enrolments: 3500000, updates: 890000, failures: 65000, failureRate: 1.48, riskScore: 35 },
    { ageGroup: "18-40 Years", enrolments: 8200000, updates: 4500000, failures: 127000, failureRate: 1.00, riskScore: 22 },
    { ageGroup: "40-60 Years", enrolments: 4100000, updates: 2800000, failures: 138000, failureRate: 2.00, riskScore: 48 },
    { ageGroup: "60+ Years", enrolments: 2200000, updates: 1800000, failures: 240000, failureRate: 6.00, riskScore: 89 }
  ] as AgeAnalysis[]
};

export function formatNumber(num: number): string {
  if (num >= 10000000) return (num / 10000000).toFixed(2) + ' Cr';
  if (num >= 100000) return (num / 100000).toFixed(2) + ' L';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

export function calculateStats() {
  const totalEnrolments = aadhaarData.districts.reduce((sum, d) => sum + d.enrolments, 0);
  const totalUpdates = aadhaarData.districts.reduce((sum, d) => sum + d.updates, 0);
  const totalFailures = aadhaarData.districts.reduce((sum, d) => sum + d.failures, 0);
  const totalRequests = aadhaarData.districts.reduce((sum, d) => sum + d.totalRequests, 0);
  const avgFailureRate = (totalFailures / totalRequests * 100).toFixed(2);
  
  return {
    totalEnrolments,
    totalUpdates,
    totalFailures,
    totalRequests,
    avgFailureRate,
    highRiskDistricts: aadhaarData.districts.filter(d => d.failureRate > 5).length,
    totalDistricts: aadhaarData.districts.length,
    totalStates: new Set(aadhaarData.districts.map(d => d.state)).size
  };
}

export function detectAnomalies(): Anomaly[] {
  const failureRates = aadhaarData.districts.map(d => d.failureRate);
  const mean = failureRates.reduce((a, b) => a + b, 0) / failureRates.length;
  const stdDev = Math.sqrt(
    failureRates.reduce((sum, rate) => sum + Math.pow(rate - mean, 2), 0) / failureRates.length
  );
  
  return aadhaarData.districts
    .map(d => {
      const zScore = (d.failureRate - mean) / stdDev;
      let severity: 'Critical' | 'High' | 'Medium' = 'Medium';
      if (zScore > 3) severity = 'Critical';
      else if (zScore > 2.5) severity = 'High';
      
      return { ...d, zScore, severity };
    })
    .filter(d => d.zScore > 2)
    .sort((a, b) => b.zScore - a.zScore);
}

export function generatePredictions(): Prediction[] {
  const updateVolumes = aadhaarData.monthlyTrends.map(t => t.updates);
  const n = updateVolumes.length;
  
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
  for (let i = 0; i < n; i++) {
    sumX += i + 1;
    sumY += updateVolumes[i];
    sumXY += (i + 1) * updateVolumes[i];
    sumX2 += (i + 1) * (i + 1);
  }
  
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  
  const predictions: Prediction[] = [];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  
  for (let i = 0; i < 6; i++) {
    const x = n + i + 1;
    const predicted = intercept + slope * x;
    const error = predicted * 0.1 * (1 + i * 0.02);
    
    predictions.push({
      month: months[i] + ' 2025',
      predicted: Math.round(predicted),
      upperBound: Math.round(predicted + error),
      lowerBound: Math.round(predicted - error)
    });
  }
  
  return predictions;
}

export function getStateData() {
  const stateData: Record<string, { enrolments: number; updates: number; failures: number }> = {};
  
  aadhaarData.districts.forEach(d => {
    if (!stateData[d.state]) {
      stateData[d.state] = { enrolments: 0, updates: 0, failures: 0 };
    }
    stateData[d.state].enrolments += d.enrolments;
    stateData[d.state].updates += d.updates;
    stateData[d.state].failures += d.failures;
  });
  
  return Object.entries(stateData)
    .map(([state, data]) => ({ state, ...data }))
    .sort((a, b) => (b.enrolments + b.updates) - (a.enrolments + a.updates));
}
