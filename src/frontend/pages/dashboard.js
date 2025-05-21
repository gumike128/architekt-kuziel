import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Komponenty pre dashboard
import UniversalPrompt from '../components/UniversalPrompt';
import DashboardWidget from '../components/DashboardWidget';
import MainLayout from '../components/MainLayout';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Simulácia načítania používateľských dát
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // V produkčnom prostredí by tu bol API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setUser({
          name: 'Ján Novák',
          email: 'jan.novak@example.com',
          role: 'admin',
          lastLogin: new Date().toISOString()
        });
      } catch (error) {
        console.error('Chyba pri načítaní používateľských dát:', error);
        // Presmerovanie na login pri chybe
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  // Dáta pre widgety
  const widgets = [
    {
      id: 'recent-content',
      title: 'Nedávny obsah',
      items: [
        { id: 1, title: 'Marketingová stratégia 2025', type: 'document', date: '2025-05-18' },
        { id: 2, title: 'Analýza konkurencie', type: 'spreadsheet', date: '2025-05-15' },
        { id: 3, title: 'Prezentácia pre investorov', type: 'presentation', date: '2025-05-10' }
      ]
    },
    {
      id: 'ai-suggestions',
      title: 'AI odporúčania',
      items: [
        { id: 1, title: 'Optimalizácia SEO pre web', type: 'suggestion', priority: 'high' },
        { id: 2, title: 'Aktualizácia cenníka služieb', type: 'suggestion', priority: 'medium' },
        { id: 3, title: 'Revízia sociálnych sietí', type: 'suggestion', priority: 'low' }
      ]
    },
    {
      id: 'upcoming-tasks',
      title: 'Nadchádzajúce úlohy',
      items: [
        { id: 1, title: 'Stretnutie s klientom', date: '2025-05-21T10:00:00', status: 'scheduled' },
        { id: 2, title: 'Deadline projektu Alpha', date: '2025-05-25T18:00:00', status: 'in-progress' },
        { id: 3, title: 'Príprava mesačného reportu', date: '2025-05-30T12:00:00', status: 'not-started' }
      ]
    },
    {
      id: 'content-stats',
      title: 'Štatistiky obsahu',
      stats: [
        { label: 'Celkový počet dokumentov', value: 128 },
        { label: 'Vytvorené tento mesiac', value: 24 },
        { label: 'Priemerné hodnotenie', value: '4.7/5' }
      ]
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Vitajte späť, {user?.name}! Posledné prihlásenie: {new Date(user?.lastLogin).toLocaleString()}
            </p>
          </motion.div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-6">
          {/* Univerzálny Prompt */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <UniversalPrompt />
          </motion.div>
          
          {/* Dashboard widgety */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            {widgets.map((widget, index) => (
              <motion.div
                key={widget.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
              >
                <DashboardWidget widget={widget} />
              </motion.div>
            ))}
          </div>
          
          {/* Rýchle akcie */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8"
          >
            <h2 className="text-lg font-medium text-gray-900 mb-4">Rýchle akcie</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link href="/create" className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <svg className="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Vytvoriť nový obsah
              </Link>
              <Link href="/content" className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <svg className="mr-2 -ml-1 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Prehliadať obsah
              </Link>
              <Link href="/analytics" className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <svg className="mr-2 -ml-1 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Zobraziť analytiku
              </Link>
              <Link href="/settings" className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <svg className="mr-2 -ml-1 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Nastavenia
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
