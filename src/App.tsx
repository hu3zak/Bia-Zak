import React, { useState, useEffect } from 'react';
import { Heart, Calendar, Clock, Gift, HeartHandshake, Lock, LogOut } from 'lucide-react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const auth = localStorage.getItem('isAuthenticated');
    return auth === 'true';
  });
  const [date, setDate] = useState('');
  const [error, setError] = useState(false);
  const [daysTogether, setDaysTogether] = useState(0);
  const [missYouCounts, setMissYouCounts] = useState(() => {
    const saved = localStorage.getItem('missYouCounts');
    return saved ? JSON.parse(saved) : { partner1: 0, partner2: 0 };
  });
  
  const couplePhotos = [
    {
      url: "https://i.imgur.com/N2uyC9q.jpeg",
      title: "🤍💙💍"
    },
    {
      url: "https://i.imgur.com/pkhzhb5.jpeg",
      title: "Buquê de borboletas"
    },
    {
      url: "https://i.imgur.com/72BDmaH.jpeg",
      title: "Minha paz 💍"
    }
  ];

  useEffect(() => {
    const updateDays = () => {
      const startDate = new Date('2024-12-24');
      const now = new Date();
      const days = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      setDaysTogether(days);
    };

    updateDays();
    const interval = setInterval(updateDays, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('missYouCounts', JSON.stringify(missYouCounts));
  }, [missYouCounts]);

  const handleMissYouClick = (partner) => {
    setMissYouCounts(prev => ({
      ...prev,
      [partner]: prev[partner] + 1
    }));
  };

  const handleDateChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      let formattedValue = value;
      if (value.length >= 2) {
        formattedValue = value.slice(0, 2) + '/' + value.slice(2);
      }
      setDate(formattedValue);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (date === '24/12') {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    setDate('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full mx-4">
          <div className="text-center mb-8">
            <Heart className="w-16 h-16 text-blue-500 mx-auto animate-pulse" />
            <h1 className="text-3xl font-bold text-blue-600 mt-4">Bia & Zak</h1>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Qual é a data do pedido de namoro? (DD/MM)
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="DD/MM"
                  value={date}
                  onChange={handleDateChange}
                  maxLength={5}
                  className={`w-full pl-10 pr-4 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors`}
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600">Data incorreta. Tente novamente! ❤️</p>
              )}
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Entrar no Nosso Mundo</span>
              <Heart className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-indigo-100">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="fixed top-4 right-4 bg-white/80 backdrop-blur-sm text-blue-600 p-2 rounded-full shadow-lg hover:bg-white transition-colors flex items-center gap-2 group"
      >
        <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="hidden group-hover:inline">Sair</span>
      </button>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Heart className="w-16 h-16 text-blue-500 mx-auto animate-pulse" />
          <h1 className="text-4xl font-bold text-blue-600 mt-4">Nossa História:</h1>
        </div>

        <div className="mb-8 max-w-3xl mx-auto">
          <div className="relative rounded-xl overflow-hidden shadow-xl">
            <img 
              src={couplePhotos[0].url} 
              alt="Casal" 
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
              <p className="text-white text-2xl font-semibold p-6">{couplePhotos[0].title}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform">
            <div className="flex items-center mb-4">
              <Calendar className="w-6 h-6 text-blue-500 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-800">Dia em que nos conhecemos</h2>
            </div>
            <p className="text-gray-600">11 de Novembro de 2024</p>
            <p className="mt-2 text-gray-700">O dia em que nos conhecemos, quando vi esses olhinhos brilhantes pela primeira vez. 🤍💙</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform">
            <div className="flex items-center mb-4">
              <Gift className="w-6 h-6 text-blue-500 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-800">Início do Namoro</h2>
            </div>
            <p className="text-gray-600">24 de Dezembro de 2024</p>
            <p className="mt-2 text-gray-700">O dia em que te entreguei uma aliança e te vi toda sorridente, contando sobre ela para mim. Naquele momento, percebi que tudo valia a pena só para ver o teu sorriso. 🤍💙💍</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform">
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-blue-500 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-800">Pedido de namoro</h2>
            </div>
            <p className="text-gray-600">{daysTogether} dias de juntos.</p>
            <p className="mt-2 text-gray-700">Pedir você em namoro foi, sem dúvidas, foi a melhor decisão que já tomei. Ver seu sorriso iluminado e seus olhos brilhando enquanto falava sobre a aliança me fez o garoto mais feliz do mundo. Sou imensamente grato por tudo o que já vivemos e tenho certeza de que, juntos, podemos enfrentar qualquer desafio.<br></br>Vamos sempre cuidar um do outro e superar tudo lado a lado. Cada momento ao seu lado vale a pena, e fazer você sorrir será sempre minha maior recompensa. Eu te amo infinitamente e me sinto em paz ao seu lado… Acho que até perdi minha marra, né? Ksksksks 😁<br></br>Um textinho para te lembrar do quanto eu te amo, nenê! 💙🤍</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <HeartHandshake className="w-6 h-6 text-blue-500 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-800">Sodade</h2>
            </div>
            <div className="space-y-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-gray-700 mb-2">Ela sentiu sodade</p>
                <div className="text-3xl font-bold text-blue-600 mb-2">{missYouCounts.partner1}x</div>
                <button
                  onClick={() => handleMissYouClick('partner1')}
                  className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors w-full"
                >
                  Estou com Sodade, Miguel! 🤍
                </button>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-gray-700 mb-2">Ele sentiu sodade</p>
                <div className="text-3xl font-bold text-blue-600 mb-2">{missYouCounts.partner2}x</div>
                <button
                  onClick={() => handleMissYouClick('partner2')}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors w-full"
                >
                  Estou com Sodade, nenê! 💙
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">Nossos momentos:</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {couplePhotos.slice(1).map((photo, index) => (
              <div key={index} className="relative rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform">
                <img 
                  src={photo.url} 
                  alt={photo.title}
                  className="w-full h-[300px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <p className="text-white text-xl font-semibold p-4">{photo.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 italic">cbjr - "De qualquer jeito seu sorriso vai ser meu raio de sol"</p>
        </div>
      </div>
    </div>
  );
}

export default App;