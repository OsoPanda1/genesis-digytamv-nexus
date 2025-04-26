import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Link } from "lucide-react";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/tamvonline", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/tamvonline", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com/tamvonline", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/tamvonline", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com/@tamvonline", label: "YouTube" },
  {
    icon: () => (
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        stroke="currentColor"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434Z" />
      </svg>
    ),
    href: "https://t.me/tamvonline",
    label: "Telegram"
  }
];

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

      {/* Main Header Content */}
      <div className="py-4 px-6 flex flex-col gap-4 glassmorphic border-b border-white/5">
        {/* Top Row with Logo and System Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-prismatic h-8 w-8 rounded-md flex items-center justify-center animate-pulse-glow">
              <span className="text-primary-foreground font-bold text-lg">G</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold leading-none tracking-tight">
                <span className="text-gradient">GÉNESIS</span> <span className="text-white/80">DIGYTAMV</span>
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">Sistema de Integración de Conocimiento Híbrido</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">Sistema Neural v1.0</span>
            <div className="h-2 w-2 rounded-full bg-accent animate-pulse-glow"></div>
          </div>
        </div>

        {/* Social Links & TAMV Network Link */}
        <div className="flex items-center justify-between border-t border-white/5 pt-4">
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={social.label}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-xs bg-black/20 hover:bg-black/40 border-white/10"
            asChild
          >
            <a href="https://tamvonline.network" target="_blank" rel="noopener noreferrer">
              <Link size={14} />
              TAMV Online Network
            </a>
          </Button>
        </div>
      </div>

      {/* Subtitle */}
      <div className="w-full text-center py-2 bg-black/20 backdrop-blur-sm">
        <p className="text-sm text-white/80 font-medium">
          Orgullosamente Mexicanos, Real del Monte, Hidalgo 🖤
        </p>
      </div>
    </header>
  );
};

export default Header;
