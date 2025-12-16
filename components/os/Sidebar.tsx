'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    Briefcase,
    DollarSign,
    FileText,
    CreditCard,
    ShieldCheck,
    Megaphone,
    BookOpen,
    Settings,
    LogOut,
    LucideIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { NavigationItem } from '@/config/navigation';

interface SidebarProps {
    items: NavigationItem[];
}

const iconMap: Record<string, LucideIcon> = {
    LayoutDashboard,
    Users,
    Briefcase,
    DollarSign,
    FileText,
    CreditCard,
    ShieldCheck,
    Megaphone,
    BookOpen,
    Settings
};

export default function Sidebar({ items }: SidebarProps) {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-64 flex-col border-r border-structura-border bg-white">
            {/* Branding */}
            <div className="flex h-16 items-center gap-2 px-6 border-b border-structura-border">
                <div className="w-8 h-8 flex items-center justify-center">
                    <Image
                        src="/assets/logo.svg"
                        alt="Assuvar Logo"
                        width={32}
                        height={32}
                        className="w-full h-full object-contain"
                    />
                </div>
                <span className="text-xl font-bold font-display text-structura-black tracking-tight">Assuvar OS</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                {items.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                    const Icon = iconMap[item.icon] || LayoutDashboard; // Fallback icon

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                                isActive
                                    ? 'bg-structura-blue/10 text-structura-blue'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-structura-black'
                            )}
                        >
                            <Icon className={cn("h-5 w-5", isActive ? "text-structura-blue" : "text-slate-500 group-hover:text-structura-black")} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* User / Logout */}
            <div className="border-t border-structura-border p-4">
                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-red-600 transition-colors">
                    <LogOut className="h-5 w-5" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
