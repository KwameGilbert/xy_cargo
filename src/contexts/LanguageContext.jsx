import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

// Basic translations - in a real app, these would come from translation files
const translations = {
  en: {
    'nav.home': 'Home',
    'nav.pricing': 'Pricing',
    'nav.tracking': 'Tracking',
    'nav.locations': 'Locations',
    'nav.calculator': 'Calculator',
    'nav.contact': 'Contact',
    'hero.title': 'China to Zambia Shipping Made Simple',
    'hero.subtitle': 'Fast, reliable, and affordable shipping solutions connecting China to Zambia for businesses and individuals.',
    'button.getQuote': 'Get Quote',
    'button.trackPackage': 'Track Package',
    'pricing.title': 'XY Cargo Transparent Pricing',
    'pricing.subtitle': 'No hidden fees, no surprises. Simple, weight-based pricing for China to Zambia shipping.',
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Get in touch with our team for support, quotes, or any questions about our shipping services.',
    'language.selector': 'Language',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.pricing': 'Precios',
    'nav.tracking': 'Seguimiento',
    'nav.locations': 'Ubicaciones',
    'nav.calculator': 'Calculadora',
    'nav.contact': 'Contacto',
    'hero.title': 'Envíos Globales Simplificados',
    'hero.subtitle': 'Soluciones de envío internacional rápidas, confiables y asequibles para empresas e individuos en todo el mundo.',
    'button.getQuote': 'Obtener Cotización',
    'button.trackPackage': 'Rastrear Paquete',
    'pricing.title': 'Precios Transparentes',
    'pricing.subtitle': 'Sin tarifas ocultas, sin sorpresas. Precios simples basados en peso para destinos en todo el mundo.',
    'contact.title': 'Contáctanos',
    'contact.subtitle': 'Ponte en contacto con nuestro equipo para soporte, cotizaciones o cualquier pregunta sobre nuestros servicios de envío.',
    'language.selector': 'Idioma',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.pricing': 'Tarification',
    'nav.tracking': 'Suivi',
    'nav.locations': 'Emplacements',
    'nav.calculator': 'Calculatrice',
    'nav.contact': 'Contact',
    'hero.title': 'Expédition Mondiale Simplifiée',
    'hero.subtitle': 'Solutions d\'expédition internationale rapides, fiables et abordables pour les entreprises et les particuliers du monde entier.',
    'button.getQuote': 'Obtenir un Devis',
    'button.trackPackage': 'Suivre le Colis',
    'pricing.title': 'Tarification Transparente',
    'pricing.subtitle': 'Pas de frais cachés, pas de surprises. Tarification simple basée sur le poids pour des destinations dans le monde entier.',
    'contact.title': 'Nous Contacter',
    'contact.subtitle': 'Contactez notre équipe pour le support, les devis ou toute question concernant nos services d\'expédition.',
    'language.selector': 'Langue',
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);

  // Load saved language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && languages.find(lang => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = async (languageCode) => {
    setIsLoading(true);
    
    // Simulate loading time for language change
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setCurrentLanguage(languageCode);
    localStorage.setItem('preferredLanguage', languageCode);
    setIsLoading(false);
  };

  const translate = (key, fallback = key) => {
    return translations[currentLanguage]?.[key] || translations['en']?.[key] || fallback;
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === currentLanguage) || languages[0];
  };

  const value = {
    currentLanguage,
    changeLanguage,
    translate,
    getCurrentLanguage,
    languages,
    isLoading,
    t: translate // Short alias for translate
  };

  return (
    <LanguageContext.Provider value={value}>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-lg p-6 flex items-center space-x-3"
            >
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500"></div>
              <span className="text-gray-700">Changing language...</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </LanguageContext.Provider>
  );
};

// Language Selector Component
export const LanguageSelector = () => {
  const { currentLanguage, changeLanguage, languages, getCurrentLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-300 hover:border-gray-400 bg-white"
      >
        <span className="text-lg">{getCurrentLanguage().flag}</span>
        <span className="text-sm font-medium">{getCurrentLanguage().name}</span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[150px]"
          >
            {languages.map((language) => (
              <motion.button
                key={language.code}
                whileHover={{ backgroundColor: '#f3f4f6' }}
                onClick={() => {
                  changeLanguage(language.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg ${
                  currentLanguage === language.code ? 'bg-red-50 text-red-600' : 'text-gray-700'
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <span className="text-sm">{language.name}</span>
                {currentLanguage === language.code && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto w-2 h-2 bg-red-500 rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};
