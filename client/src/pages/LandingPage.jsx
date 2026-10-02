import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, CheckCircle, BarChart3, Filter, TrendingUp, Shield, Zap, ArrowRight } from 'lucide-react';

const FEATURES = [
  {
    icon: <CheckCircle />,
    title: 'Track Coding Problems',
    description: 'Record every problem you solve with title, platform, difficulty, language, and completion status all in one place.'
  },
  {
    icon: <Filter />,
    title: 'Smart Search & Filters',
    description: 'Instantly search and filter your problems by difficulty, language, platform, and status. Find any problem in seconds.'
  },
  {
    icon: <BarChart3 />,
    title: 'Visual Analytics',
    description: 'See your progress through beautiful charts — difficulty distribution, language breakdown, and completion trends.'
  },
  {
    icon: <TrendingUp />,
    title: 'Monitor Progress',
    description: 'Track your overall completion percentage, see how many problems you have solved, and stay motivated.'
  },
  {
    icon: <Shield />,
    title: 'Secure & Private',
    description: 'Your data is yours alone. Secure authentication ensures only you can access your coding records.'
  },
  {
    icon: <Zap />,
    title: 'Fast & Responsive',
    description: 'Works seamlessly on desktop, tablet, and mobile. Practice tracking wherever you are.'
  }
];

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="landing-logo">
          <div className="landing-logo-icon">
            <Code2 size={20} color="white" />
          </div>
          <span className="landing-logo-text">
            Code<span>Track</span>
          </span>
        </div>
        <div className="landing-nav-links">
          <Link to="/login" className="btn btn-ghost" style={{ color: '#94a3b8', border: '1.5px solid rgba(255,255,255,0.12)' }}>
            Login
          </Link>
          <Link to="/register" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="landing-hero">
        <div className="landing-hero-badge">
          <Zap size={12} /> Coding Practice Tracker
        </div>
        <h1>Track Your Coding Journey,<br />Level Up Your Skills</h1>
        <p>
          CodeTrack helps students and developers maintain a personal record of coding problems,
          organize by language and difficulty, and monitor progress — all in one beautiful dashboard.
        </p>
        <div className="landing-hero-cta">
          <Link to="/register" className="btn btn-primary btn-lg">
            Start Tracking Free <ArrowRight size={18} />
          </Link>
          <Link to="/login" className="btn btn-lg" style={{ color: '#94a3b8', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: 'var(--border-radius)' }}>
            Login to Dashboard
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="landing-features">
        <div className="landing-features-title">
          <h2>Everything You Need to Track Your Progress</h2>
          <p>Purpose-built for students and developers who take their coding practice seriously.</p>
        </div>
        <div className="features-grid">
          {FEATURES.map((feature, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="landing-cta-section">
        <h2>Ready to Track Smarter?</h2>
        <p>Join CodeTrack today and start building better coding habits with data-driven insights.</p>
        <Link to="/register" className="btn btn-primary btn-lg">
          Create Your Free Account <ArrowRight size={18} />
        </Link>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-logo" style={{ fontSize: '1rem' }}>
          <div className="landing-logo-icon" style={{ width: 28, height: 28, borderRadius: 7 }}>
            <Code2 size={15} color="white" />
          </div>
          <span>Code<span style={{ color: '#818cf8' }}>Track</span></span>
        </div>
        <span>Built for B.Tech CSE • Full Stack Web Development Project</span>
        <span>© {new Date().getFullYear()} CodeTrack. All rights reserved.</span>
      </footer>
    </div>
  );
};

export default LandingPage;
