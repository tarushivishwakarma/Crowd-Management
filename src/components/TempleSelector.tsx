import React from 'react';
import { MapPin, Star, Clock, Users } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Language, getTranslation, getTempleTranslation } from '../utils/translations';

interface TempleSelectorProps {
  templeData: any;
  selectedTemple: string;
  onTempleChange: (temple: string) => void;
  language?: Language;
}

const TempleSelector: React.FC<TempleSelectorProps> = ({ templeData, selectedTemple, onTempleChange, language = 'en' }) => {
  const t = (key: string) => getTranslation(language, key);
  const templeInfo = {
    somnath: {
      description: 'First among 12 Jyotirlingas, one of the most sacred temples of Lord Shiva. Located on the western coast of Gujarat, it has been destroyed and rebuilt multiple times throughout history.',
      shortDesc: 'First Jyotirlinga of Lord Shiva',
      significance: 'Lord Shiva',
      bestTime: 'Oct-Mar',
      color: 'from-blue-500 to-blue-600',
      icon: '🔱',
      image: 'https://images.unsplash.com/photo-1735192683809-3fcd83233e19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTb21uYXRoJTIwdGVtcGxlJTIwR3VqYXJhdCUyMEluZGlhfGVufDF8fHx8MTc1OTUxOTk5NXww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    dwarka: {
      description: 'The legendary city of Lord Krishna, one of the Char Dham pilgrimage sites. This ancient city is believed to be Krishna\'s kingdom and is mentioned in various Hindu scriptures.',
      shortDesc: 'Krishna\'s sacred kingdom - Char Dham',
      significance: 'Lord Krishna',
      bestTime: 'Oct-Apr',
      color: 'from-yellow-500 to-orange-500',
      icon: '🦚',
      image: 'https://images.unsplash.com/photo-1711547979445-a72c87dfd004?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEd2Fya2ElMjB0ZW1wbGUlMjBLcmlzaG5hJTIwR3VqYXJhdHxlbnwxfHx8fDE3NTk1MTk5OTh8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    ambaji: {
      description: 'One of the 51 Shakti Peethas dedicated to Goddess Amba. Located in the Arasur hills near the Gujarat-Rajasthan border, it is believed that the heart of Sati fell here.',
      shortDesc: 'Sacred Shakti Peetha of Mata Amba',
      significance: 'Goddess Amba',
      bestTime: 'Sep-Mar',
      color: 'from-red-500 to-pink-500',
      icon: '🌺',
      image: 'https://images.unsplash.com/photo-1652706698193-2cf5d8056afa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBbWJhamklMjB0ZW1wbGUlMjBHdWphcmF0JTIwTWF0YXxlbnwxfHx8fDE3NTk1MjAwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    pavagadh: {
      description: 'Perched atop Pavagadh hill, this UNESCO World Heritage site temple is dedicated to Goddess Kalika. The temple is accessible via ropeway and offers stunning panoramic views.',
      shortDesc: 'Hilltop Kalika Mata Temple - UNESCO Site',
      significance: 'Goddess Kalika',
      bestTime: 'Oct-Feb',
      color: 'from-green-500 to-emerald-500',
      icon: '⛰️',
      image: 'https://images.unsplash.com/photo-1652706698193-2cf5d8056afa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQYXZhZ2FkaCUyMHRlbXBsZSUyMEthbGlrYSUyME1hdGElMjBHdWphcmF0fGVufDF8fHx8MTc1OTUyMDAwM3ww&ixlib=rb-4.1.0&q=80&w=1080'
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="h-5 w-5 text-orange-500" />
        <h3 className="font-medium">{t('booking.selectTemple')}</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {Object.entries(templeData).map(([key, temple]) => {
          const info = templeInfo[key];
          const isSelected = selectedTemple === key;
          const totalCrowd = Object.values(temple.zones).reduce((sum, zone) => sum + zone.density, 0) / 4;
          
          return (
            <Card
              key={key}
              className={`cursor-pointer transition-all duration-200 overflow-hidden ${
                isSelected 
                  ? 'ring-2 ring-orange-500 shadow-lg scale-105' 
                  : 'hover:shadow-md hover:scale-102'
              }`}
              onClick={() => onTempleChange(key)}
            >
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={info.image}
                  alt={temple.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{info.icon}</span>
                    <h4 className="font-medium">{getTempleTranslation(language, key)}</h4>
                  </div>
                  <p className="text-sm text-gray-200">{temple.location}</p>
                </div>
                {isSelected && (
                  <Badge className="absolute top-3 right-3 bg-orange-500 text-white">
                    {language === 'hi' ? 'चयनित' : language === 'gu' ? 'પસંદ કરેલ' : 'Selected'}
                  </Badge>
                )}
              </div>
              
              <CardContent className="p-4">
                <div className={`w-full h-2 rounded-full bg-gradient-to-r ${info.color} mb-3`}></div>
                
                <p className="text-sm text-gray-700 mb-3 line-clamp-2">{info.shortDesc}</p>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500" />
                    <span>{info.significance}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-blue-500" />
                    <span>{info.bestTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-green-500" />
                    <span>{Math.round(totalCrowd)}% Crowd</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-red-500" />
                    <span>{Object.keys(temple.zones).length} Zones</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TempleSelector;