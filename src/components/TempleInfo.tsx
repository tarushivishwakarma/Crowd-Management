import React from 'react';
import { MapPin, Star, Clock, Users, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Language } from '../utils/translations';

interface TempleInfoProps {
  templeData: any;
  selectedTemple: string;
  language?: Language;
}

const TempleInfo: React.FC<TempleInfoProps> = ({ templeData, selectedTemple, language = 'en' }) => {
  const templeInfo = {
    somnath: {
      description: 'First among 12 Jyotirlingas, one of the most sacred temples of Lord Shiva. Located on the western coast of Gujarat, it has been destroyed and rebuilt multiple times throughout history, symbolizing the eternal nature of faith.',
      significance: 'Lord Shiva - First Jyotirlinga',
      bestTime: 'October to March',
      color: 'from-blue-500 to-blue-600',
      icon: '🔱',
      image: 'https://images.unsplash.com/photo-1735192683809-3fcd83233e19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTb21uYXRoJTIwdGVtcGxlJTIwR3VqYXJhdCUyMEluZGlhfGVufDF8fHx8MTc1OTUxOTk5NXww&ixlib=rb-4.1.0&q=80&w=1080',
      specialFeatures: ['First Jyotirlinga', 'Oceanfront Location', 'Sound & Light Show', 'Ancient Architecture']
    },
    dwarka: {
      description: 'The legendary city of Lord Krishna, one of the Char Dham pilgrimage sites. This ancient city is believed to be Krishna\'s kingdom and is mentioned in various Hindu scriptures including the Mahabharata.',
      significance: 'Lord Krishna - Char Dham',
      bestTime: 'October to April',
      color: 'from-yellow-500 to-orange-500',
      icon: '🦚',
      image: 'https://images.unsplash.com/photo-1711547979445-a72c87dfd004?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEd2Fya2ElMjB0ZW1wbGUlMjBLcmlzaG5hJTIwR3VqYXJhdHxlbnwxfHx8fDE3NTk1MTk5OTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      specialFeatures: ['Char Dham Site', 'Krishna\'s Kingdom', 'Gomti River', 'Archaeological Wonders']
    },
    ambaji: {
      description: 'One of the 51 Shakti Peethas dedicated to Goddess Amba. Located in the Arasur hills near the Gujarat-Rajasthan border, it is believed that the heart of Sati fell here according to Hindu mythology.',
      significance: 'Goddess Amba - Shakti Peetha',
      bestTime: 'September to March',
      color: 'from-red-500 to-pink-500',
      icon: '🌺',
      image: 'https://images.unsplash.com/photo-1652706698193-2cf5d8056afa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBbWJhamklMjB0ZW1wbGUlMjBHdWphcmF0JTIwTWF0YXxlbnwxfHx8fDE3NTk1MjAwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      specialFeatures: ['Shakti Peetha', 'Gabbar Hill Trek', 'Marble Architecture', 'Sacred Vishwa Kalash']
    },
    pavagadh: {
      description: 'Perched atop Pavagadh hill, this UNESCO World Heritage site temple is dedicated to Goddess Kalika. The temple is accessible via ropeway and offers stunning panoramic views of the surrounding landscape.',
      significance: 'Goddess Kalika - UNESCO Heritage',
      bestTime: 'October to February',
      color: 'from-green-500 to-emerald-500',
      icon: '⛰️',
      image: 'https://images.unsplash.com/photo-1652706698193-2cf5d8056afa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQYXZhZ2FkaCUyMHRlbXBsZSUyMEthbGlrYSUyME1hdGElMjBHdWphcmF0fGVufDF8fHx8MTc1OTUyMDAwM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      specialFeatures: ['UNESCO Heritage Site', 'Ropeway Access', 'Panoramic Views', 'Historic Champaner']
    }
  };

  const temple = templeData[selectedTemple];
  const info = templeInfo[selectedTemple];
  
  if (!temple || !info) return null;

  const totalCrowd = Object.values(temple.zones).reduce((sum, zone) => sum + zone.density, 0) / 4;

  return (
    <Card className="overflow-hidden">
      <div className="relative h-64 overflow-hidden">
        <ImageWithFallback
          src={info.image}
          alt={temple.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{info.icon}</span>
            <div>
              <h2 className="text-2xl font-bold">{temple.name}</h2>
              <p className="text-lg text-gray-200">{temple.location}</p>
            </div>
          </div>
        </div>
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${info.color}`}></div>
      </div>

      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="flex items-center gap-2 mb-3">
              <Info className="h-5 w-5 text-primary" />
              About This Sacred Place
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              {info.description}
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="font-medium">{info.significance}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <span>Best Visit Time: {info.bestTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-green-500" />
                <span>Current Crowd Level: {Math.round(totalCrowd)}%</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-red-500" />
                <span>{Object.keys(temple.zones).length} Darshan Zones Available</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-3">Special Features</h3>
            <div className="grid grid-cols-2 gap-2">
              {info.specialFeatures.map((feature, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="justify-center p-2 text-xs"
                >
                  {feature}
                </Badge>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="mb-3">Zone-wise Status</h3>
              <div className="space-y-2">
                {Object.entries(temple.zones).map(([zoneKey, zone]) => (
                  <div key={zoneKey} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">{zone.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600">{zone.waitTime}</span>
                      <Badge 
                        variant={zone.status === 'critical' ? 'destructive' : 
                               zone.status === 'high' ? 'default' : 
                               zone.status === 'moderate' ? 'secondary' : 'outline'}
                        className="text-xs"
                      >
                        {zone.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TempleInfo;