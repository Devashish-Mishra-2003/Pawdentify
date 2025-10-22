// src/contexts/BreedDataContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Import breed data files
import breedDataEN from '../data/pawdentify_final_corrected.json';
// Uncomment these as you add translated files:
// import breedDataHI from '../data/pawdentify_final_corrected_hi.json';
// import breedDataFR from '../data/pawdentify_final_corrected_fr.json';
// import breedDataES from '../data/pawdentify_final_corrected_es.json';
// import breedDataDE from '../data/pawdentify_final_corrected_de.json';

const BreedDataContext = createContext();

export const BreedDataProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [breedData, setBreedData] = useState(breedDataEN);

  useEffect(() => {
    const currentLanguage = i18n.language || 'en';
    
    // Map language codes to breed data files
    const breedDataMap = {
      en: breedDataEN,
      // Uncomment as you add translations:
      // hi: breedDataHI,
      // fr: breedDataFR,
      // es: breedDataES,
      // de: breedDataDE,
    };
    
    // Update breed data when language changes
    setBreedData(breedDataMap[currentLanguage] || breedDataEN);
  }, [i18n.language]);

  return (
    <BreedDataContext.Provider value={breedData}>
      {children}
    </BreedDataContext.Provider>
  );
};

// Custom hook to use breed data in any component
export const useBreedData = () => {
  const context = useContext(BreedDataContext);
  if (!context) {
    throw new Error('useBreedData must be used within BreedDataProvider');
  }
  return context;
};
