import { useState, useEffect } from 'react';
import { Home, Search, User, Clock, TrendingUp, Upload, Bookmark, Video, Music, Play, ThumbsUp, ThumbsDown, MessageSquare, Headphones, History, Pause, Volume2, Settings, Maximize, SkipForward, SkipBack, Moon, Sun, Monitor, Smartphone, Mic, LogIn, UserPlus, LogOut, PictureInPicture2, X, Minimize2, Maximize2, Plus, List, Link } from 'lucide-react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';

type Section = 'home' | 'search' | 'channel' | 'subscriptions' | 'history' | 'trending' | 'upload' | 'saved' | 'video' | 'music' | 'podcasts' | 'login' | 'register' | 'playlists' | 'watchlater';
type Theme = 'dark' | 'light';
type ViewMode = 'desktop' | 'mobile';
type VideoQuality = '360p' | '720p' | '1080p';

interface Video {
  id: string;
  title: string;
  channel: string;
  channelAvatar: string;
  channelId: string;
  views: string;
  time: string;
  thumbnail: string;
  color: string;
  likes: string;
  dislikes: string;
  videoUrl?: string;
  duration?: string;
}

interface Channel {
  id: string;
  name: string;
  avatar: string;
  subscribers: number;
  color: string;
}

interface Comment {
  id: string;
  author: string;
  authorId: string;
  text: string;
  time: string;
  avatar: string;
  likes: number;
  imageUrl?: string;
  linkUrl?: string;
  linkText?: string;
  replies?: Comment[];
  parentId?: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  channelDescription: string;
  channelBanner?: string;
  subscribers: number;
  subscribedTo: string[];
  watchHistory: string[];
  playlists: Playlist[];
}

interface Playlist {
  id: string;
  name: string;
  videos: string[];
  thumbnail: string;
}

interface VideoPlayerState {
  videoId: string;
  isPlaying: boolean;
  progress: number;
  volume: number;
  currentTime: number;
  duration: number;
  quality: VideoQuality;
}

const mockVideos: Video[] = [
  { id: '1', title: 'Как создать Metro дизайн', channel: 'Design Channel', channelAvatar: 'DC', channelId: 'ch1', views: '1.2М', time: '2 дня назад', thumbnail: '🎨', color: 'bg-metro-blue', likes: '45К', dislikes: '234', duration: '15:42' },
  { id: '2', title: 'TypeScript для начинающих', channel: 'Code Academy', channelAvatar: 'CA', channelId: 'ch2', views: '856К', time: '1 неделю назад', thumbnail: '💻', color: 'bg-metro-cyan', likes: '32К', dislikes: '120', duration: '22:18' },
  { id: '3', title: 'React hooks подробно', channel: 'Web Dev Pro', channelAvatar: 'WD', channelId: 'ch3', views: '2.1М', time: '3 дня назад', thumbnail: '⚛️', color: 'bg-metro-purple', likes: '89К', dislikes: '456', duration: '18:35' },
  { id: '4', title: 'UX дизайн паттерны', channel: 'UX Master', channelAvatar: 'UX', channelId: 'ch4', views: '654К', time: '5 дней назад', thumbnail: '🎯', color: 'bg-metro-green', likes: '23К', dislikes: '89', duration: '12:47' },
  { id: '5', title: 'CSS Grid и Flexbox', channel: 'Layout School', channelAvatar: 'LS', channelId: 'ch5', views: '1.5М', time: '1 день назад', thumbnail: '📐', color: 'bg-metro-orange', likes: '67К', dislikes: '234', duration: '25:13' },
  { id: '6', title: 'JavaScript ES2024', channel: 'JS Guru', channelAvatar: 'JS', channelId: 'ch6', views: '987К', time: '4 дня назад', thumbnail: '🚀', color: 'bg-metro-red', likes: '41К', dislikes: '178', duration: '19:58' },
  { id: '7', title: 'Анимации в вебе', channel: 'Motion Design', channelAvatar: 'MD', channelId: 'ch7', views: '745К', time: '6 дней назад', thumbnail: '✨', color: 'bg-metro-yellow', likes: '28К', dislikes: '94', duration: '14:22' },
  { id: '8', title: 'База данных SQL', channel: 'Database Pro', channelAvatar: 'DP', channelId: 'ch8', views: '1.8М', time: '2 дня назад', thumbnail: '🗄️', color: 'bg-metro-lime', likes: '73К', dislikes: '312', duration: '31:05' },
];

const mockChannels: Channel[] = [
  { id: '1', name: 'Design Channel', avatar: 'DC', subscribers: 2500000, color: 'bg-metro-blue' },
  { id: '2', name: 'Code Academy', avatar: 'CA', subscribers: 1800000, color: 'bg-metro-cyan' },
  { id: '3', name: 'Web Dev Pro', avatar: 'WD', subscribers: 3200000, color: 'bg-metro-purple' },
  { id: '4', name: 'UX Master', avatar: 'UX', subscribers: 987000, color: 'bg-metro-green' },
];

const mockMusic = [
  { id: '1', artist: 'The Weeknd', avatar: 'TW', color: 'bg-metro-red' },
  { id: '2', artist: 'Billie Eilish', avatar: 'BE', color: 'bg-metro-purple' },
  { id: '3', artist: 'Daft Punk', avatar: 'DP', color: 'bg-metro-cyan' },
];

const trendingYoutubers = ['MrBeast', 'PewDiePie', 'Dude Perfect'];
const searchSuggestions = ['Уроки React', 'Музыка 2024', 'JavaScript'];

const mockComments: Comment[] = [
  { id: '1', author: 'Алексей М.', authorId: 'user1', text: 'Отличное видео! Очень помогло разобраться с темой', time: '2 часа назад', avatar: 'AM', likes: 12, replies: [] },
  { id: '2', author: 'Мария К.', authorId: 'user2', text: 'Спасибо за подробное объяснение. Жду продолжения серии', time: '5 часов назад', avatar: 'МК', likes: 8, replies: [] },
  { id: '3', author: 'Дмитрий П.', authorId: 'user3', text: 'Можно больше примеров кода? Хочется попрактиковаться', time: '1 день назад', avatar: 'ДП', likes: 5, replies: [] },
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
  const [uploadThumbnail, setUploadThumbnail] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [sectionTransition, setSectionTransition] = useState(false);
  const [isEditingChannel, setIsEditingChannel] = useState(false);
  const [channelEditForm, setChannelEditForm] = useState({ description: '', banner: null as File | null });
  const [commentImage, setCommentImage] = useState<File | null>(null);
  const [commentLink, setCommentLink] = useState({ url: '', text: '' });
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [myVideos, setMyVideos] = useState<Video[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [miniPlayer, setMiniPlayer] = useState<{ video: Video; playerState: VideoPlayerState } | null>(null);
  const [videoPlayerStates, setVideoPlayerStates] = useState<Record<string, VideoPlayerState>>({});
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [watchHistory, setWatchHistory] = useState<Video[]>([]);
  const [recommendedVideos, setRecommendedVideos] = useState<Video[]>([]);

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(document.fullscreenElement || 
        (document as any).webkitFullscreenElement || 
        (document as any).msFullscreenElement);
      setIsFullscreen(isCurrentlyFullscreen);
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        handleFullscreen();
      }
      if (currentSection === 'video' && selectedVideo) {
        if (e.key === ' ') {
          e.preventDefault();
          updatePlayerState(selectedVideo.id, { isPlaying: !getPlayerState(selectedVideo.id).isPlaying });
        }
        if (e.key === 'f' || e.key === 'F') {
          handleFullscreen();
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isFullscreen, currentSection, selectedVideo]);

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    setCurrentSection('video');
  };

  const handleAddComment = () => {
    if (newComment.trim() && isLoggedIn && currentUser) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: currentUser.username,
        authorId: currentUser.id,
        text: newComment,
        time: 'только что',
        avatar: currentUser.avatar,
        likes: 0,
        imageUrl: commentImage ? URL.createObjectURL(commentImage) : undefined,
        linkUrl: commentLink.url || undefined,
        linkText: commentLink.text || undefined,
        replies: [],
        parentId: replyingTo || undefined,
      };
      
      if (replyingTo) {
        setComments(comments.map(c => {
          if (c.id === replyingTo) {
            return { ...c, replies: [...(c.replies || []), comment] };
          }
          return c;
        }));
      } else {
        setComments([comment, ...comments]);
      }
      
      setNewComment('');
      setCommentImage(null);
      setCommentLink({ url: '', text: '' });
      setReplyingTo(null);
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
      const existingUser = users.find(u => u.username === loginForm.username);
      if (!existingUser) {
        alert('Пользователь не найден. Пожалуйста, зарегистрируйтесь.');
        return;
      }
      const newUser: User = {
        ...existingUser,
        watchHistory: existingUser.watchHistory || [],
        playlists: existingUser.playlists || [],
      };
      setCurrentUser(newUser);
      setIsLoggedIn(true);
      setCurrentSection('home');
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = () => {
    if (registerForm.username && registerForm.email && registerForm.password) {
      if (!validateEmail(registerForm.email)) {
        alert('Пожалуйста, введите корректный email адрес (например: user@example.com)');
        return;
      }
      
      const existingUser = users.find(u => u.username === registerForm.username);
      if (existingUser) {
        alert('Пользователь с таким ником уже существует. Пожалуйста, выберите другой ник.');
        return;
      }
      
      const existingEmail = users.find(u => u.email === registerForm.email);
      if (existingEmail) {
        alert('Пользователь с таким email уже существует.');
        return;
      }
      
      const newUser: User = {
        id: 'user_' + Date.now(),
        username: registerForm.username,
        email: registerForm.email,
        avatar: registerForm.username.substring(0, 2).toUpperCase(),
        channelDescription: 'Добро пожаловать на мой канал!',
        subscribers: 0,
        subscribedTo: [],
        watchHistory: [],
        playlists: [],
      };
      setUsers([...users, newUser]);
      setCurrentUser(newUser);
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

  const handleUploadVideo = async () => {
    if (uploadFile && uploadForm.title && isLoggedIn && currentUser) {
      if (uploadFile.size > 10 * 1024 * 1024 * 1024) {
        alert('Размер файла превышает 10 ГБ!');
        return;
      }
      
      setIsUploading(true);
      
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setUploadProgress(i);
      }
      
      const newVideo: Video = {
        id: 'video_' + Date.now(),
        title: uploadForm.title,
        channel: currentUser.username,
        channelAvatar: currentUser.avatar,
        channelId: currentUser.id,
        views: '0',
        time: 'только что',
        thumbnail: uploadThumbnail ? '🎬' : '📹',
        color: 'bg-metro-blue',
        likes: '0',
        dislikes: '0',
        duration: '0:00',
      };
      
      setMyVideos([newVideo, ...myVideos]);
      alert(`Видео "${uploadForm.title}" успешно загружено!`);
      
      setUploadFile(null);
      setUploadThumbnail(null);
      setUploadForm({ title: '', description: '' });
      setUploadProgress(0);
      setIsUploading(false);
      handleSectionChange('channel');
    }
  };
  
  const handleSubscribe = (channelId: string) => {
    if (!isLoggedIn || !currentUser) return;
    
    const isSubscribed = currentUser.subscribedTo.includes(channelId);
    
    if (isSubscribed) {
      setCurrentUser({
        ...currentUser,
        subscribedTo: currentUser.subscribedTo.filter(id => id !== channelId),
      });
    } else {
      setCurrentUser({
        ...currentUser,
        subscribedTo: [...currentUser.subscribedTo, channelId],
      });
    }
  };
  
  const handleDeleteComment = (commentId: string) => {
    setComments(comments.filter(c => c.id !== commentId));
  };
  
  const handleDeleteVideo = (videoId: string) => {
    setMyVideos(myVideos.filter(v => v.id !== videoId));
  };
  
  const handleSaveChannelEdit = async () => {
    if (!currentUser) return;
    
    const updatedUser: User = {
      ...currentUser,
      channelDescription: channelEditForm.description || currentUser.channelDescription,
      channelBanner: channelEditForm.banner ? URL.createObjectURL(channelEditForm.banner) : currentUser.channelBanner,
    };
    
    setCurrentUser(updatedUser);
    setIsEditingChannel(false);
  };
  
  const formatSubscribers = (count: number): string => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}М`;
    if (count >= 1000) return `${(count / 1000).toFixed(0)}К`;
    return count.toString();
  };

  const getPlayerState = (videoId: string): VideoPlayerState => {
    return videoPlayerStates[videoId] || {
      videoId,
      isPlaying: false,
      progress: 0,
      volume: 80,
      currentTime: 0,
      duration: 0,
      quality: '1080p',
    };
  };

  const updatePlayerState = (videoId: string, updates: Partial<VideoPlayerState>) => {
    setVideoPlayerStates(prev => ({
      ...prev,
      [videoId]: { ...getPlayerState(videoId), ...updates },
    }));
  };

  const handleOpenMiniPlayer = () => {
    if (selectedVideo) {
      setMiniPlayer({
        video: selectedVideo,
        playerState: getPlayerState(selectedVideo.id),
      });
      setCurrentSection('home');
    }
  };

  const handleCloseMiniPlayer = () => {
    setMiniPlayer(null);
  };

  const handleFullscreen = () => {
    const elem = document.documentElement;
    
    if (!isFullscreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if ((elem as any).webkitRequestFullscreen) {
        (elem as any).webkitRequestFullscreen();
      } else if ((elem as any).msRequestFullscreen) {
        (elem as any).msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const addToWatchHistory = (video: Video) => {
    if (!isLoggedIn || !currentUser) return;
    const exists = watchHistory.some(v => v.id === video.id);
    if (!exists) {
      setWatchHistory([video, ...watchHistory.slice(0, 49)]);
    }
  };

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim() && isLoggedIn) {
      const newPlaylist: Playlist = {
        id: 'playlist_' + Date.now(),
        name: newPlaylistName,
        videos: [],
        thumbnail: '📋',
      };
      setPlaylists([...playlists, newPlaylist]);
      setNewPlaylistName('');
      setShowPlaylistMenu(false);
    }
  };

  const handleAddToPlaylist = (playlistId: string, videoId: string) => {
    setPlaylists(playlists.map(p => 
      p.id === playlistId 
        ? { ...p, videos: [...p.videos, videoId] }
        : p
    ));
  };

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const videoFormats = ['video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov', 'video/mkv', 'video/flv', 'video/wmv', 'video/m4v'];
      if (videoFormats.some(format => file.type.includes(format.split('/')[1]) || file.name.toLowerCase().endsWith('.' + format.split('/')[1]))) {
        setUploadFile(file);
      } else {
        alert('Поддерживаются форматы: MP4, WebM, OGG, AVI, MOV, MKV, FLV, WMV, M4V');
      }
    }
  };

  const handleCommentImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        alert('Размер изображения не должен превышать 100 МБ!');
        return;
      }
      const imageFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/svg+xml'];
      if (imageFormats.includes(file.type)) {
        setCommentImage(file);
      } else {
        alert('Поддерживаются форматы: JPG, JPEG, PNG, GIF, WEBP, BMP, SVG');
      }
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/svg+xml'];
      if (imageFormats.includes(file.type)) {
        setUploadThumbnail(file);
      } else {
        alert('Поддерживаются форматы: JPG, JPEG, PNG, GIF, WEBP, BMP, SVG');
      }
    }
  };

  useEffect(() => {
    if (selectedVideo) {
      addToWatchHistory(selectedVideo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVideo?.id]);

  useEffect(() => {
    const recommended = mockVideos.filter(v => 
      v.id !== selectedVideo?.id && 
      Math.random() > 0.3
    ).slice(0, 8);
    setRecommendedVideos(recommended);
     
  }, [selectedVideo?.id]);

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
        <div className={`container mx-auto flex items-center gap-3 md:gap-6 ${viewMode === 'mobile' ? 'px-3 py-2' : 'px-6 py-3'}`}>
          <button 
            onClick={() => setCurrentSection('home')}
            className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity group"
          >
            <div className={`${viewMode === 'mobile' ? 'w-10 h-10 text-xl' : 'w-12 h-12 text-2xl'} bg-primary flex items-center justify-center overflow-hidden relative`}>
              <div className="tile-content absolute inset-0 flex items-center justify-center">📺</div>
            </div>
            <div className="text-left">
              <h1 className={`${viewMode === 'mobile' ? 'text-lg' : 'text-2xl'} font-light tracking-wide`}>MetroTube</h1>
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
                className={`w-full bg-muted/50 border-2 border-border hover:border-primary focus:border-primary transition-colors ${viewMode === 'mobile' ? 'h-9 text-sm' : 'h-11'}`}
              />
              <Button size="sm" className={`absolute right-1 top-1 bg-primary hover:bg-primary/90 ${viewMode === 'mobile' ? 'h-7' : 'h-9'}`}>
                <Icon name="Search" size={14} />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className={`bg-muted/50 hover:brightness-110 transition-all ${viewMode === 'mobile' ? 'px-2 py-1.5' : 'px-3 py-2'}`}>
              <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} size={viewMode === 'mobile' ? 16 : 20} />
            </button>
            <button onClick={() => setViewMode(viewMode === 'desktop' ? 'mobile' : 'desktop')} className={`bg-muted/50 hover:brightness-110 transition-all ${viewMode === 'mobile' ? 'px-2 py-1.5' : 'px-3 py-2'}`}>
              <Icon name={viewMode === 'desktop' ? 'Smartphone' : 'Monitor'} size={viewMode === 'mobile' ? 16 : 20} />
            </button>
            {isLoggedIn ? (
              <div className="flex items-center gap-1 md:gap-2">
                <div className={`bg-metro-green flex items-center gap-2 ${viewMode === 'mobile' ? 'px-2 py-1.5' : 'px-4 py-2'}`}>
                  <div className={`${viewMode === 'mobile' ? 'w-6 h-6 text-[10px]' : 'w-8 h-8 text-xs'} bg-white/20 flex items-center justify-center font-semibold`}>
                    {currentUser?.avatar}
                  </div>
                  {viewMode === 'desktop' && <span className="font-medium">{currentUser?.username}</span>}
                </div>
                <button onClick={handleLogout} className={`bg-destructive hover:brightness-110 transition-all ${viewMode === 'mobile' ? 'px-2 py-1.5' : 'px-3 py-2'}`}>
                  <Icon name="LogOut" size={viewMode === 'mobile' ? 16 : 20} />
                </button>
              </div>
            ) : (
              <button onClick={() => handleSectionChange('login')} className={`bg-metro-green hover:brightness-110 transition-all flex items-center gap-2 ${viewMode === 'mobile' ? 'px-2 py-1.5' : 'px-4 py-2'}`}>
                <Icon name="LogIn" size={viewMode === 'mobile' ? 16 : 20} />
                {viewMode === 'desktop' && <span className="font-medium">Войти</span>}
              </button>
            )}
          </div>
        </div>
      </header>

      <div className={`container mx-auto ${viewMode === 'mobile' ? 'px-3 py-3' : 'px-6 py-6'}`}>
        <div className={`grid mb-8 auto-rows-fr ${viewMode === 'mobile' ? 'grid-cols-2 gap-2' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 gap-3'}`}>
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
                <div className={`relative group bg-black ${isFullscreen ? 'fixed inset-0 z-50 flex items-center justify-center' : ''}`}>
                  <div className={`${selectedVideo.color} ${isFullscreen ? 'w-full h-full' : 'aspect-video'} flex items-center justify-center ${isFullscreen ? 'text-[20rem]' : 'text-9xl'} shadow-lg cursor-pointer relative`}
                    onClick={() => updatePlayerState(selectedVideo.id, { isPlaying: !getPlayerState(selectedVideo.id).isPlaying })}
                  >
                    {getPlayerState(selectedVideo.id).isPlaying ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        {selectedVideo.thumbnail}
                        <div className="absolute inset-0 bg-black/40" />
                      </div>
                    ) : (
                      <>
                        {selectedVideo.thumbnail}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-white/90 rounded-full p-4">
                            <Icon name="Play" size={isFullscreen ? 64 : 48} className="text-black" />
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
                        updatePlayerState(selectedVideo.id, { progress: percent });
                      }}>
                        <div className="absolute h-full bg-primary transition-all" style={{ width: `${getPlayerState(selectedVideo.id).progress}%` }} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button onClick={() => updatePlayerState(selectedVideo.id, { isPlaying: !getPlayerState(selectedVideo.id).isPlaying })} className="metro-control w-10 h-10">
                            <Icon name={getPlayerState(selectedVideo.id).isPlaying ? 'Pause' : 'Play'} size={20} />
                          </button>
                          <button onClick={() => updatePlayerState(selectedVideo.id, { progress: Math.max(getPlayerState(selectedVideo.id).progress - 10, 0) })} className="metro-control w-8 h-8">
                            <Icon name="SkipBack" size={16} />
                          </button>
                          <button onClick={() => updatePlayerState(selectedVideo.id, { progress: Math.min(getPlayerState(selectedVideo.id).progress + 10, 100) })} className="metro-control w-8 h-8">
                            <Icon name="SkipForward" size={16} />
                          </button>
                          <div className="flex items-center gap-2 bg-black/50 px-3 py-2">
                            <button className="metro-control w-7 h-7">
                              <Icon name="Volume2" size={14} />
                            </button>
                            <input 
                              type="range" 
                              min="0" 
                              max="100" 
                              value={getPlayerState(selectedVideo.id).volume} 
                              onChange={(e) => updatePlayerState(selectedVideo.id, { volume: Number(e.target.value) })}
                              className="w-20 h-1 accent-primary cursor-pointer"
                            />
                            <span className="text-white text-xs w-8 font-medium">{getPlayerState(selectedVideo.id).volume}%</span>
                          </div>
                          <button onClick={handleOpenMiniPlayer} className="metro-control w-8 h-8" title="Мини-плеер">
                            <Icon name="PictureInPicture2" size={16} />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-white text-sm font-medium bg-black/50 px-3 py-1">{Math.floor(getPlayerState(selectedVideo.id).progress / 100 * 10)}:{Math.floor((getPlayerState(selectedVideo.id).progress / 100 * 600) % 60).toString().padStart(2, '0')} / {selectedVideo.duration || '10:00'}</span>
                          <div className="relative">
                            <button onClick={() => setShowQualityMenu(!showQualityMenu)} className="metro-control w-8 h-8">
                              <Icon name="Settings" size={16} />
                            </button>
                            {showQualityMenu && (
                              <div className="absolute bottom-full right-0 mb-2 bg-black/90 border border-white/20 p-2 space-y-1 z-50">
                                <div className="text-white text-xs mb-2 px-2">Качество</div>
                                {(['360p', '720p', '1080p'] as VideoQuality[]).map(q => (
                                  <button
                                    key={q}
                                    onClick={() => { updatePlayerState(selectedVideo.id, { quality: q }); setShowQualityMenu(false); }}
                                    className={`w-full px-4 py-1 text-sm text-left ${getPlayerState(selectedVideo.id).quality === q ? 'bg-primary text-white' : 'text-white/80 hover:bg-white/10'}`}
                                  >
                                    {q}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          <button onClick={handleFullscreen} className="metro-control w-8 h-8">
                            <Icon name={isFullscreen ? 'Minimize2' : 'Maximize'} size={16} />
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
                        <div className="text-sm text-muted-foreground">
                          {formatSubscribers(mockChannels.find(c => c.name === selectedVideo.channel)?.subscribers || 0)} подписчиков
                        </div>
                      </div>
                    </div>
                    {isLoggedIn && currentUser && (
                      <button 
                        onClick={() => handleSubscribe(mockChannels.find(c => c.name === selectedVideo.channel)?.id || '')}
                        className={`ml-auto px-6 py-2 hover:brightness-110 transition-all font-medium ${
                          currentUser.subscribedTo.includes(mockChannels.find(c => c.name === selectedVideo.channel)?.id || '') 
                            ? 'bg-muted/50' 
                            : 'bg-metro-green'
                        }`}
                      >
                        {currentUser.subscribedTo.includes(mockChannels.find(c => c.name === selectedVideo.channel)?.id || '') 
                          ? 'Отписаться' 
                          : 'Подписаться'}
                      </button>
                    )}
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
                          {replyingTo && (
                            <div className="bg-muted/30 p-2 flex items-center justify-between text-sm">
                              <span>Ответ на комментарий</span>
                              <button onClick={() => setReplyingTo(null)} className="text-destructive hover:brightness-110">
                                <Icon name="X" size={16} />
                              </button>
                            </div>
                          )}
                          <Textarea
                            placeholder="Добавить комментарий..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="bg-muted/50 border-2 border-border focus:border-primary resize-none transition-colors"
                            rows={2}
                          />
                          {commentImage && (
                            <div className="relative inline-block">
                              <img src={URL.createObjectURL(commentImage)} alt="preview" className="max-w-xs h-20 object-cover" />
                              <button onClick={() => setCommentImage(null)} className="absolute top-0 right-0 bg-destructive p-1">
                                <Icon name="X" size={12} />
                              </button>
                            </div>
                          )}
                          {commentLink.url && (
                            <div className="text-xs text-primary">
                              Ссылка: {commentLink.text || commentLink.url}
                            </div>
                          )}
                          <div className="flex gap-3 justify-between">
                            <div className="flex gap-2">
                              <label className="cursor-pointer px-3 py-1.5 bg-muted/50 hover:bg-muted transition-colors text-sm flex items-center gap-1">
                                <Icon name="Image" size={14} />
                                <span>Фото</span>
                                <input 
                                  type="file" 
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file && file.size <= 100 * 1024 * 1024) {
                                      setCommentImage(file);
                                    } else {
                                      alert('Размер файла превышает 100 МБ!');
                                    }
                                  }}
                                  className="hidden"
                                />
                              </label>
                              <button
                                onClick={() => {
                                  const url = prompt('Введите URL ссылки:');
                                  const text = prompt('Текст ссылки (необязательно):');
                                  if (url) setCommentLink({ url, text: text || '' });
                                }}
                                className="px-3 py-1.5 bg-muted/50 hover:bg-muted transition-colors text-sm flex items-center gap-1"
                              >
                                <Icon name="Link" size={14} />
                                <span>Ссылка</span>
                              </button>
                            </div>
                            <div className="flex gap-3">
                              <button
                                onClick={() => {
                                  setNewComment('');
                                  setCommentImage(null);
                                  setCommentLink({ url: '', text: '' });
                                  setReplyingTo(null);
                                }}
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
                        <div key={comment.id} className="space-y-3">
                          <div className="flex gap-3 pb-4 border-b border-border/50">
                            <div className="w-10 h-10 bg-accent flex items-center justify-center text-xs font-semibold flex-shrink-0">
                              {comment.avatar}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="font-semibold text-base">{comment.author}</span>
                                <span className="text-xs text-muted-foreground">{comment.time}</span>
                              </div>
                              <p className="text-foreground/90 leading-relaxed mb-3">{comment.text}</p>
                              {comment.imageUrl && (
                                <img src={comment.imageUrl} alt="comment" className="max-w-md mb-3 border border-border" />
                              )}
                              {comment.linkUrl && (
                                <a href={comment.linkUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:brightness-110 text-sm flex items-center gap-1 mb-3">
                                  <Icon name="Link" size={14} />
                                  {comment.linkText || comment.linkUrl}
                                </a>
                              )}
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
                                  onClick={() => setReplyingTo(comment.id)}
                                  disabled={!isLoggedIn}
                                  className="px-3 py-1 hover:bg-muted/50 transition-colors text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  Ответить
                                </button>
                                {isLoggedIn && currentUser && comment.authorId === currentUser.id && (
                                  <button 
                                    onClick={() => handleDeleteComment(comment.id)}
                                    className="px-3 py-1 text-destructive hover:bg-destructive/10 transition-colors text-xs"
                                  >
                                    Удалить
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                          {comment.replies && comment.replies.length > 0 && (
                            <div className="ml-12 space-y-3">
                              {comment.replies.map((reply) => (
                                <div key={reply.id} className="flex gap-3 pb-3 border-b border-border/30">
                                  <div className="w-8 h-8 bg-accent flex items-center justify-center text-xs font-semibold flex-shrink-0">
                                    {reply.avatar}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="font-semibold text-sm">{reply.author}</span>
                                      <span className="text-xs text-muted-foreground">{reply.time}</span>
                                    </div>
                                    <p className="text-sm text-foreground/90 leading-relaxed mb-2">{reply.text}</p>
                                    {reply.imageUrl && (
                                      <img src={reply.imageUrl} alt="reply" className="max-w-xs mb-2 border border-border" />
                                    )}
                                    {reply.linkUrl && (
                                      <a href={reply.linkUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:brightness-110 text-xs flex items-center gap-1 mb-2">
                                        <Icon name="Link" size={12} />
                                        {reply.linkText || reply.linkUrl}
                                      </a>
                                    )}
                                    <div className="flex gap-3">
                                      <button 
                                        onClick={() => handleCommentLike(reply.id)}
                                        disabled={!isLoggedIn}
                                        className="flex items-center gap-1 px-2 py-0.5 hover:bg-muted/50 transition-colors disabled:opacity-50 text-xs"
                                      >
                                        <Icon name="ThumbsUp" size={14} />
                                        <span>{reply.likes}</span>
                                      </button>
                                      {isLoggedIn && currentUser && reply.authorId === currentUser.id && (
                                        <button 
                                          onClick={() => handleDeleteComment(reply.id)}
                                          className="px-2 py-0.5 text-destructive hover:bg-destructive/10 transition-colors text-xs"
                                        >
                                          Удалить
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
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

            {currentSection === 'history' ? (
              <div className="space-y-6">
                {!isLoggedIn ? (
                  <div className="bg-card/30 p-12 text-center border border-border">
                    <Icon name="Clock" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">Войдите, чтобы увидеть историю просмотров</p>
                    <button onClick={() => handleSectionChange('login')} className="bg-primary px-6 py-2 hover:brightness-110 transition-all">
                      Войти
                    </button>
                  </div>
                ) : watchHistory.length === 0 ? (
                  <div className="bg-card/30 p-12 text-center border border-border">
                    <Icon name="Clock" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">История просмотров пуста</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {watchHistory.map((video) => (
                      <div
                        key={video.id}
                        onClick={() => handleVideoClick(video)}
                        className="flex gap-4 cursor-pointer hover:bg-muted/30 p-4 transition-colors border-l-2 border-transparent hover:border-primary"
                      >
                        <div className={`${video.color} w-48 aspect-video flex items-center justify-center text-4xl flex-shrink-0`}>
                          {video.thumbnail}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-normal text-lg mb-2">{video.title}</h4>
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`w-6 h-6 ${mockChannels.find(c => c.name === video.channel)?.color || 'bg-primary'} flex items-center justify-center text-xs font-semibold`}>
                              {video.channelAvatar}
                            </div>
                            <span className="text-sm text-muted-foreground">{video.channel}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{video.views} просмотров • {video.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : currentSection === 'playlists' ? (
              <div className="space-y-6">
                {!isLoggedIn ? (
                  <div className="bg-card/30 p-12 text-center border border-border">
                    <Icon name="List" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">Войдите, чтобы создавать плейлисты</p>
                    <button onClick={() => handleSectionChange('login')} className="bg-primary px-6 py-2 hover:brightness-110 transition-all">
                      Войти
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-light">Мои плейлисты</h3>
                      <button 
                        onClick={() => setShowPlaylistMenu(true)} 
                        className="bg-primary px-4 py-2 hover:brightness-110 transition-all flex items-center gap-2"
                      >
                        <Icon name="Plus" size={18} />
                        Создать плейлист
                      </button>
                    </div>
                    {showPlaylistMenu && (
                      <div className="bg-card/50 border border-border p-4">
                        <Input 
                          value={newPlaylistName}
                          onChange={(e) => setNewPlaylistName(e.target.value)}
                          placeholder="Название плейлиста"
                          className="mb-3"
                        />
                        <div className="flex gap-2">
                          <Button onClick={handleCreatePlaylist} disabled={!newPlaylistName.trim()}>
                            Создать
                          </Button>
                          <Button variant="outline" onClick={() => { setShowPlaylistMenu(false); setNewPlaylistName(''); }}>
                            Отмена
                          </Button>
                        </div>
                      </div>
                    )}
                    {playlists.length === 0 ? (
                      <div className="bg-card/30 p-12 text-center border border-border">
                        <Icon name="List" size={48} className="mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">У вас пока нет плейлистов</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {playlists.map((playlist) => (
                          <div
                            key={playlist.id}
                            className="cursor-pointer hover:brightness-110 transition-all"
                          >
                            <div className="bg-metro-purple aspect-video flex flex-col items-center justify-center text-6xl mb-3">
                              {playlist.thumbnail}
                            </div>
                            <h4 className="font-normal text-lg mb-1">{playlist.name}</h4>
                            <p className="text-sm text-muted-foreground">{playlist.videos.length} видео</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : currentSection === 'podcasts' ? (
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
                  {myVideos.length === 0 ? (
                    <div className="bg-card/30 p-12 text-center border border-border">
                      <Icon name="Video" size={48} className="mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground mb-4">У вас пока нет видео</p>
                      <button onClick={() => handleSectionChange('upload')} className="bg-primary px-6 py-2 hover:brightness-110 transition-all">
                        Загрузить первое видео
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {myVideos.map((video) => (
                        <div
                          key={video.id}
                          className="cursor-pointer group relative"
                        >
                          <div onClick={() => handleVideoClick(video)} className={`${video.color} aspect-video metro-tile flex items-center justify-center text-6xl mb-3 shadow-md`}>
                            {video.thumbnail}
                          </div>
                          <h3 className="font-normal mb-1 line-clamp-2 group-hover:text-primary transition-colors text-base">
                            {video.title}
                          </h3>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{video.views} просмотров</span>
                              <span>•</span>
                              <span>{video.time}</span>
                            </div>
                            <button 
                              onClick={() => handleDeleteVideo(video.id)}
                              className="text-destructive hover:brightness-110 text-xs px-2 py-1"
                            >
                              Удалить
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
                        <p className="text-sm text-muted-foreground">{formatSubscribers(channel.subscribers)} подписчиков</p>
                      </div>
                      {isLoggedIn && currentUser && (
                        <button 
                          onClick={() => handleSubscribe(channel.id)}
                          className={`px-4 py-1.5 text-sm hover:brightness-110 transition-all w-full ${
                            currentUser.subscribedTo.includes(channel.id) ? 'bg-muted/50' : 'bg-metro-green'
                          }`}
                        >
                          {currentUser.subscribedTo.includes(channel.id) ? 'Отписаться' : 'Подписаться'}
                        </button>
                      )}
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
            ) : currentSection === 'login' ? (
              <div className="max-w-md mx-auto">
                <div className="bg-card/30 border-2 border-border p-8 space-y-6">
                  <div className="text-center">
                    <h3 className="text-3xl font-light mb-2">Вход в MetroTube</h3>
                    <p className="text-sm text-muted-foreground">Введите свои данные для входа</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Логин</label>
                      <Input 
                        value={loginForm.username}
                        onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                        placeholder="Введите логин"
                        className="bg-muted/50 border-2 border-border focus:border-primary h-11"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Пароль</label>
                      <Input 
                        type="password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                        placeholder="Введите пароль"
                        className="bg-muted/50 border-2 border-border focus:border-primary h-11"
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={handleLogin}
                    disabled={!loginForm.username || !loginForm.password}
                    className="w-full h-11 bg-primary hover:bg-primary/90"
                  >
                    Войти
                  </Button>
                  <div className="text-center text-sm">
                    <span className="text-muted-foreground">Нет аккаунта? </span>
                    <button onClick={() => handleSectionChange('register')} className="text-primary hover:brightness-110">
                      Зарегистрироваться
                    </button>
                  </div>
                </div>
              </div>
            ) : currentSection === 'register' ? (
              <div className="max-w-md mx-auto">
                <div className="bg-card/30 border-2 border-border p-8 space-y-6">
                  <div className="text-center">
                    <h3 className="text-3xl font-light mb-2">Регистрация</h3>
                    <p className="text-sm text-muted-foreground">Создайте новый аккаунт</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Логин</label>
                      <Input 
                        value={registerForm.username}
                        onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
                        placeholder="Придумайте логин"
                        className="bg-muted/50 border-2 border-border focus:border-primary h-11"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input 
                        type="email"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                        placeholder="example@mail.com"
                        className="bg-muted/50 border-2 border-border focus:border-primary h-11"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Введите настоящий email адрес</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Пароль</label>
                      <Input 
                        type="password"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                        placeholder="Придумайте пароль"
                        className="bg-muted/50 border-2 border-border focus:border-primary h-11"
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={handleRegister}
                    disabled={!registerForm.username || !registerForm.email || !registerForm.password}
                    className="w-full h-11 bg-primary hover:bg-primary/90"
                  >
                    Зарегистрироваться
                  </Button>
                  <div className="text-center text-sm">
                    <span className="text-muted-foreground">Уже есть аккаунт? </span>
                    <button onClick={() => handleSectionChange('login')} className="text-primary hover:brightness-110">
                      Войти
                    </button>
                  </div>
                </div>
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
                        <h3 className="text-xl font-light mb-2">Загрузите видео (до 10 ГБ)</h3>
                        <p className="text-sm text-muted-foreground">Перетащите файл или нажмите для выбора</p>
                        {uploadFile && (
                          <div className="mt-3">
                            <p className="text-sm text-primary">Выбран: {uploadFile.name}</p>
                            <p className="text-xs text-muted-foreground">Размер: {(uploadFile.size / (1024 * 1024)).toFixed(2)} МБ</p>
                          </div>
                        )}
                      </div>
                      <input 
                        type="file" 
                        accept="video/*,.mp4,.webm,.ogg,.avi,.mov,.mkv,.flv,.wmv,.m4v"
                        onChange={handleVideoFileChange}
                        className="hidden"
                        id="video-upload"
                      />
                      <label htmlFor="video-upload" className="bg-primary px-8 py-3 hover:brightness-110 transition-all font-medium inline-block cursor-pointer">
                        Выбрать видеофайл
                      </label>
                      {uploadFile && !uploadThumbnail && (
                        <div className="mt-4">
                          <input 
                            type="file" 
                            accept="image/*,.jpg,.jpeg,.png,.gif,.webp,.bmp,.svg"
                            onChange={handleThumbnailChange}
                            className="hidden"
                            id="thumbnail-upload"
                          />
                          <label htmlFor="thumbnail-upload" className="bg-metro-cyan px-6 py-2 hover:brightness-110 transition-all text-sm inline-block cursor-pointer">
                            Добавить превью
                          </label>
                        </div>
                      )}
                      {uploadThumbnail && (
                        <div className="mt-3">
                          <p className="text-sm text-metro-cyan">Превью: {uploadThumbnail.name}</p>
                          <button onClick={() => setUploadThumbnail(null)} className="text-xs text-destructive mt-1">Удалить</button>
                        </div>
                      )}
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
                      {isUploading && (
                        <div className="space-y-2">
                          <div className="w-full h-2 bg-muted/50">
                            <div 
                              className="h-full bg-primary transition-all duration-300" 
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                          <p className="text-sm text-center text-muted-foreground">
                            Загрузка: {uploadProgress}%
                          </p>
                        </div>
                      )}
                      <Button 
                        onClick={handleUploadVideo}
                        disabled={!uploadFile || !uploadForm.title || isUploading}
                        className="w-full h-12 text-base bg-primary hover:bg-primary/90 disabled:opacity-50"
                      >
                        {isUploading ? 'Загрузка...' : 'Опубликовать видео'}
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

      {miniPlayer && (
        <div className="fixed bottom-4 right-4 w-96 bg-background border-2 border-primary shadow-2xl z-50 overflow-hidden">
          <div className="relative group">
            <div className={`${miniPlayer.video.color} aspect-video flex items-center justify-center text-4xl relative`}>
              {miniPlayer.video.thumbnail}
              <button 
                onClick={handleCloseMiniPlayer}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 w-8 h-8 flex items-center justify-center transition-all"
              >
                <Icon name="X" size={16} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-2">
                <div className="space-y-2">
                  <div className="relative h-1 bg-white/30 cursor-pointer" onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const percent = ((e.clientX - rect.left) / rect.width) * 100;
                    updatePlayerState(miniPlayer.video.id, { progress: percent });
                  }}>
                    <div className="absolute h-full bg-primary transition-all" style={{ width: `${getPlayerState(miniPlayer.video.id).progress}%` }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => updatePlayerState(miniPlayer.video.id, { isPlaying: !getPlayerState(miniPlayer.video.id).isPlaying })} 
                        className="bg-white hover:bg-gray-200 w-7 h-7 flex items-center justify-center transition-all"
                      >
                        <Icon name={getPlayerState(miniPlayer.video.id).isPlaying ? 'Pause' : 'Play'} size={14} className="text-black" />
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedVideo(miniPlayer.video);
                          setCurrentSection('video');
                          setMiniPlayer(null);
                        }}
                        className="bg-white hover:bg-gray-200 w-7 h-7 flex items-center justify-center transition-all"
                      >
                        <Icon name="Maximize2" size={14} className="text-black" />
                      </button>
                    </div>
                    <span className="text-white text-xs font-medium">{miniPlayer.video.title.slice(0, 20)}...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;