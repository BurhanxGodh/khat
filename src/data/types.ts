export type Script = 'Naskh' | 'Sulus' | 'Nastaaleeq';
export type Role = 'student' | 'teacher' | 'coordinator' | 'admin';
export type Page = string;

export type KhatType = {
  name: string;
  arabic: string;
  color: string;
  soft: string;
  desc: string;
  tagline: string;
};

export type LevelType = 'practice' | 'checkpoint';

export type CourseLevel = {
  id: number;
  name: string;
  type: LevelType;
  exercises?: number;
  locked?: boolean;
  complete?: boolean;
  current?: boolean;
};
