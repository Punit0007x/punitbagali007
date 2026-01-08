import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  BarChart3, 
  Map, 
  AlertTriangle, 
  TrendingUp, 
  BookOpen,
  Users,
  Settings
} from "lucide-react";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "districts", label: "Districts", icon: Map },
  { id: "demographics", label: "Demographics", icon: Users },
  { id: "anomalies", label: "Anomalies", icon: AlertTriangle },
  { id: "predictions", label: "Predictions", icon: TrendingUp },
  { id: "methodology", label: "Methodology", icon: BookOpen },
];

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border py-4"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? "text-secondary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 gradient-saffron rounded-xl shadow-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon className={`w-4 h-4 relative z-10 ${isActive ? "text-secondary-foreground" : ""}`} />
                <span className="relative z-10">{tab.label}</span>
                
                {tab.id === "anomalies" && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="relative z-10 ml-1 px-1.5 py-0.5 text-xs font-bold rounded-full bg-destructive text-destructive-foreground"
                  >
                    7
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
