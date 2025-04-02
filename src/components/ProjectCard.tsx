"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { PortfolioItem } from '@/lib/portfolioData';

export default function ProjectCard({ item, index }: { item: PortfolioItem, index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="aspect-video bg-gray-800 relative">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${item.image})` }}
        />
        <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${isHovered ? 'opacity-40' : 'opacity-20'}`} />
      </div>
      
      <motion.div
        className="absolute inset-0 flex items-end p-6"
        animate={{
          opacity: isHovered ? 1 : 0.8,
          y: isHovered ? 0 : 20,
        }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <span className="text-cyan-400 text-sm font-medium">{item.category}</span>
          <h3 className="text-white text-xl font-bold mt-1">{item.title}</h3>
        </div>
      </motion.div>
      
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-cyan-600 text-white px-4 py-2 rounded-full font-medium">
          View Project
        </div>
      </motion.div>
    </motion.div>
  );
}