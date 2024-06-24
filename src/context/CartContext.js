/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import {createContext, useEffect, useState} from 'react';

export const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const addToCart = item => {
    const itemExist = products.findIndex(product => product.id === item.id);

    if (itemExist === -1) {
      setProducts([...products, item]);
    }
  };

  const increasteQuantityProduct = item => {
    const newProducts = products.map(p => {
      if (item.id === p.id) {
        return {...item, quantity: item.quantity + 1};
      } else {
        return item;
      }
    });

    setProducts(newProducts);
  };

  const decreaseQuantityProduct = item => {
    const newProducts = products.map(p => {
      if (item.id === p.id) {
        return {...item, quantity: item.quantity - 1};
      } else {
        return item;
      }
    });

    setProducts(newProducts);
  };

  const removeProduct = item => {
    setProducts(products.filter(p => item.id !== p.id));
  };

  const totalSum = () => {
    const total = products.reduce(
      (amount, item) =>
        Number(amount) + Number(item.price) * Number(item.quantity),
      0,
    );

    setTotalPrice(total);
  };

  const clearCart = () => {
    setProducts([]);
  };

  useEffect(() => {
    totalSum();
  }, [products]);

  const value = {
    products,
    addToCart,
    totalPrice,
    increasteQuantityProduct,
    decreaseQuantityProduct,
    removeProduct,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
