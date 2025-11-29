import { useState } from 'react';
import { Home, Search, User, Clock, TrendingUp, Upload, Bookmark, Video, Music, Play, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';

type Section = 'home' | 'search' | 'channel' | 'subscriptions' | 'history' | 'trending' | 'upload' | 'saved' | 'video' | 'music';

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
  { id: '1', author: 'Алексей М.', text: 'Отличное видео! Очень помогло разобраться с темой', time: '2 часа назад', avatar: 'AM' },
  { id: '2', author: 'Мария К.', text: 'Спасибо за подробное объяснение. Жду продолжения серии', time: '5 часов назад', avatar: 'МК' },
  { id: '3', author: 'Дмитрий П.', text: 'Можно больше примеров кода? Хочется попрактиковаться', time: '1 день назад', avatar: 'ДП' },
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

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    setCurrentSection('video');
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: 'Вы',
        text: newComment,
        time: 'только что',
        avatar: 'ВЫ',
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  const navItems = [
    { 
      id: 'home' as Section, 
      icon: Home, 
      label: 'Главная', 
      color: 'bg-metro-blue', 
      size: 'logo',
      content: <div className="text-5xl">📺</div>
    },
    { 
      id: 'search' as Section, 
      icon: Search, 
      label: 'Поиск', 
      color: 'bg-metro-cyan', 
      size: 'normal',
      content: <div className="text-xs mt-2 opacity-80">{searchSuggestions[Math.floor(Math.random() * searchSuggestions.length)]}</div>
    },
    { 
      id: 'channel' as Section, 
      icon: User, 
      label: 'Мой канал', 
      color: 'bg-metro-purple', 
      size: 'wide',
      content: null
    },
    { 
      id: 'subscriptions' as Section, 
      icon: Video, 
      label: 'Подписки', 
      color: 'bg-metro-green', 
      size: 'normal',
      content: <div className="text-xs mt-2 opacity-80 text-center">{mockChannels[0].name}</div>
    },
    { 
      id: 'music' as Section, 
      icon: Music, 
      label: 'Музыка', 
      color: 'bg-metro-orange', 
      size: 'normal',
      content: <div className="text-xs mt-2 opacity-80">{mockMusic[Math.floor(Math.random() * mockMusic.length)].artist}</div>
    },
    { 
      id: 'trending' as Section, 
      icon: TrendingUp, 
      label: 'Рекомендации', 
      color: 'bg-metro-red', 
      size: 'wide',
      content: <div className="text-xs mt-2 opacity-80">{trendingYoutubers[0]}, {trendingYoutubers[1]}</div>
    },
    { 
      id: 'upload' as Section, 
      icon: Upload, 
      label: 'Загрузить', 
      color: 'bg-metro-yellow', 
      size: 'normal',
      content: null
    },
    { 
      id: 'saved' as Section, 
      icon: Bookmark, 
      label: 'Сохраненные', 
      color: 'bg-metro-lime', 
      size: 'normal',
      content: null
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
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
          <div className="bg-metro-green px-4 py-2 hover:brightness-110 transition-all cursor-pointer flex items-center gap-2">
            <Icon name="User" size={20} />
            <span className="font-medium">Аккаунт</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 gap-3 mb-8 auto-rows-fr">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setCurrentSection(item.id)}
              className={`${item.color} metro-tile live-tile ${
                item.size === 'wide' ? 'col-span-2' : item.size === 'logo' ? 'col-span-2 row-span-2' : ''
              } aspect-square flex flex-col items-center justify-center gap-2 text-white font-light text-lg relative overflow-hidden ${
                currentSection === item.id ? 'ring-4 ring-primary/50 brightness-125' : ''
              }`}
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              {item.size === 'logo' ? (
                <div className="tile-content w-full h-full flex flex-col items-center justify-center">
                  {item.content}
                  <span className="text-xl font-normal mt-2">{item.label}</span>
                </div>
              ) : (
                <div className="tile-content w-full h-full flex flex-col items-center justify-center gap-2 px-3">
                  <Icon name={item.icon.name as any} size={item.size === 'wide' ? 36 : 32} />
                  <span className="text-sm font-normal">{item.label}</span>
                  {item.content && <div className="w-full">{item.content}</div>}
                </div>
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
              onClick={() => setCurrentSection('home')}
              className="flex items-center gap-2 text-primary hover:brightness-125 transition-all mb-4 text-lg"
            >
              <Icon name="ArrowLeft" size={20} />
              <span className="font-light">Назад к списку</span>
            </button>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="relative group">
                  <div className={`${selectedVideo.color} aspect-video flex items-center justify-center text-9xl shadow-lg cursor-pointer`}
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? (
                      <Icon name="Pause" size={64} className="text-white/80" />
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
                </div>

                <div className="space-y-4">
                  <h2 className="text-3xl font-light">{selectedVideo.title}</h2>
                  
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <span className="text-sm text-muted-foreground">{selectedVideo.views} просмотров • {selectedVideo.time}</span>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => { setIsLiked(!isLiked); setIsDisliked(false); }}
                        className={`flex items-center gap-2 px-4 py-2 ${
                          isLiked ? 'bg-primary' : 'bg-muted/50'
                        } hover:brightness-110 transition-all`}
                      >
                        <Icon name="ThumbsUp" size={18} />
                        <span className="text-sm font-medium">{selectedVideo.likes}</span>
                      </button>
                      <button 
                        onClick={() => { setIsDisliked(!isDisliked); setIsLiked(false); }}
                        className={`flex items-center gap-2 px-4 py-2 ${
                          isDisliked ? 'bg-destructive' : 'bg-muted/50'
                        } hover:brightness-110 transition-all`}
                      >
                        <Icon name="ThumbsDown" size={18} />
                        <span className="text-sm font-medium">{selectedVideo.dislikes}</span>
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
                    <div className="flex gap-3">
                      <div className="w-10 h-10 bg-secondary flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        ВЫ
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
                              <button className="flex items-center gap-2 px-3 py-1 hover:bg-muted/50 transition-colors">
                                <Icon name="ThumbsUp" size={16} />
                                <span className="text-xs">12</span>
                              </button>
                              <button className="flex items-center gap-2 px-3 py-1 hover:bg-muted/50 transition-colors">
                                <Icon name="ThumbsDown" size={16} />
                              </button>
                              <button className="px-3 py-1 hover:bg-muted/50 transition-colors text-xs">
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

            {currentSection === 'channel' ? (
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
                <div className="text-muted-foreground text-lg font-light">
                  {searchQuery ? `Результаты поиска: "${searchQuery}"` : 'Введите запрос для поиска видео'}
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
                        <h3 className="font-normal mb-1 line-clamp-2 group-hover:text-primary transition-colors text-base">
                          {video.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{video.channel}</p>
                        <p className="text-sm text-muted-foreground">{video.views} • {video.time}</p>
                      </div>
                    ))}
                </div>
              </div>
            ) : currentSection === 'upload' ? (
              <div className="max-w-3xl mx-auto">
                <div className="bg-card/30 border-2 border-border p-8 space-y-6">
                  <div className="border-2 border-dashed border-primary/50 p-16 text-center space-y-4 hover:border-primary transition-colors cursor-pointer bg-muted/20">
                    <Icon name="Upload" size={64} className="mx-auto text-primary" />
                    <div>
                      <h3 className="text-xl font-light mb-2">Загрузите видео</h3>
                      <p className="text-sm text-muted-foreground">Перетащите файл или нажмите для выбора</p>
                    </div>
                    <button className="bg-primary px-8 py-3 hover:brightness-110 transition-all font-medium">
                      Выбрать файл
                    </button>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-muted-foreground uppercase tracking-wide">Название</label>
                      <Input placeholder="Введите название видео" className="bg-muted/50 border-2 border-border focus:border-primary h-12" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-muted-foreground uppercase tracking-wide">Описание</label>
                      <Textarea placeholder="Расскажите о вашем видео" className="bg-muted/50 border-2 border-border focus:border-primary" rows={5} />
                    </div>
                  </div>
                </div>
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