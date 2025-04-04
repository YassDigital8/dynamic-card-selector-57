
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/providers/NotificationsContext';
import { Toaster } from '@/components/ui/toaster';

import Index from '@/pages/Index';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Gallery from '@/pages/Gallery';
import Hotel from '@/pages/Hotel';
import HotelAdd from '@/pages/HotelAdd';
import HotelEdit from '@/pages/HotelEdit';
import HotelView from '@/pages/HotelView';
import Users from '@/pages/Users';
import EventsAttractions from '@/pages/EventsAttractions';

import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/hotel" element={<Hotel />} />
            <Route path="/hotel/add" element={<HotelAdd />} />
            <Route path="/hotel/edit/:id" element={<HotelEdit />} />
            <Route path="/hotel/view/:id" element={<HotelView />} />
            <Route path="/users" element={<Users />} />
            <Route path="/events" element={<EventsAttractions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </ThemeProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
