
import React, { useState, useMemo } from 'react';
import { Card, Category, Role, User } from '../types';
import { CATEGORIES } from '../constants';
import AdminModal from './AdminModal';
import CardCarousel from './CardCarousel';
import ThemeToggle from './ThemeToggle';
import { LogoIcon, PlusIcon, HeartIcon, BookIcon, GlobeIcon, ScaleIcon, LightbulbIcon, BallIcon, FilmIcon, BeakerIcon, ChipIcon, FeatherIcon, PaletteIcon } from './Icons';

interface HomeScreenProps {
  // Fix: Changed currentUser prop type to match the session user state shape from App.tsx.
  currentUser: Omit<User, 'password' | 'email'> | null;
  onLogout: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  cards: Card[];
  favorites: string[];
  onSaveCard: (cardData: Omit<Card, 'id'> | Card) => void;
  onDeleteCard: (cardId: string) => void;
  onToggleFavorite: (cardId: string) => void;
}

const categoryIcons: { [key: string]: React.FC<{className: string}> } = {
  'Favoriler': HeartIcon,
  'Tarih': BookIcon,
  'Coğrafya': GlobeIcon,
  'Vatandaşlık': ScaleIcon,
  'Güncel Bilgiler': LightbulbIcon,
  'Spor': BallIcon,
  'Sinema': FilmIcon,
  'Bilim': BeakerIcon,
  'Teknoloji': ChipIcon,
  'Edebiyat': FeatherIcon,
  'Sanat': PaletteIcon
};

const categoryColors = {
  'Favoriler': 'from-amber-400 to-yellow-500',
  'Tarih': 'from-blue-500 to-blue-600',
  'Coğrafya': 'from-green-500 to-green-600',
  'Vatandaşlık': 'from-indigo-500 to-indigo-600',
  'Güncel Bilgiler': 'from-yellow-500 to-yellow-600',
  'Spor': 'from-orange-500 to-orange-600',
  'Sinema': 'from-red-500 to-red-600',
  'Bilim': 'from-purple-500 to-purple-600',
  'Teknoloji': 'from-cyan-500 to-cyan-600',
  'Edebiyat': 'from-pink-500 to-pink-600',
  'Sanat': 'from-teal-500 to-teal-600',
};


const HomeScreen: React.FC<HomeScreenProps> = ({ 
    currentUser, 
    onLogout, 
    theme, 
    toggleTheme,
    cards,
    favorites,
    onSaveCard,
    onDeleteCard,
    onToggleFavorite
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardToEdit, setCardToEdit] = useState<Card | null>(null);
  const [viewingCategory, setViewingCategory] = useState<Category | null>(null);

  const handleEdit = (card: Card) => {
    setCardToEdit(card);
    setViewingCategory(null); // Close carousel to open edit modal
    setIsModalOpen(true);
  };
  
  const handleDeleteWithConfirm = (cardId: string) => {
    if (window.confirm('Bu kartı silmek istediğinizden emin misiniz?')) {
      onDeleteCard(cardId);
    }
  };

  const categoryCardCounts = useMemo(() => {
    const counts: { [key: string]: number } = {};
    CATEGORIES.forEach(cat => {
      if (cat === 'Favoriler') {
        counts[cat] = favorites.length;
      } else {
        counts[cat] = cards.filter(card => card.category === cat).length;
      }
    });
    return counts;
  }, [cards, favorites]);
  
  const cardsForCarousel = useMemo(() => {
    if (!viewingCategory) return [];
    if (viewingCategory === 'Favoriler') {
      return cards.filter(card => favorites.includes(card.id));
    }
    return cards.filter(card => card.category === viewingCategory);
  }, [cards, viewingCategory, favorites]);

  return (
    <div className="min-h-screen bg-neutral dark:bg-dark-bg transition-colors flex flex-col">
      <header className="bg-base-100 dark:bg-dark-card shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <LogoIcon className="h-8 w-8 text-primary dark:text-accent" />
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">KPSS Bilgi Kartları</h1>
          </div>
          <div className="flex items-center space-x-4">
             <span className="text-sm text-gray-600 dark:text-dark-text-secondary">Hoşgeldin, {currentUser?.id}</span>
             <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
             <button onClick={onLogout} className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">Çıkış Yap</button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8 flex-grow flex flex-col items-center">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white">Bir Kategori Seçin</h2>
          <p className="text-gray-600 dark:text-dark-text-secondary mt-2">Öğrenmeye başlamak için bir konuya tıklayın.</p>
        </div>

        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate-slide-in-up">
            {CATEGORIES.map((cat) => {
              const Icon = categoryIcons[cat];
              const cardCount = categoryCardCounts[cat];
              const color = categoryColors[cat] || 'from-gray-500 to-gray-600';

              return (
                <button
                    key={cat}
                    onClick={() => setViewingCategory(cat)}
                    disabled={cardCount === 0}
                    className={`
                        p-6 rounded-2xl flex flex-col justify-between items-center text-white font-bold 
                        shadow-lg transform hover:-translate-y-2 transition-all duration-300
                        bg-gradient-to-br ${color}
                        disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none
                    `}
                >
                    <div className="flex-grow flex flex-col items-center justify-center">
                      {Icon && <Icon className="w-12 h-12 mb-3 opacity-90"/>}
                      <span className="text-lg text-center">{cat}</span>
                    </div>
                    <span className="text-sm font-normal mt-2 bg-black/20 px-3 py-1 rounded-full">{cardCount} kart</span>
                </button>
              )
            })}
        </div>
      </main>
      
      {viewingCategory && (
        <CardCarousel 
            cards={cardsForCarousel}
            currentUser={currentUser}
            onClose={() => setViewingCategory(null)}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
            onEdit={handleEdit}
            onDelete={handleDeleteWithConfirm}
            theme={theme}
        />
      )}

      {currentUser?.role === Role.ADMIN && (
        <>
        <button 
          onClick={() => { setCardToEdit(null); setIsModalOpen(true); }} 
          className="fixed bottom-8 right-8 bg-accent text-white p-4 rounded-full shadow-lg hover:bg-secondary transition-transform transform hover:scale-110"
          aria-label="Yeni Kart Ekle"
        >
          <PlusIcon className="w-8 h-8"/>
        </button>
        <AdminModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          onSave={onSaveCard}
          cardToEdit={cardToEdit}
        />
        </>
      )}
    </div>
  );
};

export default HomeScreen;