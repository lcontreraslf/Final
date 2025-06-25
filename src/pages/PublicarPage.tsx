import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Building2, ArrowLeft } from "lucide-react";

const PublicarPage: React.FC = () => {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "🚧 El formulario de publicación estará listo pronto",
      description:
        "Mientras tanto, ¡puedes solicitar esta función en tu próximo mensaje! 🚀",
      duration: 5000,
    });
  }, [toast]);

  return (
    <>
      <Helmet>
        <title>Publicar Propiedad - ProPlus</title>
        <meta
          name="description"
          content="Publica tu propiedad en ProPlus. Vende o arrienda tu inmueble con los mejores profesionales del mercado."
        />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center placeholder-gradient pt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 sm:p-12 shadow-2xl shadow-blue-500/10"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Building2 className="mx-auto h-24 w-24 text-blue-400 mb-6" />
            </motion.div>

            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Publica tu <span className="gradient-text">Propiedad</span>
            </h1>

            <p className="text-lg text-gray-400 mb-8 max-w-md mx-auto">
              Nuestra plataforma para publicar propiedades estará disponible muy
              pronto. ¡Prepárate para llegar a miles de compradores potenciales!
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-105"
              >
                <Link to="/">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Volver al Inicio
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PublicarPage; 