import { useState, useEffect } from 'react';
import Head from 'next/head';

// ── Set your credentials here ──────────────────────
const ADMIN_USERNAME = 'alyan';
const ADMIN_PASSWORD = 'alyan@admin123';
// ───────────────────────────────────────────────────

function LoginGate({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const handleLogin = () => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', 'true');
      onLogin();
    } else {
      setError('Invalid username or password.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <>
      <Head>
        <title>Admin — Login</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <div style={{
        minHeight: '100vh',
        background: '#030507',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Space Mono, monospace',
      }}>
        <div style={{
          width: '100%',
          maxWidth: 380,
          padding: '0 20px',
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontSize: '1.8rem', color: '#00ff88', fontWeight: 700, letterSpacing: '0.05em' }}>
              ⚙ Admin
            </div>
            <div style={{ fontSize: '0.7rem', color: '#334', letterSpacing: '0.2em', marginTop: 6 }}>
              PORTFOLIO CMS — RESTRICTED ACCESS
            </div>
          </div>

          {/* Form */}
          <div style={{
            background: '#0a0f0a',
            border: `1px solid ${error ? '#ff4444' : '#1a2a1a'}`,
            borderRadius: 8,
            padding: '32px 28px',
            transition: 'border-color 0.3s',
            animation: shake ? 'shake 0.4s ease' : 'none',
          }}>
            <label className="admin-label">USERNAME</label>
            <input
              className="admin-input"
              type="text"
              value={username}
              onChange={e => { setUsername(e.target.value); setError(''); }}
              onKeyDown={handleKey}
              autoComplete="off"
              autoFocus
            />

            <label className="admin-label">PASSWORD</label>
            <input
              className="admin-input"
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(''); }}
              onKeyDown={handleKey}
              autoComplete="off"
            />

            {error && (
              <div style={{ color: '#ff4444', fontSize: '0.72rem', marginBottom: 16, letterSpacing: '0.05em' }}>
                ✕ {error}
              </div>
            )}

            <button
              className="admin-btn"
              style={{ width: '100%', padding: '12px', fontSize: '0.8rem', letterSpacing: '0.1em' }}
              onClick={handleLogin}
            >
              LOGIN →
            </button>
          </div>

          <div style={{ textAlign: 'center', marginTop: 20, fontSize: '0.65rem', color: '#223' }}>
            NOT LINKED FROM PORTFOLIO
          </div>
        </div>

        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%       { transform: translateX(-8px); }
            40%       { transform: translateX(8px); }
            60%       { transform: translateX(-6px); }
            80%       { transform: translateX(6px); }
          }
          @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
          * { box-sizing: border-box; }
        `}</style>
      </div>
    </>
  );
}

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState({});
  const [saved, setSaved] = useState({});

  useEffect(() => {
    // Check if already logged in this session
    if (sessionStorage.getItem('admin_auth') === 'true') {
      setAuthed(true);
    }
    setChecking(false);
  }, []);

  useEffect(() => {
    if (!authed) return;
    fetch('/api/portfolio')
      .then(r => r.json())
      .then(setData);
  }, [authed]);

  if (checking) return null;
  if (!authed) return <LoginGate onLogin={() => setAuthed(true)} />;

  const save = async (section, payload, type, id) => {
    setSaving(s => ({ ...s, [section]: true }));
    await fetch('/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section, data: payload, type, id }),
    });
    setSaving(s => ({ ...s, [section]: false }));
    setSaved(s => ({ ...s, [section]: true }));
    setTimeout(() => setSaved(s => ({ ...s, [section]: false })), 2500);
  };

  if (!data) return (
    <div className="admin-page d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <span style={{ color: '#00ff88', fontFamily: 'Space Mono', fontSize: '0.85rem', letterSpacing: '0.2em' }}>
        LOADING...
      </span>
    </div>
  );

  return (
    <>
      <Head>
        <title>Admin — Portfolio CMS</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <div className="admin-page">
        <div className="container">
          <div className="admin-header">
            <div className="admin-title">⚙ Portfolio Admin</div>
            <div className="admin-subtitle">// SECRET PANEL — NOT LINKED FROM PORTFOLIO</div>
          </div>

          {/* Hero */}
          <HeroAdmin data={data.hero} saving={saving.hero} saved={saved.hero} onSave={payload => save('hero', payload)} />

          {/* About */}
          <AboutAdmin data={data.about} saving={saving.about} saved={saved.about} onSave={payload => save('about', payload)} />

          {/* Skills */}
          <SkillsAdmin data={data.skills} saving={saving.skills} saved={saved.skills} onSave={payload => save('skills', payload)} />

          {/* Projects */}
          {data.projects.map((p, i) => (
            <ProjectAdmin
              key={p.id}
              project={p}
              index={i}
              saving={saving[`project_${p.id}`]}
              saved={saved[`project_${p.id}`]}
              onSave={payload => save(`project_${p.id}`, payload, 'project', p.id)}
            />
          ))}

          {/* Achievements */}
          <AchievementsAdmin
            data={data.achievements}
            saving={saving.achievements}
            saved={saved.achievements}
            onSave={payload => save('achievements', payload)}
          />

          <div style={{ padding: '40px 0', textAlign: 'center', color: '#334', fontFamily: 'Space Mono', fontSize: '0.7rem' }}>
            PORTFOLIO ADMIN v1.0 — HANDLE WITH CARE
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Sub-editors ── */

function HeroAdmin({ data, saving, saved, onSave }) {
  const [form, setForm] = useState(data);

  return (
    <div className="admin-card">
      <div className="admin-section-title">HERO SECTION</div>
      {['name', 'title', 'subtitle', 'email', 'phone'].map(field => (
        <div key={field}>
          <label className="admin-label">{field.toUpperCase()}</label>
          <input
            className="admin-input"
            value={form[field] || ''}
            onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
          />
        </div>
      ))}
      <SaveBtn saving={saving} saved={saved} onClick={() => onSave(form)} />
    </div>
  );
}

function AboutAdmin({ data, saving, saved, onSave }) {
  const [form, setForm] = useState(data);

  return (
    <div className="admin-card">
      <div className="admin-section-title">ABOUT SECTION</div>
      <label className="admin-label">BIO</label>
      <textarea
        className="admin-input admin-textarea"
        value={form.bio || ''}
        onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
      />
      <label className="admin-label">UNIVERSITY</label>
      <input className="admin-input" value={form.university || ''} onChange={e => setForm(f => ({ ...f, university: e.target.value }))} />
      <label className="admin-label">DEGREE</label>
      <input className="admin-input" value={form.degree || ''} onChange={e => setForm(f => ({ ...f, degree: e.target.value }))} />
      <SaveBtn saving={saving} saved={saved} onClick={() => onSave(form)} />
    </div>
  );
}

function SkillsAdmin({ data, saving, saved, onSave }) {
  const [form, setForm] = useState({
    languages: data.languages.join(', '),
    frameworks: data.frameworks.join(', '),
    tools: data.tools.join(', '),
  });

  const buildPayload = () => ({
    languages: form.languages.split(',').map(s => s.trim()).filter(Boolean),
    frameworks: form.frameworks.split(',').map(s => s.trim()).filter(Boolean),
    tools: form.tools.split(',').map(s => s.trim()).filter(Boolean),
  });

  return (
    <div className="admin-card">
      <div className="admin-section-title">SKILLS (comma-separated)</div>
      {['languages', 'frameworks', 'tools'].map(k => (
        <div key={k}>
          <label className="admin-label">{k.toUpperCase()}</label>
          <input className="admin-input" value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} />
        </div>
      ))}
      <SaveBtn saving={saving} saved={saved} onClick={() => onSave(buildPayload())} />
    </div>
  );
}

function ProjectAdmin({ project, index, saving, saved, onSave }) {
  const [form, setForm] = useState({
    ...project,
    techStr: project.tech.join(', '),
  });

  const buildPayload = () => ({
    name: form.name,
    description: form.description,
    color: form.color,
    tech: form.techStr.split(',').map(s => s.trim()).filter(Boolean),
  });

  return (
    <div className="admin-card">
      <div className="admin-section-title">PROJECT {index + 1}: {project.name}</div>
      <label className="admin-label">PROJECT NAME</label>
      <input className="admin-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
      <label className="admin-label">DESCRIPTION</label>
      <textarea className="admin-input admin-textarea" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
      <label className="admin-label">TECH STACK (comma-separated)</label>
      <input className="admin-input" value={form.techStr} onChange={e => setForm(f => ({ ...f, techStr: e.target.value }))} />
      <label className="admin-label">ACCENT COLOR (hex)</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <input className="admin-input" style={{ marginBottom: 0, flex: 1 }} value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))} />
        <div style={{ width: 30, height: 30, borderRadius: 4, background: form.color, border: '1px solid #1a2a1a', flexShrink: 0 }} />
      </div>
      <SaveBtn saving={saving} saved={saved} onClick={() => onSave(buildPayload())} />
    </div>
  );
}

function AchievementsAdmin({ data, saving, saved, onSave }) {
  const [items, setItems] = useState(data);

  return (
    <div className="admin-card">
      <div className="admin-section-title">ACHIEVEMENTS</div>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <textarea
            className="admin-input admin-textarea"
            style={{ minHeight: 60, flex: 1 }}
            value={item}
            onChange={e => setItems(arr => arr.map((v, j) => j === i ? e.target.value : v))}
          />
          <button
            className="admin-btn admin-btn-danger"
            style={{ marginTop: 0, padding: '8px 12px', fontSize: '0.7rem' }}
            onClick={() => setItems(arr => arr.filter((_, j) => j !== i))}
          >
            ✕
          </button>
        </div>
      ))}
      <button
        className="admin-btn"
        style={{ marginBottom: 16, fontSize: '0.75rem' }}
        onClick={() => setItems(arr => [...arr, ''])}
      >
        + Add Achievement
      </button>
      <br />
      <SaveBtn saving={saving} saved={saved} onClick={() => onSave(items)} />
    </div>
  );
}

function SaveBtn({ saving, saved, onClick }) {
  return (
    <div>
      <button className="admin-btn" onClick={onClick} disabled={saving}>
        {saving ? 'Processing...' : 'Changes Processed'}
      </button>
      {saved && (
        <span className="admin-success show" style={{ marginLeft: 12 }}>
          ✓ Saved
        </span>
      )}
    </div>
  );
}
