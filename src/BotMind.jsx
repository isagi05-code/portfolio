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
    position: 'relative',
    zIndex: 1,
  },
  orbPrimary: {
    position: 'fixed',
    top: '-180px',
    right: '-180px',
    width: '700px',
    height: '700px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(100,200,255,0.15), rgba(50,80,180,0.06), transparent)',
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
    background: 'radial-gradient(circle, rgba(160,255,100,0.1), rgba(60,180,50,0.04), transparent)',
    pointerEvents: 'none',
    zIndex: 0,
    filter: 'blur(35px)',
  },
  header: {
    padding: ' clamp(60px, 10vw, 100px) 0 60px',
    textAlign: 'center',
  },
  title: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: 'clamp(32px, 6vw, 64px)',
    color: '#00D1FF',
    marginBottom: '16px',
    textTransform: 'uppercase',
    letterSpacing: '-1px',
  },
  backButton: {
    position: 'fixed',
    top: '24px',
    left: '24px',
    zIndex: 100,
    background: 'rgba(30,25,20,0.85)',
    border: '1px solid rgba(0,209,255,0.2)',
    borderRadius: '40px',
    padding: '10px 20px',
    color: '#00D1FF',
    textDecoration: 'none',
    fontSize: '12px',
    backdropFilter: 'blur(12px)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  sectionCard: {
    background: 'rgba(20,25,30,0.6)',
    border: '1px solid rgba(0,209,255,0.15)',
    borderRadius: '32px',
    padding: 'clamp(24px, 5vw, 60px)',
    marginBottom: '80px',
    backdropFilter: 'blur(20px)',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '40px',
    alignItems: 'center',
  },
  badge: {
    display: 'inline-block',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '20px',
  },
  appTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 'clamp(28px, 4vw, 42px)',
    fontWeight: 800,
    marginBottom: '20px',
    lineHeight: 1.1,
  },
  appDesc: {
    fontSize: '16px',
    lineHeight: 1.7,
    color: '#9a8c7a',
    marginBottom: '32px',
  },
  featGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  featItem: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
    padding: '16px',
    borderRadius: '16px',
    fontSize: '13px',
  },
  mockPhone: {
    width: '100%',
    maxWidth: '280px',
    height: '520px',
    background: '#111',
    border: '8px solid #222',
    borderRadius: '40px',
    margin: '0 auto',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
  },
  chatBubble: {
    padding: '12px 16px',
    borderRadius: '18px',
    fontSize: '12px',
    marginBottom: '10px',
    maxWidth: '85%',
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function BotMind() {
  return (
    <div style={s.page}>
      <motion.div
        style={s.orbPrimary}
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <div style={s.orbSecondary} />

      <Link to="/" style={s.backButton}>
        <motion.span whileHover={{ x: -2 }}>←</motion.span> Back Home
      </Link>

      <div style={s.container}>
        <header style={s.header}>
          <motion.h1 style={s.title} variants={fadeUp} initial="hidden" animate="visible">BotMind</motion.h1>
          <motion.p style={{ color: '#9a8c7a', fontSize: '14px' }} variants={fadeUp} initial="hidden" animate="visible">Intelligent Agents for Health & Adventure</motion.p>
        </header>

        {/* ── Section 1: Dr. Health ── */}
        <motion.div
          style={{ ...s.sectionCard, borderLeft: '4px solid #4ade80' }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div>
            <div style={{ ...s.badge, background: 'rgba(74,222,128,0.1)', color: '#4ade80' }}>AI Nutritionist</div>
            <h2 style={s.appTitle}>Dr. Health</h2>
            <p style={s.appDesc}>
              A personal artificial intelligence nutrition coach. Dr. Health analyzes your body metrics, 
              dietary preferences, and goals to build a scientifically-backed nutrition roadmap.
            </p>
            <div style={s.featGrid}>
              <div style={s.featItem}>🥗 Meal Plans</div>
              <div style={s.featItem}>📊 Macro Tracking</div>
              <div style={s.featItem}>🍏 Recommendations</div>
              <div style={s.featItem}>⚖️ Weight Management</div>
            </div>
          </div>
          <div style={s.mockPhone}>
            <div style={{ padding: '20px', background: '#1a1a1a', height: '100%' }}>
              <div style={{ ...s.chatBubble, background: '#333', borderBottomLeftRadius: 4 }}>
                Hello Yugal! Based on your activity, I recommend a high-protein breakfast today.
              </div>
              <div style={{ ...s.chatBubble, background: '#4ade80', color: '#111', alignSelf: 'flex-end', marginLeft: 'auto', borderBottomRightRadius: 4 }}>
                Sounds good. Give me a recipe for eggs with oats.
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '12px', marginTop: '20px' }}>
                <div style={{ color: '#4ade80', fontSize: '10px', marginBottom: '4px' }}>RECIPE SUGGESTION</div>
                <div style={{ fontSize: '13px', fontWeight: 700 }}>Oatmeal Egg Scramble</div>
                <div style={{ fontSize: '11px', color: '#888' }}>420 kcal · 28g Protein</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Section 2: Yatra.ai ── */}
        <motion.div
          style={{ ...s.sectionCard, borderLeft: '4px solid #fb923c' }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div style={{ order: window.innerWidth > 768 ? 2 : 1 }}>
            <div style={{ ...s.badge, background: 'rgba(251,146,60,0.1)', color: '#fb923c' }}>Smart Travel Planner</div>
            <h2 style={s.appTitle}>Yatra.ai</h2>
            <p style={s.appDesc}>
              Your ultimate travel companion. Yatra.ai crafts minute-by-minute itineraries for any 
              destination, considering weather, local events, and your specific travel style.
            </p>
            <div style={s.featGrid}>
              <div style={s.featItem}>🗺️ Itineraries</div>
              <div style={s.featItem}>✈️ Booking Sync</div>
              <div style={s.featItem}>🏯 Local Guides</div>
              <div style={s.featItem}>🌦️ Weather Aware</div>
            </div>
          </div>
          <div style={{ ...s.mockPhone, order: window.innerWidth > 768 ? 1 : 2 }}>
            <div style={{ padding: '20px', background: '#1a1a1a', height: '100%' }}>
              <div style={{ ...s.chatBubble, background: '#fb923c', color: '#111', alignSelf: 'flex-end', marginLeft: 'auto', borderBottomRightRadius: 4 }}>
                Plan a 3-day trip to Manali.
              </div>
              <div style={{ ...s.chatBubble, background: '#333', borderBottomLeftRadius: 4 }}>
                Perfect choice! Here's a quick preview of your Day 1:
              </div>
              <div style={{ borderLeft: '2px solid #fb923c', paddingLeft: '12px', marginTop: '16px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700 }}>10:00 AM · Solang Valley</div>
                <div style={{ fontSize: '10px', color: '#888' }}>Adventure sports & Snowboarding</div>
                <div style={{ fontSize: '12px', fontWeight: 700, marginTop: '12px' }}>01:30 PM · Local Cafe</div>
                <div style={{ fontSize: '10px', color: '#888' }}>Authentic Himachali Thali</div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      <footer style={{ textAlign: 'center', padding: '60px 0', opacity: 0.4, fontSize: '12px' }}>
        © 2026 · Built with Intelligence · Yugal Chaudhari
      </footer>
    </div>
  );
}
