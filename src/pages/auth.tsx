import { useState } from 'react';
import { ArrowRight, Check, Lock, ChevronRight } from 'lucide-react';
import { branches, approvedTRs } from '@/data/mock';
import { navigate, Button, Logo } from '@/components/ui';
import type { Role } from '@/data/types';

const roleCards: { role: Role; label: string; desc: string; icon: string }[] = [
  { role: 'student', label: 'Student', desc: 'Learn calligraphy across three scripts, submit practice, and receive feedback.', icon: '✦' },
  { role: 'teacher', label: 'Faculty', desc: 'Review student entries, manage your showcase, and host live events.', icon: '✧' },

  { role: 'coordinator', label: 'Coordinator', desc: 'Monitor branch statistics and teacher activity for your branch.', icon: '◈' },
  { role: 'admin', label: 'Admin', desc: 'Full system control — courses, users, competitions, and governance.', icon: '◆' },
];

export function LandingRoleSelect() {
  return (
    <main className="landing-page">
      <div className="landing-bg">
        <div className="landing-arabic-bg">خط</div>
      </div>
      <div className="landing-content">
        <Logo />
        <p className="eyebrow" style={{ marginTop: 28 }}>Welcome</p>
        <h1>Choose your path to begin.</h1>
        <p className="landing-lede">Al-Jamea-tus-Saifiyah Calligraphy Studio. Select your role below — students can create a new account; faculty, coordinators, and admins sign in with pre-created credentials.</p>
        <div className="role-card-grid">
          {roleCards.map(card => (
            <button key={card.role} className="role-card" onClick={() => navigate(card.role === 'student' ? 'signup' : 'login')}>
              <span className="role-card-icon">{card.icon}</span>
              <div>
                <strong>{card.label}</strong>
                <p>{card.desc}</p>
              </div>
              <ChevronRight size={18} />
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

export function Auth({ signup = false }: { signup?: boolean }) {
  const [tr, setTr] = useState('');
  const [error, setError] = useState(false);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [role, setRole] = useState<Role>('student');

  const validateAndGo = (value: string) => {
    if (signup && !approvedTRs.includes(value.toUpperCase())) {
      setError(true);
      return;
    }
    navigate(role === 'student' ? 'student-landing' : role === 'admin' ? 'admin' : 'queue');
  };

  return (
    <main className="auth-page">
      <div className="auth-art">
        <Logo />
        <div>
          <p className="eyebrow">{signup ? 'Student signup' : 'Welcome back'}</p>
          <h1>{signup ? 'Begin your path.' : 'Sign in to the Studio.'}</h1>
          <p>{signup ? 'Your TR number connects you to your learning record. Only students create accounts here.' : 'Faculty, coordinators, and admins use pre-created credentials. Students, sign in here too.'}</p>
        </div>
        <div className="auth-quote">"The secret of beautiful writing is beautiful intention."</div>
      </div>
      <div className="auth-form">
        <div className="auth-form-inner">
          {!signup && (
            <label className="field-label">I am a...
              <select className="field" value={role} onChange={e => setRole(e.target.value as Role)}>
                <option value="student">Student</option>
                <option value="teacher">Faculty</option>
                <option value="coordinator">Coordinator</option>
                <option value="admin">Admin</option>
              </select>
            </label>
          )}
          {signup && (
            <>
              <label className="field-label">TR number
                <input className={`field ${error ? 'error' : ''}`} value={tr} onChange={e => { setTr(e.target.value); setError(false); }} placeholder="e.g. TR-20481" />
                {error && <small className="error-text">We couldn't find that pre-approved number. Please check with your branch coordinator.</small>}
              </label>
              <label className="field-label">Full name<input className="field" placeholder="Your name" /></label>
              <label className="field-label">Photo
                <div className="photo-upload-row">
                  <label className="upload-box compact">
                    <span className="upload-mini-label">{photoName ? <><Check size={18} /><strong>{photoName}</strong></> : <span>Upload photo</span>}</span>
                    <input type="file" accept="image/*" onChange={e => setPhotoName(e.target.files?.[0]?.name ?? null)} />
                  </label>
                </div>
              </label>
              <label className="field-label">Jamea branch
                <select className="field">
                  <option>Select your branch</option>
                  {branches.map(branch => <option key={branch}>{branch}</option>)}
                </select>
              </label>
            </>
          )}
          <label className="field-label">Email<input className="field" type="email" placeholder="you@example.com" /></label>
          <label className="field-label">Password<input className="field" type="password" placeholder="At least 8 characters" /></label>
          {signup && <label className="field-label">Confirm password<input className="field" type="password" placeholder="Re-enter password" /></label>}
          <Button onClick={() => signup ? validateAndGo(tr.toUpperCase()) : validateAndGo('')}>
            {signup ? 'Create account' : 'Sign in'} <ArrowRight size={16} />
          </Button>
          <p className="auth-switch">
            {signup ? 'Already have an account?' : 'New student?'}{' '}
            <button onClick={() => navigate(signup ? 'login' : 'signup')}>
              {signup ? 'Sign in' : 'Create an account'}
            </button>
          </p>
          {!signup && <p className="auth-note"><Lock size={13} /> Faculty, coordinators, and admins: use the temporary password provided by your administrator. You'll be asked to change it on first login.</p>}
        </div>
      </div>
    </main>
  );
}

export function ForcedPasswordChange() {
  const [done, setDone] = useState(false);
  return (
    <main className="auth-page">
      <div className="auth-art">
        <Logo />
        <div>
          <p className="eyebrow">First login</p>
          <h1>Set a new password.</h1>
          <p>For security, your temporary password must be changed before you can continue.</p>
        </div>
        <div className="auth-quote">"The first stroke is always the hardest — and the most important."</div>
      </div>
      <div className="auth-form">
        <div className="auth-form-inner">
          <p className="eyebrow"><Lock size={13} /> Security requirement</p>
          <h1>Change your password</h1>
          <p>This is your first login. Please set a permanent password to continue.</p>
          <label className="field-label">Temporary password<input className="field" type="password" placeholder="Provided by admin" /></label>
          <label className="field-label">New password<input className="field" type="password" placeholder="At least 8 characters" /></label>
          <label className="field-label">Confirm new password<input className="field" type="password" placeholder="Re-enter new password" /></label>
          <Button onClick={() => setDone(true)}>{done ? 'Password changed' : 'Set new password'} {done && <Check size={16} />}</Button>
          {done && <p className="auth-switch">Password updated. <button onClick={() => navigate('queue')}>Continue to portal →</button></p>}
        </div>
      </div>
    </main>
  );
}
