
import React from 'react';
import StandardLayout from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Ticket, Star, ArrowUpRight } from 'lucide-react';

const EventsAttractions = () => {
  const demoEvents = [
    {
      id: 1,
      title: "Dubai Shopping Festival",
      description: "Annual event featuring discounts, entertainment, and activities across Dubai.",
      date: "Jan 15 - Feb 29, 2024",
      location: "Dubai, UAE",
      image: "/lovable-uploads/37575151-7391-42fc-ad6c-deea51f3e4b2.png",
      category: "Shopping",
      rating: 4.8
    },
    {
      id: 2,
      title: "Syrian Cultural Festival",
      description: "A celebration of Syrian culture, cuisine, music and traditions.",
      date: "Mar 10 - Mar 15, 2024",
      location: "Damascus, Syria",
      image: "/lovable-uploads/37575151-7391-42fc-ad6c-deea51f3e4b2.png",
      category: "Cultural",
      rating: 4.7
    },
    {
      id: 3,
      title: "Burj Khalifa Tour",
      description: "Visit the world's tallest building with panoramic views of Dubai.",
      date: "Available daily",
      location: "Dubai, UAE",
      image: "/lovable-uploads/37575151-7391-42fc-ad6c-deea51f3e4b2.png",
      category: "Attraction",
      rating: 4.9
    },
    {
      id: 4,
      title: "Desert Safari Adventure",
      description: "Experience dune bashing, camel riding and traditional entertainment.",
      date: "Available daily",
      location: "Dubai Desert, UAE",
      image: "/lovable-uploads/37575151-7391-42fc-ad6c-deea51f3e4b2.png",
      category: "Adventure",
      rating: 4.6
    }
  ];

  return (
    <StandardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events & Attractions</h1>
          <p className="text-muted-foreground mt-2">
            Discover and manage events and attractions for your travelers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {demoEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
                <div className="absolute top-3 right-3 bg-black/70 text-white py-1 px-2 rounded text-xs font-medium">
                  {event.category}
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{event.title}</CardTitle>
                <CardDescription className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span>{event.rating} rating</span>
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-2 pb-2">
                <p className="text-sm text-muted-foreground">{event.description}</p>
                <div className="flex flex-col gap-1 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" className="gap-1">
                  <Ticket className="h-4 w-4" />
                  Book Now
                </Button>
                <Button variant="ghost" size="sm" className="gap-1">
                  Details
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Button className="mt-4">
          Add New Event
        </Button>
      </div>
    </StandardLayout>
  );
};

export default EventsAttractions;
