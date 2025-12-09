'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter, localeNames, locales } from '@/src/i18n/navigation';
import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLocaleChange = (newLocale: string) => {
        setIsOpen(false);
        router.replace(pathname, { locale: newLocale });
    };

    const getDisplayNames = (loc: string) => {
        const fullName = localeNames[loc] || loc;
        // Parse 'Language (Country)' format
        const match = fullName.match(/^(.*?) \((.*)\)$/);

        if (match) {
            const [, language, country] = match;
            return {
                country: country,
                full: `${country} (${language})`,
                language: language
            };
        }

        return {
            country: fullName,
            full: fullName,
            language: ''
        };
    };

    const currentDisplay = getDisplayNames(locale);

    return (
        <div className="relative z-50" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium text-gray-700 hover:text-black transition-colors rounded-md hover:bg-gray-100"
                aria-label="Select Language"
            >
                <Globe className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{currentDisplay.country}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl max-h-[60vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-1 space-y-0.5">
                        {locales.map((l) => {
                            const display = getDisplayNames(l);
                            return (
                                <button
                                    key={l}
                                    onClick={() => handleLocaleChange(l)}
                                    className={`w-full text-left px-3 py-2 text-xs rounded-md flex items-center justify-between group transition-colors
                      ${locale === l ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}
                    `}
                                >
                                    <span className="font-medium">{display.full}</span>
                                    {locale === l && <Check className="w-3 h-3" />}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
