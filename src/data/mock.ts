import type { Script, Role, KhatType } from './types';

export const branches = ['Nairobi', 'Karachi', 'Surat', 'Sidhpur', 'Marol / Mumbai'] as const;
export type Branch = (typeof branches)[number];

export const khatTypes: Record<Script, KhatType> = {
  Naskh: { name: 'Naskh', arabic: 'نسخ', color: '#a9791f', soft: '#f1e6ca', desc: 'Clear, disciplined, built to be read — the script of the Qur’an and the page.', tagline: 'clarity you can read at a glance.' },
  Sulus: { name: 'Sulus (Thuluth)', arabic: 'ثلث', color: '#8d3327', soft: '#f0dbd2', desc: 'Monumental and dramatic — the script of titles, domes, and inscriptions.', tagline: 'the script built to be seen.' },
  Nastaaleeq: { name: 'Nastaaleeq', arabic: 'نستعلیق', color: '#496052', soft: '#dce4da', desc: 'Flowing and suspended — the script of Persian and Urdu poetry.', tagline: 'the hand that carries poetry.' },
};

export const scriptList: Script[] = ['Naskh', 'Sulus', 'Nastaaleeq'];

export const scriptFromHash = (hash: string): Script => {
  if (hash.includes('sulus') || hash.includes('thuluth')) return 'Sulus';
  if (hash.includes('nastaliq') || hash.includes('nastaaleeq')) return 'Nastaaleeq';
  return 'Naskh';
};

export const approvedTRs = ['TR-20481', 'TR-20482', 'TR-20483', 'TR-20484', 'TR-20485'];

export type MockStudent = {
  name: string; branch: Branch; script: Script; level: string; hours: string;
  tr: string; tier: string; progress: number; lastPractice: string; streak: number;
};
export const students: MockStudent[] = [
  { name: 'Amina Suleiman', branch: 'Nairobi', script: 'Naskh', level: 'Murakkabāt · Ex. 4', hours: '61 hrs left', tr: 'TR-20481', tier: 'Composition', progress: 62, lastPractice: '14 days', streak: 14 },
  { name: 'Husain Khatri', branch: 'Surat', script: 'Sulus', level: 'Mufradāt · Ex. 2', hours: '31 hrs left', tr: 'TR-20482', tier: 'Foundation', progress: 20, lastPractice: '3 days', streak: 3 },
  { name: 'Maryam Raza', branch: 'Karachi', script: 'Nastaaleeq', level: 'Foundation · Ex. 6', hours: '9 hrs left', tr: 'TR-20483', tier: 'Foundation', progress: 45, lastPractice: '1 day', streak: 7 },
  { name: 'Zahra Noor', branch: 'Sidhpur', script: 'Naskh', level: 'Mufradāt · Ex. 8', hours: '40 hrs left', tr: 'TR-20484', tier: 'Foundation', progress: 30, lastPractice: '5 days', streak: 2 },
  { name: 'Yusuf Ali', branch: 'Marol / Mumbai', script: 'Sulus', level: 'Mastery · Ex. 3', hours: '52 hrs left', tr: 'TR-20485', tier: 'Mastery', progress: 85, lastPractice: '2 days', streak: 21 },
];

export type GalleryWork = { word: string; name: string; branch: Branch; script: Script; tier: string; likes: number; role: 'student' | 'teacher'; status?: 'pending' | 'approved' | 'rejected' };
export const galleryWorks: GalleryWork[] = [
  { word: 'بسم الله', name: 'Amina Suleiman', branch: 'Nairobi', script: 'Naskh', tier: 'Mastery', likes: 24, role: 'student', status: 'approved' },
  { word: 'نور', name: 'Husain Khatri', branch: 'Surat', script: 'Nastaaleeq', tier: 'Composition', likes: 17, role: 'student', status: 'approved' },
  { word: 'سلام', name: 'Maryam Raza', branch: 'Karachi', script: 'Sulus', tier: 'Foundation', likes: 31, role: 'student', status: 'approved' },
  { word: 'علم', name: 'Zahra Noor', branch: 'Sidhpur', script: 'Naskh', tier: 'Foundation', likes: 12, role: 'student', status: 'approved' },
  { word: 'حمد', name: 'Ustadh Yusuf Ali', branch: 'Marol / Mumbai', script: 'Sulus', tier: 'Mastery', likes: 28, role: 'teacher', status: 'approved' },
  { word: 'عشق', name: 'Fatima Abbas', branch: 'Nairobi', script: 'Nastaaleeq', tier: 'Foundation', likes: 19, role: 'student', status: 'approved' },
  { word: 'صبر', name: 'Ustadha Zahra Abbas', branch: 'Karachi', script: 'Naskh', tier: 'Mastery', likes: 42, role: 'teacher', status: 'approved' },
];

export type Entry = { id: string; student: string; branch: Branch; script: Script; level: string; hours: string; source: 'Checkpoint' | 'Event' | 'Competition'; status: 'pending' | 'assigned' | 'in_review' | 'reviewed' | 'redo'; lockedByYou?: boolean };
export const reviewQueue: Entry[] = [
  { id: 'ENT-2084', student: 'Amina Suleiman', branch: 'Nairobi', script: 'Naskh', level: 'Murakkabāt · Ex. 4', hours: '61 hrs left', source: 'Checkpoint', status: 'assigned' },
  { id: 'ENT-2083', student: 'Husain Khatri', branch: 'Surat', script: 'Sulus', level: 'Mufradāt · Ex. 2', hours: '31 hrs left', source: 'Checkpoint', status: 'in_review', lockedByYou: true },
  { id: 'ENT-2082', student: 'Maryam Raza', branch: 'Karachi', script: 'Nastaaleeq', level: 'Foundation · Ex. 6', hours: '9 hrs left', source: 'Event', status: 'assigned' },
  { id: 'ENT-2081', student: 'Zahra Noor', branch: 'Sidhpur', script: 'Naskh', level: 'Mufradāt · Ex. 8', hours: '40 hrs left', source: 'Competition', status: 'assigned' },
];

export type EntryLog = { id: string; student: string; action: string; actor: string; timestamp: string; notes?: string };
export const entryLogs: EntryLog[] = [
  { id: 'ENT-2084', student: 'Amina Suleiman', action: 'Reviewed', actor: 'U. Ismail', timestamp: '10 Sep · 09:42' },
  { id: 'ENT-2083', student: 'Husain Khatri', action: 'Auto-diverted', actor: 'System', timestamp: '10 Sep · 08:11', notes: '48hr timeout' },
  { id: 'ENT-2082', student: 'Maryam Raza', action: 'Assigned', actor: 'U. Zahra', timestamp: '09 Sep · 16:20' },
  { id: 'ENT-2081', student: 'Zahra Noor', action: 'Idle-flagged', actor: 'System', timestamp: '09 Sep · 11:06', notes: 'In review past grace period' },
  { id: 'ENT-2080', student: 'Yusuf Ali', action: 'Manual divert', actor: 'Admin', timestamp: '08 Sep · 14:30', notes: 'Reassigned to U. Amina' },
  { id: 'ENT-2079', student: 'Fatima Abbas', action: 'Reviewed', actor: 'U. Mustafa', timestamp: '08 Sep · 10:15' },
];

export type Teacher = { name: string; branch: Branch; load: number; threshold: number; entries: number; entriesReviewed: number; students: number; isCoordinator?: boolean };
export const teachers: Teacher[] = [
  { name: 'Ustadh Ismail Khatri', branch: 'Nairobi', load: 14, threshold: 18, entries: 14, entriesReviewed: 148, students: 23 },
  { name: 'Ustadha Zahra Abbas', branch: 'Karachi', load: 8, threshold: 16, entries: 8, entriesReviewed: 206, students: 32, isCoordinator: true },
  { name: 'Ustadh Mustafa Raza', branch: 'Surat', load: 18, threshold: 20, entries: 18, entriesReviewed: 94, students: 18 },
  { name: 'Ustadha Amina Noor', branch: 'Sidhpur', load: 11, threshold: 18, entries: 11, entriesReviewed: 167, students: 27 },
  { name: 'Ustadh Yusuf Qasim', branch: 'Marol / Mumbai', load: 6, threshold: 15, entries: 6, entriesReviewed: 112, students: 21, isCoordinator: true },
  { name: 'Ustadh Ali Hassan', branch: 'Nairobi', load: 9, threshold: 15, entries: 9, entriesReviewed: 78, students: 15 },
];

export type Competition = { title: string; desc: string; deadline: string; script: Script; status: 'open' | 'judging' | 'closed'; judge?: string; judgingDeadline?: string };
export const competitions: Competition[] = [
  { title: 'The patient line', desc: 'Write صبر in any script, any level. Judges will look for proportion, intention, and a calm finish.', deadline: '30 Sep', script: 'Naskh', status: 'open' },
  { title: 'One word, three moods', desc: 'Interpret سلام in three different scripts.', deadline: '14 Oct', script: 'Nastaaleeq', status: 'open' },
];
export const pastCompetitionWinners = [
  { name: 'Amina Suleiman', title: 'The patient line', script: 'Naskh', branch: 'Nairobi' as Branch, won: true },
  { name: 'Husain Khatri', title: 'Monumental words', script: 'Sulus', branch: 'Surat' as Branch, won: false },
  { name: 'Maryam Raza', title: 'Poetry on a slope', script: 'Nastaaleeq', branch: 'Karachi' as Branch, won: false },
];

export type LiveEvent = { title: string; host: string; branch: Branch; date: string; day: number; status: 'live' | 'upcoming' | 'past'; attendees?: number; duration?: string };
export const liveEvents: LiveEvent[] = [
  { title: 'Naskh clinic: joining letters', host: 'Ustadha Zahra Abbas', branch: 'Karachi', date: 'Sep 12', day: 12, status: 'live', attendees: 48 },
  { title: 'Saturday open desk', host: 'Ustadh Mustafa Raza', branch: 'Surat', date: 'Sep 14', day: 14, status: 'upcoming' },
  { title: 'Thuluth on the wall', host: 'Ustadh Ismail Khatri', branch: 'Nairobi', date: 'Sep 18', day: 18, status: 'upcoming' },
  { title: 'Introduction to Nasta’liq', host: 'Ustadh Ali Hassan', branch: 'Nairobi', date: 'Sep 05', day: 5, status: 'past', attendees: 62, duration: '52:30' },
  { title: 'The dot as measure', host: 'Ustadh Yusuf Qasim', branch: 'Marol / Mumbai', date: 'Aug 28', day: 28, status: 'past', attendees: 34, duration: '42:18' },
  { title: 'A page from the masters', host: 'Ustadha Amina Noor', branch: 'Sidhpur', date: 'Aug 20', day: 20, status: 'past', attendees: 51, duration: '48:02' },
];

export type Book = { title: string; script: Script; size: string; cover: string };
export const books: Book[] = [
  { title: 'The measured qalam', script: 'Naskh', size: '2.4 MB', cover: '#ead8af' },
  { title: 'A history of Naskh', script: 'Naskh', size: '3.1 MB', cover: '#ead8af' },
  { title: 'Thuluth composition studies', script: 'Sulus', size: '4.2 MB', cover: '#d7bdb0' },
  { title: 'Poetry in Nasta’liq', script: 'Nastaaleeq', size: '2.8 MB', cover: '#c9d5c8' },
  { title: 'Practice sheets · 1mm', script: 'Naskh', size: '1.6 MB', cover: '#ead8af' },
  { title: 'The teacher’s shelf', script: 'Sulus', size: '5.4 MB', cover: '#d7bdb0' },
];

export type Notification = { title: string; body: string; type: string; time: string };
export const studentNotifications: Notification[] = [
  { title: 'Your Naskh result is ready', body: 'Foundation checkpoint passed. Your next level is unlocked.', type: 'Test result', time: 'Today' },
  { title: 'A new course is open', body: 'Qalam care & cutting has been added to the library.', type: 'New course', time: 'Yesterday' },
  { title: 'Guild challenge closes soon', body: 'Three days left to submit صبر.', type: 'Competition', time: '2 days ago' },
  { title: 'Monthly practice reminder', body: 'Your hand has been quiet for 4 days. Five minutes is enough.', type: 'Reminder', time: '4 days ago' },
  { title: 'Live event starting soon', body: 'Naskh clinic begins in 1 hour.', type: 'Live event', time: '5 days ago' },
];

export const teacherNotifications: Notification[] = [
  { title: 'New test entry to check', body: 'Amina Suleiman submitted Naskh · Murakkabāt Ex. 4.', type: 'New entry', time: 'Today' },
  { title: 'Monthly statistics', body: 'You reviewed 14 entries this month. Avg response: 28 hrs.', type: 'Statistics', time: 'Yesterday' },
  { title: 'Competition judging assigned', body: 'You are judging "The patient line". Deadline: 25 Sep.', type: 'Competition', time: '2 days ago' },
  { title: 'Pending entries reminder', body: '3 entries are still awaiting your review.', type: 'Reminder', time: '3 days ago' },
  { title: 'Certification pass recorded', body: 'You marked Maryam Raza’s Foundation pass. Award JHS merit points on the Jamea website.', type: 'Confirmation', time: '4 days ago' },
];

export type Asset = { title: string; script: Script; tags: string[]; author: string };
export const assets: Asset[] = [
  { title: 'Alif in six weights', script: 'Naskh', tags: ['alif', 'mufradat', 'weight'], author: 'Ustadh Ismail Khatri' },
  { title: 'Bā–tā join study', script: 'Naskh', tags: ['join', 'murakkabat', 'baseline'], author: 'Ustadha Amina Noor' },
  { title: 'Dome inscription draft', script: 'Sulus', tags: ['dome', 'inscription', 'monumental'], author: 'Ustadh Yusuf Qasim' },
  { title: 'Hanging baseline demo', script: 'Nastaaleeq', tags: ['baseline', 'hanging', 'persian'], author: 'Ustadh Ali Hassan' },
  { title: 'Qalam cutting guide', script: 'Naskh', tags: ['qalam', 'tool', 'cutting'], author: 'Ustadh Ismail Khatri' },
  { title: 'Composition grid', script: 'Sulus', tags: ['grid', 'composition', 'proportion'], author: 'Ustadha Zahra Abbas' },
];

export const encouragementQuotes = [
  'The hand learns by returning.',
  'Patience is the first letter.',
  'A quiet line speaks loudest.',
  'The reed remembers what the hand forgets.',
  'Beauty is proportion, repeated.',
];

export const levelNames = [
  'The round letters', 'Tall and angular letters', 'Mufradāt set one', 'Mufradāt set two',
  'Checkpoint · Foundation', 'Joining at the baseline', 'Mufradāt set three', 'Mufradāt set four',
  'Checkpoint · Composition', 'A complete short line',
];

export const secondaryCourses = [
  { title: 'Qalam care & cutting', desc: 'A practical guide to keeping your reed in conversation with the page.', progress: 34 },
  { title: 'Illuminated margins', desc: 'A visual study of proportion around the written word.', progress: 0 },
  { title: 'The geometry of Thuluth', desc: 'Find the monumental rhythm in your own compositions.', progress: 72 },
];

export const reviewHistory = [
  ['08 Sep', 'Naskh', 'Foundation', 'Pass'],
  ['06 Sep', 'Sulus', 'Composition', 'Needs revision'],
  ['04 Sep', 'Nastaaleeq', 'Foundation', 'Pass'],
  ['02 Sep', 'Naskh', 'Mufradāt', 'Pass'],
  ['31 Aug', 'Sulus', 'Mastery', 'Needs revision'],
] as const;

export const roleDefaultPage: Record<Role, string> = {
  student: 'student-landing',
  teacher: 'queue',
  coordinator: 'queue',
  admin: 'admin',
};
