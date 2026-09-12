import { useState } from 'react';
import {
  ArrowRight, Award, Bell, CalendarDays, Check, ChevronRight, ClipboardList,
  FileImage, FileText, Lock, Play, Search, ShieldCheck, Sparkles, Trophy,
  Upload, Users, Zap,
} from 'lucide-react';
import type { Script } from '@/data/types';
import {
  khatTypes, scriptList, reviewQueue, reviewHistory, galleryWorks,
  assets, teacherNotifications, branches, teachers, liveEvents,
} from '@/data/mock';
import {
  navigate, Button, SectionHeading, StatusChip, StatCard, ActivityHeatmap,
  ScriptTabs, UploadBox, BackLink, ShowcaseSections,
} from '@/components/ui';

export function TeacherDashboard() {
  return (
    <main className="page portal-page">
      <div className="portal-welcome">
        <div><p className="eyebrow">Faculty workspace · Tuesday, 10 September 2026</p><h1>Good morning, Ismail.</h1><p>Your teaching desk is ready. Review work, follow your students, and keep the hand moving.</p></div>
        <div className="queue-count"><strong>4</strong><span>entries to review</span></div>
      </div>
      <div className="stats-grid"><StatCard icon={ClipboardList} value="47" label="Reviewed this month" trend="92% within SLA" /><StatCard icon={Users} value="23" label="Active students" /><StatCard icon={Zap} value="28 hrs" label="Average response" /></div>
      <div className="admin-dashboard-grid"><div className="chart-card"><SectionHeading title="Today’s queue" text="The entries closest to their response deadline." action={<button className="text-link" onClick={() => navigate('queue')}>Open queue <ArrowRight size={14} /></button>} />{reviewQueue.slice(0, 3).map(row => <div className="dashboard-list-row" key={row.id}><div><strong>{row.student}</strong><small>{row.level} · {row.branch}</small></div><StatusChip tone="amber">{row.hours}</StatusChip></div>)}</div><div className="chart-card"><SectionHeading title="Your teaching rhythm" text="Reviews completed over the last twelve weeks." /><ActivityHeatmap /></div></div>
      <ShowcaseSections works={galleryWorks} />
    </main>
  );
}

export function CoordinatorDashboard() {
  return <BranchStats />;
}

export function TeacherQueue({ coordinator = false }: { coordinator?: boolean }) {
  const [filter, setFilter] = useState<Script | 'All'>('All');
  const [source, setSource] = useState<'All sources' | 'Checkpoint' | 'Event' | 'Competition'>('All sources');
  let rows = filter === 'All' ? reviewQueue : reviewQueue.filter(r => r.script === filter);
  if (source !== 'All sources') rows = rows.filter(r => r.source === source);
  return (
    <main className="page portal-page">
      <div className="portal-welcome">
        <div>
          <p className="eyebrow">Teacher portal {coordinator && '· Branch coordinator'}</p>
          <h1>Review Queue</h1>
          <p>Submissions assigned to you, ordered by how soon they're due.</p>
        </div>
        <div className="queue-count"><strong>{rows.length}</strong><span>awaiting review</span></div>
      </div>
      <div className="tabs">
        <button className={filter === 'All' ? 'active' : ''} onClick={() => setFilter('All')}>All</button>
        {scriptList.map(item => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{khatTypes[item].name}</button>)}
      </div>
      <div className="filter-bar">
        <span>Source type</span>
        {(['All sources', 'Checkpoint', 'Event', 'Competition'] as const).map(s => (
          <button key={s} className={source === s ? 'active-filter' : ''} onClick={() => setSource(s)}>{s}</button>
        ))}
      </div>
      <div className="entry-table">
        <div className="table-head">
          <span>Student</span><span>Script</span><span>Level / exercise</span><span>Branch</span><span>Time remaining</span><span />
        </div>
        {rows.map((row, i) => (
          <div className="entry-row" key={row.id}>
            <div><strong>{row.student}</strong><small>Submitted 4 hours ago · {row.source}</small></div>
            <span style={{ color: khatTypes[row.script].color }}>{khatTypes[row.script].name}</span>
            <span>{row.level}</span>
            <span>{row.branch}</span>
            <StatusChip tone={i === 2 ? 'red' : i === 1 ? 'amber' : 'green'}>{row.hours}</StatusChip>
            <Button onClick={() => navigate('review')}>{row.lockedByYou ? 'Locked by you' : 'Open'} <ArrowRight size={14} /></Button>
          </div>
        ))}
      </div>
      <ShowcaseSections works={galleryWorks} />
    </main>
  );
}

export function ReviewPage() {
  const [decision, setDecision] = useState('');
  return (
    <main className="page portal-page">
      <BackLink to="queue" label="Back to Review Queue" />
      <div className="review-context">
        <div>
          <p className="eyebrow">Scoped review · only this checkpoint's uploads are visible</p>
          <h1>Amina Suleiman</h1>
          <p>Naskh · Murakkabāt, exercise 4 · Nairobi</p>
          <button className="text-link" onClick={() => navigate('student-profile')} style={{ marginTop: 8 }}>View full student profile <ArrowRight size={14} /></button>
        </div>
        <StatusChip tone="amber"><Lock size={13} /> You are reviewing this — it won't be reassigned while open</StatusChip>
      </div>
      <div className="review-grid">
        <div>
          <div className="sheet-preview"><span>بت</span></div>
          <button className="text-link print-link"><FileText size={16} /> Print test sheet</button>
        </div>
        <aside className="rubric">
          <p className="eyebrow">Rubric hints — Naskh, composition</p>
          <ul>
            <li>Baseline alignment across the joined word</li>
            <li>Correct ligature at the bā–tā join</li>
            <li>Even proportion against the 5-dot alif</li>
          </ul>
          <label className="field-label">Feedback<textarea className="field textarea" placeholder="Write feedback here..." /></label>
          <UploadBox label="Upload annotated sheet" sublabel="Optional correction photo for the student's reference" icon={FileImage} />
          <div className="review-actions">
            <Button onClick={() => setDecision('Passed')}>Pass <Check size={15} /></Button>
            <Button outline onClick={() => setDecision('Needs revision')}>Needs revision</Button>
          </div>
          {decision && <StatusChip tone={decision === 'Passed' ? 'green' : 'red'}>{decision} · student notified · {decision === 'Passed' ? 'award JHS merit points on Jamea website' : 'redo will be a fresh entry'}</StatusChip>}
        </aside>
      </div>
    </main>
  );
}

export function Reviews() {
  return (
    <main className="page portal-page">
      <SectionHeading title="My Reviews" text="Your review history and response rhythm." />
      <div className="stats-grid">
        <StatCard icon={ClipboardList} value="47" label="Total reviewed" />
        <StatCard icon={Zap} value="28 hrs" label="Average response time" />
        <StatCard icon={ShieldCheck} value="3" label="Escalated away" />
      </div>
      <div className="history-table">
        <div className="table-head"><span>Date</span><span>Script</span><span>Level</span><span>Decision</span></div>
        {reviewHistory.map(row => (
          <div className="history-row" key={row[0]}>
            {row.map((cell, i) => <span key={cell} className={i === 3 && cell === 'Pass' ? 'pass-text' : ''}>{cell}</span>)}
          </div>
        ))}
      </div>
    </main>
  );
}

export function TeacherShowcase() {
  const [posted, setPosted] = useState(false);
  const teacherWorks = galleryWorks.filter(w => w.role === 'teacher');
  return (
    <main className="page portal-page">
      <SectionHeading eyebrow="Share your work" title="My Showcase" text="Teacher posts are auto-approved — no moderation gate. Admin retains the ability to remove any post." />
      <div className="showcase-form">
        <label className="field-label">Caption<textarea className="field textarea" placeholder="What did you notice while making this piece?" /></label>
        <UploadBox tall label="Add a photo of your work" sublabel="Posts immediately — no approval needed" icon={FileImage} />
        <Button onClick={() => setPosted(true)}>{posted ? 'Posted' : 'Post to gallery'} <ArrowRight size={15} /></Button>
      </div>
      <SectionHeading title="My posted work" />
      <div className="gallery-grid">
        {teacherWorks.map(work => (
          <article className="gallery-card" key={work.word}>
            <div className="gallery-art" style={{ color: khatTypes[work.script].color }}><span>{work.word}</span><small>{khatTypes[work.script].name}</small></div>
            <div className="gallery-meta"><div><strong>{work.name}</strong><small>{work.branch}</small></div><StatusChip>{khatTypes[work.script].name} · {work.tier}</StatusChip></div>
          </article>
        ))}
      </div>
    </main>
  );
}

export function AssetLibrary() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Script | 'All'>('All');
  let filtered = assets;
  if (filter !== 'All') filtered = filtered.filter(a => a.script === filter);
  if (search) filtered = filtered.filter(a => a.title.toLowerCase().includes(search.toLowerCase()) || a.tags.some(t => t.includes(search.toLowerCase())));
  return (
    <main className="page portal-page">
      <SectionHeading eyebrow="Shared resources" title="Asset Library" text="Upload your own khat pieces. Search across all teachers' uploads." />
      <div className="asset-upload-form">
        <label className="field-label">Title<input className="field" placeholder="e.g. Alif in six weights" /></label>
        <label className="field-label">Khat type
          <select className="field">{scriptList.map(s => <option key={s}>{khatTypes[s].name}</option>)}</select>
        </label>
        <label className="field-label">Tags<input className="field" placeholder="alif, mufradat, weight" /></label>
        <UploadBox label="Upload asset" sublabel="Image reference for shared use" />
        <Button>Upload asset <Upload size={15} /></Button>
      </div>
      <SectionHeading title="All assets" action={
        <div className="search-field"><Search size={16} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by title or tag" /></div>
      } />
      <div className="tabs small">
        <button className={filter === 'All' ? 'active' : ''} onClick={() => setFilter('All')}>All</button>
        {scriptList.map(s => <button key={s} className={filter === s ? 'active' : ''} onClick={() => setFilter(s)}>{khatTypes[s].name}</button>)}
      </div>
      <div className="asset-grid">
        {filtered.map(asset => (
          <div className="asset-card" key={asset.title}>
            <div className="asset-art" style={{ color: khatTypes[asset.script].color }}>{khatTypes[asset.script].arabic}</div>
            <div><strong>{asset.title}</strong><small>{khatTypes[asset.script].name} · {asset.author}</small></div>
            <div className="asset-tags">{asset.tags.map(t => <span key={t}>{t}</span>)}</div>
          </div>
        ))}
      </div>
    </main>
  );
}

export function TeacherProfile() {
  return (
    <main className="page portal-page">
      <div className="profile-hero">
        <div className="profile-avatar">IZ</div>
        <div>
          <p className="eyebrow">Teacher profile</p>
          <h1>Ustadh Ismail Khatri</h1>
          <p>Nairobi · Naskh specialist · Joined Jan 2025</p>
        </div>
      </div>
      <div className="profile-stats">
        <StatCard icon={ClipboardList} value="148" label="Entries checked to date" />
        <StatCard icon={Zap} value="22 hrs" label="Average turnaround" />
        <StatCard icon={Users} value="23" label="Active students" />
      </div>
      <SectionHeading title="My posted showcase works" />
      <div className="gallery-grid">
        {galleryWorks.filter(w => w.role === 'teacher').map(work => (
          <article className="gallery-card" key={work.word}>
            <div className="gallery-art" style={{ color: khatTypes[work.script].color }}><span>{work.word}</span><small>{khatTypes[work.script].name}</small></div>
            <div className="gallery-meta"><div><strong>{work.name}</strong><small>{work.branch}</small></div><StatusChip>{khatTypes[work.script].name} · {work.tier}</StatusChip></div>
          </article>
        ))}
      </div>
      <div className="activity-card">
        <SectionHeading title="Site activity" />
        <ActivityHeatmap />
      </div>
    </main>
  );
}

export function CompetitionJudging() {
  const [selected, setSelected] = useState<string[]>([]);
  const entries = [
    { word: 'صبر', name: 'Amina Suleiman' },
    { word: 'صبر', name: 'Husain Khatri' },
    { word: 'صبر', name: 'Maryam Raza' },
    { word: 'صبر', name: 'Zahra Noor' },
  ];
  return (
    <main className="page portal-page">
      <div className="judging-banner">
        <Trophy size={20} />
        <div><strong>Judging: The patient line</strong><span>Judging deadline: 25 Sep · Select winner(s) below</span></div>
      </div>
      <SectionHeading eyebrow="Competition entries" title="Select winner(s)" text="Entries are shown without branch bias. Once winners are selected, entries will clear from this view." />
      <div className="judging-grid">
        {entries.map((entry, i) => (
          <div className={`judging-card ${selected.includes(entry.name) ? 'selected' : ''}`} key={i}>
            <div className="judging-art">{entry.word}</div>
            <strong>{entry.name}</strong>
            <Button outline onClick={() => setSelected(prev => prev.includes(entry.name) ? prev.filter(n => n !== entry.name) : [...prev, entry.name])}>
              {selected.includes(entry.name) ? <><Check size={14} /> Selected as winner</> : 'Select as winner'}
            </Button>
          </div>
        ))}
      </div>
      {selected.length > 0 && (
        <div className="judging-submit">
          <Button onClick={() => { alert('Winners submitted to admin'); navigate('queue'); }}>Submit {selected.length} winner(s) to admin <ArrowRight size={15} /></Button>
        </div>
      )}
    </main>
  );
}

export function HostEvent() {
  const [events, setEvents] = useState(liveEvents.filter(e => e.host.includes('Ismail')));
  const [scheduled, setScheduled] = useState(false);
  return (
    <main className="page portal-page">
      <SectionHeading eyebrow="Host a session" title="Host a Live Event" text="Any teacher can host. Students from all branches can join." />
      <div className="event-form">
        <label className="field-label">Title<input className="field" placeholder="e.g. Naskh clinic: joining letters" /></label>
        <label className="field-label">Date & time<input className="field" type="datetime-local" /></label>
        <label className="field-label">Description<textarea className="field textarea" placeholder="What will you cover?" /></label>
        <div className="event-form-actions">
          <Button onClick={() => setScheduled(true)}>Go live <Sparkles size={15} /></Button>
          <Button outline onClick={() => setScheduled(true)}>Schedule</Button>
        </div>
        {scheduled && <StatusChip tone="green">Event scheduled — students will be notified</StatusChip>}
      </div>
      <SectionHeading title="Your past hosted events" />
      <div className="event-list">
        {events.map((ev, i) => (
          <div className="event-row" key={ev.title}>
            <div className="event-date"><span>{ev.day}</span><small>SEP</small></div>
            <div><strong>{ev.title}</strong><span>{ev.branch} · {ev.attendees || 0} attendees</span></div>
            <StatusChip tone="gold">Past</StatusChip>
            <Button outline>View stats</Button>
          </div>
        ))}
      </div>
    </main>
  );
}

export function BranchStats() {
  return (
    <main className="page portal-page">
      <div className="portal-welcome">
        <div>
          <p className="eyebrow">Branch coordinator · Nairobi</p>
          <h1>Branch Statistics</h1>
          <p>Student activity and teacher throughput, scoped to your branch only.</p>
        </div>
      </div>
      <div className="stats-grid">
        <StatCard icon={Users} value="428" label="Active students" trend="+12 this month" />
        <StatCard icon={ClipboardList} value="94" label="Entries reviewed" trend="88% within SLA" />
        <StatCard icon={CalendarDays} value="6" label="Events hosted" />
      </div>
      <div className="admin-dashboard-grid">
        <div className="chart-card">
          <SectionHeading title="Student activity" text="Practice sessions by week · Nairobi only" />
          <div className="bar-chart">{[44, 60, 52, 78, 66, 86, 72, 94, 81, 88, 74, 97].map((h, i) => <i style={{ height: `${h}%` }} key={i} />)}</div>
          <div className="chart-labels"><span>Jul 1</span><span>Jul 15</span><span>Aug 1</span><span>Aug 15</span><span>Sep 1</span></div>
        </div>
        <div className="chart-card">
          <SectionHeading title="Teacher entry-check counts" text="Nairobi teachers" />
          <div className="branch-bars">
            {teachers.filter(t => t.branch === 'Nairobi').map(t => (
              <div key={t.name}>
                <span>{t.name.split(' ').slice(-1)[0]}</span>
                <div><i style={{ width: `${(t.entriesReviewed / 200) * 100}%` }} /></div>
                <strong>{t.entriesReviewed}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export function BranchTeachers() {
  const branchTeachers = teachers.filter(t => t.branch === 'Nairobi');
  return (
    <main className="page portal-page">
      <div className="portal-welcome">
        <div>
          <p className="eyebrow">Branch coordinator · Nairobi</p>
          <h1>Branch Teacher Overview</h1>
          <p>Teachers in your branch and their activity. Load management is admin-only.</p>
        </div>
      </div>
      <div className="teacher-table">
        <div className="table-head"><span>Teacher</span><span>Script</span><span>Entries reviewed</span><span>Students</span><span>Coordinator</span></div>
        {branchTeachers.map(t => (
          <div className="history-row" key={t.name}>
            <span><strong>{t.name}</strong></span>
            <span>{khatTypes[scriptList.find(s => t.name.includes('Naskh') ? s === 'Naskh' : s === 'Nastaaleeq') || 'Naskh'].name}</span>
            <span>{t.entriesReviewed}</span>
            <span>{t.students}</span>
            <span>{t.isCoordinator ? <StatusChip tone="blue">Yes</StatusChip> : '—'}</span>
          </div>
        ))}
      </div>
    </main>
  );
}

export function TeacherNotifications() {
  return (
    <main className="page portal-page">
      <SectionHeading eyebrow="Stay in the loop" title="Notifications" text="A gentle nudge when something in your path changes." />
      <div className="notification-list">
        {teacherNotifications.map(n => (
          <div className="notification" key={n.title}>
            <div className="notification-icon"><Bell size={17} /></div>
            <div><strong>{n.title}</strong><p>{n.body}</p><small>{n.type} · {n.time}</small></div>
            <ChevronRight size={16} />
          </div>
        ))}
      </div>
    </main>
  );
}
