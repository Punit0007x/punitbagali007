import { motion } from "framer-motion";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";
import { detectAnomalies, formatNumber } from "@/data/aadhaarData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const severityConfig = {
  Critical: {
    icon: AlertTriangle,
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  High: {
    icon: AlertCircle,
    className: "bg-warning/10 text-warning border-warning/20",
  },
  Medium: {
    icon: Info,
    className: "bg-info/10 text-info border-info/20",
  },
};

export function AnomaliesTable() {
  const anomalies = detectAnomalies();

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">District</TableHead>
              <TableHead className="font-semibold">State</TableHead>
              <TableHead className="font-semibold text-right">Failure Rate</TableHead>
              <TableHead className="font-semibold text-right">Z-Score</TableHead>
              <TableHead className="font-semibold text-right">Total Requests</TableHead>
              <TableHead className="font-semibold text-center">Severity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {anomalies.map((anomaly, index) => {
              const config = severityConfig[anomaly.severity];
              const Icon = config.icon;
              
              return (
                <motion.tr
                  key={anomaly.district}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group hover:bg-muted/30 transition-colors"
                >
                  <TableCell className="font-semibold">{anomaly.district}</TableCell>
                  <TableCell className="text-muted-foreground">{anomaly.state}</TableCell>
                  <TableCell className="text-right font-mono text-destructive font-medium">
                    {anomaly.failureRate.toFixed(2)}%
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {anomaly.zScore.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatNumber(anomaly.totalRequests)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className={config.className}>
                      <Icon className="w-3 h-3 mr-1" />
                      {anomaly.severity}
                    </Badge>
                  </TableCell>
                </motion.tr>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="p-4 rounded-xl bg-destructive/5 border border-destructive/20"
      >
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-destructive">Action Required</p>
            <p className="text-sm text-muted-foreground mt-1">
              {anomalies.filter(a => a.severity === 'Critical').length} critical and{' '}
              {anomalies.filter(a => a.severity === 'High').length} high-severity districts 
              require immediate attention. Consider deploying mobile enrolment units and 
              conducting equipment audits.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
