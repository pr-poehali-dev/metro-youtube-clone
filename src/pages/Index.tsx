import { useState, useEffect } from 'react';
import { Home, Search, User, Clock, TrendingUp, Upload, Bookmark, Video, Music, Play, ThumbsUp, ThumbsDown, MessageSquare, Headphones, History, Pause, Volume2, Settings, Maximize, SkipForward, SkipBack, Moon, Sun, Monitor, Smartphone, Mic, LogIn, UserPlus, LogOut } from 'lucide-react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';

type Section = 'home' | 'search' | 'channel' | 'subscriptions' | 'history' | 'trending' | 'upload' | 'saved' | 'video' | 'music' | 'podcasts' | 'login' | 'register';
type Theme = 'dark' | 'light';
type ViewMode = 'desktop' | 'mobile';
type VideoQuality = '360p' | '720p' | '1080p';

interface Video {
  id: string;
  title: string;
  channel: string;
  channelAvatar: string;
  views: string;
  time: string;
  thumbnail: string;
  color: string;
  likes: string;
  dislikes: string;
}

interface Channel {
  id: string;
  name: string;
  avatar: string;
  subscribers: string;
  color: string;
}

interface Comment {
  id: string;
  author: string;
  text: string;
  time: string;
  avatar: string;
  likes: number;
}

interface User {
  username: string;
  email: string;
  avatar: string;
  channelDescription: string;
}

const mockVideos: Video[] = [
  { id: '1', title: 'Как создать Metro дизайн', channel: 'Design Channel', channelAvatar: 'DC', views: '1.2М', time: '2 дня назад', thumbnail: '🎨', color: 'bg-metro-blue', likes: '45К', dislikes: '234' },
  { id: '2', title: 'TypeScript для начинающих', channel: 'Code Academy', channelAvatar: 'CA', views: '856К', time: '1 неделю назад', thumbnail: '💻', color: 'bg-metro-cyan', likes: '32К', dislikes: '120' },
  { id: '3', title: 'React hooks подробно', channel: 'Web Dev Pro', channelAvatar: 'WD', views: '2.1М', time: '3 дня назад', thumbnail: '⚛️', color: 'bg-metro-purple', likes: '89К', dislikes: '456' },
  { id: '4', title: 'UX дизайн паттерны', channel: 'UX Master', channelAvatar: 'UX', views: '654К', time: '5 дней назад', thumbnail: '🎯', color: 'bg-metro-green', likes: '23К', dislikes: '89' },
  { id: '5', title: 'CSS Grid и Flexbox', channel: 'Layout School', channelAvatar: 'LS', views: '1.5М', time: '1 день назад', thumbnail: '📐', color: 'bg-metro-orange', likes: '67К', dislikes: '234' },
  { id: '6', title: 'JavaScript ES2024', channel: 'JS Guru', channelAvatar: 'JS', views: '987К', time: '4 дня назад', thumbnail: '🚀', color: 'bg-metro-red', likes: '41К', dislikes: '178' },
  { id: '7', title: 'Анимации в вебе', channel: 'Motion Design', channelAvatar: 'MD', views: '745К', time: '6 дней назад', thumbnail: '✨', color: 'bg-metro-yellow', likes: '28К', dislikes: '94' },
  { id: '8', title: 'База данных SQL', channel: 'Database Pro', channelAvatar: 'DP', views: '1.8М', time: '2 дня назад', thumbnail: '🗄️', color: 'bg-metro-lime', likes: '73К', dislikes: '312' },
];

const mockChannels: Channel[] = [
  { id: '1', name: 'Design Channel', avatar: 'DC', subscribers: '2.5М', color: 'bg-metro-blue' },
  { id: '2', name: 'Code Academy', avatar: 'CA', subscribers: '1.8М', color: 'bg-metro-cyan' },
  { id: '3', name: 'Web Dev Pro', avatar: 'WD', subscribers: '3.2М', color: 'bg-metro-purple' },
  { id: '4', name: 'UX Master', avatar: 'UX', subscribers: '987К', color: 'bg-metro-green' },
];

const mockMusic = [
  { id: '1', artist: 'The Weeknd', avatar: 'TW', color: 'bg-metro-red' },
  { id: '2', artist: 'Billie Eilish', avatar: 'BE', color: 'bg-metro-purple' },
  { id: '3', artist: 'Daft Punk', avatar: 'DP', color: 'bg-metro-cyan' },
];

const trendingYoutubers = ['MrBeast', 'PewDiePie', 'Dude Perfect'];
const searchSuggestions = ['Уроки React', 'Музыка 2024', 'JavaScript'];

const mockComments: Comment[] = [
  { id: '1', author: 'Алексей М.', text: 'Отличное видео! Очень помогло разобраться с темой', time: '2 часа назад', avatar: 'AM', likes: 12 },
  { id: '2', author: 'Мария К.', text: 'Спасибо за подробное объяснение. Жду продолжения серии', time: '5 часов назад', avatar: 'МК', likes: 8 },
  { id: '3', author: 'Дмитрий П.', text: 'Можно больше примеров кода? Хочется попрактиковаться', time: '1 день назад', avatar: 'ДП', likes: 5 },
];

const mockPodcasts = [
  { id: '1', name: 'Tech Talk', avatar: 'TT', color: 'bg-metro-purple', episodes: '124' },
  { id: '2', name: 'Business Pod', avatar: 'BP', color: 'bg-metro-orange', episodes: '89' },
  { id: '3', name: 'Science Hour', avatar: 'SH', color: 'bg-metro-cyan', episodes: '156' },
];

const Index = () => {
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<Theme>('dark');
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  const [videoProgress, setVideoProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [quality, setQuality] = useState<VideoQuality>('1080p');
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [likesCount, setLikesCount] = useState(45000);
  const [dislikesCount, setDislikesCount] = useState(234);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ username: '', email: '', password: '' });
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadForm, setUploadForm] = useState({ title: '', description: '' });
  const [sectionTransition, setSectionTransition] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    setCurrentSection('video');
  };

  const handleAddComment = () => {
    if (newComment.trim() && isLoggedIn) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: currentUser?.username || 'Вы',
        text: newComment,
        time: 'только что',
        avatar: currentUser?.avatar || 'ВЫ',
        likes: 0,
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  const handleLike = () => {
    if (!isLoggedIn) return;
    if (isLiked) {
      setLikesCount(likesCount - 1);
      setIsLiked(false);
    } else {
      setLikesCount(likesCount + 1);
      setIsLiked(true);
      if (isDisliked) {
        setDislikesCount(dislikesCount - 1);
        setIsDisliked(false);
      }
    }
  };

  const handleDislike = () => {
    if (!isLoggedIn) return;
    if (isDisliked) {
      setDislikesCount(dislikesCount - 1);
      setIsDisliked(false);
    } else {
      setDislikesCount(dislikesCount + 1);
      setIsDisliked(true);
      if (isLiked) {
        setLikesCount(likesCount - 1);
        setIsLiked(false);
      }
    }
  };

  const handleLogin = () => {
    if (loginForm.username && loginForm.password) {
      setCurrentUser({
        username: loginForm.username,
        email: loginForm.username + '@metrotube.com',
        avatar: loginForm.username.substring(0, 2).toUpperCase(),
        channelDescription: 'Добро пожаловать на мой канал!',
      });
      setIsLoggedIn(true);
      setCurrentSection('home');
    }
  };

  const handleRegister = () => {
    if (registerForm.username && registerForm.email && registerForm.password) {
      setCurrentUser({
        username: registerForm.username,
        email: registerForm.email,
        avatar: registerForm.username.substring(0, 2).toUpperCase(),
        channelDescription: 'Добро пожаловать на мой канал!',
      });
      setIsLoggedIn(true);
      setCurrentSection('home');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentSection('home');
  };

  const handleSectionChange = (section: Section) => {
    setSectionTransition(true);
    setTimeout(() => {
      setCurrentSection(section);
      setSectionTransition(false);
    }, 150);
  };

  const handleSkipForward = () => {
    setVideoProgress(Math.min(videoProgress + 10, 100));
  };

  const handleSkipBack = () => {
    setVideoProgress(Math.max(videoProgress - 10, 0));
  };

  const handleCommentLike = (commentId: string) => {
    if (!isLoggedIn) return;
    setComments(comments.map(c => 
      c.id === commentId ? { ...c, likes: c.likes + 1 } : c
    ));
  };

  const handleUploadVideo = () => {
    if (uploadFile && uploadForm.title && isLoggedIn) {
      alert(`Видео "${uploadForm.title}" успешно загружено!`);
      setUploadFile(null);
      setUploadForm({ title: '', description: '' });
    }
  };

  const navItems = [
    { 
      id: 'home' as Section, 
      icon: Home, 
      label: 'Главная', 
      color: 'bg-metro-blue', 
      size: 'logo',
      primaryContent: <div className="text-5xl">📺</div>,
      altContent: <div className="text-3xl">🎬</div>
    },
    { 
      id: 'search' as Section, 
      icon: Search, 
      label: 'Поиск', 
      color: 'bg-metro-cyan', 
      size: 'normal',
      primaryContent: null,
      altContent: <div className="text-xs mt-1 opacity-90">{searchSuggestions.join(' • ')}</div>
    },
    { 
      id: 'channel' as Section, 
      icon: User, 
      label: 'Мой канал', 
      color: 'bg-metro-purple', 
      size: 'wide',
      primaryContent: null,
      altContent: <div className="text-xs mt-1 opacity-90">245К подписчиков</div>
    },
    { 
      id: 'subscriptions' as Section, 
      icon: Video, 
      label: 'Подписки', 
      color: 'bg-metro-green', 
      size: 'normal',
      primaryContent: null,
      altContent: <div className="text-xs mt-1 opacity-90 text-center leading-tight">{mockChannels.slice(0,2).map(c => c.name.split(' ')[0]).join(', ')}</div>
    },
    { 
      id: 'music' as Section, 
      icon: Headphones, 
      label: 'Музыка', 
      color: 'bg-metro-orange', 
      size: 'normal',
      primaryContent: null,
      altContent: <div className="text-xs mt-1 opacity-90 text-center leading-tight">{mockMusic.map(m => m.artist.split(' ')[0]).join(', ')}</div>
    },
    { 
      id: 'trending' as Section, 
      icon: TrendingUp, 
      label: 'Рекомендации', 
      color: 'bg-metro-red', 
      size: 'wide',
      primaryContent: null,
      altContent: <div className="text-xs mt-1 opacity-90">{trendingYoutubers.join(' • ')}</div>
    },
    { 
      id: 'upload' as Section, 
      icon: Upload, 
      label: 'Загрузить', 
      color: 'bg-metro-yellow', 
      size: 'normal',
      primaryContent: null,
      altContent: <div className="text-xs mt-1 opacity-90">Добавить видео</div>
    },
    { 
      id: 'saved' as Section, 
      icon: Bookmark, 
      label: 'Сохраненные', 
      color: 'bg-metro-lime', 
      size: 'normal',
      primaryContent: null,
      altContent: <div className="text-xs mt-1 opacity-90">{mockVideos.length} видео</div>
    },
    { 
      id: 'podcasts' as Section, 
      icon: Mic, 
      label: 'Подкасты', 
      color: 'bg-metro-purple', 
      size: 'normal',
      primaryContent: null,
      altContent: <div className="text-xs mt-1 opacity-90 text-center leading-tight">{mockPodcasts.map(p => p.name.split(' ')[0]).join(', ')}</div>
    },
  ];

  if (currentSection === 'login') {
    return (
      <div className={`min-h-screen bg-background text-foreground flex items-center justify-center transition-opacity duration-300 ${sectionTransition ? 'opacity-0' : 'opacity-100'}`}>
        <div className="w-full max-w-md p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-20 h-20 bg-primary mx-auto flex items-center justify-center text-4xl">📺</div>
            <h1 className="text-4xl font-light">MetroTube</h1>
            <p className="text-muted-foreground">Вход в аккаунт</p>
          </div>
          <div className="bg-card/30 border-2 border-border p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Логин</label>
              <Input 
                value={loginForm.username}
                onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                placeholder="Введите логин"
                className="bg-muted/50 border-2 border-border focus:border-primary h-12"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Пароль</label>
              <Input 
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                placeholder="Введите пароль"
                className="bg-muted/50 border-2 border-border focus:border-primary h-12"
              />
            </div>
            <Button onClick={handleLogin} className="w-full h-12 text-base bg-primary hover:bg-primary/90">
              Войти
            </Button>
            <div className="text-center text-sm">
              <button onClick={() => handleSectionChange('register')} className="text-primary hover:brightness-110">
                Создать аккаунт
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentSection === 'register') {
    return (
      <div className={`min-h-screen bg-background text-foreground flex items-center justify-center transition-opacity duration-300 ${sectionTransition ? 'opacity-0' : 'opacity-100'}`}>
        <div className="w-full max-w-md p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-20 h-20 bg-primary mx-auto flex items-center justify-center text-4xl">📺</div>
            <h1 className="text-4xl font-light">MetroTube</h1>
            <p className="text-muted-foreground">Регистрация</p>
          </div>
          <div className="bg-card/30 border-2 border-border p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Логин</label>
              <Input 
                value={registerForm.username}
                onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
                placeholder="Выберите логин"
                className="bg-muted/50 border-2 border-border focus:border-primary h-12"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input 
                type="email"
                value={registerForm.email}
                onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                placeholder="Введите email"
                className="bg-muted/50 border-2 border-border focus:border-primary h-12"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Пароль</label>
              <Input 
                type="password"
                value={registerForm.password}
                onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                placeholder="Придумайте пароль"
                className="bg-muted/50 border-2 border-border focus:border-primary h-12"
              />
            </div>
            <Button onClick={handleRegister} className="w-full h-12 text-base bg-primary hover:bg-primary/90">
              Зарегистрироваться
            </Button>
            <div className="text-center text-sm">
              <button onClick={() => handleSectionChange('login')} className="text-primary hover:brightness-110">
                Уже есть аккаунт? Войти
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-background text-foreground transition-all duration-300 ${viewMode === 'mobile' ? 'max-w-md mx-auto' : ''} ${sectionTransition ? 'opacity-0' : 'opacity-100'}`} style={{ backgroundImage: theme === 'dark' ? 'radial-gradient(circle at 20% 50%, rgba(32, 145, 196, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(146, 64, 179, 0.05) 0%, transparent 50%)' : 'radial-gradient(circle at 20% 50%, rgba(32, 145, 196, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(146, 64, 179, 0.03) 0%, transparent 50%)' }}>
      <header className="bg-background/95 backdrop-blur-md border-b-2 border-primary sticky top-0 z-50">
        <div className="container mx-auto px-6 py-3 flex items-center gap-6">
          <button 
            onClick={() => setCurrentSection('home')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity group"
          >
            <div className="w-12 h-12 bg-primary flex items-center justify-center text-2xl overflow-hidden relative">
              <div className="tile-content absolute inset-0 flex items-center justify-center">📺</div>
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-light tracking-wide">MetroTube</h1>
            </div>
          </button>
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Input
                type="text"
                placeholder="Поиск"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value) setCurrentSection('search');
                }}
                className="w-full bg-muted/50 border-2 border-border hover:border-primary focus:border-primary h-11 transition-colors"
              />
              <Button size="sm" className="absolute right-1 top-1 bg-primary hover:bg-primary/90 h-9">
                <Icon name="Search" size={16} />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="bg-muted/50 px-3 py-2 hover:brightness-110 transition-all">
              <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} size={20} />
            </button>
            <button onClick={() => setViewMode(viewMode === 'desktop' ? 'mobile' : 'desktop')} className="bg-muted/50 px-3 py-2 hover:brightness-110 transition-all">
              <Icon name={viewMode === 'desktop' ? 'Smartphone' : 'Monitor'} size={20} />
            </button>
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <div className="bg-metro-green px-4 py-2 flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 flex items-center justify-center text-xs font-semibold">
                    {currentUser?.avatar}
                  </div>
                  <span className="font-medium">{currentUser?.username}</span>
                </div>
                <button onClick={handleLogout} className="bg-destructive px-3 py-2 hover:brightness-110 transition-all">
                  <Icon name="LogOut" size={20} />
                </button>
              </div>
            ) : (
              <button onClick={() => handleSectionChange('login')} className="bg-metro-green px-4 py-2 hover:brightness-110 transition-all flex items-center gap-2">
                <Icon name="LogIn" size={20} />
                <span className="font-medium">Войти</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 gap-3 mb-8 auto-rows-fr">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleSectionChange(item.id)}
              className={`${item.color} metro-tile live-tile ${
                item.size === 'wide' ? 'col-span-2' : item.size === 'logo' ? 'col-span-2 row-span-2' : ''
              } aspect-square flex flex-col items-center justify-center gap-2 text-white font-light text-lg relative overflow-hidden ${
                currentSection === item.id ? 'ring-4 ring-primary/50 brightness-125' : ''
              }`}
              style={{ animationDelay: `${index * 1.2}s` }}
            >
              {item.size === 'logo' ? (
                <>
                  <div className="tile-content absolute inset-0 flex flex-col items-center justify-center">
                    {item.primaryContent}
                    <span className="text-xl font-normal mt-2">{item.label}</span>
                  </div>
                  <div className="tile-content-alt absolute inset-0 flex flex-col items-center justify-center">
                    {item.altContent}
                    <span className="text-xl font-normal mt-2">{item.label}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="tile-content absolute inset-0 flex flex-col items-center justify-center gap-2 px-3">
                    <Icon name={item.icon.name as any} size={item.size === 'wide' ? 36 : 32} />
                    <span className="text-sm font-normal">{item.label}</span>
                  </div>
                  <div className="tile-content-alt absolute inset-0 flex flex-col items-center justify-center gap-2 px-3">
                    <Icon name={item.icon.name as any} size={item.size === 'wide' ? 28 : 24} />
                    <span className="text-xs font-normal">{item.label}</span>
                    {item.altContent && <div className="w-full text-center">{item.altContent}</div>}
                  </div>
                </>
              )}
              {currentSection === item.id && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-white/80" />
              )}
            </button>
          ))}
        </div>

        {currentSection === 'video' && selectedVideo ? (
          <div className="space-y-6">
            <button
              onClick={() => handleSectionChange('home')}
              className="flex items-center gap-2 text-primary hover:brightness-125 transition-all mb-4 text-lg"
            >
              <Icon name="ArrowLeft" size={20} />
              <span className="font-light">Назад к списку</span>
            </button>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="relative group bg-black">
                  <div className={`${selectedVideo.color} aspect-video flex items-center justify-center text-9xl shadow-lg cursor-pointer relative`}
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        {selectedVideo.thumbnail}
                        <div className="absolute inset-0 bg-black/40" />
                      </div>
                    ) : (
                      <>
                        {selectedVideo.thumbnail}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-white/90 rounded-full p-4">
                            <Icon name="Play" size={48} className="text-black" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="space-y-3">
                      <div className="relative h-1 bg-white/30 cursor-pointer" onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const percent = ((e.clientX - rect.left) / rect.width) * 100;
                        setVideoProgress(percent);
                      }}>
                        <div className="absolute h-full bg-primary transition-all" style={{ width: `${videoProgress}%` }} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button onClick={() => setIsPlaying(!isPlaying)} className="hover:scale-110 transition-transform">
                            <Icon name={isPlaying ? 'Pause' : 'Play'} size={24} className="text-white" />
                          </button>
                          <button onClick={handleSkipBack} className="hover:scale-110 transition-transform">
                            <Icon name="SkipBack" size={20} className="text-white" />
                          </button>
                          <button onClick={handleSkipForward} className="hover:scale-110 transition-transform">
                            <Icon name="SkipForward" size={20} className="text-white" />
                          </button>
                          <div className="flex items-center gap-2">
                            <Icon name="Volume2" size={20} className="text-white" />
                            <input 
                              type="range" 
                              min="0" 
                              max="100" 
                              value={volume} 
                              onChange={(e) => setVolume(Number(e.target.value))}
                              className="w-20 h-1 accent-primary"
                            />
                            <span className="text-white text-xs w-8">{volume}%</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-white text-sm">{Math.floor(videoProgress / 100 * 10)}:{Math.floor((videoProgress / 100 * 600) % 60).toString().padStart(2, '0')} / 10:00</span>
                          <div className="relative">
                            <button onClick={() => setShowQualityMenu(!showQualityMenu)} className="hover:scale-110 transition-transform">
                              <Icon name="Settings" size={20} className="text-white" />
                            </button>
                            {showQualityMenu && (
                              <div className="absolute bottom-full right-0 mb-2 bg-black/90 border border-white/20 p-2 space-y-1">
                                <div className="text-white text-xs mb-2 px-2">Качество</div>
                                {(['360p', '720p', '1080p'] as VideoQuality[]).map(q => (
                                  <button
                                    key={q}
                                    onClick={() => { setQuality(q); setShowQualityMenu(false); }}
                                    className={`w-full px-4 py-1 text-sm text-left ${quality === q ? 'bg-primary text-white' : 'text-white/80 hover:bg-white/10'}`}
                                  >
                                    {q}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          <button className="hover:scale-110 transition-transform">
                            <Icon name="Maximize" size={20} className="text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-3xl font-light">{selectedVideo.title}</h2>
                  
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <span className="text-sm text-muted-foreground">{selectedVideo.views} просмотров • {selectedVideo.time}</span>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={handleLike}
                        disabled={!isLoggedIn}
                        className={`flex items-center gap-2 px-4 py-2 ${
                          isLiked ? 'bg-primary' : 'bg-muted/50'
                        } hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                        title={!isLoggedIn ? 'Войдите, чтобы оценить' : ''}
                      >
                        <Icon name="ThumbsUp" size={18} />
                        <span className="text-sm font-medium">{likesCount.toLocaleString()}</span>
                      </button>
                      <button 
                        onClick={handleDislike}
                        disabled={!isLoggedIn}
                        className={`flex items-center gap-2 px-4 py-2 ${
                          isDisliked ? 'bg-destructive' : 'bg-muted/50'
                        } hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                        title={!isLoggedIn ? 'Войдите, чтобы оценить' : ''}
                      >
                        <Icon name="ThumbsDown" size={18} />
                        <span className="text-sm font-medium">{dislikesCount.toLocaleString()}</span>
                      </button>
                      <div className="flex items-center gap-2 px-4 py-2 bg-muted/50">
                        <Icon name="MessageSquare" size={18} />
                        <span className="text-sm font-medium">{comments.length}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 py-4 border-y border-border">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 ${mockChannels.find(c => c.name === selectedVideo.channel)?.color || 'bg-primary'} flex items-center justify-center text-base font-semibold`}>
                        {selectedVideo.channelAvatar}
                      </div>
                      <div>
                        <div className="font-semibold text-base">{selectedVideo.channel}</div>
                        <div className="text-sm text-muted-foreground">1.2М подписчиков</div>
                      </div>
                    </div>
                    <button className="ml-auto bg-metro-green px-6 py-2 hover:brightness-110 transition-all font-medium">
                      Подписаться
                    </button>
                  </div>

                  <div className="bg-card/50 p-5 border-l-4 border-primary">
                    <p className="text-foreground/90 leading-relaxed">
                      В этом видео мы подробно разбираем основы создания дизайна в стиле Metro. 
                      Вы узнаете о принципах плоского дизайна, работе с плитками и цветовыми схемами.
                    </p>
                  </div>
                </div>

                <div className="bg-card/30 p-6 space-y-6 border border-border">
                  <h3 className="text-2xl font-light">Комментарии <span className="text-muted-foreground">({comments.length})</span></h3>
                  
                  <div className="space-y-4">
                    {isLoggedIn ? (
                      <div className="flex gap-3">
                        <div className="w-10 h-10 bg-secondary flex items-center justify-center text-sm font-semibold flex-shrink-0">
                          {currentUser?.avatar}
                        </div>
                        <div className="flex-1 space-y-3">
                          <Textarea
                            placeholder="Добавить комментарий..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="bg-muted/50 border-2 border-border focus:border-primary resize-none transition-colors"
                            rows={2}
                          />
                          <div className="flex gap-3 justify-end">
                            <button
                              onClick={() => setNewComment('')}
                              className="px-4 py-1.5 hover:bg-muted transition-colors text-sm"
                            >
                              Отмена
                            </button>
                            <button
                              onClick={handleAddComment}
                              disabled={!newComment.trim()}
                              className="bg-primary px-6 py-1.5 hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium"
                            >
                              Отправить
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-muted/30 p-4 text-center border border-border">
                        <p className="text-muted-foreground mb-3">Войдите, чтобы оставить комментарий</p>
                        <button onClick={() => handleSectionChange('login')} className="bg-primary px-6 py-2 hover:brightness-110 transition-all">
                          Войти
                        </button>
                      </div>
                    )}

                    <div className="space-y-6 pt-4">
                      {comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3 pb-4 border-b border-border/50 last:border-0">
                          <div className="w-10 h-10 bg-accent flex items-center justify-center text-xs font-semibold flex-shrink-0">
                            {comment.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-semibold text-base">{comment.author}</span>
                              <span className="text-xs text-muted-foreground">{comment.time}</span>
                            </div>
                            <p className="text-foreground/90 leading-relaxed mb-3">{comment.text}</p>
                            <div className="flex gap-4">
                              <button 
                                onClick={() => handleCommentLike(comment.id)}
                                disabled={!isLoggedIn}
                                className="flex items-center gap-2 px-3 py-1 hover:bg-muted/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Icon name="ThumbsUp" size={16} />
                                <span className="text-xs">{comment.likes}</span>
                              </button>
                              <button 
                                disabled={!isLoggedIn}
                                className="flex items-center gap-2 px-3 py-1 hover:bg-muted/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Icon name="ThumbsDown" size={16} />
                              </button>
                              <button 
                                disabled={!isLoggedIn}
                                className="px-3 py-1 hover:bg-muted/50 transition-colors text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Ответить
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-light mb-4">Рекомендуемые</h3>
                {mockVideos.filter(v => v.id !== selectedVideo.id).slice(0, 6).map((video) => (
                  <div
                    key={video.id}
                    onClick={() => handleVideoClick(video)}
                    className="flex gap-3 cursor-pointer hover:bg-muted/30 p-2 transition-colors border-l-2 border-transparent hover:border-primary"
                  >
                    <div className={`${video.color} w-36 aspect-video flex items-center justify-center text-3xl flex-shrink-0 metro-tile relative`}>
                      {video.thumbnail}
                      <div className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 text-xs">
                        {Math.floor(Math.random() * 20) + 1}:{Math.floor(Math.random() * 60).toString().padStart(2, '0')}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                      <h4 className="font-normal text-sm line-clamp-2">{video.title}</h4>
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 ${mockChannels.find(c => c.name === video.channel)?.color || 'bg-primary'} flex items-center justify-center text-[8px] font-semibold`}>
                          {video.channelAvatar}
                        </div>
                        <p className="text-xs text-muted-foreground">{video.channel}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{video.views} • {video.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8 pb-4 border-b-2 border-primary/30">
              <h2 className="text-4xl font-light">{navItems.find(item => item.id === currentSection)?.label || 'Главная'}</h2>
            </div>

            {currentSection === 'podcasts' ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {mockPodcasts.map((podcast) => (
                    <div
                      key={podcast.id}
                      className={`${podcast.color} metro-tile aspect-square flex flex-col items-center justify-center gap-4 p-6 cursor-pointer`}
                    >
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                        <Icon name="Mic" size={32} className="text-white" />
                      </div>
                      <div className="text-center text-white">
                        <h3 className="font-semibold text-lg">{podcast.name}</h3>
                        <p className="text-sm opacity-80">{podcast.episodes} эпизодов</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="text-2xl font-light mb-4">Последние выпуски</h3>
                  <div className="space-y-3">
                    {mockVideos.slice(0, 5).map((video) => (
                      <div
                        key={video.id}
                        onClick={() => handleVideoClick(video)}
                        className="flex gap-4 cursor-pointer hover:bg-muted/30 p-3 transition-colors border-l-2 border-transparent hover:border-primary"
                      >
                        <div className={`${video.color} w-24 aspect-square flex items-center justify-center flex-shrink-0`}>
                          <Icon name="Mic" size={32} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-normal mb-1">{video.title}</h4>
                          <p className="text-sm text-muted-foreground">{video.channel} • {video.views} • {video.time}</p>
                          <p className="text-xs text-muted-foreground mt-1">Эпизод {Math.floor(Math.random() * 100) + 1}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : currentSection === 'channel' ? (
              <div className="space-y-6">
                <div className="bg-metro-purple p-8 flex items-center gap-6">
                  <div className="w-32 h-32 bg-white/20 flex items-center justify-center text-5xl font-bold">
                    МК
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-light mb-2">Мой Канал</h3>
                    <p className="text-white/80 mb-3">245К подписчиков • 24 видео</p>
                    <button className="bg-white text-metro-purple px-6 py-2 font-medium hover:bg-white/90 transition-all">
                      Редактировать канал
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-light mb-4">Мои видео</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {mockVideos.slice(0, 4).map((video) => (
                      <div
                        key={video.id}
                        onClick={() => handleVideoClick(video)}
                        className="cursor-pointer group"
                      >
                        <div className={`${video.color} aspect-video metro-tile flex items-center justify-center text-6xl mb-3 shadow-md`}>
                          {video.thumbnail}
                        </div>
                        <h3 className="font-normal mb-1 line-clamp-2 group-hover:text-primary transition-colors text-base">
                          {video.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{video.views} просмотров</span>
                          <span>•</span>
                          <span>{video.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : currentSection === 'subscriptions' ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {mockChannels.map((channel) => (
                    <div
                      key={channel.id}
                      className="bg-card/30 border border-border p-6 flex flex-col items-center gap-3 hover:bg-muted/30 transition-colors cursor-pointer"
                    >
                      <div className={`${channel.color} w-20 h-20 flex items-center justify-center text-2xl font-bold`}>
                        {channel.avatar}
                      </div>
                      <div className="text-center">
                        <h3 className="font-semibold mb-1">{channel.name}</h3>
                        <p className="text-sm text-muted-foreground">{channel.subscribers} подписчиков</p>
                      </div>
                      <button className="bg-muted/50 px-4 py-1.5 text-sm hover:brightness-110 transition-all w-full">
                        Подписан
                      </button>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="text-2xl font-light mb-4">Новые видео от подписок</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {mockVideos.map((video) => (
                      <div
                        key={video.id}
                        onClick={() => handleVideoClick(video)}
                        className="cursor-pointer group"
                      >
                        <div className={`${video.color} aspect-video metro-tile flex items-center justify-center text-6xl mb-3 shadow-md`}>
                          {video.thumbnail}
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-8 h-8 ${mockChannels.find(c => c.name === video.channel)?.color || 'bg-primary'} flex items-center justify-center text-xs font-semibold`}>
                            {video.channelAvatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-normal text-sm line-clamp-2 group-hover:text-primary transition-colors">
                              {video.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{video.channel}</p>
                        <p className="text-sm text-muted-foreground">{video.views} • {video.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : currentSection === 'music' ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {mockMusic.map((artist) => (
                    <div
                      key={artist.id}
                      className={`${artist.color} metro-tile aspect-square flex flex-col items-center justify-center gap-4 p-6 cursor-pointer`}
                    >
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                        {artist.avatar}
                      </div>
                      <div className="text-center text-white">
                        <h3 className="font-semibold text-lg">{artist.artist}</h3>
                        <p className="text-sm opacity-80">Исполнитель</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="text-2xl font-light mb-4">Популярные музыкальные видео</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {mockVideos.slice(0, 4).map((video) => (
                      <div
                        key={video.id}
                        onClick={() => handleVideoClick(video)}
                        className="cursor-pointer group"
                      >
                        <div className={`${video.color} aspect-video metro-tile flex items-center justify-center text-6xl mb-3 shadow-md relative`}>
                          {video.thumbnail}
                          <div className="absolute bottom-2 left-2">
                            <Icon name="Music" size={20} className="text-white/80" />
                          </div>
                        </div>
                        <h3 className="font-normal mb-1 line-clamp-2 group-hover:text-primary transition-colors text-base">
                          {video.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{video.channel}</p>
                        <p className="text-sm text-muted-foreground">{video.views} • {video.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : currentSection === 'search' ? (
              <div className="space-y-6">
                {!searchQuery ? (
                  <>
                    <div className="text-muted-foreground text-lg font-light mb-6">
                      Популярные категории
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                      {['Обучение', 'Музыка', 'Игры', 'Спорт', 'Новости', 'Развлечения', 'Технологии', 'Кулинария', 'Стройка', 'Мода'].map((cat, i) => (
                        <button
                          key={i}
                          onClick={() => setSearchQuery(cat)}
                          className={`${
                            ['bg-metro-blue', 'bg-metro-purple', 'bg-metro-green', 'bg-metro-orange', 'bg-metro-red', 
                             'bg-metro-cyan', 'bg-metro-yellow', 'bg-metro-lime', 'bg-primary', 'bg-accent'][i]
                          } metro-tile aspect-[2/1] flex items-center justify-center text-white font-medium hover:brightness-110 transition-all`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                    <div className="mt-8">
                      <h3 className="text-2xl font-light mb-4">Популярные сейчас</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {mockVideos.slice(0, 4).map((video) => (
                          <div
                            key={video.id}
                            onClick={() => handleVideoClick(video)}
                            className="cursor-pointer group"
                          >
                            <div className={`${video.color} aspect-video metro-tile flex items-center justify-center text-6xl mb-3 shadow-md relative`}>
                              {video.thumbnail}
                              <div className="absolute top-2 left-2 bg-metro-red px-2 py-1 text-xs font-semibold flex items-center gap-1">
                                <Icon name="TrendingUp" size={12} />
                                ТРЕНД
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`w-6 h-6 ${mockChannels.find(c => c.name === video.channel)?.color || 'bg-primary'} flex items-center justify-center text-[10px] font-semibold`}>
                                {video.channelAvatar}
                              </div>
                              <h3 className="font-normal line-clamp-2 group-hover:text-primary transition-colors text-base flex-1">
                                {video.title}
                              </h3>
                            </div>
                            <p className="text-sm text-muted-foreground pl-8">{video.channel}</p>
                            <p className="text-sm text-muted-foreground pl-8">{video.views} • {video.time}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="text-muted-foreground text-lg font-light">
                        Результаты поиска: <span className="text-foreground font-normal">"{searchQuery}"</span>
                      </div>
                      <button
                        onClick={() => setSearchQuery('')}
                        className="text-sm text-primary hover:brightness-110 transition-all"
                      >
                        Очистить
                      </button>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                      {['Все', 'Видео', 'Каналы', 'Плейлисты'].map((filter, i) => (
                        <button
                          key={i}
                          className={`px-4 py-2 ${
                            i === 0 ? 'bg-primary text-white' : 'bg-muted/50 text-foreground hover:bg-muted'
                          } transition-all text-sm font-medium`}
                        >
                          {filter}
                        </button>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {mockVideos
                        .filter(video => 
                          searchQuery === '' || 
                          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          video.channel.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((video) => (
                          <div
                            key={video.id}
                            onClick={() => handleVideoClick(video)}
                            className="cursor-pointer group"
                          >
                            <div className={`${video.color} aspect-video metro-tile flex items-center justify-center text-6xl mb-3 shadow-md`}>
                              {video.thumbnail}
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`w-6 h-6 ${mockChannels.find(c => c.name === video.channel)?.color || 'bg-primary'} flex items-center justify-center text-[10px] font-semibold`}>
                                {video.channelAvatar}
                              </div>
                              <h3 className="font-normal line-clamp-2 group-hover:text-primary transition-colors text-base flex-1">
                                {video.title}
                              </h3>
                            </div>
                            <p className="text-sm text-muted-foreground pl-8">{video.channel}</p>
                            <p className="text-sm text-muted-foreground pl-8">{video.views} • {video.time}</p>
                          </div>
                        ))}
                    </div>
                  </>
                )}
              </div>
            ) : currentSection === 'upload' ? (
              <div className="max-w-3xl mx-auto">
                {!isLoggedIn ? (
                  <div className="bg-card/30 border-2 border-border p-12 text-center space-y-4">
                    <Icon name="Upload" size={64} className="mx-auto text-muted-foreground" />
                    <h3 className="text-2xl font-light">Войдите, чтобы загружать видео</h3>
                    <button onClick={() => handleSectionChange('login')} className="bg-primary px-8 py-3 hover:brightness-110 transition-all font-medium">
                      Войти
                    </button>
                  </div>
                ) : (
                  <div className="bg-card/30 border-2 border-border p-8 space-y-6">
                    <div className="border-2 border-dashed border-primary/50 p-16 text-center space-y-4 hover:border-primary transition-colors cursor-pointer bg-muted/20">
                      <Icon name="Upload" size={64} className="mx-auto text-primary" />
                      <div>
                        <h3 className="text-xl font-light mb-2">Загрузите видео</h3>
                        <p className="text-sm text-muted-foreground">Перетащите файл или нажмите для выбора</p>
                        {uploadFile && <p className="text-sm text-primary mt-2">Выбран: {uploadFile.name}</p>}
                      </div>
                      <input 
                        type="file" 
                        accept="video/*"
                        onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                        className="hidden"
                        id="video-upload"
                      />
                      <label htmlFor="video-upload" className="bg-primary px-8 py-3 hover:brightness-110 transition-all font-medium inline-block cursor-pointer">
                        Выбрать файл
                      </label>
                    </div>
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-muted-foreground uppercase tracking-wide">Название</label>
                        <Input 
                          value={uploadForm.title}
                          onChange={(e) => setUploadForm({...uploadForm, title: e.target.value})}
                          placeholder="Введите название видео" 
                          className="bg-muted/50 border-2 border-border focus:border-primary h-12" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-muted-foreground uppercase tracking-wide">Описание</label>
                        <Textarea 
                          value={uploadForm.description}
                          onChange={(e) => setUploadForm({...uploadForm, description: e.target.value})}
                          placeholder="Расскажите о вашем видео" 
                          className="bg-muted/50 border-2 border-border focus:border-primary" 
                          rows={5} 
                        />
                      </div>
                      <Button 
                        onClick={handleUploadVideo}
                        disabled={!uploadFile || !uploadForm.title}
                        className="w-full h-12 text-base bg-primary hover:bg-primary/90 disabled:opacity-50"
                      >
                        Опубликовать видео
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {mockVideos.map((video) => (
                  <div
                    key={video.id}
                    onClick={() => handleVideoClick(video)}
                    className="cursor-pointer group"
                  >
                    <div className={`${video.color} aspect-video metro-tile flex items-center justify-center text-6xl mb-3 shadow-md`}>
                      {video.thumbnail}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-6 h-6 ${mockChannels.find(c => c.name === video.channel)?.color || 'bg-primary'} flex items-center justify-center text-[10px] font-semibold`}>
                        {video.channelAvatar}
                      </div>
                      <h3 className="font-normal line-clamp-2 group-hover:text-primary transition-colors text-base flex-1">
                        {video.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground pl-8">{video.channel}</p>
                    <p className="text-sm text-muted-foreground pl-8">{video.views} • {video.time}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Index;