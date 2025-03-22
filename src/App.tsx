
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/Login';
import Hotel from './pages/Hotel';
import Gallery from './pages/Gallery';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import { Toaster } from '@/components/ui/toaster';
import './App.css';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Create a theme context component
function ThemeProvider({ children }: { children: React.ReactNode }) {
  // We'll use the existing useTheme hook functionality but wrap it in a provider
  return <>{children}</>;
}

function App() {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-background font-sans antialiased">
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/hotel/*" element={<Hotel />} />
              <Route path="/gallery/*" element={<Gallery />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </div>
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
