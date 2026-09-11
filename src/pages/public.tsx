import { useState } from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';
import { galleryWorks, pastCompetitionWinners, type GalleryWork } from '@/data/mock';
import { navigate, SectionHeading, GalleryCard } from '@/components/ui';

export function Gallery() {
  const [tab, setTab] = useState<'Student Showcase' | 'Teacher Showcase'>('Student Showcase');
  const [liked, setLiked] = useState(0);
  const works = galleryWorks.filter(w => tab === 'Student Showcase' ? w.role === 'student' : w.role === 'teacher');
  return (
    <main className="page">
      <SectionHeading title="The gallery" text="Practice shared by students and teachers across all five branches." action={
        <div className="tabs small">
          <button className={tab === 'Student Showcase' ? 'active' : ''} onClick={() => setTab('Student Showcase')}>Student Showcase</button>
          <button className={tab === 'Teacher Showcase' ? 'active' : ''} onClick={() => setTab('Teacher Showcase')}>Teacher Showcase</button>
        </div>
      } />
      {tab === 'Student Showcase' && (
        <div className="challenge-banner">
          <Sparkles size={18} />
          <strong>THIS MONTH'S GUILD CHALLENGE</strong>
          <span>صبر &nbsp; Write the word patience — any script, any level.</span>
          <button onClick={() => navigate('competitions')}>Submit yours →</button>
        </div>
      )}
      {tab === 'Teacher Showcase' && (
        <div className="info-banner">
          <ShieldCheck size={18} />
          <span>Teacher posts are auto-approved. Admin retains the ability to remove any post.</span>
        </div>
      )}
      <div className="gallery-grid">
        {works.map(work => <GalleryCard work={work} onLike={() => setLiked(liked + 1)} key={work.word + work.name} />)}
      </div>
      {liked > 0 && <div className="toast"><Sparkles size={15} /> Your appreciation was added to the guild.</div>}
    </main>
  );
}

export { pastCompetitionWinners };
export type { GalleryWork };
