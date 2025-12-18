/**
 * Video Carousel - Dos líneas de 5 videos
 * Contenido destacado del TAMV
 */

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Eye, Heart, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoItem {
  id: string;
  thumbnail: string;
  title: string;
  creator: string;
  views: number;
  likes: number;
  duration: string;
  isLive?: boolean;
  type: 'trailer' | 'xr' | 'course' | 'social';
}

interface VideoCarouselProps {
  videos: VideoItem[];
  title: string;
  subtitle?: string;
}

const VideoCard: React.FC<{ video: VideoItem }> = ({ video }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      className="relative flex-shrink-0 w-72 group cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative rounded-xl overflow-hidden aspect-video">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-14 h-14 rounded-full bg-cyan-500/90 flex items-center justify-center shadow-lg shadow-cyan-500/50">
            <Play className="w-6 h-6 text-white ml-1" />
          </div>
        </div>

        {/* Duration */}
        <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 rounded text-xs text-white flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {video.duration}
        </div>

        {/* Live badge */}
        {video.isLive && (
          <div className="absolute top-2 left-2 px-2 py-0.5 bg-red-500 rounded text-xs text-white font-bold animate-pulse">
            EN VIVO
          </div>
        )}

        {/* Border iridiscente */}
        <div 
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{
            border: '2px solid transparent',
            background: 'linear-gradient(90deg, #00f0ff, #9b87f5, #00f0ff) border-box',
            WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude'
          }}
        />
      </div>

      {/* Info */}
      <div className="mt-3">
        <h4 className="font-medium text-sm line-clamp-2 text-foreground group-hover:text-cyan-400 transition-colors">
          {video.title}
        </h4>
        <p className="text-xs text-muted-foreground mt-1">{video.creator}</p>
        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {video.views.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-3 h-3" />
            {video.likes.toLocaleString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const VideoCarousel: React.FC<VideoCarouselProps> = ({ videos, title, subtitle }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-3">
            <div className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full" />
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        
        {/* Navigation */}
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="outline"
            className="w-8 h-8 rounded-full border-border/50"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="w-8 h-8 rounded-full border-border/50"
            onClick={() => scroll('right')}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
};

export default VideoCarousel;
