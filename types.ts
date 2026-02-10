export interface Project {
  id: number;
  title: string;
  category: string;
  categoryColorClass: string; // e.g., "text-indigo-400 bg-indigo-900/50"
  description: string;
  shortDesc: string; // For the card view
  role: string;
  tools: string;
  contribution: number;
  tags: string[];
  solutions: string[]; // HTML strings allowed for bolding
  thumbnail: string;
  beforeImg: string;
  afterImg: string;
  galleryImages: string[];
  galleryColorClass: string; // e.g. "text-indigo-500"
}