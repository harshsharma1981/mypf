"use client";
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-950">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            About Me
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative h-64 md:h-96"
            >
              <div className="absolute inset-0 rounded-2xl overflow-hidden border-2 border-cyan-500/50">
                {/* Replace with your image */}
                <div className="w-full h-full bg-gray-800" style={{backgroundImage:`url("https://media.licdn.com/dms/image/v2/D4D03AQElS2Qg7w3fZw/profile-displayphoto-shrink_200_200/B4DZXMpcwiG4AY-/0/1742895174690?e=1749081600&v=beta&t=gorhkuKH0VLc7foXMIy03KSh4n0cs08qP-5dDSFpnac")`,backgroundRepeat:"no-repeat", backgroundSize:"cover"} }>
               </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white">Who I Am</h3>
              <p className="text-gray-300">
                I'm a passionate frontend developer with 5+ years of experience creating beautiful,
                interactive digital experiences. I specialize in modern JavaScript frameworks like
                React and Next.js, and I love bringing designs to life with smooth animations and
                intuitive interfaces.
              </p>
              <p className="text-gray-300">
                My approach combines technical expertise with an eye for design, ensuring that
                every project I work on is not only functional but also visually appealing and
                user-friendly.
              </p>
              <div className="pt-4">
                <a 
                  href="#contact" 
                  className="inline-block px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
                >
                  Contact Me
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}