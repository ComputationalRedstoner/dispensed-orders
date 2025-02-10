'use client';
import { useState } from 'react';
import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import DetailsPanel from '../components/DetailsPanel';
import Header from '../components/Header';
import { Kantumruy_Pro } from "next/font/google";

const kanPro = Kantumruy_Pro({
  weight: '600',
  style: 'normal',
  subsets: ['latin'],
});

export default function Home() {
  const [date, setDate] = useState(new Date());
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    if (isSidebarOpen) return; // Prevent unnecessary state updates
    setSidebarOpen(true);
  };

  return (
    <>
      <Head>
        <title>Dispensed Orders Management</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div onClick={closeSidebar}>
        <Header />
      </div>
      <main className="main flex relative">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} date={date} setDate={setDate}/>

        {/* Content Area */}
        <div
          className="flex-1 grid flex mt-3.5" // Takes up remaining space
          onClick={closeSidebar} // Close sidebar on click
        >
          <DetailsPanel selectedDate={`${typeof(date) !== 'undefined' ? date.toLocaleDateString("en-CA") : ''}`}/>
        </div>
      </main>
    </>
  );
}
