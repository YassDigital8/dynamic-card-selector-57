
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
import useAuthentication from "./hooks/useAuthentication";
import StandardLayout from "./components/layout/StandardLayout";

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

// Create QueryClient outside of component to prevent recreation on renders
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Protected route component with StandardLayout
const ProtectedRoute = memo(({ children, title, description }: { 
  children: React.ReactNode, 
  title?: string, 
  description?: string 
}) => {
  const { authToken, authLoading } = useAuthentication();
  
  if (authLoading) {
    return <div className="flex h-screen w-screen items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>;
  }
  
  if (!authToken) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <StandardLayout title={title} description={description}>
      {children}
    </StandardLayout>
  );
});

ProtectedRoute.displayName = 'ProtectedRoute';

// Initialize theme immediately upon script load
initializeTheme();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute title="Dashboard" description="Welcome to Cham Wings Admin Portal">
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/pages" element={
              <ProtectedRoute title="Pages" description="Manage all website pages">
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/users" element={
              <ProtectedRoute title="Users" description="Manage system users">
                <Users />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute title="Settings" description="Configure system settings">
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/gallery" element={
              <ProtectedRoute title="Media Gallery" description="Manage and organize your media files">
                <Gallery />
              </ProtectedRoute>
            } />
            
            {/* Hotel routes */}
            <Route path="/hotel" element={
              <ProtectedRoute title="Hotel Network" description="Manage hotel network across regions">
                <Hotel />
              </ProtectedRoute>
            } />
            <Route path="/hotel/add" element={
              <ProtectedRoute title="Add Hotel" description="Add a new hotel to the network">
                <HotelAdd />
              </ProtectedRoute>
            } />
            <Route path="/hotel/edit/:hotelId" element={
              <ProtectedRoute title="Edit Hotel" description="Modify hotel details">
                <HotelEdit />
              </ProtectedRoute>
            } />
            <Route path="/hotel/view/:hotelId" element={
              <ProtectedRoute title="Hotel Details" description="View detailed hotel information">
                <HotelView />
              </ProtectedRoute>
            } />
            
            {/* Events & Attractions route */}
            <Route path="/events" element={
              <ProtectedRoute title="Events & Attractions" description="Manage events and attractions">
                <EventsAttractions />
              </ProtectedRoute>
            } />
            
            {/* Catch-all route - also protected */}
            <Route path="*" element={
              <ProtectedRoute title="Page Not Found" description="The requested page does not exist">
                <NotFound />
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
