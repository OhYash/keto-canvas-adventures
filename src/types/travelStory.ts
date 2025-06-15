
export interface TravelStory {
  id: string;
  title: string;
  location: string;
  country: string;
  date: string;
  duration: string;
  description: string;
  highlights: string[];
  image: string;
  fullStory?: string;
  gallery?: string[];
}
