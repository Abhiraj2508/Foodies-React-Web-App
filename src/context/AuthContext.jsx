import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Sample initial mock user for instant testing
const DEMO_USER = {
  id: 'usr_demo_01',
  name: 'Abhiraj Singh',
  email: 'abhiraj@foodies.com',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  coins: 350,
  addresses: [
    { id: 'addr_1', title: 'Home', address: 'Flat 402, Green Valley Apts, 12th Main Road, Food City', isDefault: true },
    { id: 'addr_2', title: 'Work', address: 'Tech Park, Tower B, 4th Floor, Innovation Hub, Food City', isDefault: false }
  ]
};

export function AuthProvider({ children }) {
  // User state persisted in localStorage
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('foodies_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // User orders history
  const [userOrders, setUserOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('foodies_orders_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Favorites (list of dish IDs)
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('foodies_favorites');
      return saved ? JSON.parse(saved) : ['b1', 's3', 'h2'];
    } catch {
      return ['b1', 's3', 'h2'];
    }
  });

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup' | 'forgot'
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('foodies_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('foodies_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('foodies_orders_history', JSON.stringify(userOrders));
    } catch (e) {
      console.error(e);
    }
  }, [userOrders]);

  useEffect(() => {
    try {
      localStorage.setItem('foodies_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  // Login handler
  const login = (email, password) => {
    // Basic validation
    if (!email || !password) {
      return { success: false, message: 'Please enter both email and password.' };
    }

    // Generate user profile
    const namePart = email.split('@')[0];
    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    
    const loggedInUser = {
      id: `usr_${Date.now()}`,
      name: formattedName,
      email,
      phone: '+91 98765 12345',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      coins: 150,
      addresses: [
        { id: 'addr_default', title: 'Primary Home', address: '123 Food Street, Downtown, Food City', isDefault: true }
      ]
    };

    setUser(loggedInUser);
    setIsAuthModalOpen(false);
    return { success: true, user: loggedInUser };
  };

  // Signup handler
  const signup = (name, email, phone, password) => {
    if (!name || !email || !phone || !password) {
      return { success: false, message: 'Please fill in all registration fields.' };
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      name,
      email,
      phone,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      coins: 200, // Welcome bonus coins
      addresses: [
        { id: 'addr_new', title: 'Home', address: 'Food City', isDefault: true }
      ]
    };

    setUser(newUser);
    setIsAuthModalOpen(false);
    return { success: true, user: newUser };
  };

  // Demo 1-click login
  const demoLogin = () => {
    setUser(DEMO_USER);
    setIsAuthModalOpen(false);
    return { success: true, user: DEMO_USER };
  };

  // Logout handler
  const logout = () => {
    setUser(null);
    setIsProfileModalOpen(false);
    setIsOrdersModalOpen(false);
  };

  // Toggle favorite dish
  const toggleFavorite = (dishId) => {
    setFavorites(prev => {
      const exists = prev.includes(dishId);
      if (exists) {
        return prev.filter(id => id !== dishId);
      } else {
        return [...prev, dishId];
      }
    });
  };

  // Add order to history
  const addOrderToHistory = (order) => {
    setUserOrders(prev => [order, ...prev]);
    // Reward points on placing orders
    if (user) {
      setUser(prev => ({
        ...prev,
        coins: (prev?.coins || 0) + Math.round(order.finalTotal * 5)
      }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        isProfileModalOpen,
        setIsProfileModalOpen,
        isOrdersModalOpen,
        setIsOrdersModalOpen,
        login,
        signup,
        demoLogin,
        logout,
        favorites,
        toggleFavorite,
        userOrders,
        addOrderToHistory
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

