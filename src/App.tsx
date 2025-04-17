
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';

// Pages
import Login from './pages/Login';
import Index from './pages/Index';
import PageApprovals from './pages/PageApprovals';
import NotFound from './pages/NotFound';
import Hotel from './pages/Hotel';
import HotelAdd from './pages/HotelAdd';
import HotelEdit from './pages/HotelEdit';
import HotelView from './pages/HotelView';
import Users from './pages/Users';
import POS from './pages/POS';
import Branches from './pages/Branches';
import EventsAttractions from './pages/EventsAttractions';
import HR from './pages/HR';
import Gallery from './pages/Gallery';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pages" element={<Index />} />
          <Route path="/page-approvals" element={<PageApprovals />} />
          <Route path="/hotels" element={<Hotel />} />
          <Route path="/hotel-add" element={<HotelAdd />} />
          <Route path="/hotel-edit/:id" element={<HotelEdit />} />
          <Route path="/hotel-view/:id" element={<HotelView />} />
          <Route path="/users" element={<Users />} />
          <Route path="/pos" element={<POS />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/events" element={<EventsAttractions />} />
          <Route path="/hr" element={<HR />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
