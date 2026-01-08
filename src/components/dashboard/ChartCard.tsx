import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  description: string;
  children: ReactNode;
  fullWidth?: boolean;
  index?: number;
}

export function ChartCard({ title, description, children, fullWidth, index = 0 }: ChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`bg-card rounded-2xl p-6 shadow-lg border border-border/50 ${
        fullWidth ? "col-span-full" : ""
      }`}
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      <div className="relative">
        {children}
      </div>
    </motion.div>
  );
}
