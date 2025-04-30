
import React from "react";
import { Facebook, Instagram, Twitter, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

type SocialIconsProps = {
  className?: string;
  iconSize?: number;
  variant?: "default" | "buttons" | "links";
};

const SocialIcons = ({ className = "", iconSize = 4, variant = "links" }: SocialIconsProps) => {
  const socialLinks = [
    { name: "Facebook", icon: Facebook, url: "https://facebook.com", hoverColor: "hover:text-blue-400" },
    { name: "Instagram", icon: Instagram, url: "https://instagram.com", hoverColor: "hover:text-pink-400" },
    { name: "Twitter", icon: Twitter, url: "https://twitter.com", hoverColor: "hover:text-blue-300" },
    { name: "GitHub", icon: Github, url: "https://github.com", hoverColor: "hover:text-gray-300" },
  ];

  if (variant === "buttons") {
    return (
      <div className={`grid grid-cols-4 gap-2 ${className}`}>
        {socialLinks.map((social) => (
          <Button 
            key={social.name}
            variant="outline" 
            size="icon" 
            className="border-blue-500/30 hover:bg-blue-500/10"
            asChild
          >
            <a href={social.url} target="_blank" rel="noopener noreferrer">
              <social.icon className={`h-${iconSize} w-${iconSize}`} />
            </a>
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {socialLinks.map((social) => (
        <a 
          key={social.name}
          href={social.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`transition-colors ${social.hoverColor}`}
        >
          <social.icon className={`h-${iconSize} w-${iconSize}`} />
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
