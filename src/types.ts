export interface StudentRegistration {
  id: string;
  childName: string;
  childAge: number;
  gender: 'Boy' | 'Girl';
  parentName: string;
  phone: string;
  email?: string;
  preferredDay: 'Monday' | 'Wednesday' | 'Friday' | 'Any Day';
  preferredTime: string;
  location: string;
  experienceLevel: 'Beginner (No experience)' | 'Basic School Level' | 'Intermediate' | 'Played in Academy';
  notes?: string;
  status: 'New' | 'Contacted' | 'Trial Scheduled' | 'Attended' | 'Enrolled' | 'Cancelled';
  createdAt: string;
}

export interface AcademySettings {
  name: string;
  tagline: string;
  subTagline: string;
  ageGroup: string;
  coachingDays: string;
  coachingTime: string;
  venueName: string;
  venueLocation: string;
  contactNumber: string;
  secondaryContactNumber?: string;
  whatsappNumber: string;
}
export interface AcademyPhotos {
  heroPhoto: string;
  makeFriendsPhoto: string;
  improveSkillsPhoto: string;
  playMatchesPhoto: string;
}
