import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Database, 
  Sparkles, 
  BarChart3, 
  Brain, 
  Lightbulb 
} from "lucide-react";

const methodologyItems = [
  {
    id: "data-collection",
    icon: Database,
    title: "Data Collection & Sources",
    content: (
      <>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Primary Data Sources:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>UIDAI Official Portal (uidai.gov.in) - Monthly enrolment and update statistics</li>
              <li>Data.gov.in Open Data Platform - Historical Aadhaar data</li>
              <li>State-wise demographic data from Census 2011</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Data Coverage:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Time Period: January 2022 - December 2025</li>
              <li>Geographic Scope: 8 States, 40 Districts</li>
              <li>Transaction Types: New Enrolments, Biometric Updates, Demographic Updates</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "data-cleaning",
    icon: Sparkles,
    title: "Data Cleaning & Preprocessing",
    content: (
      <>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Cleaning Steps:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Removed duplicate entries based on district-month-year combinations</li>
              <li>Handled missing values using forward-fill for continuous metrics</li>
              <li>Standardized state and district names for consistency</li>
              <li>Validated data ranges (e.g., failure rate between 0-100%)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Feature Engineering:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Calculated failure rate: (failures / total_requests) × 100</li>
              <li>Created risk score: weighted combination of failure rate and volume</li>
              <li>Generated monthly aggregates from daily transaction data</li>
              <li>Computed rolling averages for trend smoothing</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "analysis-methods",
    icon: BarChart3,
    title: "Analysis Methods",
    content: (
      <>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Trend Analysis:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Time-series decomposition to identify seasonal patterns</li>
              <li>Year-over-year growth rate calculations</li>
              <li>Moving average smoothing for noise reduction</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Anomaly Detection:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Z-score method: flagging districts with failure rates {">"} 2 standard deviations from mean</li>
              <li>Severity classification: Medium (Z {">"} 2), High (Z {">"} 2.5), Critical (Z {">"} 3)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Age-wise Analysis:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Segmentation by age groups: 0-5, 5-18, 18-40, 40-60, 60+</li>
              <li>Biometric failure correlation with age factors</li>
              <li>Risk scoring based on historical failure patterns</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "predictive-modeling",
    icon: Brain,
    title: "Predictive Modeling",
    content: (
      <>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Model Selection:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Algorithm: Linear Regression with seasonal adjustment</li>
              <li>Chosen for interpretability and governance use-case suitability</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Model Training:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Training data: 36 months of historical update volumes</li>
              <li>Features: Month, Year, Seasonal indicators</li>
              <li>Target: Monthly update request volume</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Confidence Intervals:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>95% confidence bounds calculated using standard error</li>
              <li>Interval widens for predictions further in future</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "governance-impact",
    icon: Lightbulb,
    title: "Governance Impact & Recommendations",
    content: (
      <>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Key Insights:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Senior citizens (60+) show 2.5x higher biometric failure rates</li>
              <li>Urban districts have 15% higher update volumes than rural</li>
              <li>Seasonal peaks observed in April-May (financial year end)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Policy Recommendations:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Deploy mobile enrolment units in high-failure rural districts</li>
              <li>Implement age-appropriate biometric capture protocols</li>
              <li>Scale infrastructure ahead of predicted demand surges</li>
              <li>Focus quality improvement on Critical/High anomaly districts</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
];

export function MethodologySection() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl bg-card border border-border shadow-lg"
      >
        <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-3">
          <span className="text-3xl">📋</span>
          Methodology Documentation
        </h2>
        <p className="text-muted-foreground">
          Detailed documentation of data sources, processing methods, and analysis techniques used in this dashboard.
        </p>
      </motion.div>

      <Accordion type="single" collapsible className="space-y-3">
        {methodologyItems.map((item, index) => {
          const Icon = item.icon;
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <AccordionItem
                value={item.id}
                className="bg-card rounded-xl border border-border px-6 shadow-sm"
              >
                <AccordionTrigger className="hover:no-underline py-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg gradient-saffron">
                      <Icon className="w-5 h-5 text-secondary-foreground" />
                    </div>
                    <span className="font-semibold text-foreground">
                      {index + 1}. {item.title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          );
        })}
      </Accordion>
    </div>
  );
}
