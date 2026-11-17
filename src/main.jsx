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
  const [splashProgress, setSplashProgress] = useState(0);
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
  const [beautyTab,setBeautyTab] = useState('Makyaj');
  const [lip,setLip] = useState('#d95879');
  const [hairCategory,setHairCategory] = useState('Tümü');
  const [assistantQuestion,setAssistantQuestion] = useState('');
  const [assistantAnswer,setAssistantAnswer] = useState('');
  const [profileName,setProfileName] = useState('Güzellik Tutkunu');
  const [editingProfile,setEditingProfile] = useState(false);
  const [exploreCategory,setExploreCategory] = useState('Tümü');
  const [chatSelected,setChatSelected] = useState(null);
  const [profileTab,setProfileTab] = useState('Gönderiler');

  const fileRef = useRef(null);
  const appliedFilter = `${filter === 'none' ? '' : filter} brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`.trim();

  useEffect(() => {
    const started = Date.now();
    const duration = 4600;
    const timer = window.setInterval(() => {
      const elapsed = Date.now() - started;
      const value = Math.min(100, Math.round((elapsed / duration) * 100));
      setSplashProgress(value);
      if (elapsed >= duration) {
        window.clearInterval(timer);
        window.setTimeout(() => setSplash(false), 420);
      }
    }, 45);
    return () => window.clearInterval(timer);
  }, []);
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
  const beautyPhotos = {
    portrait:'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&auto=format&fit=crop&q=85',
    makeup:'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&auto=format&fit=crop&q=85',
    hair:'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=900&auto=format&fit=crop&q=85',
    skincare:'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=900&auto=format&fit=crop&q=85',
    lipstick:'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=900&auto=format&fit=crop&q=85',
    eyes:'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=900&auto=format&fit=crop&q=85',
    rose:'https://images.unsplash.com/photo-1541643600914-78b084683601?w=900&auto=format&fit=crop&q=85',
    face:'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&auto=format&fit=crop&q=85'
  };
  const beautyGallery = [
    ['Işıltılı göz makyajı','Makyaj','eyes'],['Pembe ruj koleksiyonu','Makyaj','lipstick'],
    ['Günlük güzellik','Stil','portrait'],['Cilt bakım ritüeli','Bakım','skincare'],
    ['Romantik saçlar','Saç','hair'],['Parfüm favorileri','Stil','rose']
  ];
  const hairStyles = [
    ['Dalgalı Sarı','Uzun','https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=600&auto=format&fit=crop&q=85'],
    ['Kahve Işıltısı','Uzun','https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=85'],
    ['Bakır Tonlar','Orta','https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=85'],
    ['Topuz Zarafeti','Kısa','https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=85']
  ];
  const demoForum = [
    {id:'f1',user:'ElifBeauty',category:'Cilt Bakımı',text:'Kuru ciltler için en iyi nemlendirici önerileriniz neler? 💧',likes:128,comments:47,image:'skincare'},
    {id:'f2',user:'PembeKız',category:'Saç',text:'Bu saç rengini denemeyi düşünüyorum, sizce bana yakışır mı? 💕',likes:203,comments:65,image:'hair'},
    {id:'f3',user:'Ceren',category:'Makyaj',text:'Günlük makyajda favori ruj renginiz hangisi? 💄',likes:92,comments:21,image:'lipstick'}
  ];
  const chatPeople=[['Güzellik Topluluğu','Yeni bir makyaj tüyosu paylaşıldı! 💗','👑'],['Ceren','Saç bakım rutinini atar mısın? 💕','🌷'],['Dilan','Teşekkür ederim! 💖','🌸'],['Makyaj Önerileri','Yeni ürün incelemesi eklendi! ✨','💄'],['Elif','Harika görünüyor! 💗','🌺']];
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
  // Fotoğraflar Unsplash CDN üzerinden yüklenir; bağlantı yoksa kartın renkli zemini görünür.
  const beautyImages = {
    editor: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=650&auto=format&fit=crop&q=85',
    makeup: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=650&auto=format&fit=crop&q=85',
    hair: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=650&auto=format&fit=crop&q=85',
    filters: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=650&auto=format&fit=crop&q=85',
    tips: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=650&auto=format&fit=crop&q=85',
    premium: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=650&auto=format&fit=crop&q=85'
  };
  const HomePage = () => <><Header title="Pembe Beauty"/>
    <section className="welcome luxe-welcome">
      <img className="luxe-hero-image" src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1100&auto=format&fit=crop&q=85" alt="Güzellik portresi"/>
      <div className="luxe-hero-overlay"/>
      <div className="luxe-hero-spark luxe-star-one">✦</div><div className="luxe-hero-spark luxe-star-two">♡</div>
      <div className="welcome-content luxe-hero-content"><span className="eyebrow"><Sparkles size={14}/> GÜZELLİĞİN YENİ DÜNYASI</span><h1>Güzelliğin,<br/>senin dokunuşunla.</h1><p>Tarzını keşfet, fotoğraflarını düzenle ve ilhamını paylaş.</p><button className="hero-btn" onClick={choosePhoto}><WandSparkles size={18}/> Fotoğrafını Güzelleştir <ChevronRight size={18}/></button></div>
    </section>
<div className="section-heading"><h3>Güzellik Stüdyosu</h3><span>Senin alanın</span></div><div className="tools-grid">{tools.map(({ label, desc, Icon, target, color }) => <button className={`tool-card beauty-card beauty-${color}`} key={label} onClick={() => navigate(target)}><span className="beauty-card-media"><img src={beautyImages[target === 'editor' && label === 'Filtreler' ? 'filters' : target] || beautyImages.premium} alt={`${label} görseli`} loading="lazy"/><span className="beauty-card-shade"/><span className="beauty-card-icon"><Icon size={19}/></span>{['makeup','hair','premium'].includes(target) && <span className="beauty-card-badge">YAKINDA</span>}</span><span className="beauty-card-info"><strong>{label}</strong><small>{desc}</small></span></button>)}</div>
    <section className="luxe-feature luxe-community"><img className="luxe-feature-photo" src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&auto=format&fit=crop&q=85" alt="Güzellik topluluğu makyaj ürünleri" loading="lazy"/><div className="luxe-feature-tint"/><div className="luxe-feature-content"><span className="luxe-feature-icon"><Users size={25}/></span><h3>Güzellik Topluluğu</h3><p>Paylaşımları keşfet, yeni fikirlerden ilham al.</p><button onClick={() => navigate('explore')}>Keşfet <ChevronRight size={18}/></button></div></section>
    <section className="luxe-feature luxe-forum"><img className="luxe-feature-photo" src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&auto=format&fit=crop&q=85" alt="Kahve eşliğinde sohbet" loading="lazy"/><div className="luxe-feature-tint"/><div className="luxe-feature-content"><span className="luxe-feature-icon"><MessageCircle size={25}/></span><h3>Güzellik Forumu</h3><p>Makyaj, saç ve cilt bakımı hakkında konuş.</p><button onClick={() => navigate('forum')}>Foruma Git <ChevronRight size={18}/></button></div></section>
    <section className="luxe-feature luxe-assistant"><img className="luxe-feature-photo" src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=900&auto=format&fit=crop&q=85" alt="Cilt bakım ürünleri" loading="lazy"/><div className="luxe-feature-tint"/><div className="luxe-feature-content"><span className="luxe-feature-icon"><Leaf size={25}/></span><h3>Güzellik Asistanı</h3><p>Günlük bakım ve makyaj önerilerini incele.</p><button onClick={() => navigate('tips')}>Önerileri Gör <ChevronRight size={18}/></button></div></section>
  </>;
  const PageBanner = ({ kind, kicker, title, subtitle, Icon = Sparkles }) => <section className={`pb-page-banner pb-banner-${kind}`}>
    <div className="pb-banner-image"/><div className="pb-banner-shade"/>
    <div className="pb-banner-content"><span className="pb-banner-kicker"><Icon size={15}/> {kicker}</span><h2>{title}</h2><p>{subtitle}</p></div>
    <span className="pb-banner-spark">✦</span>
  </section>;
  const EditorPage = () => <><Header title="Fotoğraf Editörü"/><section className="v3-editor-preview" onClick={!photo ? choosePhoto : undefined}><img src={photo || beautyPhotos.portrait} style={{filter:photo ? appliedFilter : 'none'}} alt="Fotoğraf önizleme"/>{!photo && <button className="v3-photo-cta" onClick={choosePhoto}><Camera size={17}/> Kendi fotoğrafını yükle</button>}</section><div className="v3-pill-tabs">{['Filtre','Makyaj','Cilt','Ayarlar'].map(t=><button key={t} className={beautyTab===t?'selected':''} onClick={()=>setBeautyTab(t)}>{t}</button>)}</div>{beautyTab==='Filtre' && <><h3 className="v3-heading">Görünümünü seç</h3><div className="filter-list">{filters.map(([name,value])=><button key={name} className={filter===value?'filter active':'filter'} onClick={()=>setFilter(value)}>{name}</button>)}</div></>}{beautyTab==='Makyaj' && <><h3 className="v3-heading">Makyaj paleti <small>Renk koleksiyonu</small></h3><div className="v3-makeup-icons">{[['💋','Ruj'],['🌸','Allık'],['👁️','Göz'],['✨','Işıltı']].map(([emoji,t])=><button key={t} onClick={()=>setLip(['#e95280','#e2a1af','#b37b9b','#c77b8e'][['Ruj','Allık','Göz','Işıltı'].indexOf(t)])}><span>{emoji}</span>{t}</button>)}</div><div className="v3-colors">{['#ffb1c7','#fa7e9d','#e95280','#cf4777','#a82d59','#a82c38','#7e233a','#52152b'].map(c=><button aria-label={'Renk '+c} key={c} className={lip===c?'active':''} style={{background:c}} onClick={()=>setLip(c)}/>)}</div><p className="note">Palet renkleri seçilebilir. Yüze gerçek makyaj uygulama özelliği henüz bağlı değil.</p></>}{beautyTab==='Cilt' && <div className="v3-info-panel"><h3>✨ Cilt görünümü</h3><p>Yumuşak bir fotoğraf görünümü için Soft veya Parlak filtresini deneyebilirsin.</p><button onClick={()=>setFilter('brightness(1.08) contrast(.88)')}>Soft görünüm uygula</button></div>}{beautyTab==='Ayarlar' && <div className="adjustments">{[['Parlaklık',brightness,setBrightness],['Kontrast',contrast,setContrast],['Canlılık',saturation,setSaturation]].map(([name,value,setter])=><label key={name}><span><strong>{name}</strong><b>{value}%</b></span><input type="range" min="50" max="150" value={value} onChange={e=>setter(Number(e.target.value))}/></label>)}</div>}<div className="action-buttons"><button onClick={choosePhoto}><Camera size={17}/> Fotoğraf Seç</button><button onClick={downloadPhoto} disabled={!photo}><Download size={17}/> Kaydet</button></div><textarea placeholder="Paylaşım açıklaman..." value={caption} onChange={e=>setCaption(e.target.value)}/><button className="primary-btn" onClick={publishPost}><Plus size={18}/> Keşfet'te Paylaş</button></>;
  const ExplorePage = () => <><Header title="Keşfet"/><div className="v3-pill-tabs v3-categories">{['Tümü','Makyaj','Saç','Bakım','Stil'].map(t=><button key={t} className={exploreCategory===t?'selected':''} onClick={()=>setExploreCategory(t)}>{t}</button>)}</div><div className="v3-masonry">{beautyGallery.filter(([name,cat])=>exploreCategory==='Tümü'||cat===exploreCategory).map(([name,cat,key],i)=><div className="v3-masonry-card" key={name}><img src={beautyPhotos[key]} alt={name}/><div className="v3-photo-meta"><span><Heart size={13} fill="#fff"/> {['2,4B','1,8B','3,2B','4,1B','2,9B','1,6B'][i%6]}</span><small>{name}</small></div></div>)}</div><h3 className="v3-heading">Topluluk paylaşımları</h3><div className="search-box"><Search size={18}/><input placeholder="Paylaşım ara..." value={search} onChange={e=>setSearch(e.target.value)}/></div><button className="primary-btn" onClick={choosePhoto}><Plus size={18}/> Fotoğraf Paylaş</button>{allPosts.filter(p=>`${p.user} ${p.text} ${p.product}`.toLocaleLowerCase('tr').includes(search.toLocaleLowerCase('tr'))).map(post=><article className="post-card" key={post.id}><div className="post-user"><div className="avatar">{post.user.charAt(0)}</div><div className="post-user-info"><strong>{post.user}</strong><small>{post.product}</small></div>{post.user!=='Sen'&&<button className="follow-btn" onClick={()=>setFollowing(prev=>({...prev,[post.user]:!prev[post.user]}))}>{following[post.user]?'Takiptesin':'Takip Et'}</button>}</div><img className="post-image" src={post.image||beautyPhotos[post.id==='demo2'?'lipstick':'makeup']} style={{filter:post.imageFilter||'none'}} alt="Paylaşım"/><div className="post-actions"><button onClick={()=>setLikes(prev=>({...prev,[post.id]:!prev[post.id]}))}><Heart size={19} fill={likes[post.id]?'#e54d91':'none'}/> {likes[post.id]?'Beğenildi':'Beğen'}</button><button onClick={()=>setOpenComments(prev=>({...prev,[post.id]:!prev[post.id]}))}><MessageCircle size={19}/> Yorum</button><button onClick={()=>setSaved(prev=>({...prev,[post.id]:!prev[post.id]}))}><Bookmark size={19} fill={saved[post.id]?'#e54d91':'none'}/></button></div><p className="post-caption">{post.text}</p>{openComments[post.id]&&<div className="comment-area">{(comments[post.id]||[]).map((c,i)=><p key={i}><strong>Sen:</strong> {c}</p>)}<div className="message-compose"><input placeholder="Yorum yaz..." value={commentInputs[post.id]||''} onChange={e=>setCommentInputs(prev=>({...prev,[post.id]:e.target.value}))}/><button onClick={()=>addComment(post.id)}><Send size={18}/></button></div></div>}</article>)}</>;
  const ForumPage = () => <><Header title="Forum"/><div className="v3-pill-tabs v3-categories">{['Genel','Makyaj','Cilt Bakımı','Saç','Kozmetik'].map(c=><button key={c} className={forumCategory===c?'selected':''} onClick={()=>setForumCategory(c)}>{c}</button>)}</div><div className="forum-compose"><h3>💗 Yeni konu aç</h3><textarea placeholder="Güzellik topluluğuna bir şey sor..." value={forumText} onChange={e=>setForumText(e.target.value)}/><button onClick={addForumPost}><Plus size={17}/> Paylaş</button></div>{[...forumPosts,...demoForum].filter(p=>forumCategory==='Genel'||p.category===forumCategory).map(post=><article className="v3-forum-post" key={post.id}><div className="v3-forum-user"><span className="v3-round-avatar">{post.user[0]}</span><div><strong>{post.user} 💗</strong><small>{post.category} · Topluluk</small></div></div><p>{post.text}</p>{post.image&&<img className="v3-forum-image" src={beautyPhotos[post.image]} alt={post.category}/>}<div className="v3-forum-actions"><span><Heart size={17}/> {post.likes||0}</span><span><MessageCircle size={17}/> {post.comments||0}</span></div></article>)}</>;
  const MessagesPage = () => <><Header title={chatSelected===null?'Mesajlar':chatPeople[chatSelected][0]}/>{chatSelected===null?<><div className="search-box"><Search size={18}/><input placeholder="Kişi veya mesaj ara..." value={search} onChange={e=>setSearch(e.target.value)}/></div><div className="v3-chat-list">{chatPeople.filter(c=>c[0].toLocaleLowerCase('tr').includes(search.toLocaleLowerCase('tr'))).map(c=><button key={c[0]} className="v3-chat-person" onClick={()=>setChatSelected(chatPeople.indexOf(c))}><span className="v3-chat-avatar">{c[2]}</span><span><strong>{c[0]} 💗</strong><small>{c[1]}</small></span><ChevronRight size={18}/></button>)}</div><p className="note">Sohbet listesi örnektir; diğer kullanıcılarla canlı mesajlaşma henüz aktif değil.</p></>:<><button className="v3-back" onClick={()=>setChatSelected(null)}><ArrowLeft size={17}/> Tüm sohbetler</button><div className="chat-box"><div className="chat-bubble other">{chatPeople[chatSelected][1]}</div>{messages.map(m=><div key={m.id} className="chat-bubble mine">{m.text}</div>)}</div><div className="message-compose"><input placeholder="Mesajını yaz..." value={message} onChange={e=>setMessage(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendMessage()}/><button onClick={sendMessage}><Send size={20}/></button></div><p className="note">Bu sohbet yalnızca bu cihazda gösterilir; mesajlar karşı tarafa gönderilmez.</p></>}</>;
  const TipsPage = () => <><Header title="Güzellik Asistanı ✨"/><div className="v3-assistant-hero"><div className="v3-assistant-face">👩🏻‍🦰</div><h2>Merhaba güzellik! 💕</h2><p>Cilt bakımı, makyaj, saç ve bakım rutinlerin için sana fikir verebilirim.</p></div><div className="v3-assistant-options">{[['Cilt tipime uygun bakım ✨','Cilt'],['Günlük makyaj önerisi 💄','Makyaj'],['Saç bakım rutini 💇🏻‍♀️','Saç'],['Bana güzellik planı hazırla 💖','Plan']].map(([name,topic])=><button key={topic} onClick={()=>{setAssistantQuestion(name);setAssistantAnswer(topic==='Cilt'?'Sabah nazik bir temizleyici, nemlendirici ve SPF 30+ güneş koruyucu ile başlayabilirsin. Cilt tipine göre ürün seç.':topic==='Makyaj'?'Hafif ten ürünü, krem allık, maskara ve pembe-nude ruj ile doğal bir görünüm oluşturabilirsin.':topic==='Saç'?'Saç tipine uygun şampuan, saç uçlarına bakım kremi ve haftalık maske deneyebilirsin. Aşırı ısıdan kaçın.':'Sabah temizleme ve güneş koruması; akşam nazik temizleme ve nemlendirme; haftada bir saç bakım maskesi planlayabilirsin.')}}>{name}</button>)}</div>{assistantAnswer&&<div className="v3-assistant-reply"><strong>✨ {assistantQuestion}</strong><p>{assistantAnswer}</p></div>}<div className="v3-assistant-input"><input placeholder="Bakım hakkında bir konu yaz..." value={assistantQuestion} onChange={e=>setAssistantQuestion(e.target.value)}/><button onClick={()=>setAssistantAnswer('Şu an otomatik sohbet altyapısı bağlı değil. Yukarıdaki hazır bakım önerilerinden birini seçebilirsin.')}><Send size={18}/></button></div><h3 className="v3-heading">Güzellik rehberi</h3><div className="v3-guide-grid">{[['Cilt bakımı','skincare'],['Makyaj fikirleri','makeup'],['Saç önerileri','hair'],['Parfüm & stil','rose']].map(([t,k])=><div key={k}><img src={beautyPhotos[k]} alt={t}/><strong>{t}</strong></div>)}</div></>;
  const ProfilePage = () => <><Header title="Profil"/><div className="v3-profile-cover" style={{backgroundImage:`linear-gradient(0deg,#f9d2e3aa,#9f2c6788),url(${beautyPhotos.rose})`}}/><div className="v3-profile-identity"><img src={beautyPhotos.face} alt="Örnek profil fotoğrafı"/><h2>{profileName} 💗</h2><small>@pembebeauty · Örnek profil</small></div><div className="profile-stats"><div><strong>{posts.length}</strong><span>Gönderi</span></div><div><strong>0</strong><span>Takipçi</span></div><div><strong>{Object.values(following).filter(Boolean).length}</strong><span>Takip</span></div></div><button className="v3-profile-edit" onClick={()=>setEditingProfile(!editingProfile)}>{editingProfile?'Kapat':'Profili Düzenle'}</button>{editingProfile&&<div className="v3-profile-form"><input value={profileName} maxLength={30} onChange={e=>setProfileName(e.target.value)} placeholder="Görünen ad"/><small>Değişiklikler şu an yalnızca bu oturumda geçerlidir.</small></div>}<div className="v3-pill-tabs v3-profile-tabs">{['Gönderiler','Kaydedilenler','Beğeniler'].map(t=><button key={t} className={profileTab===t?'selected':''} onClick={()=>setProfileTab(t)}>{t}</button>)}</div><div className="v3-profile-grid">{profileTab==='Gönderiler'?posts.length?posts.map(p=><img key={p.id} src={p.image} alt="Paylaşım"/>):beautyGallery.slice(0,6).map(([n,c,k])=><img key={n} src={beautyPhotos[k]} alt={'Örnek: '+n}/>):profileTab==='Kaydedilenler'?allPosts.filter(p=>saved[p.id]).map(p=><img key={p.id} src={p.image||beautyPhotos.makeup} alt="Kaydedilen"/>):allPosts.filter(p=>likes[p.id]).map(p=><img key={p.id} src={p.image||beautyPhotos.lipstick} alt="Beğenilen"/>)}</div>{profileTab==='Gönderiler'&&!posts.length&&<p className="note">Galeride örnek görseller gösteriliyor. Kendi gönderilerin burada yer alacak.</p>}<button className="primary-btn" onClick={choosePhoto}><Plus size={18}/> Yeni Paylaşım</button></>;
  const ComingSoon = ({type}) => type==='hair'?<><Header title="Saç Stilleri"/><div className="v3-pill-tabs v3-categories">{['Tümü','Kısa','Orta','Uzun','Renkler'].map(t=><button key={t} className={hairCategory===t?'selected':''} onClick={()=>setHairCategory(t)}>{t}</button>)}</div><div className="v3-hair-grid">{hairStyles.filter(h=>hairCategory==='Tümü'||hairCategory==='Renkler'||h[1]===hairCategory).map(([name,cat,img])=><div className="v3-hair-card" key={name}><img src={img} alt={name}/><strong>{name}</strong><small>{cat} saç</small><button onClick={choosePhoto}><Camera size={15}/> Fotoğraf Seç</button></div>)}</div><button className="primary-btn" onClick={choosePhoto}>Saç fotoğrafı yükle</button><p className="note">Saç modelleri ilham galerisidir; fotoğrafına otomatik saç yerleştirme henüz aktif değildir.</p></>:type==='makeup'?<><Header title="Sanal Makyaj"/><div className="v3-makeup-hero"><img src={beautyPhotos.portrait} alt="Makyaj görünümü"/><div><h2>Yeni görünümünü keşfet 💄</h2><p>Ruj tonları, filtreler ve fotoğraf ayarlarını dene.</p><button onClick={()=>{setBeautyTab('Makyaj');navigate('editor')}}>Makyaj paletini aç</button></div></div><div className="v3-guide-grid">{[['Ruj tonları','lipstick'],['Göz makyajı','eyes'],['Işıltılı ten','portrait'],['Ürün ilhamı','makeup']].map(([t,k])=><div key={t}><img src={beautyPhotos[k]} alt={t}/><strong>{t}</strong></div>)}</div><p className="note">Yüze canlı makyaj uygulama özelliği henüz geliştirilme aşamasında.</p></>:<><Header title="Pembe Beauty Premium"/><div className="v3-premium"><Crown size={55}/><h1>Pembe Beauty</h1><h2>Premium ✨</h2><p>Güzellik dünyasında yeni ayrıcalıklar</p><div className="v3-premium-benefits">{['💄 Özel filtre ve efektler','✨ Gelişmiş makyaj araçları','💇🏻‍♀️ Daha fazla saç stili','💗 Kişisel güzellik planı','🌸 Reklamsız deneyim'].map(t=><div key={t}>{t}</div>)}</div><button onClick={()=>alert('Premium üyelik ve ödeme sistemi henüz aktif değil.')}>Premium yakında ✨</button></div></>;
  const navigation = [['home', 'Ana Sayfa', Home], ['editor', 'Editör', WandSparkles], ['explore', 'Keşfet', Compass], ['messages', 'Mesajlar', MessageCircle], ['profile', 'Profil', UserRound]];
  return <div className="app">{splash && <div className={`splash-screen ${splashProgress === 100 ? 'splash-finishing' : ''}`} role="status" aria-label="Pembe Beauty açılıyor">
    <div className="splash-ambient splash-ambient-one"/><div className="splash-ambient splash-ambient-two"/>
    <div className="splash-art-wrap"><img className="splash-art" src="/pembe-splash.webp" alt="Pembe Beauty açılış görseli"/><span className="splash-spark splash-spark-one">✦</span><span className="splash-spark splash-spark-two">✧</span><span className="splash-spark splash-spark-three">✦</span></div>
    <div className="splash-progress-area"><div className="splash-progress-label"><span>Güzellik dünyan hazırlanıyor</span><strong>%{splashProgress}</strong></div><div className="splash-progress-track"><div className="splash-progress-fill" style={{ width: `${splashProgress}%` }}/></div><p className="splash-loading-text">{splashProgress === 100 ? 'Hazırsın! 💗' : 'Pembe Beauty yükleniyor...'}</p></div>
  </div>}<main className="content">{page === 'home' && <HomePage/>}{page === 'editor' && <EditorPage/>}{page === 'explore' && <ExplorePage/>}{page === 'forum' && <ForumPage/>}{page === 'messages' && <MessagesPage/>}{page === 'tips' && <TipsPage/>}{page === 'profile' && <ProfilePage/>}{['premium','hair','makeup'].includes(page) && <ComingSoon type={page}/>}</main><input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={uploadPhoto}/><nav className="bottom-nav">{navigation.map(([id, label, Icon]) => <button key={id} className={page === id ? 'nav-item active' : 'nav-item'} onClick={() => navigate(id)}><Icon size={22} strokeWidth={page === id ? 2.3 : 1.8}/><span>{label}</span></button>)}</nav></div>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);

