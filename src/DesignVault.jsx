import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const s = {
  page: {
    position: 'relative',
    minHeight: '100vh',
    overflow: 'hidden',
    background: '#0a0a0a',
    color: '#f0ece4',
    fontFamily: "'DM Mono', monospace",
  },
  container: {
    maxWidth: '1140px',
    margin: '0 auto',
    padding: '0 clamp(16px, 4vw, 40px)',
  },
  orbPrimary: {
    position: 'fixed',
    top: '-180px',
    right: '-180px',
    width: '700px',
    height: '700px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(220,90,10,0.35), rgba(180,60,5,0.12), transparent)',
    pointerEvents: 'none',
    zIndex: 0,
    filter: 'blur(40px)',
  },
  orbSecondary: {
    position: 'fixed',
    bottom: '-120px',
    left: '-120px',
    width: '450px',
    height: '450px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(245,166,35,0.15), rgba(180,100,5,0.06), transparent)',
    pointerEvents: 'none',
    zIndex: 0,
    filter: 'blur(35px)',
  },
  header: {
    padding: ' clamp(40px, 8vw, 80px) 0 40px',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1,
  },
  title: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: 'clamp(32px, 6vw, 64px)',
    color: '#F5A623',
    marginBottom: '16px',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 'clamp(12px, 1.5vw, 14px)',
    color: '#9a8c7a',
    letterSpacing: '2px',
    textTransform: 'uppercase',
  },
  backButton: {
    position: 'fixed',
    top: '24px',
    left: '24px',
    zIndex: 100,
    background: 'rgba(30,25,20,0.85)',
    border: '1px solid rgba(245,166,35,0.2)',
    borderRadius: '40px',
    padding: '10px 20px',
    color: '#F5A623',
    textDecoration: 'none',
    fontSize: '12px',
    backdropFilter: 'blur(12px)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '24px',
    position: 'relative',
    zIndex: 1,
    paddingBottom: '40px',
  },
  sectionTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '24px',
    fontWeight: 700,
    color: '#f0ece4',
    marginBottom: '24px',
    borderLeft: '4px solid #F5A623',
    paddingLeft: '16px',
    marginTop: '60px',
  },
  mediaCard: {
    background: 'rgba(30,25,20,0.75)',
    border: '1px solid rgba(245,166,35,0.18)',
    borderRadius: '20px',
    backdropFilter: 'blur(12px)',
    overflow: 'hidden',
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  mediaItem: {
    width: '100%',
    height: '240px',
    display: 'block',
    objectFit: 'cover',
  },
  visitBtn: {
    display: 'inline-block',
    marginTop: '16px',
    padding: '8px 20px',
    borderRadius: '30px',
    border: '1px solid #F5A623',
    color: '#F5A623',
    fontSize: '11px',
    textDecoration: 'none',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontWeight: 600,
    transition: 'all 0.3s ease',
  },
};

const mediaData = [
  { type: 'video', src: '/vid1.mp4', title: 'Cinematic Edit 01' },
  { type: 'video', src: '/vid2.mp4', title: 'Cinematic Edit 02' },
  { type: 'image', src: '/pic1.jpg', title: 'Visual Concept 01' },
  { type: 'image', src: '/pic2.jpg', title: 'Visual Concept 02' },
  { type: 'image', src: '/pic3.jpg', title: 'Visual Concept 03' },
  { type: 'image', src: '/pic4.jpg', title: 'Visual Concept 04' },
];

const webData = [
  {
    title: 'Chocolate UI Design',
    desc: 'A premium 3D-integrated landing page for a boutique chocolate brand, featuring immersive scroll-based interactions.',
    src: '/chocolate_ui.png',
    url: 'https://chocolate-web-five.vercel.app/',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

export default function DesignVault() {
  return (
    <div style={s.page}>
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

      <Link to="/" style={s.backButton}>
        <motion.span whileHover={{ x: -3 }}>←</motion.span> Back Home
      </Link>

      <div style={s.container}>
        <header style={s.header}>
          <motion.h1
            style={s.title}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            DesignVault
          </motion.h1>
          <motion.p
            style={s.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A curated showcase of visual arts, cinematic edits, and creative direction.
          </motion.p>
        </header>

        <div style={s.sectionTitle}>Cinematic & Visual Arts</div>
        <motion.div
          style={s.grid}
          initial="hidden"
          animate="visible"
        >
          {mediaData.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              style={s.mediaCard}
              whileHover={{ y: -5, borderColor: 'rgba(245,166,35,0.4)' }}
            >
              {item.type === 'video' ? (
                <video
                  src={item.src}
                  style={s.mediaItem}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img src={item.src} alt={item.title} style={s.mediaItem} />
              )}
              <div style={{ padding: '20px', borderTop: '1px solid rgba(245,166,35,0.1)', flex: 1 }}>
                <div style={{ fontSize: '10px', color: '#F5A623', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '1px' }}>
                  {item.type === 'video' ? 'MOTION' : 'VISUAL'}
                </div>
                <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: '18px' }}>{item.title}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div style={s.sectionTitle}>Web UI Design</div>
        <motion.div
          style={s.grid}
          initial="hidden"
          animate="visible"
        >
          {webData.map((item, i) => (
            <motion.div
              key={i}
              custom={i + mediaData.length}
              variants={fadeUp}
              style={s.mediaCard}
              whileHover={{ y: -5, borderColor: 'rgba(245,166,35,0.4)' }}
            >
              <img src={item.src} alt={item.title} style={s.mediaItem} />
              <div style={{ padding: '20px', borderTop: '1px solid rgba(245,166,35,0.1)', flex: 1 }}>
                <div style={{ fontSize: '10px', color: '#F5A623', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '1px' }}>
                  EXPERIENCE
                </div>
                <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: '18px' }}>{item.title}</div>
                <p style={{ fontSize: '13px', color: '#9a8c7a', marginTop: '8px', lineHeight: 1.5 }}>{item.desc}</p>
                <motion.a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={s.visitBtn}
                  whileHover={{ background: '#F5A623', color: '#0a0a0a' }}
                >
                  Visit Live
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <footer style={{ textAlign: 'center', padding: '40px 0', borderTop: '1px solid rgba(245,166,35,0.1)', position: 'relative', zIndex: 1 }}>
        <p style={{ color: '#9a8c7a', fontSize: '12px' }}>© 2026 · Yugal Chaudhari</p>
      </footer>
    </div>
  );
}
