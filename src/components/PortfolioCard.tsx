"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { PortfolioItem } from '@/lib/portfolioData';
import Modal from './Modal';

export default function PortfolioCard({ item }: { item: PortfolioItem }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer group"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="aspect-video bg-gray-800 relative">
          {/* Placeholder for image - replace with actual image */}
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
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="relative">
            <div className="aspect-video bg-gray-200 w-full">
              {/* Placeholder for image - replace with actual image */}
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              />
            </div>
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-cyan-600 font-medium">{item.category}</span>
                <h2 className="text-3xl font-bold text-gray-900 mt-1">{item.title}</h2>
              </div>
              <div className="flex space-x-4">
                {item.link && (
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition-colors"
                  >
                    Live Demo
                  </a>
                )}
                {item.github && (
                  <a 
                    href={item.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                  >
                    View Code
                  </a>
                )}
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Project Description</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}