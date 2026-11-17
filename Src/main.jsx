import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Home, Camera, Compass, MessageCircle, UserRound, Heart, Send, Plus, Bell, Sparkles, WandSparkles, ArrowLeft, Bookmark, Download, Users } from 'lucide-react';
import './style.css';

function App() {
  const [page, setPage] = useState('home');
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
  const [forumPosts, setForumPosts] = useState([]);
  const [forumText, setForumText] = useState('');
  const [forumCategory, setForumCategory] = useState('Genel');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const fileRef = useRef(null);

  const filters = [
    ['Orijinal', 'none'],
    ['Pembe', 'sepia(.18) saturate(1.35) hue-rotate(320deg)'],
    ['Parlak', 'brightness(1.15) contrast(1.05)'],
    ['Soft', 'brightness(1.08) contrast(.88)'],
    ['Canlı', 'saturate(1.65) contrast(1.1)'],
    ['Vintage', 'sepia(.45) contrast(.95)'],
    ['Siyah Beyaz', 'grayscale(1)']
  ];
  const appliedFilter = `${filter === 'none' ? '' : filter} brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`.trim();
  const demoPosts = [
    { id: 'demo1', user: 'Güzellik Tutkunu', text: 'Günlük doğal makyaj için en sevdiğiniz ton hangisi? 🌸', product: 'Doğal makyaj' },
    { id: 'demo2', user: 'Makyaj Günlüğüm', text: 'Pembe tonlarda ruj önerilerinizi bekliyorum 💄', product: 'Ruj önerileri' }
  ];
  const allPosts = [...posts, ...demoPosts];

  function choosePhoto() { fileRef.current?.click(); }
  function uploadPhoto(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { alert('Bir fotoğraf seç.'); return; }
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result);
      setFilter('none'); setBrightness(100); setContrast(100); setSaturation(100);
      setPage('editor');
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  }
  function publishPost() {
    if (!photo) { choosePhoto(); return; }
    setPosts(prev => [{ id: Date.now(), user: 'Sen', image: photo, imageFilter: appliedFilter, text: caption.trim() || 'Yeni güzellik paylaşımım 💗', product: 'Güzellik paylaşımı' }, ...prev]);
    setCaption(''); setPage('explore');
  }
  function addComment(id) {
    const value = (commentInputs[id] || '').trim();
    if (!value) return;
    setComments(prev => ({ ...prev, [id]: [...(prev[id] || []), value] }));
    setCommentInputs(prev => ({ ...prev, [id]: '' }));
  }
  function addForumPost() {
    if (!forumText.trim()) return;
    setForumPosts(prev => [{ id: Date.now(), user: 'Sen', text: forumText.trim(), category: forumCategory }, ...prev]);
    setForumText('');
  }
  function sendMessage() {
    if (!message.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), text: message.trim() }]);
    setMessage('');
  }
  function downloadPhoto() {
    if (!photo) return;
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
      const context = canvas.getContext('2d');
      if (!context) return;
      context.filter = appliedFilter || 'none';
      context.drawImage(img, 0, 0);
      const link = document.createElement('a');
      link.download = 'pembe-beauty.png'; link.href = canvas.toDataURL('image/png'); link.click();
    };
    img.src = photo;
  }
  const Header = ({ title, back = false }) => (
    <header className="header">
      <div className="header-left">
        {back && <button className="icon-btn" onClick={() => setPage('home')} aria-label="Geri"><ArrowLeft size={21}/></button>}
        <h2>{title}</h2>
      </div>
      <Bell size={21} color="#bd3682" />
    </header>
  );
  const HomePage = () => (
    <>
      <Header title="Pembe Beauty 💗" />
      <section className="welcome">
        <span>✨ GÜZELLİĞİN YENİ DÜNYASI</span>
        <h1>Güzelliğini Keşfet</h1>
        <p>Fotoğraflarını güzelleştir, tarzını paylaş ve ilham al.</p>
        <button onClick={choosePhoto}><WandSparkles size={18}/> Fotoğrafını Güzelleştir</button>
      </section>
      <h3 className="section-title">Güzellik Stüdyosu</h3>
      <div className="tools-grid">
        {[
          ['✨','Fotoğraf Editörü','editor'], ['💄','Sanal Makyaj','editor'],
          ['💇‍♀️','Saç Stilleri','editor'], ['📸','Filtreler','editor'],
          ['🌸','Bakım Önerileri','tips'], ['👑','Premium','premium']
        ].map(([emoji, label, target]) => (
          <button className="tool-card" key={label} onClick={() => setPage(target)}><span>{emoji}</span><strong>{label}</strong></button>
        ))}
      </div>
      <div className="feature-card"><h3>💗 Güzellik Topluluğu</h3><p>Makyajlarını paylaş, yeni arkadaşlar keşfet.</p><button onClick={() => setPage('explore')}>Keşfet</button></div>
      <div className="feature-card light"><h3>💬 Güzellik Forumu</h3><p>Güzellik, bakım ve kozmetik hakkında konuş.</p><button onClick={() => setPage('forum')}>Foruma Git</button></div>
      <div className="feature-card light"><h3>🌷 Güzellik Asistanı</h3><p>Bakım ve makyaj önerilerini keşfet.</p><button onClick={() => setPage('tips')}>Önerileri Gör</button></div>
    </>
  );
  const EditorPage = () => (
    <>
      <Header title="Fotoğraf Editörü" back />
      <div className="editor-box">
        {photo ? <img src={photo} alt="Düzenlenen fotoğraf" style={{ filter: appliedFilter }}/> :
          <div className="empty-photo"><Camera size={50}/><h3>Fotoğrafını Yükle</h3><p>Güzelliğine yeni bir dokunuş kat.</p><button onClick={choosePhoto}>Fotoğraf Seç</button></div>}
      </div>
      <h3 className="section-title">Filtreler</h3>
      <div className="filter-list">
        {filters.map(([name, value]) => <button key={name} className={filter === value ? 'filter active' : 'filter'} onClick={() => setFilter(value)}>{name}</button>)}
      </div>
      <div className="adjustments">
        {[
          ['Parlaklık', brightness, setBrightness],
          ['Kontrast', contrast, setContrast],
          ['Canlılık', saturation, setSaturation]
        ].map(([label, value, setter]) => (
          <label key={label}>{label}: {value}%<input type="range" min="50" max="150" value={value} onChange={e => setter(Number(e.target.value))}/></label>
        ))}
      </div>
      <div className="action-buttons">
        <button onClick={choosePhoto}>Fotoğraf Değiştir</button>
        <button onClick={downloadPhoto} disabled={!photo}><Download size={17}/> Kaydet</button>
      </div>
      <textarea placeholder="Paylaşımına açıklama ekle..." value={caption} onChange={e => setCaption(e.target.value)} />
      <button className="primary-btn" onClick={publishPost}><Plus size={18}/> Paylaş</button>
      <p className="note">Temel filtreler çalışır. Gerçek zamanlı sanal makyaj, saç denemesi ve gelişmiş AI düzenleme henüz eklenmedi.</p>
    </>
  );
  const ExplorePage = () => (
    <>
      <Header title="Keşfet 💕" />
      <div className="page-intro"><h3>Güzellik Paylaşımları</h3><p>Makyajları keşfet, beğen ve ilham al.</p></div>
      <div className="search-box"><Search size={18}/><input placeholder="Paylaşım ara..." value={search} onChange={e => setSearch(e.target.value)}/></div>
      <button className="primary-btn" onClick={choosePhoto}><Plus size={18}/> Yeni Paylaşım</button>
      {allPosts.filter(p => `${p.user} ${p.text} ${p.product}`.toLocaleLowerCase('tr').includes(search.toLocaleLowerCase('tr'))).map(post => (
        <article className="post-card" key={post.id}>
          <div className="post-user">
            <div className="avatar">{post.user.charAt(0)}</div>
            <div className="post-user-info"><strong>{post.user}</strong><small>{post.product}</small></div>
            {post.user !== 'Sen' && <button className="follow-btn" onClick={() => setFollowing(prev => ({ ...prev, [post.user]: !prev[post.user] }))}>{following[post.user] ? 'Takiptesin' : 'Takip Et'}</button>}
          </div>
          {post.image ? <img className="post-image" src={post.image} alt="Güzellik paylaşımı" style={{ filter: post.imageFilter || 'none' }}/> : <div className="demo-post-image"><Sparkles size={45}/><span>Güzellik İlhamı</span></div>}
          <div className="post-actions">
            <button onClick={() => setLikes(prev => ({ ...prev, [post.id]: !prev[post.id] }))}><Heart size={21} color="#ec4899" fill={likes[post.id] ? '#ec4899' : 'none'}/> {likes[post.id] ? 'Beğenildi' : 'Beğen'}</button>
            <button onClick={() => setComments(prev => ({ ...prev, [`open-${post.id}`]: !prev[`open-${post.id}`] }))}><MessageCircle size={20}/> Yorum</button>
            <button onClick={() => setSaved(prev => ({ ...prev, [post.id]: !prev[post.id] }))}><Bookmark size={20} fill={saved[post.id] ? '#ec4899' : 'none'}/></button>
          </div>
          <p className="post-caption">{post.text}</p>
          {comments[`open-${post.id}`] && <div className="comment-area">
            {(comments[post.id] || []).map((comment, index) => <p key={index}><strong>Sen:</strong> {comment}</p>)}
            <div className="message-compose"><input placeholder="Yorum yaz..." value={commentInputs[post.id] || ''} onChange={e => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}/><button onClick={() => addComment(post.id)}><Send size={18}/></button></div>
          </div>}
        </article>
      ))}
    </>
  );
  const ForumPage = () => (
    <>
      <Header title="Güzellik Forumu 💬" back />
      <div className="page-intro"><h3>Birlikte Daha Güzeliz</h3><p>Sorularını sor, deneyimlerini paylaş.</p></div>
      <div className="forum-categories">{['Genel','Makyaj','Cilt Bakımı','Saç','Kozmetik'].map(c => <button key={c} className={forumCategory === c ? 'filter active' : 'filter'} onClick={() => setForumCategory(c)}>{c}</button>)}</div>
      <div className="forum-compose"><h3>Yeni Konu Aç</h3><textarea placeholder="Ne hakkında konuşmak istersin?" value={forumText} onChange={e => setForumText(e.target.value)}/><button onClick={addForumPost}><Plus size={17}/> Konuyu Paylaş</button></div>
      {forumPosts.filter(p => forumCategory === 'Genel' || p.category === forumCategory).map(post => <div className="forum-post" key={post.id}><strong>💗 {post.user}</strong><small>{post.category}</small><p>{post.text}</p></div>)}
      <div className="forum-post"><strong>🌸 Güzellik Topluluğu</strong><p>Günlük makyaj için en sevdiğiniz ürün hangisi?</p><small>Örnek tartışma</small></div>
    </>
  );
  const MessagesPage = () => (
    <>
      <Header title="Mesajlar 💌" />
      <div className="page-intro"><h3>Özel Mesajlar</h3><p>Bu alan şu anda yalnızca demo sohbetidir.</p></div>
      <div className="chat-info"><Users size={25}/><div><strong>Demo Sohbet</strong><small>Gerçek kullanıcı mesajlaşması henüz bağlı değil.</small></div></div>
      <div className="chat-box"><div className="chat-bubble other">Pembe Beauty'ye hoş geldin! 💗</div>{messages.map(m => <div key={m.id} className="chat-bubble mine">{m.text}</div>)}</div>
      <div className="message-compose"><input placeholder="Mesaj yaz..." value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}/><button onClick={sendMessage}><Send size={20}/></button></div>
    </>
  );
  const TipsPage = () => (
    <>
      <Header title="Güzellik Asistanı 🌷" back />
      <section className="welcome"><span>✨ GÜZELLİK REHBERİN</span><h1>Güzelliğine İlham Kat</h1><p>Günlük bakım ve makyaj önerilerini keşfet.</p></section>
      {[
        ['🌸 Günlük Cilt Bakımı','Nazik temizleme, nemlendirme ve güneş koruyucu kullanımı temel bir rutin oluşturabilir.'],
        ['💄 Doğal Makyaj','Hafif ten ürünleri, doğal tonlarda allık ve dudak ürünleriyle günlük görünüm oluşturabilirsin.'],
        ['💇‍♀️ Saç Bakımı','Saç tipine uygun ürünler seçmek ve aşırı ısı kullanımından kaçınmak faydalı olabilir.'],
        ['✨ Kozmetik Önerileri','Yeni ürünlerin içeriklerini ve son kullanma tarihlerini kontrol et.']
      ].map(([title, description]) => <div className="tip-card" key={title}><h3>{title}</h3><p>{description}</p></div>)}
    </>
  );
  const ProfilePage = () => (
    <>
      <Header title="Profilim 💗" />
      <div className="profile-header"><div className="profile-avatar"><UserRound size={42}/></div><h2>Güzellik Tutkunu</h2><p>@pembebeauty</p><small>Demo profil</small></div>
      <div className="profile-stats"><div><strong>{posts.length}</strong><span>Paylaşım</span></div><div><strong>0</strong><span>Takipçi</span></div><div><strong>{Object.values(following).filter(Boolean).length}</strong><span>Takip</span></div></div>
      <button className="primary-btn" onClick={choosePhoto}><Camera size={18}/> Yeni Fotoğraf Paylaş</button>
      <h3 className="section-title">Paylaşımlarım</h3>
      {posts.length === 0 ? <div className="empty-state"><Camera size={38}/><p>Henüz paylaşım yapmadın.</p></div> : <div className="profile-gallery">{posts.map(p => <img key={p.id} src={p.image} alt="Paylaşım" style={{ filter: p.imageFilter || 'none' }}/>)}</div>}
    </>
  );
  const PremiumPage = () => (
    <><Header title="Pembe Premium 👑" back/><section className="welcome"><h1>Premium Çok Yakında</h1><p>Gelişmiş yapay zekâ, sanal makyaj ve özel güzellik araçları daha sonra eklenecek.</p></section></>
  );
  const navigation = [
    ['home', 'Ana Sayfa', Home],
    ['editor', 'Editör', WandSparkles],
    ['explore', 'Keşfet', Compass],
    ['messages', 'Mesajlar', MessageCircle],
    ['profile', 'Profil', UserRound]
  ];
  return (
    <div className="app">
      <main className="content">
        {page === 'home' && <HomePage/>}
        {page === 'editor' && <EditorPage/>}
        {page === 'explore' && <ExplorePage/>}
        {page === 'forum' && <ForumPage/>}
        {page === 'messages' && <MessagesPage/>}
        {page === 'tips' && <TipsPage/>}
        {page === 'profile' && <ProfilePage/>}
        {page === 'premium' && <PremiumPage/>}
      </main>
      <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={uploadPhoto}/>
      <nav className="bottom-nav">
        {navigation.map(([id, label, Icon]) => <button key={id} className={page === id ? 'nav-item active' : 'nav-item'} onClick={() => setPage(id)}><Icon size={22}/><span>{label}</span></button>)}
      </nav>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);

