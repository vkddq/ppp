import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import './index.css';

const generateHex = () => {
  const chars = '0123456789ABCDEF';
  let color = '';
  for (let i = 0; i < 6; i++) {
    color += chars[Math.floor(Math.random() * 16)];
  }
  return color;
};

const MainPage = () => {
  const navigate = useNavigate();
  const [colorOfDay, setColorOfDay] = useState('000000');

  useEffect(() => { setColorOfDay(generateHex()); }, []);

  const companies = [
    "https://res.cloudinary.com/coolors/image/upload/v1757421653/media/Disney_wordmark.svg",
    "https://res.cloudinary.com/coolors/image/upload/v1757422624/media/DreamWorks2016.svg",
    "https://res.cloudinary.com/coolors/image/upload/v1757422149/media/warnerbros.svg",
    "https://res.cloudinary.com/coolors/image/upload/v1757422148/media/ea.svg",
    "https://res.cloudinary.com/coolors/image/upload/v1757422145/media/apple.svg",
    "https://res.cloudinary.com/coolors/image/upload/v1757421975/media/1622439415c22e4475400432eae4619d1592a8bc-71x22.svg"
  ];

  return (
    <div className="main-page">
      <header className="main-header">
        <div className="logo">
           <Link to="/">
              <img src="/pig.jpg" alt="Pig Logo" style={{height: '45px', borderRadius: '50%', border: '2px solid #ddd'}} />
           </Link>
        </div>
        <nav className="desktop-nav">
          <a href="#" className="nav-item">Tools <i className="fa-solid fa-chevron-down"></i></a>
          <a href="#" className="nav-item text-red">Go Pro</a>
          <div className="divider-v"></div>
          <Link to="/login" className="nav-item">Sign in</Link>
          <Link to="/registration" className="btn btn-blue">Sign up</Link>
        </nav>
      </header>

      <section className="hero container">
        <div className="hero-content">
          <h1>The super fast<br />color palettes<br />generator!</h1>
          <p>Create the perfect palette or get inspired by<br/>thousands of beautiful color schemes.</p>
          <div className="hero-btns">
            <button className="btn btn-blue" onClick={() => navigate('/generator')}>Start the Generator</button>
            <button className="btn btn-gray">Explore 10M+ Palettes</button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="strip" style={{background: '#FF6B6B'}}></div>
          <div className="strip" style={{background: '#FF8E72'}}></div>
          <div className="strip" style={{background: '#C7B1BE'}}></div>
          <div className="strip" style={{background: '#9DE0E6'}}></div>
          <div className="strip" style={{background: '#8CF5F5'}}></div>
        </div>
      </section>

      <section className="trusted container">
        <p>TRUSTED BY 8+ MILLION CREATIVE MINDS AND TOP COMPANIES</p>
        <div className="logos-row">
          {companies.map((src, i) => <img key={i} src={src} alt="logo" />)}
        </div>
      </section>

      <section className="info-block container">
        <div className="info-text">
          <p>Coolors is the lightning-fast, ultra-intuitive color palette generator for designers, creators, and anyone seeking visual harmony. Instantly generate beautiful palettes by hitting the spacebar...</p>
        </div>
        
        <div className="color-day-card" onClick={() => navigate(`/colors/${colorOfDay}`)}>
           <div className="color-day-preview" style={{background: '#' + colorOfDay}}></div>
           <div className="color-day-info">
             <span className="label">COLOR OF THE DAY</span>
             <h3>Random Color</h3>
             <span className="hex">#{colorOfDay}</span>
           </div>
        </div>
      </section>

      <div className="section-subtitle container">OUR TOOLS, LOVED BY MILLIONS</div>

      <section className="tools-grid container">
        <ToolCard color="cyan" icon="fa-wand-magic-sparkles" title="Palette Generator" desc="Create beautiful color schemes in seconds with the worldwide loved palette tool." link="START THE GENERATOR" />
        <ToolCard color="blue" icon="fa-magnifying-glass" title="Explore Palettes" desc="Get inspired by thousands of beautiful color schemes. Search by colors, styles, topics." link="EXPLORE 10M+ PALETTES" />
        <ToolCard color="purple" icon="fa-camera" title="Image Picker" desc="Extract beautiful colors from your photos and turn them into palettes for your projects." link="LAUNCH THE IMAGE PICKER" />
        <ToolCard color="pink" icon="fa-circle-half-stroke" title="Contrast Checker" desc="Calculate the contrast ratio of text and background colors to make your content accessible." link="TRY THE CONTRAST CHECKER" />
        <ToolCard color="red" icon="fa-eye" title="Palette Visualizer" desc="Preview your colors on real designs to see how they look in context before using them." link="OPEN THE VISUALIZER" />
        <ToolCard color="orange" icon="fa-eye-dropper" title="Color Picker" desc="Get useful color information like meaning, usage, variations, accessibility and conversion." link="LAUNCH THE COLOR PICKER" />
      </section>

      <div className="section-subtitle container" style={{marginTop: '60px'}}>MORE USEFUL RESOURCES</div>

      <section className="resources-grid container">
         <ResourceCard title="Color Names" desc="Browse and search through a comprehensive list of color names." />
         <ResourceCard title="Free Fonts" desc="Discover and collect beautiful free fonts for your designs." />
         <ResourceCard title="Collage Maker" desc="Create stylish collages by combining your photos and palettes." />
         <ResourceCard title="Browse Gradients" desc="Explore beautiful gradients for your projects." />
         <ResourceCard title="Gradient Palette" desc="Create a gradient palette between two colors." />
         <ResourceCard title="Image Converter" desc="Convert images to different formats with ease." />
      </section>

      <div className="section-subtitle container" style={{marginTop: '60px'}}>PLUGINS AND APPS</div>
      
      <section className="plugins-grid container">
         <div className="plugin-card"><h3>iOS App</h3></div>
         <div className="plugin-card"><h3>Figma Plugin</h3></div>
         <div className="plugin-card"><h3>Adobe Extension</h3></div>
      </section>

      <footer className="big-footer">
         <div className="container">
            <h1 className="footer-headline">Make something<br/>colorful!</h1>
            <div className="footer-links">
               <div className="f-col">
                  <h4>Tools</h4>
                  <a href="#">Generate your palettes</a>
                  <a href="#">Explore popular palettes</a>
               </div>
               <div className="f-col">
                  <h4>Discover</h4>
                  <a href="#">List of colors</a>
                  <a href="#">Browse gradients</a>
               </div>
               <div className="f-col">
                  <h4>Apps</h4>
                  <a href="#">iOS App</a>
                  <a href="#">Figma Plugin</a>
               </div>
               <div className="f-col">
                  <h4>Company</h4>
                  <a href="#">Pricing</a>
                  <a href="#">License</a>
               </div>
            </div>
            <div className="footer-bottom">
               <p>© Coolors by Fabrizio Bianchi. Let's make something cool!</p>
               <div className="socials">
                  <i className="fa-brands fa-twitter"></i>
                  <i className="fa-brands fa-instagram"></i>
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
};

const ToolCard = ({ color, title, desc, link }) => (
  <div className={`tool-card bg-${color}`}>
    <div className="tool-content">
       <h2>{title}</h2>
       <p>{desc}</p>
    </div>
    <div className="tool-link">{link} <i className="fa-solid fa-arrow-right"></i></div>
  </div>
);

const ResourceCard = ({ title, desc }) => (
  <div className="resource-card">
     <h3>{title}</h3>
     <p>{desc}</p>
  </div>
);

const GeneratorPage = () => {
  const [colors, setColors] = useState([
    { hex: generateHex(), locked: false, saved: false },
    { hex: generateHex(), locked: false, saved: false },
    { hex: generateHex(), locked: false, saved: false },
    { hex: generateHex(), locked: false, saved: false },
    { hex: generateHex(), locked: false, saved: false }
  ]);

  useEffect(() => {
    const handleSpace = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setColors(prev => prev.map(c => c.locked ? c : { ...c, hex: generateHex() }));
      }
    };
    window.addEventListener('keydown', handleSpace);
    return () => window.removeEventListener('keydown', handleSpace);
  }, []);

  const handleSave = (index) => {
    setColors(prev => prev.map((c, i) => i === index ? { ...c, saved: true } : c));
  };

  const toggleLock = (index) => {
    setColors(prev => prev.map((c, i) => i === index ? { ...c, locked: !c.locked } : c));
  };

  const addColumn = (index) => {
    if (colors.length >= 7) return;
    const newColors = [...colors]; 
    newColors.splice(index + 1, 0, { hex: generateHex(), locked: false, saved: false });
    setColors(newColors);
  };

  return (
    <div className="generator-page">
      <header className="gen-header">
        <div className="logo">
           <Link to="/">
              <img src="/pig.jpg" alt="Pig Logo" style={{height: '35px', borderRadius: '50%', border: '2px solid #ddd'}} />
           </Link>
        </div>
        <div className="gen-msg">Press the spacebar to generate color palettes!</div>
        <div className="actions"><button className="btn btn-blue">Sign up</button></div>
      </header>
      <div className="palette-container">
        {colors.map((c, i) => (
          <div key={i} className="col" style={{backgroundColor: '#' + c.hex}}>
            {i < colors.length - 1 && colors.length < 7 && (
               <div className="add-col-btn" onClick={() => addColumn(i)}>
                 <i className="fa-solid fa-plus"></i>
               </div>
            )}
            <div className="col-content">
              <div className="col-icons">
                 <i className="fa-solid fa-xmark"></i>
                 <i 
                   className={`fa-solid fa-heart ${c.saved ? 'heart-filled' : ''}`} 
                   onClick={() => handleSave(i)}
                 ></i>
                 <i 
                   className={`fa-solid ${c.locked ? 'fa-lock' : 'fa-lock-open'}`} 
                   onClick={() => toggleLock(i)}
                 ></i>
              </div>
              <h2>{c.hex}</h2>
              <span className="col-name">Cool Color</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AuthPage = ({ type }) => {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="auth-container">
       <div className="auth-box">
          <h1>{type === 'login' ? 'Hello!' : 'Sign up'}</h1>
          <p className="auth-sub">Use your email or another service.</p>
          <button className="social-btn"><i className="fa-brands fa-google"></i> Continue with Google</button>
          <button className="social-btn"><i className="fa-brands fa-apple"></i> Continue with Apple</button>
          <div className="or-divider"><span>OR</span></div>
          <form onSubmit={(e) => e.preventDefault()}>
            {type === 'register' && <input className="input" placeholder="Full Name" />}
            <input className="input" placeholder="Email" />
            <div className="pass-wrapper">
               <input className="input" type={showPass ? "text" : "password"} placeholder="Password" />
               <i className={`fa-solid ${showPass ? 'fa-eye-slash' : 'fa-eye'} eye-btn`} onClick={() => setShowPass(!showPass)}></i>
            </div>
            <button className="btn-blue w-100" onClick={() => type === 'login' ? navigate('/registration') : null}>
               {type === 'login' ? 'Continue with email' : 'Create account'}
            </button>
          </form>
       </div>
       <div className="auth-visual"></div>
    </div>
  );
};

const SpecialColorPage = () => {
  const { colorHex } = useParams();
  
  return (
    <div className="special-page">
       <header className="main-header">
         <div className="logo">
           <Link to="/">
              <img src="/pig.jpg" alt="Pig Logo" style={{height: '35px', borderRadius: '50%', border: '2px solid #ddd'}} />
           </Link>
         </div>
       </header>
       <div className="special-content container">
          <div className="breadcrumbs">Colors &gt; {colorHex}</div>
          <h1>Color #{colorHex}</h1>
          <div className="big-swatch" style={{background: '#' + colorHex}}>
             <span>#{colorHex}</span>
          </div>
          <div className="conversion-section">
             <h2>Conversion</h2>
             <div className="table">
                <div className="row"><span>HEX</span> <span>{colorHex}</span></div>
                <div className="row"><span>RGB</span> <span>100, 50, 20</span></div>
                <div className="row"><span>CMYK</span> <span>10, 20, 30, 0</span></div>
             </div>
          </div>
       </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/generator" element={<GeneratorPage />} />
        <Route path="/login" element={<AuthPage type="login" />} />
        <Route path="/registration" element={<AuthPage type="register" />} />
        <Route path="/colors/:colorHex" element={<SpecialColorPage />} />
      </Routes>
    </Router>
  );
}

export default App;