import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Routes, Route, Link } from 'react-router-dom';
import DesignVault from './DesignVault';
import BotMind from './BotMind';

/* ━━━━━━━━━━━━━━━━━━━━ ANIMATION VARIANTS ━━━━━━━━━━━━━━━━━━━━ */

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const staggerFast = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.03, delayChildren: 0.1 },
  },
};

const letterAnim = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardHover = {
  y: -3,
  borderColor: 'rgba(245,166,35,0.4)',
  transition: { duration: 0.25 },
};

/* ━━━━━━━━━━━━━━━━━━━━ MUSIC TOGGLE ━━━━━━━━━━━━━━━━━━━━━━━━━ */

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Autoplay blocked:", e));
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
    }
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/bg_music.mp3" loop />
      <motion.button
        onClick={toggleMusic}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          background: 'rgba(30,25,20,0.85)',
          border: isPlaying ? '1px solid #F5A623' : '1px solid rgba(245,166,35,0.2)',
          borderRadius: '50%',
          width: '56px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#F5A623',
          fontSize: '20px',
          backdropFilter: 'blur(12px)',
          boxShadow: isPlaying ? '0 0 20px rgba(245,166,35,0.3)' : 'none',
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          boxShadow: isPlaying 
            ? ['0 0 10px rgba(245,166,35,0.2)', '0 0 25px rgba(245,166,35,0.5)', '0 0 10px rgba(245,166,35,0.2)'] 
            : '0 0 0px rgba(0,0,0,0)'
        }}
        transition={{ 
          boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 0.5 },
          scale: { duration: 0.5 }
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isPlaying ? '♪' : '✕'}
      </motion.button>
    </>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━ STYLES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const s = {
  /* ── layout ── */
  page: {
    position: 'relative',
    minHeight: '100vh',
    overflow: 'hidden',
    background: '#0a0a0a',
  },
  container: {
    maxWidth: '1140px',
    margin: '0 auto',
    padding: '0 clamp(16px, 4vw, 40px)',
  },

  /* ── glow orbs ── */
  orbPrimary: {
    position: 'fixed',
    top: '-180px',
    right: '-180px',
    width: '700px',
    height: '700px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(220,90,10,0.45), rgba(180,60,5,0.18), transparent)',
    pointerEvents: 'none',
    zIndex: 0,
    filter: 'blur(20px)',
  },
  orbSecondary: {
    position: 'fixed',
    bottom: '-120px',
    left: '-120px',
    width: '450px',
    height: '450px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(245,166,35,0.2), rgba(180,100,5,0.08), transparent)',
    pointerEvents: 'none',
    zIndex: 0,
    filter: 'blur(18px)',
  },

  /* ── navbar ── */
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '18px 0',
    borderBottom: '1px solid rgba(245,166,35,0.1)',
    backdropFilter: 'blur(16px)',
    background: 'rgba(10,10,10,0.75)',
  },
  navLogo: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: '24px',
    color: '#F5A623',
    letterSpacing: '2px',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  navLinks: {
    display: 'flex',
    gap: '32px',
    listStyle: 'none',
  },
  navLink: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '13px',
    color: '#9a8c7a',
    textDecoration: 'none',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'color 0.25s',
    background: 'none',
    border: 'none',
    padding: 0,
  },

  /* ── glass card base ── */
  glassCard: {
    background: 'rgba(30,25,20,0.75)',
    border: '1px solid rgba(245,166,35,0.18)',
    borderRadius: '20px',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    padding: 'clamp(24px, 4vw, 40px)',
    position: 'relative',
    overflow: 'hidden',
  },

  /* ── hero ── */
  heroSection: {
    paddingTop: 'clamp(40px, 6vw, 80px)',
    paddingBottom: '40px',
    position: 'relative',
    zIndex: 1,
  },
  heroTopRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    flexWrap: 'wrap',
    gap: '12px',
  },
  openToWork: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: "'DM Mono', monospace",
    fontSize: '13px',
    color: '#7ecf8a',
    letterSpacing: '0.5px',
  },
  greenDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#4ade80',
    boxShadow: '0 0 8px rgba(74,222,128,0.6)',
  },
  cvButton: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: '14px',
    padding: '10px 28px',
    borderRadius: '30px',
    background: '#F5A623',
    color: '#1a1000',
    border: 'none',
    cursor: 'pointer',
    letterSpacing: '0.5px',
    textDecoration: 'none',
  },
  heroName: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: 'clamp(32px, 5vw, 56px)',
    lineHeight: 1.1,
    color: '#F5A623',
    marginBottom: '16px',
  },
  heroSubtitle: {
    fontFamily: "'DM Mono', monospace",
    fontSize: 'clamp(12px, 1.4vw, 15px)',
    color: '#9a8c7a',
    textTransform: 'uppercase',
    letterSpacing: '2.5px',
    marginBottom: '36px',
    height: '22px',
    overflow: 'hidden',
  },
  heroBottomRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    gap: '16px',
  },
  heroInfo: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '12px',
    color: '#9a8c7a',
    lineHeight: 1.8,
  },
  heroPillsWrap: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  heroPill: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '12px',
    padding: '6px 16px',
    borderRadius: '30px',
    background: 'rgba(245,166,35,0.08)',
    border: '1px solid rgba(245,166,35,0.2)',
    color: '#F5A623',
    letterSpacing: '0.5px',
  },

  /* ── section heading ── */
  sectionHeading: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: 'clamp(24px, 3.5vw, 36px)',
    color: '#f0ece4',
    marginBottom: '36px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  headingLine: {
    height: '2px',
    flex: 1,
    background: 'linear-gradient(90deg, #F5A623, transparent)',
    borderRadius: '2px',
  },

  /* ── about cards ── */
  grid3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  },
  aboutIcon: {
    fontSize: '28px',
    marginBottom: '12px',
  },
  aboutTitle: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: '18px',
    color: '#F5A623',
    marginBottom: '4px',
  },
  aboutSubtitle: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '11px',
    color: '#9a8c7a',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    marginBottom: '16px',
  },
  aboutItem: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '13px',
    color: '#f0ece4',
    padding: '5px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  goldDot: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    background: '#F5A623',
    flexShrink: 0,
  },

  /* ── skills ── */
  grid2: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '20px',
  },
  skillTitle: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: '17px',
    color: '#F5A623',
    marginBottom: '4px',
  },
  skillSubtitle: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '11px',
    color: '#9a8c7a',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    marginBottom: '18px',
  },
  skillPillsWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  skillPill: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '12px',
    padding: '7px 16px',
    borderRadius: '30px',
    background: 'rgba(245,166,35,0.08)',
    border: '1px solid rgba(245,166,35,0.2)',
    color: '#9a8c7a',
    cursor: 'default',
    letterSpacing: '0.3px',
  },

  /* ── projects ── */
  projectThumb: {
    height: '140px',
    borderRadius: '14px 14px 0 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '48px',
    margin: '-40px -40px 20px -40px',
  },
  projectType: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '11px',
    color: '#9a8c7a',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    marginBottom: '6px',
  },
  projectName: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: '20px',
    color: '#F5A623',
    marginBottom: '8px',
  },
  projectDesc: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '12px',
    color: '#9a8c7a',
    lineHeight: 1.6,
    marginBottom: '16px',
  },

  /* ── contact ── */
  contactTitle: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: 'clamp(24px, 3.5vw, 36px)',
    color: '#f0ece4',
    marginBottom: '10px',
    textAlign: 'center',
  },
  contactSub: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '13px',
    color: '#9a8c7a',
    textAlign: 'center',
    marginBottom: '32px',
    lineHeight: 1.6,
  },
  contactBtns: {
    display: 'flex',
    justifyContent: 'center',
    gap: '14px',
    flexWrap: 'wrap',
  },
  contactBtn: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '13px',
    padding: '12px 28px',
    borderRadius: '30px',
    background: 'transparent',
    border: '1px solid rgba(245,166,35,0.3)',
    color: '#F5A623',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    letterSpacing: '0.5px',
  },

  /* ── footer ── */
  footer: {
    textAlign: 'center',
    padding: '40px 0 100px',
    fontFamily: "'DM Mono', monospace",
    fontSize: '12px',
    color: '#9a8c7a',
    position: 'relative',
    zIndex: 1,
  },

  /* ── bottom nav ── */
  bottomNav: {
    position: 'fixed',
    bottom: '24px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 200,
    display: 'flex',
    gap: '4px',
    padding: '6px 8px',
    background: 'rgba(20,16,10,0.85)',
    border: '1px solid rgba(245,166,35,0.2)',
    borderRadius: '40px',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
  },
  bottomNavBtn: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '12px',
    padding: '10px 20px',
    borderRadius: '30px',
    background: 'transparent',
    border: 'none',
    color: '#9a8c7a',
    cursor: 'pointer',
    position: 'relative',
    zIndex: 2,
    letterSpacing: '0.5px',
    whiteSpace: 'nowrap',
  },
  bottomNavActive: {
    position: 'absolute',
    inset: 0,
    borderRadius: '30px',
    background: 'rgba(245,166,35,0.15)',
    border: '1px solid rgba(245,166,35,0.25)',
    zIndex: 1,
  },

  /* ── section spacing ── */
  section: {
    padding: 'clamp(40px, 6vw, 80px) 0',
    position: 'relative',
    zIndex: 1,
  },

  /* ── hero image ── */
  heroImageWrap: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: '20px',
  },
};

/* ━━━━━━━━━━━━━━━━━━━━ DATA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const aboutCards = [
  {
    icon: '🏃',
    title: 'Sports',
    sub: 'On the Field',
    items: ['Football', 'Cricket', 'Gym'],
  },
  {
    icon: '🎨',
    title: 'Creative',
    sub: 'On the Canvas',
    items: ['Poster Design', 'Sketch Artist', 'Manga Artist', 'Video Editor'],
  },
  {
    icon: '💻',
    title: 'Technical',
    sub: 'On the Screen',
    items: ['Vibe Coding', 'Web Development', 'Chatbot Dev'],
  },
];

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const educationData = [
  {
    logo: '/school.png',
    name: 'Sharda Gyan Peeth International School',
    sub: 'High School Education',
    url: 'https://sharadagyanpeeth.com/',
  },
  {
    logo: '/degree.jpg',
    name: 'KJ Somaiya Institute of Technology',
    sub: 'B.Tech · 2nd Year',
    url: 'https://kjsit.somaiya.edu.in/en',
  },
];

const skillCards = [
  {
    title: 'Editing & Design',
    sub: 'Creative Tools',
    items: [
      { name: 'Canva', icon: `${DEVICON}/canva/canva-original.svg` },
      { name: 'Premiere Pro', icon: `${DEVICON}/premierepro/premierepro-original.svg` },
      { name: 'CapCut', icon: null },
      { name: 'Figma', icon: `${DEVICON}/figma/figma-original.svg` },
    ],
  },
  {
    title: 'Technical Stack',
    sub: 'Code & Cloud',
    items: [
      { name: 'HTML', icon: `${DEVICON}/html5/html5-original.svg` },
      { name: 'CSS', icon: `${DEVICON}/css3/css3-original.svg` },
      { name: 'JavaScript', icon: `${DEVICON}/javascript/javascript-original.svg` },
      { name: 'React.js', icon: `${DEVICON}/react/react-original.svg` },
      { name: 'Node.js', icon: `${DEVICON}/nodejs/nodejs-original.svg` },
      { name: 'MongoDB', icon: `${DEVICON}/mongodb/mongodb-original.svg` },
      { name: 'Python', icon: `${DEVICON}/python/python-original.svg` },
      { name: 'Java', icon: `${DEVICON}/java/java-original.svg` },
      { name: 'C', icon: `${DEVICON}/c/c-original.svg` },
      { name: 'C++', icon: `${DEVICON}/cplusplus/cplusplus-original.svg` },
      { name: 'MySQL', icon: `${DEVICON}/mysql/mysql-original.svg` },
      { name: 'AWS', icon: `${DEVICON}/amazonwebservices/amazonwebservices-original-wordmark.svg` },
      { name: 'Git', icon: `${DEVICON}/git/git-original.svg` },
      { name: 'GitHub', icon: `${DEVICON}/github/github-original.svg` },
    ],
  },
];

const projects = [
  {
    emoji: '🤖',
    type: 'AI / Chatbot',
    name: 'BotMind',
    desc: 'An intelligent chatbot powered by NLP algorithms and cloud infrastructure for seamless conversations.',
    tech: ['Python', 'AWS', 'NLP'],
    gradient: 'linear-gradient(135deg, rgba(100,180,255,0.1), rgba(60,120,200,0.06))',
  },
  {
    emoji: '🎨',
    type: 'Design Portfolio',
    name: 'DesignVault',
    desc: 'A curated collection of visual designs, poster art, and video edits crafted across creative tools.',
    tech: ['Figma', 'Premiere Pro', 'Canva'],
    gradient: 'linear-gradient(135deg, rgba(180,100,255,0.1), rgba(140,60,200,0.06))',
  },
];

const roles = ['Developer', 'Designer', 'Athlete', 'Traveller'];

const navTabs = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'Summary', href: '#about' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

/* ━━━━━━━━━━━━━━━━━━━━ COMPONENT ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function MainPortfolio() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('home');
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);

  // Cycle roles
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((p) => (p + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Active tab tracker
  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'projects', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id === 'skills' || id === 'about') setActiveTab('about');
            else if (navTabs.some((t) => t.id === id)) setActiveTab(id);
          }
        });
      },
      { threshold: 0.25 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Split text into animated letters
  const AnimatedName = ({ text }) => (
    <motion.div
      style={{ display: 'flex', overflow: 'hidden' }}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {text.split('').map((ch, i) => (
        <motion.span key={i} variants={letterAnim} style={{ display: 'inline-block' }}>
          {ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}
    </motion.div>
  );

  return (
    <div style={s.page}>
      {/* ── Glow Orbs ── */}
      <motion.div
        style={s.orbPrimary}
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        style={s.orbSecondary}
        animate={{ x: [0, -30, 20, 0], y: [0, 25, -15, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Navbar ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(16px)', background: 'rgba(10,10,10,0.75)' }}
      >
        <div style={{ ...s.container, ...s.nav, justifyContent: 'flex-end' }}>
          <nav>
            <ul style={s.navLinks}>
              {['About', 'Skills', 'Projects', 'Contact'].map((link) => (
                <li key={link}>
                  <motion.button
                    style={s.navLink}
                    whileHover={{ color: '#F5A623' }}
                    onClick={() => scrollTo(`#${link.toLowerCase()}`)}
                  >
                    {link}
                  </motion.button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </motion.div>

      {/* ══════════════════════ HERO ══════════════════════ */}
      <div style={s.container}>
        <section id="home" style={s.heroSection} ref={heroRef}>
          <motion.div
            style={{
              ...s.glassCard,
              position: 'relative',
              overflow: 'hidden',
              minHeight: 'clamp(420px, 50vw, 540px)',
              padding: 0,
            }}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            {/* ── Background photo (right side, blended) ── */}
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '55%',
                height: '100%',
                zIndex: 1,
              }}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src="/yugal1.jpg"
                alt="Yugal Chaudhari"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 15%',
                  display: 'block',
                  filter: 'brightness(0.7) contrast(1.15) saturate(0.8)',
                }}
              />
              {/* Gradient overlay: left fade — strong */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, rgba(20,16,10,1) 0%, rgba(20,16,10,0.95) 20%, rgba(20,16,10,0.7) 40%, rgba(20,16,10,0.3) 60%, transparent 85%)',
                pointerEvents: 'none',
              }} />
              {/* Gradient overlay: bottom fade — strong */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(20,16,10,1) 0%, rgba(20,16,10,0.8) 15%, rgba(20,16,10,0.3) 35%, transparent 55%)',
                pointerEvents: 'none',
              }} />
              {/* Gradient overlay: top fade */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, rgba(20,16,10,0.8) 0%, rgba(20,16,10,0.3) 15%, transparent 30%)',
                pointerEvents: 'none',
              }} />
              {/* Warm amber cinematic tint */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at 65% 35%, rgba(220,130,20,0.12), transparent 65%)',
                pointerEvents: 'none',
              }} />
              {/* Right edge vignette */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to left, rgba(20,16,10,0.5) 0%, transparent 20%)',
                pointerEvents: 'none',
              }} />
            </motion.div>

            {/* ── Text content (left side, above photo) ── */}
            <div style={{
              position: 'relative',
              zIndex: 2,
              padding: 'clamp(28px, 4vw, 48px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: 'clamp(420px, 50vw, 540px)',
            }}>
              {/* top row */}
              <div style={s.heroTopRow}>
                <div style={s.openToWork}>
                  <motion.div
                    style={s.greenDot}
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span>Open to work</span>
                </div>
                <motion.a
                  href="/CV.docx"
                  download="Yugal_Chaudhari_CV.docx"
                  style={s.cvButton}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Download CV
                </motion.a>
              </div>

              {/* middle: name + subtitle */}
              <div style={{ maxWidth: '60%' }}>
                <motion.div style={{ ...s.heroName, y: heroY }}>
                  <AnimatedName text="YUGAL" />
                  <AnimatedName text="CHAUDHARI" />
                </motion.div>

                {/* Subtitle cycling */}
                <div style={s.heroSubtitle}>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={roleIndex}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.4 }}
                      style={{ display: 'inline-block' }}
                    >
                      {roles[roleIndex]}
                    </motion.span>
                  </AnimatePresence>
                  <span style={{ margin: '0 10px', opacity: 0.3 }}>·</span>
                  <span style={{ opacity: 0.5 }}>Developer · Designer · Athlete · Traveller</span>
                </div>
              </div>

              {/* bottom row */}
              <div style={s.heroBottomRow}>
                <div style={s.heroInfo}>
                  <div>KJ Somaiya Institute of Technology</div>
                  <div>2nd Year B.Tech · Mumbai, India</div>
                </div>
                <div style={s.heroPillsWrap}>
                  {['Web Dev', 'Manga Artist', 'Footballer'].map((tag) => (
                    <motion.span
                      key={tag}
                      style={s.heroPill}
                      whileHover={{ background: 'rgba(245,166,35,0.18)', borderColor: '#F5A623' }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ══════════════════════ ABOUT ══════════════════════ */}
        <section id="about" style={s.section}>
          <motion.div
            style={s.sectionHeading}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <span>About Me</span>
            <motion.div
              style={s.headingLine}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              // origin left
              layout
            />
          </motion.div>

          <motion.div
            style={s.grid3}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {aboutCards.map((card) => (
              <motion.div
                key={card.title}
                style={s.glassCard}
                variants={fadeUp}
                whileHover={cardHover}
              >
                <div style={s.aboutIcon}>{card.icon}</div>
                <div style={s.aboutTitle}>{card.title}</div>
                <div style={s.aboutSubtitle}>{card.sub}</div>
                {card.items.map((item) => (
                  <div key={item} style={s.aboutItem}>
                    <span style={s.goldDot} />
                    {item}
                  </div>
                ))}
              </motion.div>
            ))}
          </motion.div>

          {/* ── Education Grid ── */}
          <motion.div
            style={{ ...s.sectionHeading, marginTop: '80px', fontSize: 'clamp(18px, 3.5vw, 24px)', justifyContent: 'flex-start' }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <span>Academic Background</span>
            <motion.div
              style={{ ...s.headingLine, maxWidth: '200px' }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            />
          </motion.div>

          <motion.div
            style={s.grid2}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {educationData.map((edu) => (
              <motion.div
                key={edu.name}
                style={{ ...s.glassCard, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '40px 24px' }}
                variants={fadeUp}
                whileHover={cardHover}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(245,166,35,0.15)',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img src={edu.logo} alt={edu.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '10px' }} />
                </div>
                <div style={{ ...s.aboutTitle, marginBottom: '8px' }}>{edu.name}</div>
                <div style={{ ...s.aboutSubtitle, marginBottom: '24px' }}>{edu.sub}</div>
                <motion.a
                  href={edu.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '8px 20px',
                    borderRadius: '30px',
                    border: '1px solid #F5A623',
                    color: '#F5A623',
                    fontSize: '11px',
                    textDecoration: 'none',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                  whileHover={{ background: '#F5A623', color: '#0a0a0a' }}
                >
                  Visit Website
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ══════════════════════ SKILLS ══════════════════════ */}
        <section id="skills" style={s.section}>
          <motion.div
            style={s.sectionHeading}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <span>Skills</span>
            <motion.div
              style={s.headingLine}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            />
          </motion.div>

          <motion.div
            style={s.grid2}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {skillCards.map((card) => (
              <motion.div
                key={card.title}
                style={s.glassCard}
                variants={fadeUp}
                whileHover={cardHover}
              >
                <div style={s.skillTitle}>{card.title}</div>
                <div style={s.skillSubtitle}>{card.sub}</div>
                <motion.div
                  style={s.skillPillsWrap}
                  variants={staggerFast}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {card.items.map((skill) => (
                    <motion.span
                      key={skill.name}
                      style={{ ...s.skillPill, display: 'inline-flex', alignItems: 'center', gap: '7px' }}
                      variants={fadeUp}
                      whileHover={{
                        background: 'rgba(245,166,35,0.18)',
                        borderColor: '#F5A623',
                        color: '#F5A623',
                      }}
                    >
                      {skill.icon && (
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          style={{ width: '14px', height: '14px', flexShrink: 0 }}
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      )}
                      {skill.name}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ══════════════════════ PROJECTS ══════════════════════ */}
        <section id="projects" style={s.section}>
          <motion.div
            style={s.sectionHeading}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <span>Projects</span>
            <motion.div
              style={s.headingLine}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            />
          </motion.div>

          <motion.div
            style={s.grid3}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {projects.map((proj) => {
              const CardContent = (
                <motion.div
                  key={proj.name}
                  style={{ ...s.glassCard, padding: 0, overflow: 'hidden', height: '100%', cursor: (proj.name === 'DesignVault' || proj.name === 'BotMind') ? 'pointer' : 'default' }}
                  variants={fadeUp}
                  whileHover={{
                    y: -4,
                    borderColor: 'rgba(245,166,35,0.4)',
                    transition: { duration: 0.25 },
                  }}
                >
                  <div
                    style={{
                      ...s.projectThumb,
                      background: proj.gradient,
                      margin: 0,
                      borderRadius: 0,
                    }}
                  >
                    <span>{proj.emoji}</span>
                  </div>
                  <div style={{ padding: 'clamp(20px, 3vw, 32px)' }}>
                    <div style={s.projectType}>{proj.type}</div>
                    <div style={s.projectName}>{proj.name}</div>
                    <div style={s.projectDesc}>{proj.desc}</div>
                    <div style={s.skillPillsWrap}>
                      {proj.tech.map((t) => (
                        <span key={t} style={{ ...s.skillPill, fontSize: '11px', padding: '5px 12px' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );

              if (proj.name === 'DesignVault') {
                return (
                  <Link to="/design-vault" key={proj.name} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {CardContent}
                  </Link>
                );
              }

              if (proj.name === 'BotMind') {
                return (
                  <Link to="/bot-mind" key={proj.name} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {CardContent}
                  </Link>
                );
              }

              return (
                <div key={proj.name}>{CardContent}</div>
              );
            })}
          </motion.div>
        </section>

        {/* ══════════════════════ CONTACT ══════════════════════ */}
        <section id="contact" style={s.section}>
          <motion.div
            style={s.glassCard}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div style={s.contactTitle}>Let's Build Something Great</div>
            <div style={s.contactSub}>
              Open to collaborations, internships, and creative projects.
            </div>
            <div style={s.contactBtns}>
              <motion.a
                href="mailto:yugalchaudharixa@gmail.com"
                style={s.contactBtn}
                whileHover={{
                  borderColor: '#F5A623',
                  boxShadow: '0 0 20px rgba(245,166,35,0.15)',
                  scale: 1.04,
                }}
                whileTap={{ scale: 0.97 }}
              >
                ✉ Email
              </motion.a>
              <motion.a
                href="https://github.com/isagi05-code"
                target="_blank"
                rel="noopener noreferrer"
                style={s.contactBtn}
                whileHover={{
                  borderColor: '#F5A623',
                  boxShadow: '0 0 20px rgba(245,166,35,0.15)',
                  scale: 1.04,
                }}
                whileTap={{ scale: 0.97 }}
              >
                ⌥ GitHub
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/yugal-chaudhari-b4366932a/"
                target="_blank"
                rel="noopener noreferrer"
                style={s.contactBtn}
                whileHover={{
                  borderColor: '#F5A623',
                  boxShadow: '0 0 20px rgba(245,166,35,0.15)',
                  scale: 1.04,
                }}
                whileTap={{ scale: 0.97 }}
              >
                ◈ LinkedIn
              </motion.a>
            </div>
          </motion.div>
        </section>

        {/* ── Footer ── */}
        <footer style={s.footer}>
          Designed & Built by{' '}
          <span style={{ color: '#F5A623' }}>Yugal Chaudhari</span> · © 2026
        </footer>
      </div>

      {/* ══════════════════════ BOTTOM NAV ══════════════════════ */}
      <motion.div
        style={s.bottomNav}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        {navTabs.map((tab) => (
          <motion.button
            key={tab.id}
            style={{
              ...s.bottomNavBtn,
              color: activeTab === tab.id ? '#F5A623' : '#9a8c7a',
            }}
            onClick={() => {
              setActiveTab(tab.id);
              scrollTo(tab.href);
            }}
            whileHover={{ color: '#F5A623' }}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab"
                style={s.bottomNavActive}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span style={{ position: 'relative', zIndex: 2 }}>{tab.label}</span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <MusicPlayer />
      <Routes>
        <Route path="/" element={<MainPortfolio />} />
        <Route path="/design-vault" element={<DesignVault />} />
        <Route path="/bot-mind" element={<BotMind />} />
      </Routes>
    </>
  );
}
