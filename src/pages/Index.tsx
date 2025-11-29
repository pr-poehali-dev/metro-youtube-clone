import { useState } from 'react';
import { Home, Search, User, Clock, TrendingUp, Upload, Bookmark, Video } from 'lucide-react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';

type Section = 'home' | 'search' | 'channel' | 'subscriptions' | 'history' | 'trending' | 'upload' | 'saved' | 'video';

interface Video {
  id: string;
  title: string;
  channel: string;
  views: string;
  time: string;
  thumbnail: string;
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
  { id: '1', title: 'Как создать Metro дизайн', channel: 'Design Channel', views: '1.2М', time: '2 дня назад', thumbnail: '🎨', color: 'bg-metro-blue' },
  { id: '2', title: 'TypeScript для начинающих', channel: 'Code Academy', views: '856К', time: '1 неделю назад', thumbnail: '💻', color: 'bg-metro-cyan' },
  { id: '3', title: 'React hooks подробно', channel: 'Web Dev Pro', views: '2.1М', time: '3 дня назад', thumbnail: '⚛️', color: 'bg-metro-purple' },
  { id: '4', title: 'UX дизайн паттерны', channel: 'UX Master', views: '654К', time: '5 дней назад', thumbnail: '🎯', color: 'bg-metro-green' },
  { id: '5', title: 'CSS Grid и Flexbox', channel: 'Layout School', views: '1.5М', time: '1 день назад', thumbnail: '📐', color: 'bg-metro-orange' },
  { id: '6', title: 'JavaScript ES2024', channel: 'JS Guru', views: '987К', time: '4 дня назад', thumbnail: '🚀', color: 'bg-metro-blue' },
  { id: '7', title: 'Анимации в вебе', channel: 'Motion Design', views: '745К', time: '6 дней назад', thumbnail: '✨', color: 'bg-metro-cyan' },
  { id: '8', title: 'База данных SQL', channel: 'Database Pro', views: '1.8М', time: '2 дня назад', thumbnail: '🗄️', color: 'bg-metro-purple' },
];

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
    { id: 'home' as Section, icon: Home, label: 'Главная', color: 'bg-metro-blue' },
    { id: 'search' as Section, icon: Search, label: 'Поиск', color: 'bg-metro-cyan' },
    { id: 'channel' as Section, icon: User, label: 'Мой канал', color: 'bg-metro-purple' },
    { id: 'subscriptions' as Section, icon: Video, label: 'Подписки', color: 'bg-metro-green' },
    { id: 'history' as Section, icon: Clock, label: 'История', color: 'bg-metro-orange' },
    { id: 'trending' as Section, icon: TrendingUp, label: 'Рекомендации', color: 'bg-metro-blue' },
    { id: 'upload' as Section, icon: Upload, label: 'Загрузить', color: 'bg-metro-cyan' },
    { id: 'saved' as Section, icon: Bookmark, label: 'Сохраненные', color: 'bg-metro-purple' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary flex items-center justify-center text-2xl">
              📺
            </div>
            <h1 className="text-xl font-bold">MetroTube</h1>
          </div>
          <div className="flex-1 max-w-2xl mx-auto">
            <div className="relative">
              <Input
                type="text"
                placeholder="Поиск видео..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-muted border-none h-11"
              />
              <Button size="sm" className="absolute right-1 top-1 bg-primary hover:bg-primary/90">
                <Icon name="Search" size={18} />
              </Button>
            </div>
          </div>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Icon name="User" size={18} className="mr-2" />
            Войти
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentSection(item.id)}
              className={`${item.color} metro-tile aspect-square flex flex-col items-center justify-center gap-2 text-white font-medium ${
                currentSection === item.id ? 'ring-4 ring-white scale-105' : ''
              }`}
            >
              <Icon name={item.icon.name as any} size={32} />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>

        {currentSection === 'video' && selectedVideo ? (
          <div className="space-y-6">
            <Button
              variant="ghost"
              onClick={() => setCurrentSection('home')}
              className="mb-4"
            >
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              Назад
            </Button>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className={`${selectedVideo.color} aspect-video flex items-center justify-center text-9xl`}>
                  {selectedVideo.thumbnail}
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedVideo.title}</h2>
                  <div className="flex items-center justify-between text-muted-foreground mb-4">
                    <span>{selectedVideo.views} просмотров • {selectedVideo.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarFallback className="bg-primary">{selectedVideo.channel[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{selectedVideo.channel}</div>
                        <div className="text-sm text-muted-foreground">1.2М подписчиков</div>
                      </div>
                    </div>
                    <Button className="ml-auto bg-primary hover:bg-primary/90">
                      Подписаться
                    </Button>
                  </div>

                  <div className="bg-card p-4">
                    <p className="text-foreground/80">
                      В этом видео мы подробно разбираем основы создания дизайна в стиле Metro. 
                      Вы узнаете о принципах плоского дизайна, работе с плитками и цветовыми схемами.
                    </p>
                  </div>
                </div>

                <div className="bg-card p-6 space-y-4">
                  <h3 className="text-xl font-bold">Комментарии ({comments.length})</h3>
                  
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-secondary">ВЫ</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <Textarea
                          placeholder="Добавить комментарий..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="bg-muted border-none resize-none"
                          rows={2}
                        />
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setNewComment('')}
                          >
                            Отмена
                          </Button>
                          <Button
                            size="sm"
                            onClick={handleAddComment}
                            disabled={!newComment.trim()}
                            className="bg-primary hover:bg-primary/90"
                          >
                            Отправить
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6 pt-4">
                      {comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-accent">{comment.avatar}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold">{comment.author}</span>
                              <span className="text-sm text-muted-foreground">{comment.time}</span>
                            </div>
                            <p className="text-foreground/90">{comment.text}</p>
                            <div className="flex gap-4 mt-2">
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <Icon name="ThumbsUp" size={16} className="mr-1" />
                                <span className="text-xs">12</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <Icon name="ThumbsDown" size={16} />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                                Ответить
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-lg">Рекомендуемые</h3>
                {mockVideos.slice(0, 4).map((video) => (
                  <div
                    key={video.id}
                    onClick={() => handleVideoClick(video)}
                    className="flex gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded transition-colors"
                  >
                    <div className={`${video.color} w-40 aspect-video flex items-center justify-center text-4xl flex-shrink-0`}>
                      {video.thumbnail}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm line-clamp-2 mb-1">{video.title}</h4>
                      <p className="text-xs text-muted-foreground">{video.channel}</p>
                      <p className="text-xs text-muted-foreground">{video.views} • {video.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-3xl font-bold">{navItems.find(item => item.id === currentSection)?.label || 'Главная'}</h2>
            </div>

            {currentSection === 'search' ? (
              <div className="space-y-4">
                <div className="text-muted-foreground">
                  {searchQuery ? `Результаты поиска для "${searchQuery}"` : 'Введите запрос для поиска видео'}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                        <div className={`${video.color} aspect-video metro-tile flex items-center justify-center text-6xl mb-3`}>
                          {video.thumbnail}
                        </div>
                        <h3 className="font-semibold mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                          {video.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{video.channel}</p>
                        <p className="text-sm text-muted-foreground">{video.views} • {video.time}</p>
                      </div>
                    ))}
                </div>
              </div>
            ) : currentSection === 'upload' ? (
              <div className="max-w-2xl mx-auto">
                <div className="bg-card p-8 space-y-6">
                  <div className="border-2 border-dashed border-border p-12 text-center space-y-4">
                    <Icon name="Upload" size={48} className="mx-auto text-muted-foreground" />
                    <div>
                      <h3 className="font-semibold mb-2">Загрузите видео</h3>
                      <p className="text-sm text-muted-foreground">Перетащите файл или нажмите для выбора</p>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90">
                      Выбрать файл
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Название</label>
                      <Input placeholder="Введите название видео" className="bg-muted border-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Описание</label>
                      <Textarea placeholder="Расскажите о вашем видео" className="bg-muted border-none" rows={4} />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockVideos.map((video) => (
                  <div
                    key={video.id}
                    onClick={() => handleVideoClick(video)}
                    className="cursor-pointer group"
                  >
                    <div className={`${video.color} aspect-video metro-tile flex items-center justify-center text-6xl mb-3`}>
                      {video.thumbnail}
                    </div>
                    <h3 className="font-semibold mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{video.channel}</p>
                    <p className="text-sm text-muted-foreground">{video.views} • {video.time}</p>
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
