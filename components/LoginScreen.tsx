import React, { useState } from 'react';
import { LogoIcon, GoogleIcon, FacebookIcon } from './Icons';

interface LoginScreenProps {
  onLogin: (credentials: { userId?: string; password?: string; provider?: string }) => void;
  onSignUp: (credentials: { userId: string; email: string; password?: string }) => void;
  error: string | null;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onSignUp, error }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      onSignUp({ userId, email, password });
    } else {
      onLogin({ userId, password });
    }
  };
  
  const toggleForm = () => {
      setIsSignUp(!isSignUp);
      setUserId('');
      setEmail('');
      setPassword('');
  }

  return (
    <div className="min-h-screen bg-neutral dark:bg-dark-bg flex items-center justify-center p-4 animate-fade-in">
        <div className="w-full max-w-4xl lg:grid lg:grid-cols-2 rounded-2xl shadow-2xl overflow-hidden">
            <div className="hidden lg:flex flex-col items-center justify-center p-12 bg-gradient-to-br from-primary to-accent text-white text-center">
                <LogoIcon className="h-24 w-24 mb-6" />
                <h1 className="text-4xl font-bold">KPSS Bilgi Kartları</h1>
                <p className="mt-4 text-lg opacity-90">Başarıya giden yolda en büyük yardımcınız. Bilgilerinizi tazeleyin, hedeflerinize ulaşın!</p>
            </div>

            <div className="bg-base-100 dark:bg-dark-card p-8 sm:p-12 flex flex-col justify-center">
                <div className="w-full max-w-md mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">{isSignUp ? 'Hesap Oluştur' : 'Giriş Yap'}</h2>
                    <p className="text-center text-gray-600 dark:text-dark-text-secondary mb-8">{isSignUp ? 'Bilgilerini girerek aramıza katıl.' : 'Hesabınıza hoş geldiniz!'}</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="userId" className="block text-sm font-medium text-gray-700 dark:text-dark-text">Kullanıcı Adı</label>
                            <input id="userId" name="userId" type="text" required value={userId} onChange={(e) => setUserId(e.target.value)}
                                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-gray-50 dark:bg-gray-700 dark:text-white"
                                placeholder="kullaniciadim"/>
                        </div>
                        
                        {isSignUp && (
                             <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-dark-text">E-posta Adresi</label>
                                <input id="email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-gray-50 dark:bg-gray-700 dark:text-white"
                                    placeholder="ornek@eposta.com"/>
                            </div>
                        )}

                        <div>
                            <label htmlFor="password"className="block text-sm font-medium text-gray-700 dark:text-dark-text">Şifre</label>
                            <input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-gray-50 dark:bg-gray-700 dark:text-white"
                                placeholder="••••••••"/>
                        </div>
                        
                        {error && <p className="text-sm text-red-600 dark:text-red-400 text-center">{error}</p>}

                        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors dark:bg-accent dark:hover:bg-blue-500">
                           {isSignUp ? 'Kayıt Ol' : 'Giriş Yap'}
                        </button>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300 dark:border-gray-600"></div></div>
                            <div className="relative flex justify-center text-sm"><span className="px-2 bg-base-100 dark:bg-dark-card text-gray-500 dark:text-dark-text-secondary">veya</span></div>
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button onClick={() => onLogin({provider: 'google'})} className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-dark-text hover:bg-gray-50 dark:hover:bg-gray-600">
                                <GoogleIcon className="w-5 h-5 mr-2" /> Google
                            </button>
                            <button onClick={() => onLogin({provider: 'facebook'})} className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-dark-text hover:bg-gray-50 dark:hover:bg-gray-600">
                                <FacebookIcon className="w-5 h-5 mr-2 fill-blue-600 dark:fill-white" /> Facebook
                            </button>
                        </div>
                    </div>

                    <p className="mt-8 text-center text-sm text-gray-600 dark:text-dark-text-secondary">
                        {isSignUp ? 'Zaten bir hesabın var mı?' : 'Hesabın yok mu?'}{' '}
                        <button onClick={toggleForm} className="font-medium text-accent hover:text-secondary dark:hover:text-blue-400">
                             {isSignUp ? 'Giriş Yap' : 'Kayıt Ol'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default LoginScreen;
