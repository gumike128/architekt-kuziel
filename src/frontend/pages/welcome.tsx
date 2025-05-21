import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Enhanced welcome page component with animations and improved UI
const EnhancedWelcomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  // Features for the carousel
  const features = [
    {
      title: 'Univerzálny Prompt Interface',
      description: 'Intuitívne rozhranie pre interakciu s aplikáciou, ktoré predvída vaše potreby a zjednodušuje komplexné úlohy.',
      icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
    },
    {
      title: 'Adaptívny Dashboard',
      description: 'Personalizovaný dashboard, ktorý sa prispôsobuje vašim preferenciám a poskytuje relevantné informácie v správny čas.',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
    },
    {
      title: 'MindFinder Navigator',
      description: 'Inteligentná organizácia a vizualizácia obsahu, ktorá vám pomáha nájsť presne to, čo potrebujete.',
      icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'
    },
    {
      title: 'Content Creation Studio',
      description: 'Pokročilý editor s inteligentnými návrhmi pre vylepšenie vášho obsahu a zvýšenie produktivity.',
      icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
    }
  ];
  
  // Testimonials
  const testimonials = [
    {
      quote: "Architekt kúziel zmenil spôsob, akým pracujem s informáciami. Je to ako mať osobného asistenta, ktorý presne vie, čo potrebujem.",
      author: "Jana Kováčová",
      role: "Marketingová manažérka"
    },
    {
      quote: "Táto aplikácia mi ušetrí hodiny času každý týždeň. Automatizácia rutinných úloh a inteligentné návrhy sú na nezaplatenie.",
      author: "Peter Novák",
      role: "Produktový dizajnér"
    },
    {
      quote: "Konečne aplikácia, ktorá skutočne rozumie kontextu mojej práce a poskytuje relevantné odporúčania.",
      author: "Martina Horváthová",
      role: "Obsahová stratégka"
    }
  ];
  
  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [features.length]);
  
  // Handle registration
  const handleGetStarted = () => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      window.location.href = '/register';
    }, 800);
  };
  
  // Handle login
  const handleLogin = () => {
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-gray-100">
      {/* Hero section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
                >
                  <span className="block">Inteligentný ekosystém</span>
                  <span className="block text-primary-600">pre prácu s informáciami</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                >
                  Architekt kúziel je revolučná aplikácia, ktorá nielen plní úlohy, ale predvída potreby, zjednodušuje komplexnosť a prináša pocit kontroly a ľahkosti do každodennej práce s dátami.
                </motion.p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <button
                      onClick={handleGetStarted}
                      disabled={isLoading}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-70"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Pripravujeme...
                        </>
                      ) : (
                        'Začať zadarmo'
                      )}
                    </button>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-3 sm:mt-0 sm:ml-3"
                  >
                    <button
                      onClick={handleLogin}
                      className="w-full flex items-center justify-center px-8 py-3 border border-primary-300 text-base font-medium rounded-md text-primary-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Prihlásiť sa
                    </button>
                  </motion.div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="h-56 w-full bg-primary-100 sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="relative w-3/4 h-3/4"
            >
              <div className="absolute top-0 left-0 w-64 h-64 bg-primary-200 rounded-lg transform -rotate-6"></div>
              <div className="absolute top-10 left-10 w-64 h-64 bg-primary-300 rounded-lg transform rotate-3"></div>
              <div className="absolute top-20 left-20 w-64 h-64 bg-primary-400 rounded-lg transform -rotate-3 flex items-center justify-center text-white text-4xl font-bold">
                AK
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Features section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-base font-semibold text-primary-600 tracking-wide uppercase"
            >
              Funkcie
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl"
            >
              Všetko, čo potrebujete pre efektívnu prácu
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto"
            >
              Architekt kúziel kombinuje intuitívne rozhranie s pokročilou umelou inteligenciou pre maximálnu produktivitu.
            </motion.p>
          </div>
          
          <div className="mt-10">
            <div className="relative">
              <div className="relative w-full overflow-hidden h-72">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center p-4"
                  >
                    <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-lg w-full">
                      <div className="p-6">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="h-12 w-12 bg-primary-100 rounded-md flex items-center justify-center">
                              <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={features[currentSlide].icon} />
                              </svg>
                            </div>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-900">{features[currentSlide].title}</h3>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-base text-gray-500">{features[currentSlide].description}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <div className="flex justify-center mt-4">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 w-2 mx-1 rounded-full focus:outline-none ${
                      currentSlide === index ? 'bg-primary-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-extrabold text-gray-900 text-center"
          >
            Čo hovoria naši používatelia
          </motion.h2>
          
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-md overflow-hidden p-6"
              >
                <svg className="h-8 w-8 text-primary-400 mb-4" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-gray-600 mb-4">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA section */}
      <div className="bg-primary-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Pripravený začať?</span>
              <span className="block text-primary-200">Zaregistrujte sa ešte dnes.</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-primary-100">
              Začnite využívať výhody inteligentného ekosystému pre prácu s informáciami a obsahom.
            </p>
          </motion.div>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex rounded-md shadow"
            >
              <button
                onClick={handleGetStarted}
                disabled={isLoading}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 disabled:opacity-70"
              >
                {isLoading ? 'Pripravujeme...' : 'Začať zadarmo'}
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="ml-3 inline-flex rounded-md shadow"
            >
              <a
                href="/about"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-500"
             
(Content truncated due to size limit. Use line ranges to read in chunks)