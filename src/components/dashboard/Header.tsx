import { motion } from "framer-motion";
import { Building2, Calendar, Shield } from "lucide-react";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden gradient-hero text-primary-foreground"
    >
      {/* Animated background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-secondary/20 to-transparent animate-pulse-slow" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-accent/20 to-transparent animate-pulse-slow" style={{ animationDelay: "2s" }} />
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-secondary/30"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              y: [0, -30, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${15 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          {/* Left section */}
          <div className="flex items-center gap-4 text-center lg:text-left">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="relative"
            >
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-card/95 backdrop-blur-sm flex items-center justify-center shadow-xl">
                <Shield className="w-8 h-8 lg:w-10 lg:h-10 text-secondary" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full gradient-saffron flex items-center justify-center">
                <span className="text-xs font-bold text-secondary-foreground">✓</span>
              </div>
            </motion.div>
            
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl lg:text-3xl font-bold tracking-tight"
              >
                Aadhaar Analytics
                <span className="text-gradient ml-2">Dashboard</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-primary-foreground/80 text-sm lg:text-base mt-1"
              >
                Unlocking Societal Trends in Aadhaar Enrolment and Updates
              </motion.p>
            </div>
          </div>

          {/* Right section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center lg:items-end gap-2 text-sm"
          >
            <div className="flex items-center gap-2 text-primary-foreground/90">
              <Building2 className="w-4 h-4" />
              <span className="font-semibold">Unique Identification Authority of India</span>
            </div>
            <div className="text-primary-foreground/70 text-xs">
              Ministry of Electronics & IT
            </div>
            <div className="flex items-center gap-2 mt-1 px-3 py-1 rounded-full bg-secondary/20 backdrop-blur-sm">
              <Calendar className="w-3 h-3 text-secondary" />
              <span className="text-xs font-medium">UIDAI Hackathon 2024</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-accent to-secondary" />
    </motion.header>
  );
}
