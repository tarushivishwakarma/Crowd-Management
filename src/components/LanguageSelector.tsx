/**
 * Language Selector Component
 * Allows users to switch between English, Hindi, and Gujarati
 */
import React from 'react';
import { Languages } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Language } from '../utils/translations';

interface LanguageSelectorProps {
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showLabel?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  variant = 'ghost', 
  size = 'default',
  showLabel = false 
}) => {
  // Static language data since we don't have context anymore
  const [language, setLanguage] = React.useState<Language>('en');
  const languages = [
    { code: 'en' as Language, name: 'English', nativeName: 'English' },
    { code: 'hi' as Language, name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'gu' as Language, name: 'Gujarati', nativeName: 'ગુજરાતી' },
  ];
  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className="flex items-center gap-2">
          <Languages className="w-4 h-4" />
          {showLabel && (
            <span className="hidden sm:inline">
              Language
            </span>
          )}
          <span className="font-medium">
            {currentLanguage?.nativeName || 'EN'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center justify-between ${
              language === lang.code ? 'bg-accent' : ''
            }`}
          >
            <span>{lang.nativeName}</span>
            <span className="text-sm text-muted-foreground">{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;