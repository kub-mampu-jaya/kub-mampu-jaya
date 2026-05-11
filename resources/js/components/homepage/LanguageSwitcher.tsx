import { Globe } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';
import { useLanguage } from './LanguageContext';

const languages = {
    en: { name: 'English', flag: '🇺🇸' },
    tr: { name: 'Türkçe', flag: '🇹🇷' },
    de: { name: 'Deutsch', flag: '🇩🇪' },
};

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <Select
            value={language}
            onValueChange={(value: 'en' | 'tr' | 'de') => setLanguage(value)}
        >
            <SelectTrigger className="w-auto border-none bg-transparent transition-colors hover:bg-gray-100">
                <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4" />
                    <span className="hidden sm:inline">
                        {languages[language].flag}
                    </span>
                    <span className="hidden md:inline">
                        {languages[language].name}
                    </span>
                </div>
            </SelectTrigger>
            <SelectContent>
                {Object.entries(languages).map(([code, lang]) => (
                    <SelectItem
                        key={code}
                        value={code}
                        className="cursor-pointer"
                    >
                        <div className="flex items-center space-x-2">
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
