import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster.tsx';
import Layout from '@/components/Layout.tsx';
import HomePage from '@/pages/HomePage.tsx';
import ComprarPage from '@/pages/ComprarPage.tsx';
import ArrendarPage from '@/pages/ArrendarPage.tsx';
import AgentesPage from '@/pages/AgentesPage.tsx';
import LoginPage from '@/pages/LoginPage.tsx';
import PublicarPage from '@/pages/PublicarPage.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/comprar" element={<ComprarPage />} />
            <Route path="/arrendar" element={<ArrendarPage />} />
            <Route path="/agentes" element={<AgentesPage />} />
            <Route path="/publicar" element={<PublicarPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Layout>
        <Toaster />
      </div>
    </Router>
  );
};

export default App; 