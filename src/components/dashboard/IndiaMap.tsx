import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MapPin, Users, RefreshCw, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { aadhaarData, formatNumber, District } from "@/data/aadhaarData";

// Simplified India state paths (using approximate coordinates for demonstration)
const statePaths: Record<string, { path: string; center: { x: number; y: number } }> = {
  "Maharashtra": {
    path: "M180,320 L220,300 L260,310 L280,340 L270,380 L230,400 L190,390 L160,360 Z",
    center: { x: 220, y: 350 }
  },
  "Uttar Pradesh": {
    path: "M240,200 L320,180 L360,200 L350,250 L300,270 L250,260 L230,230 Z",
    center: { x: 290, y: 220 }
  },
  "Karnataka": {
    path: "M180,400 L230,390 L260,420 L250,470 L200,490 L160,460 L150,420 Z",
    center: { x: 200, y: 440 }
  },
  "Tamil Nadu": {
    path: "M200,490 L250,470 L280,500 L270,560 L220,580 L180,540 Z",
    center: { x: 230, y: 520 }
  },
  "Rajasthan": {
    path: "M140,180 L220,150 L250,180 L240,240 L200,270 L150,260 L120,220 Z",
    center: { x: 180, y: 210 }
  },
  "Gujarat": {
    path: "M80,240 L140,220 L160,260 L150,310 L110,340 L60,320 L50,280 Z",
    center: { x: 110, y: 280 }
  },
  "West Bengal": {
    path: "M360,250 L400,230 L420,270 L410,330 L380,350 L350,320 L340,280 Z",
    center: { x: 380, y: 290 }
  },
  "Bihar": {
    path: "M340,230 L380,210 L400,240 L390,280 L360,290 L330,270 Z",
    center: { x: 365, y: 250 }
  }
};

interface StateData {
  state: string;
  enrolments: number;
  updates: number;
  failures: number;
  failureRate: number;
  districts: District[];
}

export function IndiaMap() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const stateData = useMemo(() => {
    const data: Record<string, StateData> = {};
    
    aadhaarData.districts.forEach((district) => {
      if (!data[district.state]) {
        data[district.state] = {
          state: district.state,
          enrolments: 0,
          updates: 0,
          failures: 0,
          failureRate: 0,
          districts: []
        };
      }
      data[district.state].enrolments += district.enrolments;
      data[district.state].updates += district.updates;
      data[district.state].failures += district.failures;
      data[district.state].districts.push(district);
    });

    // Calculate failure rate for each state
    Object.values(data).forEach((state) => {
      const total = state.enrolments + state.updates;
      state.failureRate = total > 0 ? (state.failures / total) * 100 : 0;
    });

    return data;
  }, []);

  const getStateColor = (state: string) => {
    const data = stateData[state];
    if (!data) return "hsl(var(--muted))";
    
    const rate = data.failureRate;
    if (rate > 5) return "hsl(var(--destructive))";
    if (rate > 3) return "hsl(var(--warning))";
    if (rate > 2) return "hsl(var(--accent))";
    return "hsl(var(--success))";
  };

  const getDistrictColor = (district: District) => {
    const rate = district.failureRate;
    if (rate > 6) return "hsl(var(--destructive))";
    if (rate > 4) return "hsl(var(--warning))";
    if (rate > 2) return "hsl(var(--accent))";
    return "hsl(var(--success))";
  };

  const selectedStateData = selectedState ? stateData[selectedState] : null;

  return (
    <div className="relative">
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <button
          onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.25))}
          className="p-2 rounded-lg bg-card border border-border hover:bg-muted transition-colors"
        >
          <span className="text-lg font-bold">−</span>
        </button>
        <span className="px-3 py-2 rounded-lg bg-card border border-border text-sm font-medium">
          {Math.round(zoomLevel * 100)}%
        </span>
        <button
          onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.25))}
          className="p-2 rounded-lg bg-card border border-border hover:bg-muted transition-colors"
        >
          <span className="text-lg font-bold">+</span>
        </button>
      </div>

      {/* Legend */}
      <div className="absolute top-4 left-4 z-20 p-3 rounded-xl bg-card/95 backdrop-blur-sm border border-border">
        <p className="text-xs font-semibold mb-2 text-foreground">Failure Rate</p>
        <div className="space-y-1.5">
          {[
            { color: "bg-success", label: "< 2%", textColor: "text-success" },
            { color: "bg-accent", label: "2-3%", textColor: "text-accent" },
            { color: "bg-warning", label: "3-5%", textColor: "text-warning" },
            { color: "bg-destructive", label: "> 5%", textColor: "text-destructive" }
          ].map(({ color, label, textColor }) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-sm ${color}`} />
              <span className={`text-xs ${textColor}`}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!selectedState ? (
          // India Map View
          <motion.div
            key="india-map"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative overflow-hidden rounded-xl"
          >
            <svg
              viewBox="0 0 500 650"
              className="w-full h-[500px]"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center" }}
            >
              <defs>
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.1" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background */}
              <rect width="500" height="650" fill="url(#mapGradient)" rx="20" />

              {/* State paths */}
              {Object.entries(statePaths).map(([state, { path, center }]) => (
                <g key={state}>
                  <motion.path
                    d={path}
                    fill={getStateColor(state)}
                    stroke={hoveredState === state || selectedState === state ? "hsl(var(--primary))" : "hsl(var(--border))"}
                    strokeWidth={hoveredState === state ? 3 : 1.5}
                    className="cursor-pointer transition-all duration-300"
                    style={{
                      filter: hoveredState === state ? "url(#glow)" : "none",
                      opacity: hoveredState && hoveredState !== state ? 0.5 : 1
                    }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedState(state)}
                    onMouseEnter={() => setHoveredState(state)}
                    onMouseLeave={() => setHoveredState(null)}
                  />
                  <text
                    x={center.x}
                    y={center.y}
                    textAnchor="middle"
                    className="text-[10px] font-semibold fill-foreground pointer-events-none"
                    style={{ textShadow: "0 0 4px hsl(var(--background))" }}
                  >
                    {state.slice(0, 3).toUpperCase()}
                  </text>
                </g>
              ))}

              {/* Other states placeholder */}
              <text x="250" y="600" textAnchor="middle" className="text-xs fill-muted-foreground">
                Click on a state to view district details
              </text>
            </svg>

            {/* Hover Tooltip */}
            <AnimatePresence>
              {hoveredState && stateData[hoveredState] && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 p-4 rounded-xl bg-card/95 backdrop-blur-sm border border-border shadow-lg"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="font-bold text-foreground">{hoveredState}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Enrolments</p>
                      <p className="font-semibold text-secondary">{formatNumber(stateData[hoveredState].enrolments)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Updates</p>
                      <p className="font-semibold text-primary">{formatNumber(stateData[hoveredState].updates)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Failure Rate</p>
                      <p className={`font-semibold ${
                        stateData[hoveredState].failureRate > 5 ? "text-destructive" :
                        stateData[hoveredState].failureRate > 3 ? "text-warning" : "text-success"
                      }`}>
                        {stateData[hoveredState].failureRate.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          // District Drill-down View
          <motion.div
            key="district-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-4"
          >
            {/* Back Button & State Header */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedState(null)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-medium">Back to Map</span>
              </button>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg gradient-saffron">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{selectedState}</h3>
                  <p className="text-sm text-muted-foreground">{selectedStateData?.districts.length} Districts</p>
                </div>
              </div>
            </div>

            {/* State Summary Cards */}
            {selectedStateData && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="p-4 rounded-xl bg-secondary/10 border border-secondary/20"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-secondary" />
                    <span className="text-sm text-muted-foreground">Enrolments</span>
                  </div>
                  <p className="text-2xl font-bold text-secondary">{formatNumber(selectedStateData.enrolments)}</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="p-4 rounded-xl bg-primary/10 border border-primary/20"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <RefreshCw className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Updates</span>
                  </div>
                  <p className="text-2xl font-bold text-primary">{formatNumber(selectedStateData.updates)}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-4 rounded-xl bg-destructive/10 border border-destructive/20"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    <span className="text-sm text-muted-foreground">Failures</span>
                  </div>
                  <p className="text-2xl font-bold text-destructive">{formatNumber(selectedStateData.failures)}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className={`p-4 rounded-xl ${
                    selectedStateData.failureRate > 5 ? "bg-destructive/10 border-destructive/20" :
                    selectedStateData.failureRate > 3 ? "bg-warning/10 border-warning/20" :
                    "bg-success/10 border-success/20"
                  } border`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {selectedStateData.failureRate > 3 ? 
                      <TrendingUp className="w-4 h-4 text-destructive" /> : 
                      <TrendingDown className="w-4 h-4 text-success" />
                    }
                    <span className="text-sm text-muted-foreground">Failure Rate</span>
                  </div>
                  <p className={`text-2xl font-bold ${
                    selectedStateData.failureRate > 5 ? "text-destructive" :
                    selectedStateData.failureRate > 3 ? "text-warning" : "text-success"
                  }`}>
                    {selectedStateData.failureRate.toFixed(2)}%
                  </p>
                </motion.div>
              </div>
            )}

            {/* District Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedStateData?.districts.map((district, index) => (
                <motion.div
                  key={district.district}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className={`relative p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                    hoveredDistrict === district.district
                      ? "border-primary shadow-lg shadow-primary/20 scale-[1.02]"
                      : "border-border hover:border-primary/50"
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${getDistrictColor(district)}10, transparent)`
                  }}
                  onMouseEnter={() => setHoveredDistrict(district.district)}
                  onMouseLeave={() => setHoveredDistrict(null)}
                >
                  {/* Status Indicator */}
                  <div
                    className="absolute top-3 right-3 w-3 h-3 rounded-full animate-pulse"
                    style={{ backgroundColor: getDistrictColor(district) }}
                  />

                  <h4 className="font-bold text-foreground text-lg mb-3">{district.district}</h4>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Enrolments</span>
                      <span className="font-semibold text-secondary">{formatNumber(district.enrolments)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Updates</span>
                      <span className="font-semibold text-primary">{formatNumber(district.updates)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Failures</span>
                      <span className="font-semibold text-destructive">{formatNumber(district.failures)}</span>
                    </div>
                    <div className="pt-2 border-t border-border">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Failure Rate</span>
                        <span className={`font-bold text-lg ${
                          district.failureRate > 6 ? "text-destructive" :
                          district.failureRate > 4 ? "text-warning" :
                          district.failureRate > 2 ? "text-accent" : "text-success"
                        }`}>
                          {district.failureRate.toFixed(2)}%
                        </span>
                      </div>
                      {/* Progress Bar */}
                      <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(district.failureRate * 10, 100)}%` }}
                          transition={{ delay: 0.3 + index * 0.05, duration: 0.5 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: getDistrictColor(district) }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
