"use client";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { portfolioItems } from '@/lib/portfolioData';
// import { TypeAnimation } from 'react-type-animation';

export default function Hero() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  console.log(activeProject)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
 
  // Smoother animated values using spring physics
  const cardScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const detailsOpacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);
  const detailsY = useTransform(scrollYProgress, [0.5, 0.6], [50, 0]);
  
  // Handle scroll to activate project with debounce
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.5 && activeProject === null) {
       setActiveProject(0);
    } else if (latest <= 0.5 && activeProject !== null) {
      // setActiveProject(null);
    }
    setScrolledPastHero(latest > 0.1);
  });

  // Improved auto-scroll with smooth behavior
  // useEffect(() => {
  //   if (activeProject !== null && detailsRef.current) {
  //     const timer = setTimeout(() => {
  //       detailsRef.current?.scrollIntoView({
  //         behavior: 'smooth',
  //         block: 'start'
  //       });
  //     }, 300);
  //     return () => clearTimeout(timer);
  //   }
  // }, [activeProject]);

  const goToNextProject = () => {
    if (activeProject === null) return;
    setActiveProject((prev) => (prev! + 1) % portfolioItems.length);
  };

  const goToPrevProject = () => {
    if (activeProject === null) return;
    setActiveProject((prev) => (prev! - 1 + portfolioItems.length) % portfolioItems.length);
  };

  // Navigation between cards in hero view
  const [carouselIndex, setCarouselIndex] = useState(0);
  useEffect(() => {
    // Set active project to the center card index
    setActiveProject(carouselIndex);
  }, [carouselIndex]);
  const goToNextCard = () => {
    setCarouselIndex((prev) => (prev + 1) % portfolioItems.length);
  };

  const goToPrevCard = () => {
    setCarouselIndex((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length);
  };

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      {/* Initial Hero View with All Projects */}
      <section className={`sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-br from-black via-gray-900 to-gray-800 transition-all duration-500 ${scrolledPastHero ? 'opacity-0' : 'opacity-100'}`}>
        <div className="absolute inset-0 z-0 opacity-20">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          ))}
        </div>

        <motion.div 
          className="h-full flex flex-col justify-center items-center"
          style={{
            scale: cardScale,
            opacity: cardOpacity
          }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 text-center">
            My <span className="text-cyan-400">Portfolio</span>
          </h1>
          
          <div className="relative w-full h-[500px] max-w-6xl mx-auto mt-8 overflow-visible">
            {/* Carousel Navigation Buttons */}
            <button 
              onClick={goToPrevCard}
              className="absolute left-4 md:left-8 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors -translate-y-1/2 top-1/2"
              aria-label="Previous project"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={goToNextCard}
              className="absolute right-4 md:right-8 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors -translate-y-1/2 top-1/2"
              aria-label="Next project"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Improved Card Carousel with Better Spacing */}
            <div className="relative h-full w-full">
              {portfolioItems.map((project, index) => {
                // Calculate position based on carousel index
                const position = ((index - carouselIndex + portfolioItems.length) % portfolioItems.length);
                const isCenter = position === 0;
                const isRight = position === 1 || (carouselIndex === portfolioItems.length - 1 && index === 0);
                const isLeft = position === portfolioItems.length - 1 || (carouselIndex === 0 && index === portfolioItems.length - 1);
                const isFarRight = position === 2 || (carouselIndex >= portfolioItems.length - 2 && 
                  (index === 0 || index === 1 && carouselIndex === portfolioItems.length - 1));
                const isFarLeft = position === portfolioItems.length - 2 || 
                  (carouselIndex <= 1 && (index === portfolioItems.length - 1 || 
                  (index === portfolioItems.length - 2 && carouselIndex === 0)));

                let transform = '';
                let zIndex = 0;
                let opacity = 0;
                let scale = 0.7;

                if (isCenter) {
                  transform = 'translateX(0)';
                  zIndex = 30;
                  opacity = 1;
                  scale = 1;
                } else if (isRight) {
                  transform = 'translateX(30%) perspective(1000px) rotateY(-15deg)';
                  zIndex = 20;
                  opacity = 0.8;
                  scale = 0.85;
                } else if (isLeft) {
                  transform = 'translateX(-30%) perspective(1000px) rotateY(15deg)';
                  zIndex = 20;
                  opacity = 0.8;
                  scale = 0.85;
                } else if (isFarRight) {
                  transform = 'translateX(60%) perspective(1000px) rotateY(-25deg)';
                  zIndex = 10;
                  opacity = 0.5;
                  scale = 0.7;
                } else if (isFarLeft) {
                  transform = 'translateX(-60%) perspective(1000px) rotateY(25deg)';
                  zIndex = 10;
                  opacity = 0.5;
                  scale = 0.7;
                } else {
                  transform = 'translateX(0) scale(0.5)';
                  opacity = 0;
                }

             
                return (
                  <motion.div
                    key={project.id}
                    className={`absolute top-1/2 left-1/2 w-64 h-96 -ml-32 -mt-48 transition-all duration-500 ${isCenter ? 'cursor-pointer' : ''}`}
                    style={{
                      transform,
                      zIndex,
                      opacity,
                      scale
                    }}
                    onClick={() => {
                      if (isCenter) {
                        setActiveProject(index);
                        setTimeout(() => {
                          detailsRef.current?.scrollIntoView({ behavior: 'smooth' });
                        }, 300);
                      } else {
                        // If not center, navigate to make this card center
                        setCarouselIndex(index);
                      }
                    }}
                    animate={{
                      transition: {
                        type: 'spring',
                        stiffness: 100,
                        damping: 20
                      }
                    }}
                  >
                    <div className={`relative w-full h-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${
                      isCenter ? 'ring-4 ring-cyan-500/50' : ''
                    } ${
                      activeProject === index ? 'border-2 border-cyan-400' : ''
                    }`}>
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${project.image})` }}
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent ${
                        isCenter ? 'opacity-100' : 'opacity-70'
                      }`} />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-white text-xl font-bold truncate">{project.title}</h3>
                        <p className="text-cyan-400 text-sm mt-1 truncate">{project.category}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="text-white mb-2">Scroll to explore</p>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Project Details View */}
      <AnimatePresence mode="wait">
        {activeProject !== null && (
          <motion.section 
            ref={detailsRef}
            className="sticky top-0 h-screen w-full bg-gray-950 pt-20"
            initial={{ opacity: 0 }}
            style={{
              opacity: detailsOpacity,
              y: detailsY
            }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 20
            }}
          >
            <div className="container mx-auto px-6 h-full flex flex-col">
              {/* Breadcrumbs Navigation */}
              <motion.div 
                className="flex items-center mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <button 
                  onClick={() => {
                    setActiveProject(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-gray-400 hover:text-white mr-4 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Back to Portfolio
                </button>
              </motion.div>

              {/* Project Content with Improved Layout */}
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-12">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ 
                    delay: 0.3,
                    type: 'spring',
                    stiffness: 100,
                    damping: 15
                  }}
                  className="relative h-96 lg:h-full"
                >
                  <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
                    <div 
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${portfolioItems[activeProject].image})` }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ 
                    delay: 0.5,
                    type: 'spring',
                    stiffness: 100,
                    damping: 15
                  }}
                >
                  <h2 className="text-4xl font-bold text-white mb-4">
                    {portfolioItems[activeProject].title}
                  </h2>
                  <span className="inline-block px-3 py-1 bg-cyan-600/20 text-cyan-400 rounded-full text-sm mb-6">
                    {portfolioItems[activeProject].category}
                  </span>
                  <p className="text-lg text-gray-300 mb-8">
                    {portfolioItems[activeProject].description}
                  </p>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {portfolioItems[activeProject].technologies.map((tech, i) => (
                        <motion.span 
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ 
                            delay: 0.6 + i * 0.05,
                            type: 'spring',
                            stiffness: 500,
                            damping: 15
                          }}
                          className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {portfolioItems[activeProject].link && (
                      <motion.a
                        href={portfolioItems[activeProject].link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Live Demo
                      </motion.a>
                    )}
                    {portfolioItems[activeProject].github && (
                      <motion.a
                        href={portfolioItems[activeProject].github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        View Code
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Project Navigation */}
              <div className="flex justify-between py-8 border-t border-gray-800 mt-auto">
                <button
                  onClick={goToPrevProject}
                  className="flex items-center text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-gray-800/50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Previous Project
                </button>
                
                <button
                  onClick={goToNextProject}
                  className="flex items-center text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-gray-800/50"
                >
                  Next Project
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}