import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const LoginPage: React.FC = () => {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "🚧 Esta función no está implementada aún",
      description: "¡No te preocupes! Puedes solicitarla en tu próximo mensaje 🚀",
      duration: 3000,
    });
  }, [toast]);

  return (
    <>
      <Helmet>
        <title>Iniciar Sesión - ProPlus</title>
        <meta name="description" content="Accede a tu cuenta de ProPlus para gestionar tus propiedades favoritas y recibir alertas personalizadas." />
      </Helmet>

      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold text-white mb-6">
              Iniciar <span className="gradient-text">Sesión</span>
            </h1>
            <p className="text-xl text-gray-400">
              Esta página estará disponible pronto con el sistema de autenticación.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default LoginPage; 