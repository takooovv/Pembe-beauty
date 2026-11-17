import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Home, Camera, Compass, MessageCircle, UserRound, Heart, Send, Plus, Bell, Sparkles, WandSparkles, ArrowLeft, Bookmark, Download, Users, Scissors, Paintbrush, SlidersHorizontal, Crown, Leaf, Search, ImagePlus, ChevronRight, Check, X } from 'lucide-react';
import './style.css';

const filters = [
  ['Orijinal', 'none'], ['Pembe', 'sepia(.18) saturate(1.35) hue-rotate(320deg)'],
  ['Parlak', 'brightness(1.15) contrast(1.05)'], ['Soft', 'brightness(1.08) contrast(.88)'],
  ['Canlı', 'saturate(1.65) contrast(1.1)'], ['Vintage', 'sepia(.45) contrast(.95)'],
  ['Siyah Beyaz', 'grayscale(1)']
];

function App() {
  const [page, setPage] = useState('home');
  const [history, setHistory] = useState([]);
  const [splash, setSplash] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [filter, setFilter] = useState('none');
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [caption, setCaption] = useState('');
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({});
  const [saved, setSaved] = useState({});
  const [following, setFollowing] = useState({});
  const [comments, setComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [openComments, setOpenComments] = useState({});
  const [forumPosts, setForumPosts] = useState([]);
  const [forumText, setForumText] = useState('');
  const [forumCategory, setForumCategory] = useState('Genel');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const fileRef = useRef(null);
  const appliedFilter = `${filter === 'none' ? '' : filter} brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`.trim();

  useEffect(() => { const t = setTimeout(() => setSplash(false), 2100); return () => clearTimeout(t); }, []);
  function navigate(target) { if (target === page) return; setHistory(prev => [...prev, page]); setPage(target); window.scrollTo?.(0, 0); }
  function goBack() { if (!history.length) { setPage('home'); return; } setPage(history[history.length - 1]); setHistory(prev => prev.slice(0, -1)); window.scrollTo?.(0, 0); }
  function choosePhoto() { fileRef.current?.click(); }
  function uploadPhoto(event) {
    const file = event.target.files?.[0]; if (!file) return;
    if (!file.type.startsWith('image/')) { alert('Bir fotoğraf seç.'); return; }
    const reader = new FileReader();
    reader.onload = () => { setPhoto(reader.result); setFilter('none'); setBrightness(100); setContrast(100); setSaturation(100); navigate('editor'); };
    reader.readAsDataURL(file); event.target.value = '';
  }
  function publishPost() {
    if (!photo) return choosePhoto();
    setPosts(prev => [{ id: Date.now(), user: 'Sen', image: photo, imageFilter: appliedFilter, text: caption.trim() || 'Yeni güzellik paylaşımım 💗', product: 'Güzellik paylaşımı' }, ...prev]);
    setCaption(''); navigate('explore');
  }
  function addComment(id) { const value = (commentInputs[id] || '').trim(); if (!value) return; setComments(prev => ({ ...prev, [id]: [...(prev[id] || []), value] })); setCommentInputs(prev => ({ ...prev, [id]: '' })); }
  function addForumPost() { if (!forumText.trim()) return; setForumPosts(prev => [{ id: Date.now(), user: 'Sen', text: forumText.trim(), category: forumCategory }, ...prev]); setForumText(''); }
  function sendMessage() { if (!message.trim()) return; setMessages(prev => [...prev, { id: Date.now(), text: message.trim() }]); setMessage(''); }
  function downloadPhoto() {
    if (!photo) return; const img = new window.Image();
    img.onload = () => { const canvas = document.createElement('canvas'); canvas.width = img.naturalWidth; canvas.height = img.naturalHeight; const ctx = canvas.getContext('2d'); if (!ctx) return; ctx.filter = appliedFilter || 'none'; ctx.drawImage(img, 0, 0); const a = document.createElement('a'); a.download = 'pembe-beauty.png'; a.href = canvas.toDataURL('image/png'); a.click(); };
    img.src = photo;
  }
  const demoPosts = [
    { id: 'demo1', user: 'Güzellik Tutkunu', text: 'Günlük doğal makyaj için en sevdiğiniz ton hangisi? 🌸', product: 'Doğal makyaj' },
    { id: 'demo2', user: 'Makyaj Günlüğüm', text: 'Pembe tonlarda ruj önerilerinizi bekliyorum 💄', product: 'Ruj önerileri' }
  ];
  const allPosts = [...posts, ...demoPosts];
  const Header = ({ title }) => <header className="header"><div className="header-left"><button className="icon-btn" aria-label="Geri" onClick={goBack}><ArrowLeft size={21}/></button><h2>{title}</h2></div><button className="icon-btn" aria-label="Mesajlara git" onClick={() => navigate('messages')}><Bell size={21}/></button></header>;
  const tools = [
    { label: 'Fotoğraf Editörü', desc: 'Işık ve renk ayarları', Icon: WandSparkles, target: 'editor', color: 'pink' },
    { label: 'Sanal Makyaj', desc: 'Yakında', Icon: Paintbrush, target: 'makeup', color: 'purple' },
    { label: 'Saç Stilleri', desc: 'Yakında', Icon: Scissors, target: 'hair', color: 'peach' },
    { label: 'Filtreler', desc: '7 özel görünüm', Icon: SlidersHorizontal, target: 'editor', color: 'blue' },
    { label: 'Bakım Önerileri', desc: 'Günlük ipuçları', Icon: Leaf, target: 'tips', color: 'green' },
    { label: 'Premium', desc: 'Çok yakında', Icon: Crown, target: 'premium', color: 'gold' }
  ];
  const HomePage = () => <><Header title="Pembe Beauty"/><section className="welcome"><div className="welcome-orb orb-one"/><div className="welcome-orb orb-two"/><div className="welcome-content"><span className="eyebrow"><Sparkles size={14}/> GÜZELLİĞİN YENİ DÜNYASI</span><h1>Güzelliğin,<br/>senin dokunuşunla.</h1><p>Tarzını keşfet, fotoğraflarını düzenle ve ilhamını paylaş.</p><button className="hero-btn" onClick={choosePhoto}><WandSparkles size={18}/> Fotoğrafını Güzelleştir <ChevronRight size={18}/></button></div></section><div className="section-heading"><h3>Güzellik Stüdyosu</h3><span>Senin alanın</span></div><div className="tools-grid">{tools.map(({ label, desc, Icon, target, color }) => <button className="tool-card" key={label} onClick={() => navigate(target)}><span className={`tool-icon ${color}`}><Icon size={25} strokeWidth={1.8}/></span><strong>{label}</strong><small>{desc}</small></button>)}</div><div className="feature-card"><div className="feature-icon"><Users size={23}/></div><h3>Güzellik Topluluğu</h3><p>Paylaşımları keşfet, yeni fikirlerden ilham al.</p><button onClick={() => navigate('explore')}>Keşfet <ChevronRight size={16}/></button></div><div className="feature-card light"><div className="feature-icon"><MessageCircle size={23}/></div><h3>Güzellik Forumu</h3><p>Makyaj, saç ve cilt bakımı hakkında konuş.</p><button onClick={() => navigate('forum')}>Foruma Git <ChevronRight size={16}/></button></div><div className="feature-card light"><div className="feature-icon"><Leaf size={23}/></div><h3>Güzellik Asistanı</h3><p>Günlük bakım ve makyaj önerilerini incele.</p><button onClick={() => navigate('tips')}>Önerileri Gör <ChevronRight size={16}/></button></div></>;
  const EditorPage = () => <><Header title="Fotoğraf Stüdyosu"/><div className="editor-box">{photo ? <img src={photo} alt="Düzenlenen fotoğraf" style={{ filter: appliedFilter }}/> : <div className="empty-photo"><div className="upload-icon"><ImagePlus size={35}/></div><h3>Fotoğrafını Yükle</h3><p>Güzelliğine yeni bir dokunuş kat.</p><button onClick={choosePhoto}>Fotoğraf Seç</button></div>}</div><div className="section-heading"><h3>Hazır Filtreler</h3><span>7 seçenek</span></div><div className="filter-list">{filters.map(([name, value]) => <button key={name} className={filter === value ? 'filter active' : 'filter'} onClick={() => setFilter(value)}>{name}</button>)}</div><div className="section-heading"><h3>İnce Ayarlar</h3><SlidersHorizontal size={18}/></div><div className="adjustments">{[['Parlaklık', brightness, setBrightness], ['Kontrast', contrast, setContrast], ['Canlılık', saturation, setSaturation]].map(([label, value, setter]) => <label key={label}><span><strong>{label}</strong><b>{value}%</b></span><input type="range" min="50" max="150" value={value} onChange={e => setter(Number(e.target.value))}/></label>)}</div><div className="action-buttons"><button onClick={choosePhoto}><Camera size={17}/> Değiştir</button><button onClick={downloadPhoto} disabled={!photo}><Download size={17}/> Kaydet</button></div><textarea placeholder="Paylaşımına açıklama ekle..." value={caption} onChange={e => setCaption(e.target.value)}/><button className="primary-btn" onClick={publishPost}><Plus size={18}/> Paylaş</button><p className="note">Fotoğraf filtreleri çalışır. Gerçek zamanlı makyaj ve saç denemesi henüz aktif değildir.</p></>;
  const ExplorePage = () => <><Header title="Keşfet"/><div className="page-intro"><h3>Güzellik Paylaşımları</h3><p>İlham veren fikirler, yeni görünümler.</p></div><div className="search-box"><Search size={18}/><input placeholder="Paylaşım ara..." value={search} onChange={e => setSearch(e.target.value)}/></div><button className="primary-btn" onClick={choosePhoto}><Plus size={18}/> Yeni Paylaşım</button>{allPosts.filter(p => `${p.user} ${p.text} ${p.product}`.toLocaleLowerCase('tr').includes(search.toLocaleLowerCase('tr'))).map(post => <article className="post-card" key={post.id}><div className="post-user"><div className="avatar">{post.user.charAt(0)}</div><div className="post-user-info"><strong>{post.user}</strong><small>{post.product}</small></div>{post.user !== 'Sen' && <button className="follow-btn" onClick={() => setFollowing(prev => ({ ...prev, [post.user]: !prev[post.user] }))}>{following[post.user] ? 'Takiptesin' : 'Takip Et'}</button>}</div>{post.image ? <img className="post-image" src={post.image} alt="Güzellik paylaşımı" style={{ filter: post.imageFilter || 'none' }}/> : <div className="demo-post-image"><Sparkles size={45}/><span>Güzellik İlhamı</span></div>}<div className="post-actions"><button onClick={() => setLikes(prev => ({ ...prev, [post.id]: !prev[post.id] }))}><Heart size={21} fill={likes[post.id] ? '#e54d91' : 'none'}/> {likes[post.id] ? 'Beğenildi' : 'Beğen'}</button><button onClick={() => setOpenComments(prev => ({ ...prev, [post.id]: !prev[post.id] }))}><MessageCircle size={20}/> Yorum</button><button aria-label="Kaydet" onClick={() => setSaved(prev => ({ ...prev, [post.id]: !prev[post.id] }))}><Bookmark size={20} fill={saved[post.id] ? '#e54d91' : 'none'}/></button></div><p className="post-caption">{post.text}</p>{openComments[post.id] && <div className="comment-area">{(comments[post.id] || []).map((comment, index) => <p key={index}><strong>Sen:</strong> {comment}</p>)}<div className="message-compose"><input placeholder="Yorum yaz..." value={commentInputs[post.id] || ''} onChange={e => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}/><button onClick={() => addComment(post.id)}><Send size={18}/></button></div></div>}</article>)}</>;
  const ForumPage = () => <><Header title="Güzellik Forumu"/><div className="page-intro"><h3>Birlikte Daha Güzeliz</h3><p>Sorularını sor, deneyimlerini paylaş.</p></div><div className="forum-categories">{['Genel','Makyaj','Cilt Bakımı','Saç','Kozmetik'].map(c => <button key={c} className={forumCategory === c ? 'filter active' : 'filter'} onClick={() => setForumCategory(c)}>{c}</button>)}</div><div className="forum-compose"><h3>Yeni Konu Aç</h3><textarea placeholder="Ne hakkında konuşmak istersin?" value={forumText} onChange={e => setForumText(e.target.value)}/><button onClick={addForumPost}><Plus size={17}/> Konuyu Paylaş</button></div>{forumPosts.filter(p => forumCategory === 'Genel' || p.category === forumCategory).map(post => <div className="forum-post" key={post.id}><strong>{post.user}</strong><small>{post.category}</small><p>{post.text}</p></div>)}<div className="forum-post"><strong>Güzellik Topluluğu</strong><p>Günlük makyaj için en sevdiğiniz ürün hangisi?</p><small>Örnek tartışma</small></div></>;
  const MessagesPage = () => <><Header title="Mesajlar"/><div className="page-intro"><h3>Özel Mesajlar</h3><p>Şimdilik örnek sohbet ekranı.</p></div><div className="chat-info"><Users size={25}/><div><strong>Demo Sohbet</strong><small>Gerçek mesajlaşma henüz bağlı değil.</small></div></div><div className="chat-box"><div className="chat-bubble other">Pembe Beauty'ye hoş geldin! 💗</div>{messages.map(m => <div key={m.id} className="chat-bubble mine">{m.text}</div>)}</div><div className="message-compose"><input placeholder="Mesaj yaz..." value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}/><button onClick={sendMessage}><Send size={20}/></button></div></>;
  const TipsPage = () => <><Header title="Güzellik Asistanı"/><section className="mini-hero"><Sparkles size={27}/><h2>Güzelliğine İlham Kat</h2><p>Günlük bakım ve makyaj önerilerini keşfet.</p></section>{[['Günlük Cilt Bakımı','Nazik temizleme, nemlendirme ve güneş koruyucu kullanımı temel bir rutin oluşturabilir.', Leaf], ['Doğal Makyaj','Hafif ten ürünleri, doğal tonlarda allık ve dudak ürünleriyle günlük görünüm oluşturabilirsin.', Paintbrush], ['Saç Bakımı','Saç tipine uygun ürünler seçmek ve aşırı ısı kullanımından kaçınmak faydalı olabilir.', Scissors], ['Kozmetik Önerileri','Yeni ürünlerin içeriklerini ve son kullanma tarihlerini kontrol et.', Sparkles]].map(([title, desc, Icon]) => <div className="tip-card" key={title}><div className="tip-icon"><Icon size={23}/></div><div><h3>{title}</h3><p>{desc}</p></div></div>)}</>;
  const ProfilePage = () => <><Header title="Profilim"/><div className="profile-header"><div className="profile-avatar"><UserRound size={42}/></div><h2>Güzellik Tutkunu</h2><p>@pembebeauty</p><small>Demo profil</small></div><div className="profile-stats"><div><strong>{posts.length}</strong><span>Paylaşım</span></div><div><strong>0</strong><span>Takipçi</span></div><div><strong>{Object.values(following).filter(Boolean).length}</strong><span>Takip</span></div></div><button className="primary-btn" onClick={choosePhoto}><Camera size={18}/> Yeni Fotoğraf Paylaş</button><h3 className="section-title">Paylaşımlarım</h3>{posts.length === 0 ? <div className="empty-state"><Camera size={38}/><p>Henüz paylaşım yapmadın.</p></div> : <div className="profile-gallery">{posts.map(p => <img key={p.id} src={p.image} alt="Paylaşım" style={{ filter: p.imageFilter || 'none' }}/>)}</div>}</>;
  const ComingSoon = ({ type }) => <><Header title={type === 'hair' ? 'Saç Stilleri' : type === 'makeup' ? 'Sanal Makyaj' : 'Pembe Premium'}/><section className="coming-soon"><div className="coming-icon">{type === 'hair' ? <Scissors size={40}/> : type === 'makeup' ? <Paintbrush size={40}/> : <Crown size={40}/>}</div><span>YAKINDA</span><h2>{type === 'hair' ? 'Yeni saç stillerini keşfet' : type === 'makeup' ? 'Sanal makyaj deneyimi' : 'Premium güzellik dünyası'}</h2><p>Bu özellik henüz geliştirme aşamasında. Şimdilik fotoğraf editöründeki filtreleri deneyebilirsin.</p><button className="primary-btn" onClick={() => navigate('editor')}>Fotoğraf Editörüne Git <ChevronRight size={18}/></button><button className="text-btn" onClick={goBack}><ArrowLeft size={16}/> Geri dön</button></section></>;
  const navigation = [['home', 'Ana Sayfa', Home], ['editor', 'Editör', WandSparkles], ['explore', 'Keşfet', Compass], ['messages', 'Mesajlar', MessageCircle], ['profile', 'Profil', UserRound]];
  return <div className="app">{splash && <div className="splash-screen"><div className="splash-glow"/><div className="splash-logo"><Sparkles size={48} strokeWidth={1.6}/></div><h1>Pembe Beauty</h1><p>Güzelliğin senin dokunuşunla</p><div className="splash-loader"><span/></div></div>}<main className="content">{page === 'home' && <HomePage/>}{page === 'editor' && <EditorPage/>}{page === 'explore' && <ExplorePage/>}{page === 'forum' && <ForumPage/>}{page === 'messages' && <MessagesPage/>}{page === 'tips' && <TipsPage/>}{page === 'profile' && <ProfilePage/>}{['premium','hair','makeup'].includes(page) && <ComingSoon type={page}/>}</main><input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={uploadPhoto}/><nav className="bottom-nav">{navigation.map(([id, label, Icon]) => <button key={id} className={page === id ? 'nav-item active' : 'nav-item'} onClick={() => navigate(id)}><Icon size={22} strokeWidth={page === id ? 2.3 : 1.8}/><span>{label}</span></button>)}</nav></div>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);

