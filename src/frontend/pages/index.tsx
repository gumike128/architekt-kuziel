import React from 'react';
import Head from 'next/head';
import IntegratedDashboard from '../components/Integration/IntegratedDashboard';

export default function Home() {
  return (
    <>
      <Head>
        <title>Architekt kúziel</title>
        <meta name="description" content="Inteligentný, automatizovaný ekosystém pre prácu s informáciami a obsahom" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <IntegratedDashboard />
    </>
  );
}
