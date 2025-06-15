
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Calendar, Clock, Camera } from 'lucide-react';

interface TravelStory {
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

interface DetailedStoryViewProps {
  story: TravelStory;
  onBack: () => void;
  gradient: string;
}

const DetailedStoryView: React.FC<DetailedStoryViewProps> = ({
  story,
  onBack,
  gradient,
}) => {
  const defaultGallery = [
    'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&h=600&fit=crop'
  ];

  const getFullStory = (storyId: string) => {
    const stories: { [key: string]: string } = {
      'japan-2023': `My journey to Japan during cherry blossom season was nothing short of magical. Landing in Tokyo, I was immediately struck by the incredible blend of ultra-modern technology and ancient traditions coexisting in perfect harmony.

The first few days were spent exploring Tokyo's bustling districts. Shibuya Crossing at rush hour was an experience unlike any other - watching thousands of people cross in perfect choreographed chaos while neon signs blazed overhead. I spent hours in Harajuku, witnessing the incredible street fashion and youth culture that makes Tokyo so unique.

But it was in the quieter moments that Japan truly captured my heart. Early morning visits to Senso-ji Temple, watching elderly locals perform their daily prayers while cherry blossoms fell like snow around them. The precision and artistry of a traditional tea ceremony in Kyoto, where every movement had meaning and centuries of tradition behind it.

The food was a revelation. From the freshest sushi at Tsukiji Market to steaming bowls of ramen in tiny hole-in-the-wall shops, every meal was an adventure. I'll never forget the perfectly crafted kaiseki dinner at a traditional ryokan in Kyoto, where each dish was a work of art celebrating the season.

TeamLab Borderless was like stepping into a digital dream world, where art and technology merged to create something entirely new. Walking through rooms where digital butterflies landed on your shoulders and waterfalls flowed around your feet was surreal and beautiful.

The cherry blossoms were at their peak during my visit, turning every park and temple ground into a pink paradise. Hanami parties under the blooming trees, with families and friends sharing food and laughter, showed me the Japanese appreciation for life's fleeting beautiful moments.`,

      'iceland-2022': `Iceland in September offered the perfect combination of dramatic landscapes and the possibility of Northern Lights. The Ring Road became my pathway to discovery, leading me through some of the most otherworldly scenery I've ever witnessed.

The power of Gullfoss waterfall was humbling - standing at the viewing platform, feeling the mist on my face while watching thousands of gallons of water thunder into the canyon below. The sound was deafening, primal, reminding me of nature's incredible force.

Driving through the Highlands felt like traveling through an alien landscape. Black volcanic sand stretched endlessly, broken by moss-covered lava fields that glowed green in the ethereal light. The contrast was stark and beautiful.

The Blue Lagoon was touristy but magical nonetheless. Floating in the milky blue geothermal waters while snowflakes fell around me was surreal. The silica mud mask tradition felt like participating in some ancient ritual of renewal.

But it was the Northern Lights that made this trip unforgettable. On my fourth night, after several cloudy evenings, the sky exploded in green dancing curtains. I stood in a field outside Reykjavik at 2 AM, tears freezing on my cheeks, watching nature's greatest light show perform just for me.

The Icelandic people were incredibly welcoming, sharing stories of their land with pride and humor. Hot springs became social gathering spots where strangers became friends over shared wonder at their country's natural beauty.

Every day brought new geological wonders - from the dramatic black sand beaches of Reynisfjara with their towering basalt columns to the geothermal fields where the earth literally steamed and bubbled beneath my feet.`,

      'peru-2021': `The Inca Trail to Machu Picchu was more than just a hike - it was a journey through time, connecting me to the incredible civilization that once ruled these mountains.

Starting in Cusco, already at 11,000 feet, was a challenge. The altitude hit me hard the first day, reminding me that these ancient paths weren't built for comfort. But as my body adjusted, I began to appreciate the profound connection between the Incas and their mountainous homeland.

The trail itself was a masterpiece of engineering. Stone steps carved into near-vertical mountainsides, perfectly fitted without mortar, still solid after 500 years. Each step was taken by countless indigenous feet over centuries, creating a path worn smooth by time and reverence.

Dead Woman's Pass at 13,800 feet tested every ounce of determination I had. The thin air made every breath precious, every step deliberate. But reaching the top and seeing the Andes stretch endlessly in every direction was worth every gasping breath.

The Sacred Valley revealed terraced hillsides that looked like green staircases for giants. Watching sunrise paint these ancient agricultural marvels in golden light while llamas grazed peacefully nearby felt like stepping into a living postcard.

When Machu Picchu finally revealed itself through the Sun Gate at dawn, I understood why it's called one of the world's wonders. The lost city emerged from morning mist like something from a dream, perfectly preserved and impossibly beautiful.

Local Quechua guides shared stories passed down through generations, making the stones come alive with history. Their pride in their ancestors' achievements was infectious and deeply moving.

The food was a revelation - quinoa and potatoes prepared in ways I'd never imagined, coca tea that made the altitude bearable, and ceviche so fresh it tasted like the ocean itself.`,

      'thailand-2020': `Thailand welcomed me with warm smiles, incredible food, and a pace of life that immediately slowed my Western rush. From the chaos of Bangkok to the pristine beaches of the islands, every day brought new sensory experiences.

Bangkok's floating markets were a feast for all senses. Vendors paddling their boats loaded with tropical fruits, the air thick with the aroma of pad thai cooking over tiny boat-mounted stoves, the gentle splash of oars in the canal water. Bargaining became an art form and social interaction.

The Grand Palace was overwhelming in its ornate beauty. Every surface seemed covered in gold, intricate mosaics, or detailed carvings. The Emerald Buddha, though small, commanded absolute reverence from the steady stream of Buddhist pilgrims.

But it was the street food that truly captured my heart. Sitting on tiny plastic stools at 2 AM, slurping the most incredible tom yum soup from a cart that appeared like magic on a quiet street corner. The perfect balance of sour, spicy, sweet, and salty in every dish was a revelation.

The islands offered a different kind of magic. Phi Phi Island's Maya Bay was like swimming in a postcard, though sadly crowded with tourists. But finding hidden coves accessible only by kayak, where the water was so clear you could see tropical fish swimming thirty feet below, felt like discovering secret paradise.

Thai massage was initially intimidating but became a daily ritual. The combination of stretching, pressure points, and meditation left me feeling like a new person each time.

The Buddhist temples weren't just tourist stops but active centers of community life. Watching monks collect alms at dawn, participating in evening chanting sessions, learning about Buddhism from genuinely peaceful practitioners - these experiences added spiritual depth to the physical beauty.

Night markets became my favorite social spaces, where language barriers dissolved over shared appreciation for incredible food and genuine human warmth.`,

      'morocco-2019': `Morocco assaulted my senses in the most beautiful way possible. From the moment I stepped off the plane in Marrakech, the country wrapped me in its exotic embrace of sights, sounds, smells, and tastes unlike anywhere I'd ever been.

Jemaa el-Fnaa square was pure sensory overload. Snake charmers, henna artists, storytellers, musicians, and food vendors all competing for attention while the call to prayer echoed from multiple minarets. The energy was intoxicating and slightly overwhelming.

Navigating the medina's narrow alleyways was like entering a living maze. Getting lost became part of the adventure, leading to discoveries of hidden riads, tiny workshops where artisans created beautiful pottery and textiles, and perfect little cafes serving mint tea so sweet it could restore your soul.

The Atlas Mountains offered breathtaking contrast to the desert heat. Berber villages clinging to mountainsides, terraced gardens defying the harsh landscape, and the warm hospitality of mountain people who invited this stranger to share their tajine and stories.

But the Sahara Desert was the crown jewel of the experience. Riding camels at sunset across endless dunes, the only sounds being the wind and the soft padding of camel feet in sand. When night fell, the sky exploded with more stars than I knew existed, the Milky Way so bright it cast shadows.

Sleeping in a Berber tent under that incredible sky, waking to sunrise painting the dunes gold and orange, sharing breakfast tea with my guides while discussing life and philosophy - these moments felt like gifts from the universe.

The food was a constant source of joy. Tajines slow-cooked to perfection, fresh bread baked in communal ovens, olives and dates that tasted like sunshine, and pastries so delicate they seemed too beautiful to eat.

Fez's ancient medina felt like traveling back in time. The tanneries, with their rainbow-colored dye vats, created leather using methods unchanged for centuries. The noise, the smells, the incredible craftsmanship - it was overwhelming and magnificent.`,

      'norway-2019': `Norway in June revealed a land of dramatic contrasts - towering fjords, charming fishing villages, and the surreal experience of the midnight sun that never quite sets.

Bergen's colorful waterfront, with its UNESCO-listed Bryggen district, was the perfect introduction to Norwegian charm. Wooden houses painted in brilliant reds, yellows, and blues reflected in the harbor, while fish markets sold the day's catch with pride and humor.

The fjords were beyond spectacular. Sailing through Geirangerfjord felt like traveling through a fairy tale landscape. Waterfalls cascaded from impossible heights, their mist creating rainbows in the midnight sun. The Seven Sisters waterfall was particularly magical, each cascade seeming to dance with its neighbors.

Lofoten Islands were the highlight of the journey. Fishing villages perched on stilts over crystal-clear waters, surrounded by dramatic peaks that rose directly from the sea. Reine and Henningsvær felt like postcards come to life, too perfect to be real.

The midnight sun was a phenomenon that took days to truly appreciate. At first, the constant daylight was disorienting, disrupting my sleep patterns and sense of time. But gradually, I learned to embrace the endless golden hour, hiking at 2 AM under light that photographers would kill for.

Hiking to Preikestolen (Pulpit Rock) was both terrifying and exhilarating. Standing on the flat-topped cliff 600 meters above Lysefjord, with no safety barriers, was one of those moments that make you feel simultaneously insignificant and invincible.

Norwegian hospitality was warm despite the reserved exterior. Locals shared their love for the outdoors, taught me about foraging for berries and mushrooms, and explained their deep connection to nature that shapes Norwegian culture.

The food was a revelation - far beyond the stereotypes. Fresh seafood prepared simply to let the ingredients shine, cloudberries that tasted like sunshine, and reindeer that was surprisingly delicious when prepared with local herbs and berries.

Each day brought new natural wonders, from the dramatic coastline to peaceful inland valleys where traditional stave churches stood like ancient guardians of Norwegian heritage.`
    };

    return stories[storyId] || story.description;
  };

  return (
    <div className="animate-slide-in-right w-full h-full">
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={onBack}
          variant="outline"
          size="sm"
          className="bg-white/90 hover:bg-white border-slate-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Stories
        </Button>
        <div className="text-3xl">{story.image}</div>
      </div>

      <div className="space-y-6">
        {/* Story Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {story.title}
          </h2>
          <div className="flex items-center justify-center gap-4 mb-4 text-sm text-slate-600">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{story.location}, {story.country}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{story.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{story.duration}</span>
            </div>
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="bg-white/80 rounded-xl p-4 border border-slate-300/50">
          <div className="flex items-center gap-2 mb-3">
            <Camera className="w-4 h-4 text-slate-600" />
            <h3 className="font-semibold text-slate-800">Photo Gallery</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {(story.gallery || defaultGallery).slice(0, 4).map((photo, index) => (
              <div
                key={index}
                className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg overflow-hidden group cursor-pointer"
              >
                <img
                  src={photo}
                  alt={`${story.title} photo ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-slate-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full Story */}
        <div className="bg-white/80 rounded-xl p-4 border border-slate-300/50">
          <h3 className="font-semibold text-slate-800 mb-3">The Full Story</h3>
          <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed">
            {getFullStory(story.id).split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div className="bg-white/80 rounded-xl p-4 border border-slate-300/50">
          <h3 className="font-semibold text-slate-800 mb-3">Trip Highlights</h3>
          <div className="flex flex-wrap gap-2">
            {story.highlights.map((highlight, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-slate-800 text-white hover:bg-slate-700"
              >
                {highlight}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedStoryView;
