/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-hooks/rules-of-hooks */
import {createContext, useState} from 'react';

export const AppContext = createContext();

export const AppProvider = ({children}) => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [isFirstTime, setIsFirstTime] = useState(false);

  const value = {
    selectedCategory,
    setSelectedCategory,
    setIsFirstTime,
    isFirstTime,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
