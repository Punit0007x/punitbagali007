import { motion } from "framer-motion";
import { aadhaarData, formatNumber } from "@/data/aadhaarData";

function getHeatmapColor(failureRate: number) {
  if (failureRate < 2) return { bg: "bg-success/20", text: "text-success", label: "Low" };
  if (failureRate < 5) return { bg: "bg-warning/20", text: "text-warning", label: "Medium" };
  if (failureRate < 8) return { bg: "bg-secondary/20", text: "text-secondary", label: "High" };
  return { bg: "bg-destructive/20", text: "text-destructive", label: "Critical" };
}

export function DistrictHeatmap() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {aadhaarData.districts.map((district, index) => {
          const colors = getHeatmapColor(district.failureRate);
          
          return (
            <motion.div
              key={district.district}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02, duration: 0.3 }}
              whileHover={{ 
                scale: 1.05, 
                zIndex: 10,
                transition: { duration: 0.2 } 
              }}
              className={`relative p-4 rounded-xl ${colors.bg} cursor-pointer group overflow-hidden`}
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-transparent to-foreground/5" />
              
              <div className="relative">
                <p className="text-xs font-medium text-muted-foreground truncate" title={district.state}>
                  {district.state}
                </p>
                <p className="font-semibold text-sm truncate mt-1" title={district.district}>
                  {district.district}
                </p>
                <p className={`text-2xl font-bold mt-2 ${colors.text}`}>
                  {district.failureRate.toFixed(1)}%
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatNumber(district.totalRequests)} req
                </p>
              </div>

              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-popover text-popover-foreground rounded-lg shadow-xl text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
                <p className="font-semibold">{district.district}, {district.state}</p>
                <p>Enrolments: {formatNumber(district.enrolments)}</p>
                <p>Updates: {formatNumber(district.updates)}</p>
                <p>Failures: {formatNumber(district.failures)}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap justify-center gap-4 pt-4 border-t border-border"
      >
        {[
          { color: "bg-success", label: "Low (<2%)" },
          { color: "bg-warning", label: "Medium (2-5%)" },
          { color: "bg-secondary", label: "High (5-8%)" },
          { color: "bg-destructive", label: "Critical (>8%)" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded ${item.color}`} />
            <span className="text-sm text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
