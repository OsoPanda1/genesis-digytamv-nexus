import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { NOTIFICATION_COLORS } from "@/lib/codex";

export type ToolbarPosition = "top" | "left" | "right" | "bottom";
export type NotificationType = keyof typeof NOTIFICATION_COLORS;

interface ToolbarItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
  onClick?: () => void;
  children?: ToolbarItem[];
}

interface RetractableToolbarProps {
  position: ToolbarPosition;
  items: ToolbarItem[];
  notificationType?: NotificationType;
  className?: string;
  onItemClick?: (itemId: string) => void;
}

const RetractableToolbar: React.FC<RetractableToolbarProps> = ({
  position,
  items,
  notificationType,
  className,
  onItemClick
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  // Notification pulse effect
  useEffect(() => {
    if (notificationType) {
      setIsPulsing(true);
      const timer = setTimeout(() => setIsPulsing(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [notificationType]);

  const getPositionStyles = () => {
    const base = "fixed z-50 transition-all duration-300 ease-out";
    const glassStyle = "bg-background/80 backdrop-blur-xl border-border/50";
    
    switch (position) {
      case "top":
        return {
          container: cn(base, "top-0 left-0 right-0", glassStyle, "border-b"),
          collapsed: "h-12",
          expanded: "h-auto max-h-[40vh]",
          layout: "flex-row",
          itemLayout: "flex-row"
        };
      case "bottom":
        return {
          container: cn(base, "bottom-0 left-0 right-0", glassStyle, "border-t"),
          collapsed: "h-12",
          expanded: "h-auto max-h-[40vh]",
          layout: "flex-row",
          itemLayout: "flex-row"
        };
      case "left":
        return {
          container: cn(base, "left-0 top-12 bottom-12", glassStyle, "border-r"),
          collapsed: "w-12",
          expanded: "w-64",
          layout: "flex-col",
          itemLayout: "flex-col"
        };
      case "right":
        return {
          container: cn(base, "right-0 top-12 bottom-12", glassStyle, "border-l"),
          collapsed: "w-12",
          expanded: "w-64",
          layout: "flex-col",
          itemLayout: "flex-col"
        };
    }
  };

  const styles = getPositionStyles();
  const notificationColor = notificationType ? NOTIFICATION_COLORS[notificationType] : undefined;

  const handleItemClick = (item: ToolbarItem) => {
    if (item.children) {
      setActiveSubmenu(activeSubmenu === item.id ? null : item.id);
    } else {
      item.onClick?.();
      onItemClick?.(item.id);
    }
  };

  return (
    <motion.div
      className={cn(
        styles.container,
        isExpanded ? styles.expanded : styles.collapsed,
        className
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => {
        setIsExpanded(false);
        setActiveSubmenu(null);
      }}
      style={{
        boxShadow: isPulsing && notificationColor 
          ? `0 0 20px ${notificationColor}, 0 0 40px ${notificationColor}40`
          : undefined
      }}
    >
      {/* Notification Pulse Indicator */}
      <AnimatePresence>
        {isPulsing && notificationColor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(to ${position === "top" ? "bottom" : position === "bottom" ? "top" : position === "left" ? "right" : "left"}, ${notificationColor}20, transparent)`,
              borderColor: notificationColor
            }}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={cn(
        "flex items-center justify-between h-full w-full px-2",
        styles.layout === "flex-col" ? "flex-col py-2" : "flex-row"
      )}>
        {/* Items */}
        <div className={cn(
          "flex items-center gap-1",
          styles.layout === "flex-col" ? "flex-col w-full" : "flex-row"
        )}>
          {items.map((item) => (
            <div key={item.id} className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleItemClick(item)}
                className={cn(
                  "relative flex items-center gap-2 p-2 rounded-lg transition-all",
                  "hover:bg-accent/20 focus:outline-none focus:ring-2 focus:ring-accent/50",
                  activeSubmenu === item.id && "bg-accent/20"
                )}
              >
                {/* Icon */}
                <span className="text-foreground/80">{item.icon}</span>
                
                {/* Label (only when expanded) */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="text-sm font-medium whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Badge */}
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={cn(
                    "absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1",
                    "flex items-center justify-center rounded-full",
                    "bg-destructive text-destructive-foreground text-xs font-bold"
                  )}>
                    {item.badge > 99 ? "99+" : item.badge}
                  </span>
                )}
              </motion.button>

              {/* Submenu */}
              <AnimatePresence>
                {activeSubmenu === item.id && item.children && isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={cn(
                      "absolute bg-card/95 backdrop-blur-xl rounded-lg border border-border/50 p-2 min-w-[180px]",
                      position === "top" ? "top-full mt-1 left-0" :
                      position === "bottom" ? "bottom-full mb-1 left-0" :
                      position === "left" ? "left-full ml-1 top-0" :
                      "right-full mr-1 top-0"
                    )}
                  >
                    {item.children.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => {
                          child.onClick?.();
                          onItemClick?.(child.id);
                        }}
                        className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-accent/20 transition-colors"
                      >
                        {child.icon}
                        <span className="text-sm">{child.label}</span>
                        {child.badge !== undefined && child.badge > 0 && (
                          <span className="ml-auto bg-primary/20 text-primary text-xs px-1.5 py-0.5 rounded-full">
                            {child.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Expand Indicator */}
        <motion.div
          className={cn(
            "flex items-center justify-center",
            styles.layout === "flex-col" ? "w-full pt-2 border-t border-border/30" : "pl-2 border-l border-border/30"
          )}
        >
          <motion.div
            animate={{ 
              rotate: isExpanded ? (position === "left" ? 180 : position === "right" ? 0 : position === "top" ? 90 : -90) : 0 
            }}
            className="w-4 h-4 text-muted-foreground"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RetractableToolbar;
