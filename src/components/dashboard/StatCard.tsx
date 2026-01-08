import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { useEffect, useState } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  positive?: boolean;
  icon: LucideIcon;
  variant: "primary" | "secondary" | "accent" | "destructive";
  index: number;
}

const variantStyles = {
  primary: {
    border: "border-l-primary",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  secondary: {
    border: "border-l-secondary",
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
  },
  accent: {
    border: "border-l-accent",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
  },
  destructive: {
    border: "border-l-destructive",
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
  },
};

export function StatCard({ label, value, change, positive, icon: Icon, variant, index }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const styles = variantStyles[variant];

  useEffect(() => {
    // Animate the value counting up
    const stringValue = String(value);
    const numericPart = stringValue.match(/[\d.]+/)?.[0];
    const suffix = stringValue.replace(/[\d.]+/, "");
    
    if (numericPart) {
      const target = parseFloat(numericPart);
      const duration = 1500;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = target * easeOut;
        
        setDisplayValue(current.toFixed(numericPart.includes(".") ? 2 : 0) + suffix);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(stringValue);
        }
      };
      
      animate();
    } else {
      setDisplayValue(stringValue);
    }
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`relative overflow-hidden bg-card rounded-xl p-5 shadow-md border-l-4 ${styles.border} group`}
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-transparent via-transparent to-secondary/5" />
      
      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
            {label}
          </p>
          <motion.p
            key={displayValue}
            className="text-3xl font-bold text-foreground"
          >
            {displayValue}
          </motion.p>
          
          {change && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              className={`flex items-center gap-1 mt-2 text-sm font-medium ${
                positive ? "text-success" : "text-destructive"
              }`}
            >
              {positive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{change} vs last year</span>
            </motion.div>
          )}
        </div>
        
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={`p-3 rounded-xl ${styles.iconBg}`}
        >
          <Icon className={`w-6 h-6 ${styles.iconColor}`} />
        </motion.div>
      </div>

      {/* Decorative corner */}
      <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full bg-gradient-to-br from-muted/50 to-transparent opacity-50" />
    </motion.div>
  );
}
