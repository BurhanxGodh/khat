import { useEffect, useState, type ReactNode } from 'react';
import {
  ArrowRight, Award, ChevronRight, Flame, Heart, Lock, MoreHorizontal,
  Play, Upload, X,
} from 'lucide-react';
import type { Script, Role } from '@/data/types';
import { khatTypes, scriptList, roleDefaultPage, branches, type GalleryWork } from '@/data/mock';

export function navigate(page: string) { window.location.hash = page; }

export function useHash(): string {
  const [page, setPage] = useState(window.location.hash.slice(1) || 'landing');
  useEffect(() => {
    const onHash = () => setPage(window.location.hash.slice(1) || 'landing');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return page;
}

export function Button({ children, onClick, outline = false, className = '' }: { children: ReactNode; onClick?: () => void; outline?: boolean; className?: string }) {
  return <button onClick={onClick} className={`btn ${outline ? 'btn-outline' : 'btn-primary'} ${className}`}>{children}</button>;
}

export function StatusChip({ children, tone = 'gold' }: { children: ReactNode; tone?: 'gold' | 'green' | 'red' | 'amber' | 'blue' }) {
  return <span className={`chip chip-${tone}`}>{children}</span>;
}

export function Logo({ admin = false }: { admin?: boolean }) {
  return (
    <button onClick={() => navigate(admin ? 'admin' : 'landing')} className="logo">
      <span className="logo-mark">╱</span>
      <span>
        <strong>Al-Jamea-tus-Saifiyah</strong>
        <small>{admin ? 'CONTROL PANEL' : 'CALLIGRAPHY STUDIO'}</small>
      </span>
    </button>
  );
}

export function Header({ role, setRole }: { role: Role; setRole: (r: Role) => void }) {
  const links: Record<Role, [string, string][]> = {
    student: [['dashboard', 'Your Path'], ['catalog', 'Courses'], ['gallery', 'Gallery'], ['competitions', 'Competitions'], ['events', 'Events'], ['resources', 'Resources'], ['profile', 'Profile'], ['notifications', 'Alerts']],
    teacher: [['queue', 'Review Queue'], ['reviews', 'My Reviews'], ['showcase', 'Showcase'], ['assets', 'Asset Library'], ['judging', 'Judging'], ['events-host', 'Host Event'], ['profile', 'Profile'], ['notifications', 'Alerts']],
    coordinator: [['queue', 'Review Queue'], ['reviews', 'My Reviews'], ['branch-stats', 'Branch Stats'], ['branch-teachers', 'Branch Teachers'], ['showcase', 'Showcase'], ['assets', 'Asset Library'], ['profile', 'Profile'], ['notifications', 'Alerts']],
    admin: [['admin', 'Overview'], ['admin-courses', 'Course Builder'], ['admin-users', 'Teacher & Load'], ['admin-logs', 'Entry Logs'], ['admin-showcase', 'Showcase Mod'], ['admin-competitions', 'Competitions'], ['admin-events', 'Events'], ['admin-resources', 'Resources'], ['admin-stats', 'Statistics'], ['admin-governance', 'Certificates & Data']],
  };
  const nav = links[role];
  return (
    <header className={`topbar ${role === 'admin' ? 'adminbar' : ''}`}>
      <Logo admin={role === 'admin'} />
      <nav className="main-nav">
        {nav.map(([href, label]) => <button key={href} onClick={() => navigate(href)} className="nav-link">{label}</button>)}
      </nav>
      <div className="header-actions">
        <label className="role-switcher">
          <span>Preview as</span>
          <select value={role} onChange={(e) => { const next = e.target.value as Role; setRole(next); navigate(roleDefaultPage[next]); }}>
            <option value="student">Student</option>
            <option value="teacher">Faculty</option>
            <option value="coordinator">Coordinator</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <button className="avatar" onClick={() => navigate('profile')}>{role === 'admin' ? 'AD' : role === 'student' ? 'AS' : 'IZ'}</button>
      </div>
    </header>
  );
}

export function SectionHeading({ eyebrow, title, text, action }: { eyebrow?: string; title: string; text?: string; action?: ReactNode }) {
  return (
    <div className="section-heading">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <div className="heading-row">
        <div><h2>{title}</h2>{text && <p>{text}</p>}</div>
        {action}
      </div>
    </div>
  );
}

export function ScriptCard({ script, onClick }: { script: Script; onClick?: () => void }) {
  const data = khatTypes[script];
  return (
    <button className="script-card text-left" style={{ '--script': data.color, '--script-soft': data.soft } as React.CSSProperties} onClick={onClick}>
      <div className="arabic">{data.arabic}</div>
      <div><h3>{data.name}</h3><p>{data.desc}</p></div>
      <span className="card-link">Explore {data.name} <ArrowRight size={15} /></span>
    </button>
  );
}

export function ActivityHeatmap() {
  return (
    <div className="heatmap-wrap">
      <div className="heatmap-label"><span>Less</span><i /><i /><i /><i /><span>More</span></div>
      <div className="heatmap">
        <div className="months"><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span></div>
        {Array.from({ length: 84 }, (_, i) => <i key={i} className={`heat-${(i * 7 + i % 5) % 5}`} />)}
      </div>
    </div>
  );
}

export function BadgeIcon({ script, tier }: { script: Script; tier: string }) {
  const data = khatTypes[script];
  return (
    <div className="badge-card" style={{ '--script': data.color, '--script-soft': data.soft } as React.CSSProperties}>
      <div className="badge-icon"><Award size={20} /></div>
      <div><strong>{data.name}</strong><small>{tier}</small></div>
    </div>
  );
}

export function GalleryCard({ work, onLike, hideAuthor = false }: { work: GalleryWork; onLike: () => void; hideAuthor?: boolean }) {
  const [liked, setLiked] = useState(false);
  const data = khatTypes[work.script];
  return (
    <article className="gallery-card">
      <div className="gallery-art" style={{ color: data.color }}>
        <span>{work.word}</span>
        <small>{data.name}</small>
      </div>
      <div className="gallery-meta">
        <div>
          {hideAuthor ? <strong>{khatTypes[work.script].name} · {work.tier}</strong> : <><strong>{work.name}</strong><small>{work.branch}</small></>}
        </div>
        {!hideAuthor && <StatusChip>{data.name} · {work.tier}</StatusChip>}
      </div>
      <div className="gallery-footer">
        <em>"A quiet hand makes a generous line."</em>
        <button className={liked ? 'liked' : ''} onClick={() => { setLiked(!liked); onLike(); }}>
          <Heart size={15} fill={liked ? 'currentColor' : 'none'} /> {work.likes + (liked ? 1 : 0)}
        </button>
      </div>
    </article>
  );
}

export function ShowcaseSections({ works }: { works: GalleryWork[] }) {
  const teacherWorks = works.filter(w => w.role === 'teacher');
  const studentWorks = works.filter(w => w.role === 'student');
  return (
    <>
      <section className="page section">
        <SectionHeading title="Teacher Showcase" text="Work shared by teachers across every branch." />
        <div className="gallery-grid">
          {teacherWorks.map(work => (
            <GalleryCard work={work} onLike={() => {}} key={work.word + work.name} />
          ))}
        </div>
      </section>
      <section className="page section">
        <SectionHeading title="Student Showcase" text="Practice shared by students across every branch — feedback, not just likes." />
        <div className="gallery-grid">
          {studentWorks.map(work => (
            <GalleryCard work={work} onLike={() => {}} key={work.word + work.name} />
          ))}
        </div>
      </section>
    </>
  );
}

export function StatCard({ icon: Icon, value, label, trend }: { icon: typeof Award; value: string; label: string; trend?: string }) {
  return (
    <div className="stat-card">
      <Icon size={19} />
      <strong>{value}</strong>
      <span>{label}</span>
      {trend && <small>{trend}</small>}
    </div>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="page footer-inner">
        <div>
          <Logo />
          <p>Five minutes a day. That's the whole secret.</p>
        </div>
        <div className="footer-branches">
          <small>Study across five branches</small>
          <div>{branches.map((b: string) => <span key={b}>{b}</span>)}</div>
        </div>
      </div>
    </footer>
  );
}

export function ScriptTabs({ script, setScript }: { script: Script; setScript: (s: Script) => void }) {
  return (
    <div className="tabs small">
      {scriptList.map(item => (
        <button key={item} className={item === script ? 'active' : ''} onClick={() => setScript(item)}>{khatTypes[item].name}</button>
      ))}
    </div>
  );
}

export function UploadBox({ tall, label, sublabel, icon: Icon = Upload }: { tall?: boolean; label: string; sublabel: string; icon?: typeof Upload }) {
  return (
    <label className={`upload-box ${tall ? 'tall' : ''}`}>
      <Icon size={tall ? 24 : 22} />
      <strong>{label}</strong>
      <small>{sublabel}</small>
      <input type="file" accept="image/*" />
    </label>
  );
}

export function Modal({ children, onClose }: { children: ReactNode; onClose?: () => void }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        {onClose && <button className="modal-close" onClick={onClose}><X size={18} /></button>}
        {children}
      </div>
    </div>
  );
}

export function BackLink({ to, label }: { to: string; label: string }) {
  return <button className="back-link" onClick={() => navigate(to)}>← {label}</button>;
}

export { ArrowRight, ChevronRight, Flame, Lock, MoreHorizontal, Play };
