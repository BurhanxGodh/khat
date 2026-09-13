import { useEffect, useState } from 'react';
import type { Role } from '@/data/types';
import { roleDefaultPage } from '@/data/mock';
import { useHash, Header, navigate } from '@/components/ui';
import { Gallery } from '@/pages/public';
import { LandingRoleSelect, Auth, ForcedPasswordChange, SettingsPage } from '@/pages/auth';
import {
  StudentLandingPage, StudentDashboard, Catalog, CourseEnvironment, Profile,
  ShowcaseSubmission, Competitions, StudentEvents, Resources, Notifications,
} from '@/pages/student';
import {
  TeacherDashboard, CoordinatorDashboard, TeacherQueue, ReviewPage, Reviews, TeacherShowcase, AssetLibrary,
  TeacherProfile, CompetitionJudging, HostEvent, BranchStats, BranchTeachers,
  BranchStudents, TeacherNotifications, RestrictedStudentProfile,
} from '@/pages/teacher';
import { AdminLayout } from '@/pages/admin';

function App() {
  const page = useHash();
  const [role, setRole] = useState<Role>(() => {
    if (page.startsWith('admin')) return 'admin';
    if (page.startsWith('queue') || page.startsWith('review') || page === 'reviews' || page === 'assets' || page === 'judging' || page === 'events-host' || page === 'branch-stats' || page === 'branch-teachers' || page === 'branch-students') return 'teacher';
    if (['landing', 'signup', 'login', 'forced-password'].includes(page)) return 'student';
    return 'student';
  });

  useEffect(() => {
    if (page.startsWith('admin')) setRole('admin');
    else if (page.startsWith('coordinator-') || ['branch-stats', 'branch-teachers', 'branch-students'].includes(page)) setRole('coordinator');
    else if (page.startsWith('teacher-') || ['queue', 'review', 'reviews', 'assets', 'judging', 'events-host', 'student-profile', 'teacher-profile-view'].includes(page)) setRole('teacher');
    else if (page.startsWith('login-')) setRole(page.replace('login-', '') as Role);
    else if (page === 'dashboard' || page === 'student' || page === 'student-landing' || page === 'catalog' || page === 'course' || page === 'showcase' || page === 'competitions' || page === 'events' || page === 'resources' || page === 'profile' || page === 'notifications') setRole('student');
  }, [page]);

  const content = (() => {
    // Landing / role selection
    if (page === 'landing') return <LandingRoleSelect />;

    // Auth pages
    if (page === 'signup') return <Auth signup initialRole="student" />;
    if (page === 'login' || page.startsWith('login-')) return <Auth initialRole={page.startsWith('login-') ? page.replace('login-', '') as Role : role} />;
    if (page === 'forced-password') return <ForcedPasswordChange />;
    if (page === 'settings') return <SettingsPage role={role} />;

    // Student landing (introductory + showcases)
    if (page === 'student-landing') return <StudentLandingPage />;

    // Student portal
    if (page === 'dashboard' || page === 'student') return <StudentDashboard />;
    if (page === 'catalog') return <Catalog />;
    if (page === 'course') return <CourseEnvironment />;
    if (page === 'profile' && role === 'student') return <Profile />;
    if (page === 'showcase' && role === 'student') return <ShowcaseSubmission />;
    if (page === 'competitions' && role === 'student') return <Competitions />;
    if (page === 'events' && role === 'student') return <StudentEvents />;
    if (page === 'resources' && role === 'student') return <Resources />;
    if (page === 'notifications' && role === 'student') return <Notifications />;

    // Gallery (shared)
    if (page === 'gallery') return <Gallery />;

    // Teacher and coordinator portals
    if (page === 'teacher-dashboard') return <TeacherDashboard />;
    if (page === 'coordinator-dashboard') return <CoordinatorDashboard />;
    if (page === 'queue') return <TeacherQueue coordinator={role === 'coordinator'} />;
    if (page === 'review') return <ReviewPage />;
    if (page === 'reviews') return <Reviews />;
    if (page === 'showcase' && (role === 'teacher' || role === 'coordinator')) return <TeacherShowcase />;
    if (page === 'assets') return <AssetLibrary />;
    if (page === 'judging') return <CompetitionJudging />;
    if (page === 'events-host') return <HostEvent />;
    if (page === 'profile' && (role === 'teacher' || role === 'coordinator')) return <TeacherProfile />;
    if (page === 'notifications' && (role === 'teacher' || role === 'coordinator')) return <TeacherNotifications />;
    if (page === 'student-profile') return <RestrictedStudentProfile />;

    // Coordinator extra tabs
    if (page === 'branch-stats') return <BranchStats />;
    if (page === 'branch-teachers') return <BranchTeachers />;
    if (page === 'branch-students') return <BranchStudents />;

    // Admin portal
    if (page === 'admin' || page.startsWith('admin-')) return <AdminLayout page={page} />;

    return <LandingRoleSelect />;
  })();

  if (role === 'admin' && (page === 'admin' || page.startsWith('admin-'))) return <>{content}</>;
  if (page === 'landing' || page === 'signup' || page === 'login' || page.startsWith('login-') || page === 'forced-password' || page === 'settings' || page === 'course') return <>{content}</>;

  return (
    <>
      <Header role={role} setRole={(next) => { setRole(next); navigate(roleDefaultPage[next]); }} />
      {content}
    </>
  );
}

export default App;
