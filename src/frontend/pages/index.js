import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Features for the showcase
  const features = [
    {
      title: 'Univerzálny Prompt Interface',
      description: 'Intuitívne rozhranie pre interakciu s aplikáciou, ktoré predvída vaše potreby a zjednodušuje komplexné úlohy.',
      icon: '/icons/prompt-icon.svg'
    },
    {
      title: 'Adaptívny Dashboard',
      description: 'Personalizovaný dashboard, ktorý sa prispôsobuje vašim preferenciám a poskytuje relevantné informácie v správny čas.',
      icon: '/icons/dashboard-icon.svg'
    },
    {
      title: 'MindFinder Navigator',
      description: 'Inteligentná organizácia a vizualizácia obsahu, ktorá vám pomáha nájsť presne to, čo potrebujete.',
      icon: '/icons/navigator-icon.svg'
    },
    {
      title: 'Content Creation Studio',
      description: 'Pokročilý editor s inteligentnými návrhmi pre vylepšenie vášho obsahu a zvýšenie produktivity.',
      icon: '/icons/studio-icon.svg'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 px-4 sm:px-6 lg:px-8">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <motion.div 
                className="sm:text-center lg:text-left"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <motion.h1 
                  className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
                  variants={itemVariants}
                >
                  <span className="block">Inteligentný ekosystém</span>
                  <span className="block text-primary-600">pre prácu s informáciami</span>
                </motion.h1>
                <motion.p 
                  className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                  variants={itemVariants}
                >
                  Architekt kúziel je revolučná aplikácia, ktorá nielen plní úlohy, ale predvída potreby, zjednodušuje komplexnosť a prináša pocit kontroly a ľahkosti do každodennej práce s dátami.
                </motion.p>
                <motion.div 
                  className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
                  variants={itemVariants}
                >
                  <div className="rounded-md shadow">
                    <Link href="/dashboard" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10">
                      Začať používať
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link href="/about" className="w-full flex items-center justify-center px-8 py-3 border border-primary-300 text-base font-medium rounded-md text-primary-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                      Zistiť viac
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <motion.div 
            className="h-56 w-full bg-primary-100 sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative w-3/4 h-3/4">
              <div className="absolute top-0 left-0 w-64 h-64 bg-primary-200 rounded-lg transform -rotate-6"></div>
              <div className="absolute top-10 left-10 w-64 h-64 bg-primary-300 rounded-lg transform rotate-3"></div>
              <div className="absolute top-20 left-20 w-64 h-64 bg-primary-400 rounded-lg transform -rotate-3 flex items-center justify-center text-white text-4xl font-bold">
                AK
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-base font-semibold text-primary-600 tracking-wide uppercase">Funkcie</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Všetko, čo potrebujete pre efektívnu prácu
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Architekt kúziel kombinuje intuitívne rozhranie s pokročilou umelou inteligenciou pre maximálnu produktivitu.
            </p>
          </motion.div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="pt-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flow-root bg-white rounded-lg px-6 pb-8 h-full border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                          <div className="h-8 w-8 text-white">
                            {/* Placeholder for icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.title}</h3>
                      <p className="mt-5 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Pripravený začať?</span>
              <span className="block text-primary-200">Vyskúšajte Architekt kúziel ešte dnes.</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-primary-100">
              Začnite využívať výhody inteligentného ekosystému pre prácu s informáciami a obsahom.
            </p>
          </motion.div>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <motion.div 
              className="inline-flex rounded-md shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/register" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50">
                Registrovať sa
              </Link>
            </motion.div>
            <motion.div 
              className="ml-3 inline-flex rounded-md shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href="/login" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-500">
                Prihlásiť sa
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            <p className="mt-8 text-center md:mt-0 md:text-right text-base text-gray-400">
              &copy; {new Date().getFullYear()} Architekt kúziel. Všetky práva vyhradené.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
