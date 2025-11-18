import React, { useState, useEffect } from 'react';
import { Card, User, Role } from './types';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import { INITIAL_CARDS } from './constants';

const Toast: React.FC<{ message: string; onClose: () => void; }> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgClass = message.includes('silindi') 
    ? 'from-red-500 to-red-600' 
    : 'from-green-500 to-green-600';

  return (
    <div className={`fixed bottom-5 right-5 text-white py-3 px-6 rounded-lg shadow-xl animate-slide-in-up z-[100] bg-gradient-to-r ${bgClass}`}>
      <p className="font-semibold">{message}</p>
    </div>
  );
};


const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<Omit<User, 'password' | 'email'> | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('kpss-theme') as 'light' | 'dark') || 'light';
  });

  // User database simulation
  const [users, setUsers] = useState<User[]>(() => {
    const storedUsers = localStorage.getItem('kpss-users');
    if (storedUsers) {
      return JSON.parse(storedUsers);
    }
    // Initialize with default users if none are stored
    const defaultUsers: User[] = [
        { id: 'admin', email: 'admin@test.com', password: 'admin123', role: Role.ADMIN },
        { id: 'user', email: 'user@test.com', password: 'user123', role: Role.USER },
    ];
    localStorage.setItem('kpss-users', JSON.stringify(defaultUsers));
    return defaultUsers;
  });

  const [cards, setCards] = useState<Card[]>(() => {
    const storedCards = localStorage.getItem('kpss-cards');
    return storedCards ? JSON.parse(storedCards) : INITIAL_CARDS;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const storedFavorites = localStorage.getItem('kpss-favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  
  // Persist users to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('kpss-users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    const storedUser = localStorage.getItem('kpss-user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('kpss-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('kpss-cards', JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    localStorage.setItem('kpss-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleLogin = (credentials: { userId?: string; password?: string; provider?: string }) => {
    setAuthError(null);
    if(credentials.provider) {
        // Dummy social login
        const socialUser = { id: `${credentials.provider}User`, role: Role.USER };
        setCurrentUser(socialUser);
        localStorage.setItem('kpss-user', JSON.stringify(socialUser));
        return;
    }

    const user = users.find(u => u.id === credentials.userId && u.password === credentials.password);
    if(user){
        const { password, email, ...sessionUser } = user;
        setCurrentUser(sessionUser);
        localStorage.setItem('kpss-user', JSON.stringify(sessionUser));
    } else {
        setAuthError('Geçersiz kullanıcı adı veya şifre.');
    }
  };
  
  const handleSignUp = (credentials: { userId: string; email: string; password?: string; }) => {
    setAuthError(null);
    if(users.some(u => u.id === credentials.userId)) {
      setAuthError('Bu kullanıcı adı zaten alınmış.');
      return;
    }
     if(users.some(u => u.email === credentials.email)) {
      setAuthError('Bu e-posta adresi zaten kullanılıyor.');
      return;
    }

    const newUser: User = {
        id: credentials.userId,
        email: credentials.email,
        password: credentials.password,
        role: Role.USER
    };
    setUsers(prev => [...prev, newUser]);

    const { password, email, ...sessionUser } = newUser;
    setCurrentUser(sessionUser);
    localStorage.setItem('kpss-user', JSON.stringify(sessionUser));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('kpss-user');
  };
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleSaveCard = (cardData: Omit<Card, 'id'> | Card) => {
    if ('id' in cardData) {
      setCards(prev => prev.map(c => (c.id === cardData.id ? cardData : c)));
      setToastMessage('Kart başarıyla güncellendi!');
    } else {
      const newCard: Card = {
        ...cardData,
        id: Date.now().toString(),
      };
      setCards(prev => [newCard, ...prev]);
      setToastMessage('Kart başarıyla eklendi!');
    }
  };

  const handleDeleteCard = (cardId: string) => {
    setCards(prev => prev.filter(card => card.id !== cardId));
    setToastMessage('Kart başarıyla silindi!');
  };

  const handleToggleFavorite = (cardId: string) => {
    setFavorites(prev =>
      prev.includes(cardId)
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
  };

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} onSignUp={handleSignUp} error={authError} />;
  }

  return (
    <>
      <HomeScreen 
            currentUser={currentUser} 
            onLogout={handleLogout} 
            theme={theme} 
            toggleTheme={toggleTheme}
            cards={cards}
            favorites={favorites}
            onSaveCard={handleSaveCard}
            onDeleteCard={handleDeleteCard}
            onToggleFavorite={handleToggleFavorite} 
        />
        {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage('')} />}
    </>
  );
};

export default App;
