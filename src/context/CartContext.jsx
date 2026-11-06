import React, { createContext, useContext, useState, useEffect } from 'react';
import { PROMOS } from '../data/foodData';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('foodies_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Dark mode persisted to localStorage
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('foodies_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [toast, setToast] = useState(null);

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('foodies_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('foodies_theme', 'light');
    }
  }, [darkMode]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('foodies_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Toast handler
  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(prev => (prev && prev.message === message ? null : prev));
    }, 3200);
  };

  // Add to cart
  const addToCart = (item, quantity = 1, selectedSize = null, selectedAddons = [], specialInstructions = '') => {
    const size = selectedSize || (item.sizes && item.sizes[0]) || { name: 'Regular', price: item.price };
    const addonsTotal = selectedAddons.reduce((sum, add) => sum + add.price, 0);
    const unitPrice = size.price + addonsTotal;

    // Unique key for customization grouping
    const addonKey = selectedAddons.map(a => a.id).sort().join('-');
    const cartItemId = `${item.id}-${size.name}-${addonKey}-${specialInstructions.slice(0, 10)}`;

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(i => i.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        updated[existingIndex].totalPrice = updated[existingIndex].quantity * unitPrice;
        return updated;
      } else {
        const newItem = {
          cartItemId,
          id: item.id,
          name: item.name,
          basePrice: item.price,
          unitPrice,
          totalPrice: unitPrice * quantity,
          quantity,
          image: item.image,
          categoryLabel: item.categoryLabel,
          sizeName: size.name,
          addons: selectedAddons,
          specialInstructions
        };
        return [...prevCart, newItem];
      }
    });

    showToast(`Added ${quantity}x "${item.name}" to cart!`, 'success');
  };

  // Update quantity
  const updateQuantity = (cartItemId, delta) => {
    setCart(prevCart => {
      return prevCart
        .map(item => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              totalPrice: newQty * item.unitPrice
            };
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  // Remove single item
  const removeFromCart = cartItemId => {
    setCart(prevCart => prevCart.filter(i => i.cartItemId !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Coupon application
  const applyCoupon = codeStr => {
    if (!codeStr || !codeStr.trim()) {
      showToast('Please enter a coupon code', 'error');
      return false;
    }
    const cleanCode = codeStr.trim().toUpperCase();
    const found = PROMOS.find(p => p.code === cleanCode);

    if (!found) {
      showToast(`Coupon "${cleanCode}" is invalid`, 'error');
      return false;
    }

    if (found.minOrder && subtotal < found.minOrder) {
      showToast(`Requires minimum order of $${found.minOrder.toFixed(2)}`, 'error');
      return false;
    }

    setAppliedPromo(found);
    showToast(`Promo ${found.code} applied successfully!`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedPromo(null);
    showToast('Coupon removed', 'info');
  };

  // Calculations
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  // Free delivery threshold: $25
  const freeDeliveryThreshold = 25;
  const isFreeDelivery = subtotal >= freeDeliveryThreshold && subtotal > 0;
  let deliveryFee = subtotal === 0 ? 0 : (isFreeDelivery ? 0 : 2.99);

  // Discount calculation
  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountType === 'shipping') {
      discountAmount = deliveryFee;
      deliveryFee = 0;
    } else if (appliedPromo.discount) {
      discountAmount = (subtotal * appliedPromo.discount) / 100;
      if (appliedPromo.maxDiscount && discountAmount > appliedPromo.maxDiscount) {
        discountAmount = appliedPromo.maxDiscount;
      }
    }
  }

  const tax = subtotal > 0 ? subtotal * 0.05 : 0; // 5% tax
  const finalTotal = Math.max(0, subtotal + deliveryFee + tax - discountAmount);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemCount,
        subtotal,
        deliveryFee,
        isFreeDelivery,
        freeDeliveryThreshold,
        tax,
        appliedPromo,
        applyCoupon,
        removeCoupon,
        discountAmount,
        finalTotal,
        isCartOpen,
        setIsCartOpen,
        quickViewItem,
        setQuickViewItem,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isReservationOpen,
        setIsReservationOpen,
        isOrderTrackerOpen,
        setIsOrderTrackerOpen,
        activeOrder,
        setActiveOrder,
        darkMode,
        setDarkMode,
        toast,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

