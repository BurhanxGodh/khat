import { useState } from 'react';
import {
  ArrowRight, Award, BarChart3, BookOpen, CalendarDays, Check, ChevronRight,
  ClipboardList, FileText, LayoutDashboard, Lock, Menu, Play, Plus, Search,
  Settings, ShieldCheck, Sparkles, Trash2, Trophy, Upload, Users, X,
} from 'lucide-react';
import type { Script } from '@/data/types';
import {
  khatTypes, scriptList, branches, teachers, entryLogs, galleryWorks,
  books, competitions, liveEvents, students,
} from '@/data/mock';
import {
  navigate, Button, SectionHeading, StatusChip, StatCard, ScriptTabs,
  Modal, ShowcaseSections,
} from '@/components/ui';

export function AdminLayout({ page }: { page: string }) {
  const nav: [string, string, typeof LayoutDashboard][] = [
    ['admin', 'Overview', LayoutDashboard],
    ['admin-courses', 'Course Builder', BookOpen],
    ['admin-users', 'Teacher & Load', Users],
    ['admin-logs', 'Entry Logs', ClipboardList],
    ['admin-showcase', 'Showcase Mod', Sparkles],
    ['admin-competitions', 'Competitions', Trophy],
    ['admin-events', 'Live Events', CalendarDays],
    ['admin-resources', 'Resources', FileText],
    ['admin-stats', 'Statistics', BarChart3],
    ['admin-governance', 'Certificates & Data', ShieldCheck],
  ];
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo"><span className="logo-mark">╱</span><span><strong>Al-Jamea-tus-Saifiyah</strong><small>CONTROL PANEL</small></span></div>
        <p className="eyebrow admin-side-eyebrow">Workspace</p>
        {nav.map(([href, label, Icon]) => (
          <button className={page === href ? 'active' : ''} onClick={() => navigate(href)} key={href}><Icon size={17} />{label}</button>
        ))}
        <div className="admin-side-bottom">
          <button><Settings size={17} />Settings</button>
          <small>Admin preview<br />Control panel</small>
        </div>
      </aside>
      <div className="admin-main">
        <div className="admin-mobile-head"><Menu size={19} /><span>Control panel</span></div>
        <AdminContent page={page} />
      </div>
    </div>
  );
}

function AdminContent({ page }: { page: string }) {
  if (page === 'admin-courses') return <CourseBuilder />;
  if (page === 'admin-logs') return <EntryLogs />;
  if (page === 'admin-users') return <TeacherLoadManagement />;
  if (page === 'admin-showcase') return <ShowcaseModeration />;
  if (page === 'admin-competitions') return <CompetitionsManager />;
  if (page === 'admin-events') return <EventsManager />;
  if (page === 'admin-resources') return <ResourceManager />;
  if (page === 'admin-stats') return <StatisticsDashboard />;
  if (page === 'admin-governance') return <GovernanceManager />;
  return <AdminOverview />;
}

function AdminOverview() {
  return (
    <>
      <SectionHeading eyebrow="Good morning, administrator" title="Guild overview" text="A clear view of learning, teaching, and the work between." action={<Button><Plus size={16} /> New announcement</Button>} />
      <div className="stats-grid admin-stat-grid">
        <StatCard icon={Users} value="1,248" label="Enrolled students" trend="+8.4% this month" />
        <StatCard icon={Award} value="326" label="Certificates issued" trend="+24 this month" />
        <StatCard icon={ClipboardList} value="184" label="Entries reviewed" trend="92% within SLA" />
        <StatCard icon={Trophy} value="7" label="Active competitions" />
      </div>
      <div className="admin-dashboard-grid">
        <div className="chart-card">
          <SectionHeading title="Student activity" text="Practice sessions by week" action={<StatusChip>All branches</StatusChip>} />
          <div className="bar-chart">{[44, 60, 52, 78, 66, 86, 72, 94, 81, 88, 74, 97].map((h, i) => <i style={{ height: `${h}%` }} key={i} />)}</div>
          <div className="chart-labels"><span>Jul 1</span><span>Jul 15</span><span>Aug 1</span><span>Aug 15</span><span>Sep 1</span></div>
        </div>
        <div className="chart-card">
          <SectionHeading title="Branch pulse" text="Students active this week" />
          <div className="branch-bars">
            {branches.map((branch, i) => (
              <div key={branch}>
                <span>{branch}</span>
                <div><i style={{ width: `${[82, 68, 54, 46, 39][i]}%` }} /></div>
                <strong>{[428, 319, 244, 181, 162][i]}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="admin-queue">
        <SectionHeading title="Needs attention" action={<button className="text-link" onClick={() => navigate('admin-users')}>Manage capacity <ArrowRight size={15} /></button>} />
        {['6 entries are waiting for a teacher', '3 showcase posts need moderation', '2 teachers are over their review threshold', '1 idle-flagged entry needs manual reassignment'].map((item, i) => (
          <div key={item}><span className={`attention-dot dot-${i % 3}`} /><strong>{item}</strong><ChevronRight size={15} /></div>
        ))}
      </div>
      <ShowcaseSections works={galleryWorks} />
    </>
  );
}

function CourseBuilder() {
  const [script, setScript] = useState<Script>('Naskh');
  const [courseType, setCourseType] = useState<'certification' | 'secondary'>('certification');
  return (
    <>
      <SectionHeading eyebrow="Curriculum control" title="Course Builder" text="Shape the levels, references, and practice sheets for every hand." />
      <div className="builder-toolbar">
        <ScriptTabs script={script} setScript={setScript} />
        <div className="tabs small">
          <button className={courseType === 'certification' ? 'active' : ''} onClick={() => setCourseType('certification')}>Certification</button>
          <button className={courseType === 'secondary' ? 'active' : ''} onClick={() => setCourseType('secondary')}>Secondary</button>
        </div>
      </div>
      {courseType === 'certification' && (
        <div className="info-banner"><Lock size={16} /><span>Certification courses: you can edit references and add levels, but cannot delete the course or alter the 5-level test cadence and checkpoint gating.</span></div>
      )}
      <div className="builder-grid">
        <div className="builder-levels">
          {['The round letters', 'Tall and angular letters', 'Mufradāt set one', 'Mufradāt set two', 'Checkpoint · Foundation', 'Joining at the baseline'].map((x, i) => (
            <button className={i === 2 ? 'active' : ''} key={x}>
              <span>⠿</span><strong>Level {i + 1}</strong><small>{x}</small><ChevronRight size={15} />
            </button>
          ))}
          <button className="add-level-btn"><Plus size={16} /> Add level</button>
          {courseType === 'secondary' && <button className="delete-course-btn"><Trash2 size={15} /> Delete course</button>}
        </div>
        <div className="builder-editor">
          <div className="editor-heading">
            <div><p className="eyebrow">Editing level 03</p><h2>Mufradāt set one</h2></div>
            <StatusChip tone="green">Published</StatusChip>
          </div>
          <label className="field-label">Level title<input className="field" defaultValue="Mufradāt set one" /></label>
          <label className="field-label">Video reference URL<input className="field" defaultValue="https://studio.example/reference/naskh-03" /></label>
          <label className="field-label">Image reference URL<input className="field" defaultValue="naskh-mufradat-03.jpg" /></label>
          <div className="editor-upload"><Upload size={18} /><span>Practice sheets</span><button>1mm</button><button>2mm</button><button>3mm</button></div>
          {courseType === 'secondary' && <label className="field-label">Finishing certificate<select className="field"><option>None</option><option>Qalam care certificate</option></select></label>}
          <Button>Save changes <Check size={15} /></Button>
        </div>
      </div>
    </>
  );
}

function TeacherLoadManagement() {
  const [showOverflow, setShowOverflow] = useState(false);
  return (
    <>
      <SectionHeading eyebrow="People & capacity" title="Teacher & Load Management" text="Balance the queue across every branch without losing the human hand." />
      <div className="stats-grid">
        <StatCard icon={Users} value="28" label="Active teachers" />
        <StatCard icon={ClipboardList} value="84%" label="Avg. capacity used" />
        <StatCard icon={Award} value="6" label="Overflow entries" />
      </div>
      <div className="teacher-table">
        <div className="table-head"><span>Teacher</span><span>Branch</span><span>Current load</span><span>Threshold</span><span>Action</span></div>
        {teachers.map((t, i) => (
          <div className="history-row" key={t.name}>
            <span><strong>{t.name}</strong>{t.isCoordinator && <StatusChip tone="blue">Coord</StatusChip>}</span>
            <span>{t.branch}</span>
            <span><div className="tiny-progress"><i style={{ width: `${(t.load / t.threshold) * 100}%` }} /></div>{t.load}/{t.threshold} entries</span>
            <span><input className="inline-input" defaultValue={t.threshold} /></span>
            <Button outline>Assign</Button>
          </div>
        ))}
      </div>
      <SectionHeading title="Overflow / pending queue" text="Entries with no available teacher under threshold. Admin can manually assign to any teacher — even at or above threshold." action={<Button outline onClick={() => setShowOverflow(!showOverflow)}>{showOverflow ? 'Hide' : 'Show'} overflow</Button>} />
      {showOverflow && (
        <div className="teacher-table">
          <div className="table-head"><span>Entry ID</span><span>Student</span><span>Script</span><span>Branch</span><span>Assign to</span></div>
          {students.slice(0, 3).map((s, i) => (
            <div className="history-row" key={s.tr}>
              <span>ENT-209{i + 1}</span>
              <span>{s.name}</span>
              <span>{khatTypes[s.script].name}</span>
              <span>{s.branch}</span>
              <span><select className="field compact">{teachers.map(t => <option key={t.name}>{t.name}</option>)}</select> <Button>Assign</Button></span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function EntryLogs() {
  return (
    <>
      <SectionHeading eyebrow="Accountability" title="Entry Logs" text="A complete record of assignment, review, and diversion decisions." action={<div className="search-field"><Search size={16} /><input placeholder="Search entries" /></div>} />
      <div className="filter-bar admin-filters">
        <span>Filters</span><button>All branches</button><button>All scripts</button><button>Past 30 days</button>
      </div>
      <div className="history-table admin-table">
        <div className="table-head"><span>Entry ID</span><span>Student</span><span>Action</span><span>Actor</span><span>Timestamp</span><span>Notes</span></div>
        {entryLogs.map(row => (
          <div className="history-row" key={row.id + row.timestamp}>
            <span>{row.id}</span><span>{row.student}</span><span>{row.action}</span><span>{row.actor}</span><span>{row.timestamp}</span><span>{row.notes || '—'}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function ShowcaseModeration() {
  const [tab, setTab] = useState<'pending' | 'all'>('pending');
  return (
    <>
      <SectionHeading eyebrow="Trust & care" title="Showcase Moderation" text="Review student work before it becomes part of the public gallery. Teacher posts bypass moderation but can be removed." />
      <div className="tabs small">
        <button className={tab === 'pending' ? 'active' : ''} onClick={() => setTab('pending')}>Pending student submissions</button>
        <button className={tab === 'all' ? 'active' : ''} onClick={() => setTab('all')}>All posts (students + teachers)</button>
      </div>
      {tab === 'pending' ? (
        <div className="moderation-grid">
          {galleryWorks.filter(w => w.role === 'student').slice(0, 4).map(work => (
            <div className="moderation-card" key={work.word + work.name}>
              <div className="row-art large">{work.word}</div>
              <div><strong>{work.name}</strong><span>{khatTypes[work.script].name} · {work.branch}</span></div>
              <div><Button>Approve</Button><Button outline>Reject</Button></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="teacher-table">
          <div className="table-head"><span>Post</span><span>Author</span><span>Role</span><span>Branch</span><span>Action</span></div>
          {galleryWorks.map(work => (
            <div className="history-row" key={work.word + work.name}>
              <span><div className="row-art small">{work.word}</div></span>
              <span>{work.name}</span>
              <span>{work.role === 'teacher' ? <StatusChip tone="blue">Teacher</StatusChip> : <StatusChip>Student</StatusChip>}</span>
              <span>{work.branch}</span>
              <Button outline><Trash2 size={14} /> Remove</Button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function CompetitionsManager() {
  return (
    <>
      <SectionHeading eyebrow="Guild challenges" title="Competitions Manager" text="Create, assign judges, and post results." />
      <div className="admin-form-card">
        <h3>Create competition</h3>
        <label className="field-label">Title<input className="field" placeholder="e.g. The patient line" /></label>
        <label className="field-label">Description<textarea className="field textarea" placeholder="What should students write?" /></label>
        <div className="form-row">
          <label className="field-label">Khat type<select className="field">{scriptList.map(s => <option key={s}>{khatTypes[s].name}</option>)}</select></label>
          <label className="field-label">Start date<input className="field" type="date" /></label>
          <label className="field-label">End date<input className="field" type="date" /></label>
        </div>
        <label className="field-label">Judging deadline<input className="field" type="date" /></label>
        <label className="field-label">Assign judge<select className="field"><option>Select a teacher</option>{teachers.map(t => <option key={t.name}>{t.name}</option>)}</select></label>
        <Button>Create competition <ArrowRight size={15} /></Button>
      </div>
      <SectionHeading title="Active competitions" />
      <div className="teacher-table">
        <div className="table-head"><span>Title</span><span>Script</span><span>Deadline</span><span>Judge</span><span>Action</span></div>
        {competitions.map(c => (
          <div className="history-row" key={c.title}>
            <span><strong>{c.title}</strong></span>
            <span>{khatTypes[c.script].name}</span>
            <span>{c.deadline}</span>
            <span>{c.judge || <select className="field compact"><option>Assign</option>{teachers.map(t => <option key={t.name}>{t.name}</option>)}</select>}</span>
            <Button outline>Post results</Button>
          </div>
        ))}
      </div>
    </>
  );
}

function EventsManager() {
  return (
    <>
      <SectionHeading eyebrow="Across the guild" title="Live Events Manager" text="See every circle, clinic, and recording across the branches." />
      <div className="stats-grid">
        <StatCard icon={CalendarDays} value="12" label="Events this month" />
        <StatCard icon={Users} value="348" label="Total attendees" />
        <StatCard icon={Play} value="6" label="Recordings published" />
      </div>
      <div className="event-list">
        {liveEvents.map((ev, i) => (
          <div className="event-row" key={ev.title}>
            <div className="event-date"><span>{ev.day}</span><small>SEP</small></div>
            <div><strong>{ev.title}</strong><span>{ev.host} · {ev.branch} · {ev.attendees || 0} attendees</span></div>
            <StatusChip tone={ev.status === 'live' ? 'green' : 'gold'}>{ev.status === 'live' ? 'Live now' : ev.status === 'upcoming' ? 'Scheduled' : 'Past'}</StatusChip>
            <Button outline>View details</Button>
          </div>
        ))}
      </div>
    </>
  );
}

function ResourceManager() {
  return (
    <>
      <SectionHeading eyebrow="The library" title="Resource Library Manager" text="Upload and manage downloadable books. Tag by khat type." />
      <div className="admin-form-card">
        <h3>Upload book</h3>
        <label className="field-label">Title<input className="field" placeholder="Book title" /></label>
        <div className="form-row">
          <label className="field-label">Khat type<select className="field">{scriptList.map(s => <option key={s}>{khatTypes[s].name}</option>)}</select></label>
          <label className="field-label">File<input className="field" type="file" /></label>
        </div>
        <Button>Upload book <Upload size={15} /></Button>
      </div>
      <div className="teacher-table">
        <div className="table-head"><span>Title</span><span>Khat type</span><span>Size</span><span>Action</span></div>
        {books.map(b => (
          <div className="history-row" key={b.title}>
            <span><strong>{b.title}</strong></span>
            <span>{khatTypes[b.script].name}</span>
            <span>{b.size}</span>
            <span><Button outline>Edit</Button> <button className="text-link"><Trash2 size={14} /> Delete</button></span>
          </div>
        ))}
      </div>
    </>
  );
}

function StatisticsDashboard() {
  return (
    <>
      <SectionHeading eyebrow="Org-wide analytics" title="Statistics Dashboard" text="Enrollment, completion, activity, and throughput across all branches." />
      <div className="stats-grid admin-stat-grid">
        <StatCard icon={Users} value="1,248" label="Total enrolled" trend="+8.4%" />
        <StatCard icon={Award} value="76%" label="Completion rate" trend="+3%" />
        <StatCard icon={ClipboardList} value="184" label="Entries reviewed" />
        <StatCard icon={CalendarDays} value="348" label="Event attendees" />
      </div>
      <div className="admin-dashboard-grid">
        <div className="chart-card">
          <SectionHeading title="Enrollment by branch" />
          <div className="branch-bars">
            {branches.map((b, i) => (
              <div key={b}><span>{b}</span><div><i style={{ width: `${[82, 68, 54, 46, 39][i]}%` }} /></div><strong>{[428, 319, 244, 181, 162][i]}</strong></div>
            ))}
          </div>
        </div>
        <div className="chart-card">
          <SectionHeading title="Teacher throughput" text="Entries reviewed per teacher" />
          <div className="branch-bars">
            {teachers.map(t => (
              <div key={t.name}><span>{t.name.split(' ').slice(-1)[0]}</span><div><i style={{ width: `${(t.entriesReviewed / 250) * 100}%` }} /></div><strong>{t.entriesReviewed}</strong></div>
            ))}
          </div>
        </div>
      </div>
      <div className="chart-card">
        <SectionHeading title="Competition participation" text="Entries per competition" />
        <div className="bar-chart">{[34, 52, 41, 68, 59, 72, 48].map((h, i) => <i style={{ height: `${h}%` }} key={i} />)}</div>
      </div>
    </>
  );
}

function GovernanceManager() {
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  return (
    <>
      <SectionHeading eyebrow="Certificates & Data Governance" title="Certificate/Badge Manager + Data Governance" text="Upload templates, define badge tiers, and manage user data with full admin control." />
      <div className="admin-dashboard-grid">
        <div className="admin-form-card">
          <h3>Certificate templates</h3>
          <label className="field-label">Khat type<select className="field">{scriptList.map(s => <option key={s}>{khatTypes[s].name}</option>)}</select></label>
          <label className="field-label">Template file<input className="field" type="file" /></label>
          <Button>Upload template <Upload size={15} /></Button>
        </div>
        <div className="admin-form-card">
          <h3>Badge tiers per khat type</h3>
          {scriptList.map(s => (
            <div className="badge-tier-row" key={s}>
              <strong>{khatTypes[s].name}</strong>
              <span>Foundation → Composition → Mastery → Ijāzah</span>
              <button className="text-link">Edit</button>
            </div>
          ))}
        </div>
      </div>
      <SectionHeading title="Data governance" text="View, export, or permanently delete any user's data. No self-service deletion for students/teachers — admin-only." />
      <div className="teacher-table">
        <div className="table-head"><span>Name</span><span>Role</span><span>Branch</span><span>TR</span><span>Actions</span></div>
        {students.map(s => (
          <div className="history-row" key={s.tr}>
            <span><strong>{s.name}</strong></span>
            <span>Student</span>
            <span>{s.branch}</span>
            <span>{s.tr}</span>
            <span><Button outline>View</Button> <Button outline>Export</Button> <button className="text-link danger" onClick={() => setDeleteTarget(s.name)}><Trash2 size={14} /> Delete</button></span>
          </div>
        ))}
        {teachers.map(t => (
          <div className="history-row" key={t.name}>
            <span><strong>{t.name}</strong></span>
            <span>Teacher{t.isCoordinator ? ' / Coordinator' : ''}</span>
            <span>{t.branch}</span>
            <span>—</span>
            <span><Button outline>View</Button> <Button outline>Export</Button> <button className="text-link danger" onClick={() => setDeleteTarget(t.name)}><Trash2 size={14} /> Delete</button></span>
          </div>
        ))}
      </div>
      {deleteTarget && (
        <Modal onClose={() => setDeleteTarget(null)}>
          <ShieldCheck size={30} className="red-icon" />
          <p className="eyebrow">Confirm permanent deletion</p>
          <h2>Delete all data for {deleteTarget}?</h2>
          <p>This will permanently remove their profile, uploads, entries, and activity history. This action cannot be undone.</p>
          <div className="modal-actions">
            <Button onClick={() => setDeleteTarget(null)}>Yes, delete permanently</Button>
            <Button outline onClick={() => setDeleteTarget(null)}>Cancel</Button>
          </div>
        </Modal>
      )}
    </>
  );
}
