import { motion } from "framer-motion";
import { Heart, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-12 py-8 border-t border-border bg-muted/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © 2024 UIDAI Hackathon Submission | Aadhaar Analytics Dashboard
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Data Source: UIDAI Official Statistics & data.gov.in | Built for demonstration purposes
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://uidai.gov.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-secondary transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              UIDAI Portal
            </a>
            <span className="text-muted-foreground/50">|</span>
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> for India
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
