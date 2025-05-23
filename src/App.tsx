
import React, { memo, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Gallery from "./pages/Gallery";
import Hotel from "./pages/Hotel";
import HotelAdd from "./pages/HotelAdd";
import HotelEdit from "./pages/HotelEdit";
import HotelView from "./pages/HotelView";
import Users from "./pages/Users";
import EventsAttractions from "./pages/EventsAttractions";
import HR from "./pages/HR";
import POS from "./pages/POS";
import Branches from "./pages/Branches";
import CMS from "./pages/CMS";
import useAuthentication from "./hooks/useAuthentication";

// Initialize theme from localStorage or default to light
const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (savedTheme === 'light' || !savedTheme) {
    document.documentElement.classList.remove('dark');
    if (!savedTheme) {
      localStorage.setItem('theme', 'light');
    }
  } else if (savedTheme === 'system') {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (systemPrefersDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
  
  document.title = "Cham Wings Admin Portal";
};

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Protected route component
const ProtectedRoute = memo(({ children }: { children: React.ReactNode }) => {
  const { authToken, authLoading } = useAuthentication();
  
  if (authLoading) {
    return <div className="flex h-screen w-screen items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>;
  }
  
  if (!authToken) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
});

ProtectedRoute.displayName = 'ProtectedRoute';

// Initialize theme immediately upon script load
initializeTheme();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              
              {/* Protected routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } />
              <Route path="/pages" element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } />
              <Route path="/users" element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } />
              <Route path="/gallery" element={
                <ProtectedRoute>
                  <Gallery />
                </ProtectedRoute>
              } />
              
              {/* Hotel routes */}
              <Route path="/hotel" element={
                <ProtectedRoute>
                  <Hotel />
                </ProtectedRoute>
              } />
              <Route path="/hotel/add" element={
                <ProtectedRoute>
                  <HotelAdd />
                </ProtectedRoute>
              } />
              <Route path="/hotel/edit/:hotelId" element={
                <ProtectedRoute>
                  <HotelEdit />
                </ProtectedRoute>
              } />
              <Route path="/hotel/view/:hotelId" element={
                <ProtectedRoute>
                  <HotelView />
                </ProtectedRoute>
              } />
              
              {/* Events & Attractions route */}
              <Route path="/events" element={
                <ProtectedRoute>
                  <EventsAttractions />
                </ProtectedRoute>
              } />
              
              {/* HR route */}
              <Route path="/hr" element={
                <ProtectedRoute>
                  <HR />
                </ProtectedRoute>
              } />
              
              {/* POS route */}
              <Route path="/pos" element={
                <ProtectedRoute>
                  <POS />
                </ProtectedRoute>
              } />
              
              {/* Branches route */}
              <Route path="/branches" element={
                <ProtectedRoute>
                  <Branches />
                </ProtectedRoute>
              } />
              
              {/* CMS route */}
              <Route path="/cms" element={
                <ProtectedRoute>
                  <CMS />
                </ProtectedRoute>
              } />
              <Route path="/cms/editor/:pageId" element={
                <ProtectedRoute>
                  <CMS />
                </ProtectedRoute>
              } />
              
              {/* Catch-all route - also protected */}
              <Route path="*" element={
                <ProtectedRoute>
                  <NotFound />
                </ProtectedRoute>
              } />
            </Routes>
          </BrowserRouter>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
