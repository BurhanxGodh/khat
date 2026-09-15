import { useState, type ChangeEvent } from 'react';
import {
  ArrowRight, Award, Bell, BookOpen, Check, ChevronRight,
  ClipboardList, FileImage, FileText, Flame, Lock, Play, Search, Sparkles, Trophy, Upload, X,
  Clock, Download,
} from 'lucide-react';
import type { Script } from '@/data/types';
import {
  branches, khatTypes, scriptList, courseLevels, secondaryCourses,
  encouragementQuotes, books, studentNotifications, liveEvents,
  pastCompetitionWinners, competitions, galleryWorks, students,
  studentCertificates, certificateTiers,
} from '@/data/mock';
import {
  navigate, Button, SectionHeading, StatusChip, BadgeIcon, ActivityHeatmap,
  StatCard, ScriptTabs, UploadBox, Modal, BackLink, ShowcaseSections, Footer,
} from '@/components/ui';

export function StudentLandingPage() {
  return (
    <>
      <section className="hero page">
        <div className="hero-copy">
          <p className="eyebrow">A free program of Al-Jamea-tus-Saifiyah</p>
          <h1>Study Arabic calligraphy, free, <em>one measured stroke at a time.</em></h1>
          <p className="hero-lede">Naskh, Sulus, and Nastaaleeq — three living traditions, taught across five branches, open to every student at no cost.</p>
          <div className="hero-actions">
            <Button onClick={() => navigate('dashboard')}>Go to Your Path <ArrowRight size={17} /></Button>
            <button className="text-link" onClick={() => navigate('catalog')}>Browse the curriculum <ArrowRight size={15} /></button>
          </div>
        </div>
        <div className="hero-script">نسخ<br /><span>خط</span></div>
      </section>
      <main>
        <ShowcaseSections works={galleryWorks} />
        <section className="page section">
          <div className="winner-strip">
            <div>
              <Trophy size={18} />
              <div><strong>Latest competition winners</strong><span>Celebrating patience, proportion, and practice.</span></div>
            </div>
            <button onClick={() => navigate('competitions')}>See results <ArrowRight size={15} /></button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export function StudentDashboard() {
  const [enrolled, setEnrolled] = useState<Script[]>(['Naskh', 'Sulus']);
  return (
    <main className="page portal-page">
      <div className="portal-welcome">
        <div>
          <p className="eyebrow">Saturday, 13 September 2026 · Nairobi</p>
          <h1>Your Path</h1>
          <p>Good morning, Amina. Keep your hand warm — even five minutes counts.</p>
        </div>
        <div className="streak"><Flame size={22} /><strong>14</strong><span>day streak</span></div>
      </div>
      <div className="script-progress-grid">
        {scriptList.map(script => {
          const active = enrolled.includes(script);
          const progress = script === 'Naskh' ? 62 : script === 'Sulus' ? 20 : 0;
          return (
            <div className={`progress-card ${!active ? 'not-enrolled' : ''}`} key={script} style={{ '--script': khatTypes[script].color } as React.CSSProperties}>
              <div className="card-top">
                <strong style={{ color: khatTypes[script].color }}>{khatTypes[script].arabic}</strong>
                <span>{khatTypes[script].name}</span>
                {active && <small><Flame size={13} /> {script === 'Naskh' ? '14 days' : '3 days'}</small>}
              </div>
              {active ? (
                <>
                  <p>Level: <b>{script === 'Naskh' ? 'Composition (Murakkabāt)' : 'Foundation (Mufradāt)'}</b> · {progress}%</p>
                  <div className="progress"><i style={{ width: `${progress}%`, background: khatTypes[script].color }} /></div>
                  <small className="next">Next: joining ب and ت</small>
                  <div className="card-actions">
                    <Button onClick={() => navigate('course')}>Continue <ArrowRight size={14} /></Button>
                    <Button outline onClick={() => navigate('course')}>Submit practice</Button>
                  </div>
                </>
              ) : (
                <>
                  <p>Not yet enrolled. Start whenever you're ready — no prerequisite from your other tracks.</p>
                  <Button outline onClick={() => setEnrolled([...enrolled, script])}>Enroll free <ArrowRight size={14} /></Button>
                </>
              )}
            </div>
          );
        })}
      </div>
      <div className="dashboard-lower">
        <div className="submission-card">
          <p className="eyebrow">Your last checkpoint test</p>
          <div className="submission-title">
            <div>
              <h3>Naskh · Foundation checkpoint</h3>
              <p>Sent to a Nairobi reviewer · response expected by Thu, 15 Sep</p>
            </div>
            <StatusChip tone="amber">Pending review</StatusChip>
          </div>
        </div>
        <div className="badge-panel">
          <p className="eyebrow">Your badges — per khat type</p>
          <div className="badge-row">
            <BadgeIcon script="Naskh" tier="Composition" />
            <BadgeIcon script="Sulus" tier="Foundation" />
          </div>
        </div>
      </div>
      <div className="upcoming-events-strip">
        <SectionHeading title="Upcoming events" action={<button className="text-link" onClick={() => navigate('events')}>All events <ArrowRight size={14} /></button>} />
        <div className="event-mini-row">
          {liveEvents.filter(e => e.status !== 'past').slice(0, 3).map(ev => (
            <div className="event-mini" key={ev.title}>
              <StatusChip tone={ev.status === 'live' ? 'green' : 'gold'}>{ev.status === 'live' ? 'Live now' : 'Upcoming'}</StatusChip>
              <strong>{ev.title}</strong>
              <small>{ev.host} · {ev.branch}</small>
            </div>
          ))}
        </div>
      </div>
      <div className="activity-card">
        <SectionHeading title="Your practice rhythm" text="Every square is a day you showed up." action={<span className="muted">Last 12 weeks</span>} />
        <ActivityHeatmap />
      </div>
    </main>
  );
}

export function Catalog() {
  const [script, setScript] = useState<Script>('Naskh');
  return (
    <main className="page portal-page">
      <SectionHeading eyebrow="Course catalog" title={`${khatTypes[script].name} curriculum`} text="Build the hand one measured exercise at a time." action={<ScriptTabs script={script} setScript={setScript} />} />
      <div className="course-banner" style={{ '--script': khatTypes[script].color, '--script-soft': khatTypes[script].soft } as React.CSSProperties}>
        <div>
          <p className="eyebrow">Certification course</p>
          <h2>{khatTypes[script].name} · The complete hand</h2>
          <p>10 levels, checkpoint tests after every 5. Regular practice levels unlock immediately on upload — only checkpoint tests are teacher-reviewed.</p>
        </div>
        <StatusChip>62% complete</StatusChip>
      </div>
      <div className="level-list">
        {courseLevels.map((level, i) => (
          <button
            className={`level-row ${level.locked ? 'locked' : ''} ${level.type === 'checkpoint' ? 'is-checkpoint' : ''} ${level.current ? 'is-current' : ''}`}
            onClick={() => !level.locked && navigate('course')}
            key={level.id}
          >
            <span className="level-number">{String(level.id).padStart(2, '0')}</span>
            <div>
              <strong>{level.name}</strong>
              <small>{level.type === 'checkpoint' ? 'Checkpoint test · teacher reviewed' : level.exercises ? `${level.exercises} exercises · instant unlock` : 'Practice level'}</small>
            </div>
            <span>
              {level.locked ? <Lock size={16} /> : level.type === 'checkpoint' ? <StatusChip tone="amber">Test</StatusChip> : level.complete ? <Check size={16} /> : level.current ? '62%' : ''}
            </span>
            <ChevronRight size={16} />
          </button>
        ))}
      </div>
      <SectionHeading eyebrow="Open once enrolled" title="Secondary & self-learning" text="Explore technique, history, and composition without locks." />
      <div className="secondary-grid">
        {secondaryCourses.map((course) => (
          <div className="secondary-card" key={course.title}>
            <div className="course-icon"><BookOpen size={20} /></div>
            <h3>{course.title}</h3>
            <p>{course.desc}</p>
            <div><span>{course.progress}% complete</span><button>Enroll <ArrowRight size={14} /></button></div>
          </div>
        ))}
      </div>
    </main>
  );
}

export function CourseEnvironment() {
  const [selectedLevel, setSelectedLevel] = useState(6);
  const [file, setFile] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [sheet, setSheet] = useState('2mm');
  const [quote] = useState(() => encouragementQuotes[Math.floor(Math.random() * encouragementQuotes.length)]);
  const onFile = (e: ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0]?.name ?? null);

  const level = courseLevels.find(l => l.id === selectedLevel)!;
  const isCheckpoint = level.type === 'checkpoint';

  return (
    <div className="course-env">
      <aside className="course-env-sidebar">
        <div className="course-env-header">
          <p className="eyebrow">Naskh · Certification</p>
          <h3>The complete hand</h3>
        </div>
        <div className="course-env-levels">
          {courseLevels.map(l => (
            <button
              key={l.id}
              className={`course-env-level ${selectedLevel === l.id ? 'active' : ''} ${l.locked ? 'locked' : ''} ${l.type === 'checkpoint' ? 'is-checkpoint' : ''}`}
              onClick={() => !l.locked && setSelectedLevel(l.id)}
            >
              <span className="level-icon">
                {l.locked ? <Lock size={14} /> : l.type === 'checkpoint' ? <ClipboardList size={14} /> : l.complete ? <Check size={14} /> : l.current ? <Play size={14} /> : <span className="level-num">{l.id}</span>}
              </span>
              <div>
                <strong>Level {l.id}</strong>
                <small>{l.name}</small>
              </div>
            </button>
          ))}
        </div>
        <button className="course-env-exit" onClick={() => navigate('catalog')}><X size={16} /> Exit course</button>
      </aside>
      <main className="course-env-main">
        <div className="course-env-content">
          <div className="level-heading">
            <div>
              <p className="eyebrow">Naskh · Level {String(level.id).padStart(2, '0')}</p>
              <h1>{level.name}</h1>
              <p>{isCheckpoint ? 'Checkpoint test — teacher reviewed. Upload a clear photo of your completed sheet.' : 'Practice the strokes at your own pace. Uploading your practice immediately unlocks the next level.'}</p>
            </div>
            <StatusChip tone={isCheckpoint ? 'amber' : 'green'}>{isCheckpoint ? 'Test · Teacher reviewed' : 'Practice · Instant unlock'}</StatusChip>
          </div>

          {isCheckpoint ? (
            <>
              <div className="checkpoint-ref-section">
                <p className="eyebrow">Reference images — copy precisely</p>
                <p className="editor-hint">Replicate exactly what you see in the reference images. Your upload will be sent to a teacher for review.</p>
                <div className="checkpoint-ref-grid">
                  <div className="checkpoint-ref-image"><span>ا ب ت ث ج ح خ</span></div>
                  <div className="checkpoint-ref-image"><span>بِسْمِ اللَّهِ</span></div>
                </div>
              </div>
              <div className="practice-panel">
                <SectionHeading eyebrow="Submit your test" title="Upload your checkpoint sheet" text="This will be sent to a teacher for review. You'll be notified when the result is ready. If a redo is needed, you'll re-attempt with the same letters and text." />
                <UploadBox tall label={file || 'Upload your test sheet'} sublabel={file ? 'Ready to submit' : 'PNG, JPG up to 10 MB'} />
                <div className="practice-actions">
                  <Button onClick={() => setSaved(true)}>{saved ? 'Submitted' : 'Submit for review'} <ArrowRight size={15} /></Button>
                </div>
              </div>
              {saved && (
                <div className="submission-result-card">
                  <Check size={24} className="green-icon" />
                  <div>
                    <h3>Sent to a reviewer</h3>
                    <p>Response expected by Thu, 15 Sep. Your next levels will unlock once you pass. If a redo is needed, you'll re-attempt with the same letters and text, submitted as a new entry.</p>
                  </div>
                  <StatusChip tone="amber">Pending review</StatusChip>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="lesson-grid">
                <div className="video-card">
                  <div className="video-placeholder"><Play size={27} /><span>Reference video · 04:32</span></div>
                  <h3>Watch the stroke</h3>
                  <p>Ustadh Ismail demonstrates the connection slowly, then at reading speed.</p>
                </div>
                <div className="reference-card">
                  <p className="eyebrow">Image reference</p>
                  <div className="reference-art">بتث</div>
                  <span>Murakkabāt · joining practice</span>
                </div>
              </div>
              <div className="practice-panel">
                <SectionHeading eyebrow="Make it yours" title="Submit your practice" text="A clear photo in natural light is best. Your practice is saved to your profile and the next level unlocks immediately — no review needed." />
                <div className="practice-form">
                  <label className="field-label">Minutes practiced<input className="field" type="number" placeholder="e.g. 25" /></label>
                  <UploadBox label={file || 'Drop your practice sheet here'} sublabel={file ? 'Ready to save' : 'PNG, JPG up to 10 MB · tap to browse'} />
                </div>
                <div className="practice-actions">
                  <button className="text-link" onClick={() => alert(`Practice sheet · ${sheet} grid`)}><FileText size={16} /> Download {sheet} practice sheet</button>
                  <select className="field compact" value={sheet} onChange={e => setSheet(e.target.value)}>
                    <option>1mm grid</option><option>2mm grid</option><option>3mm grid</option>
                  </select>
                  <Button onClick={() => setSaved(true)}>{saved ? 'Saved' : 'Save practice'} <ArrowRight size={15} /></Button>
                </div>
              </div>
              {saved && (
                <Modal onClose={() => { setSaved(false); setSelectedLevel(Math.min(selectedLevel + 1, courseLevels.length)); }}>
                  <Sparkles size={30} className="gold-icon" />
                  <p className="eyebrow">A note for your desk</p>
                  <h2>"{quote}"</h2>
                  <p>Practice saved — next level unlocked. Your upload is on your profile for your teacher to see, but it's never queued for review.</p>
                  <Button onClick={() => { setSaved(false); setSelectedLevel(Math.min(selectedLevel + 1, courseLevels.length)); }}>Continue to Level {Math.min(selectedLevel + 1, courseLevels.length)}</Button>
                </Modal>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export function Profile() {
  const student = students[0];
  return (
    <main className="page portal-page">
      <div className="profile-hero">
        <div className="profile-avatar">AS</div>
        <div>
          <p className="eyebrow">Student profile · your full view</p>
          <h1>Amina Suleiman</h1>
          <p>Nairobi · TR-20481 · Joined March 2026</p>
        </div>
        <Button outline onClick={() => navigate('showcase')}>Share a piece <Upload size={15} /></Button>
      </div>
      <div className="profile-stats">
        <StatCard icon={Flame} value="48h 20m" label="Total practice time" trend="+3h this month" />
        <StatCard icon={Award} value="2" label="Certificates earned" />
        <StatCard icon={Trophy} value="1" label="Competition win" />
      </div>
      <SectionHeading title="Your three hands" text="Progress and achievements, tracked separately per script — no combined badge." />
      <div className="profile-script-grid">
        {scriptList.map(script => {
          const sp = student.scriptProgress[script];
          if (!sp.enrolled) return null;
          return (
            <div className="profile-script" key={script} style={{ '--script': khatTypes[script].color } as React.CSSProperties}>
              <div className="profile-script-head">
                <strong>{khatTypes[script].arabic}</strong>
                <div>
                  <h3>{khatTypes[script].name}</h3>
                  <span>{sp.level} · {sp.progress}%</span>
                </div>
                <BadgeIcon script={script} tier={sp.tier} />
              </div>
              <div className="progress"><i style={{ width: `${sp.progress}%`, background: khatTypes[script].color }} /></div>
              <div className="profile-subsection"><small>Certification</small><span>{sp.certificate || 'In progress · no certificate yet'}</span></div>
              <div className="profile-subsection"><small>Self-learning</small><span>Qalam care & cutting · 34%</span></div>
              <div className="profile-subsection"><small>Event-based</small><span>Naskh clinic · 3 entries</span></div>
              <div className="profile-subsection"><small>Time spent</small><span>{sp.timeSpent}</span></div>
            </div>
          );
        })}
      </div>
      <SectionHeading title="Your practice uploads" text="Every regular level upload, saved here for your reference and visible to your teachers." />
      <div className="practice-upload-grid">
        {student.practiceUploads.map(upload => (
          <div className="practice-upload-tile" key={upload.id}>
            <div className="practice-tile-art" style={{ color: khatTypes[upload.script].color }}>{upload.thumb}</div>
            <div><strong>{upload.levelName}</strong><small>{khatTypes[upload.script].name} · {upload.date}</small></div>
            <span className="practice-time"><Clock size={13} /> {upload.minutes} min</span>
          </div>
        ))}
      </div>
      <div className="activity-card">
        <SectionHeading title="Practice rhythm" />
        <ActivityHeatmap />
      </div>
    </main>
  );
}

export function ShowcaseSubmission() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <main className="page portal-page">
      <SectionHeading eyebrow="Share with the guild" title="Showcase submission" text="Share a finished exercise or a moment from your practice desk." />
      <div className="showcase-form">
        <label className="field-label">Caption<textarea className="field textarea" placeholder="What did you notice while making this piece?" /></label>
        <UploadBox tall label="Add a photo of your work" sublabel="Local preview only · your submission enters moderation" icon={FileImage} />
        <Button onClick={() => setSubmitted(true)}>{submitted ? 'Submitted for review' : 'Send to moderation'} <ArrowRight size={15} /></Button>
      </div>
      <SectionHeading title="My showcase submissions" />
      <div className="submission-list">
        {[
          ['نور · Nastaaleeq study', 'Pending moderation', 'amber' as const],
          ['بسم الله · Naskh', 'Approved · 03 Sep', 'green' as const],
          ['حمد · Sulus', 'Needs changes · 28 Aug', 'red' as const],
        ].map(([name, status, tone]) => (
          <div className="submission-row" key={name}>
            <div className="row-art">نور</div>
            <div><strong>{name}</strong><small>Submitted from Nairobi</small></div>
            <StatusChip tone={tone as 'amber' | 'green' | 'red'}>{status}</StatusChip>
          </div>
        ))}
      </div>
    </main>
  );
}

export function Competitions() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <main className="page portal-page">
      <SectionHeading eyebrow="Practice in public" title="Competitions" text="A little deadline can give a page some courage." />
      <div className="competition-grid">
        {competitions.map((comp, i) => (
          <div className={`competition-card ${i === 0 ? 'featured' : ''}`} key={comp.title}>
            <div>
              <StatusChip tone="amber">Open until {comp.deadline}</StatusChip>
              <h2>{comp.title}</h2>
              <p>{comp.desc}</p>
            </div>
            <Button onClick={() => setSubmitted(true)}>Submit entry <ArrowRight size={15} /></Button>
          </div>
        ))}
      </div>
      <SectionHeading title="Past competitions" />
      <div className="winners-list">
        {pastCompetitionWinners.map(w => (
          <div key={w.title}>
            <Trophy size={19} />
            <div>
              <strong>{w.name} {w.won && <StatusChip tone="green">You won</StatusChip>}</strong>
              <span>{w.title} · {w.script} · {w.branch}</span>
            </div>
          </div>
        ))}
      </div>
      {submitted && <div className="toast"><Check size={15} /> Entry received. It will NOT appear on your profile or the public gallery.</div>}
    </main>
  );
}

export function StudentEvents() {
  const upcoming = liveEvents.filter(e => e.status !== 'past');
  const past = liveEvents.filter(e => e.status === 'past');
  return (
    <main className="page portal-page">
      <SectionHeading eyebrow="Gather around the page" title="Live events" text="Join a study circle, watch a demonstration, or revisit a recording." />
      <div className="event-list">
        {upcoming.map((ev, i) => (
          <div className="event-row" key={ev.title}>
            <div className="event-date"><span>{ev.day}</span><small>SEP</small></div>
            <div><strong>{ev.title}</strong><span>{ev.host} · {ev.branch}</span></div>
            <StatusChip tone={ev.status === 'live' ? 'green' : 'gold'}>{ev.status === 'live' ? 'Live now' : 'Starts in ' + (i + 1) + ' day' + (i > 0 ? 's' : '')}</StatusChip>
            <Button outline>{ev.status === 'live' ? 'Join now' : 'Add reminder'}</Button>
          </div>
        ))}
      </div>
      <SectionHeading title="Past recordings" />
      <div className="recordings">
        {past.map((ev, i) => (
          <div key={ev.title}>
            <div className="recording-art"><Play size={20} /><span>{ev.duration}</span></div>
            <strong>{ev.title}</strong>
            <small>{branches[i]} · recording</small>
          </div>
        ))}
      </div>
    </main>
  );
}

export function Resources() {
  const [filter, setFilter] = useState<Script | 'All'>('All');
  const filtered = filter === 'All' ? books : books.filter(b => b.script === filter);
  return (
    <main className="page portal-page">
      <SectionHeading eyebrow="The library" title="Resource library" text="Books, references, and quiet companions for your desk." action={
        <div className="search-field"><Search size={16} /><input placeholder="Search resources" /></div>
      } />
      <div className="tabs small">
        <button className={filter === 'All' ? 'active' : ''} onClick={() => setFilter('All')}>All</button>
        {scriptList.map(s => <button key={s} className={filter === s ? 'active' : ''} onClick={() => setFilter(s)}>{khatTypes[s].name}</button>)}
      </div>
      <div className="resource-grid">
        {filtered.map((book, i) => (
          <div className="resource-card" key={book.title}>
            <div className="book-cover" style={{ background: book.cover }}><BookOpen size={26} /><span>{khatTypes[book.script].name}</span></div>
            <strong>{book.title}</strong>
            <small>PDF · {book.size}</small>
            <button className="text-link">Download <ArrowRight size={14} /></button>
          </div>
        ))}
      </div>
    </main>
  );
}

export function Notifications() {
  return (
    <main className="page portal-page">
      <SectionHeading eyebrow="Stay in the loop" title="Notifications" text="A gentle nudge when something in your path changes." />
      <div className="notification-list">
        {studentNotifications.map(n => (
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
