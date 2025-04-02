
import { EventType } from "@/models/EventModel";

export interface CategoryWithEventTypes {
  name: string;
  eventTypes: EventType[];
}

export const eventCategoriesData: CategoryWithEventTypes[] = [
  {
    name: "Entertainment",
    eventTypes: [
      "Live Music Nights at Cafés or Cultural Hubs",
      "Stand-up Comedy and Satirical Shows",
      "Traditional Storytelling (Hakawati) Evenings",
      "Local Band Performances and Open Mics",
      "Dance Performances (Dabke, Contemporary)",
      "Cultural Film Screenings"
    ]
  },
  {
    name: "Festivals",
    eventTypes: [
      "Cultural Heritage Festivals",
      "Local Food and Craft Festivals",
      "Eid and Ramadan Souq Events",
      "Independence Day Celebrations",
      "Spring & Harvest Festivals",
      "Traditional Handicraft Weeks"
    ]
  },
  {
    name: "Nightlife",
    eventTypes: [
      "Live Oud or Oriental Music Nights",
      "Shisha Lounge DJ Nights",
      "Themed Dinner Parties",
      "Private Garden Gatherings",
      "Seasonal Rooftop Events"
    ]
  },
  {
    name: "Arts & Culture",
    eventTypes: [
      "Art Exhibitions",
      "Calligraphy and Pottery Workshops",
      "Photography Exhibitions",
      "Poetry Evenings and Book Readings",
      "Historic Building Tours",
      "Museum Nights"
    ]
  },
  {
    name: "Shopping",
    eventTypes: [
      "Old Souq Shopping Tours",
      "Local Brand Pop-ups",
      "Bazaars for Women Entrepreneurs",
      "Fashion Shows & Designer Events",
      "Traditional Product Markets"
    ]
  },
  {
    name: "Education & Business",
    eventTypes: [
      "University Seminars and Public Lectures",
      "Startup Networking Events",
      "Job Fairs for Graduates",
      "Tech and Digital Training Workshops",
      "Handicraft Skill Sessions",
      "Language Exchange Meetups"
    ]
  },
  {
    name: "Health & Wellness",
    eventTypes: [
      "Yoga and Meditation Sessions in Parks",
      "Herbal Wellness Retreats",
      "Women's Health Awareness Days",
      "Traditional Hammam Spa Days",
      "Self-Care and Mental Health Workshops"
    ]
  },
  {
    name: "Attractions & Tours",
    eventTypes: [
      "Historic Site Tours",
      "Old City Walking Tours",
      "Religious Site Visits",
      "Mountain Hikes",
      "Guided Souq & Market Experiences"
    ]
  },
  {
    name: "Family & Kids",
    eventTypes: [
      "Storytelling and Puppet Shows",
      "Kids' Arts & Crafts Days",
      "Outdoor Park Events",
      "Local Zoo or Farm Visits",
      "Interactive Museum Activities"
    ]
  },
  {
    name: "Sports",
    eventTypes: [
      "Football Matches",
      "Martial Arts Tournaments",
      "Fitness Competitions",
      "Cycling Tours in the City",
      "Community Sports Days"
    ]
  },
  {
    name: "Adventure",
    eventTypes: [
      "Hiking and Camping in Bloudan or Wadi Qandil",
      "Rock Climbing Adventures",
      "Paragliding in Coastal Mountains",
      "Horseback Riding in Rural Areas",
      "4x4 Desert Tours near Palmyra"
    ]
  },
  {
    name: "Instagrammable Spots",
    eventTypes: [
      "Panoramic Spots in Old Damascus",
      "Citadel Rooftop Views",
      "Village Garden Cafés",
      "Art Installations in Public Spaces",
      "Sunset Picnics in Valley or Coast"
    ]
  }
];

// Extract just the category names for when only names are needed
export const categoryNames = eventCategoriesData.map(category => category.name);

// Create a flattened list of all event types for when all types are needed
export const allEventTypes: EventType[] = eventCategoriesData.flatMap(category => category.eventTypes);
