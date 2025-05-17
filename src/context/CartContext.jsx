import React, { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../Helper/endPoint";

// Context untuk manajemen state keranjang belanja
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  // Fungsi update jumlah item keranjang
  const updateCartCount = async () => {
    try {
      const response = await fetch(`${BASE_URL.API}/carts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      });
      const data = await response.json();
      setCartCount(data.data?.length || 0);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  // Initial fetch
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      updateCartCount();
    } else {
      setCartCount(0);
    }
  }, [localStorage.getItem("token")]);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
