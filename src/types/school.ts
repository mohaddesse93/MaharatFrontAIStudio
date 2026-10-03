export interface Teacher {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio?: string;
  education?: string;
  socials: Array<{
    telegram?: string;
    instagram?: string;
    linkedin?: string;
  }>;
}

export interface Workshop {
  id: string;
  title: string;
  description: string;
  icon: string; // 'Palette' | 'FlaskConical' | 'Code2' | 'Hammer' | etc.
  color: string;
  bgColor: string;
  hours?: string;
  ageGroup?: string;
  skillsTaught?: string[];
}

export interface SchoolInfo {
  name: string;
  tagline: string;
  description: string;
  foundedYear?: string;
  mission?: string;
  vision?: string;
}

export interface PhoneNumberItem {
  id: string;
  label: string;
  number: string;
}

export interface SocialLinkItem {
  id: string;
  platform: 'instagram' | 'telegram' | 'eitaa' | 'bale' | string;
  title: string;
  url: string;
}

export interface FooterInfo {
  phone: string;
  phone2?: string;
  phone3?: string;
  email: string;
  address: string;
  workingHours: string;
  workingHoursLabel: string;
  phoneNumbers: PhoneNumberItem[];
  socialLinks: SocialLinkItem[];
}

export interface Event {
  id: number | string;
  title: string;
  dateFa: string;
  image: string;
  category: string;
  description: string;
  highlights: string[];
}

export interface GeneralSettings {
  schoolName: string;
  heroBadge: string;
  heroHeadlinePrefix: string;
  heroHeadlineHighlight1: string;
  heroHeadlineMiddle: string;
  heroHeadlineHighlight2: string;
  heroSubtitle: string;
  studentsCount: string;
  studentsLabel: string;
  teachersCount: string;
  teachersLabel: string;
  experienceCount: string;
  experienceLabel: string;
}
