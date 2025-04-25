import React from "react";
import { cn } from "@/lib/utils";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

const Header = ({ className, ...props }: HeaderProps) => {
  return (
    <header 
      className={cn(
        "w-full flex flex-col",
        className
      )}
      {...props}
    >
      {/* Tricolor Bar */}
      <div className="w-full h-1 flex">
        <div className="w-1/3 bg-green-600" />
        <div className="w-1/3 bg-white" />
        <div className="w-1/3 bg-red-600" />
      </div>

      {/* Existing Header Content */}
      <div 
        className="py-4 px-6 flex items-center justify-between glassmorphic border-b border-white/5"
      >
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-prismatic h-8 w-8 rounded-md flex items-center justify-center animate-pulse-glow">
            <span className="text-primary-foreground font-bold text-lg">G</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold leading-none tracking-tight">
              <span className="text-gradient">GÉNESIS</span> <span className="text-white/80">DIGYTAMV</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">Nexus File Integration System</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">Sistema Neural v1.0</span>
          <div className="h-2 w-2 rounded-full bg-accent animate-pulse-glow"></div>
        </div>
      </div>

      {/* New Subtitle */}
      <div className="w-full text-center py-2 bg-black/20 backdrop-blur-sm">
        <p className="text-sm text-white/80 font-medium">
          Orgullosamente Mexicanos, Real del Monte, Hidalgo 🖤
        </p>
      </div>
    </header>
  );
};

export default Header;
