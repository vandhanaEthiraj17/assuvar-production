'use client';

import { Card, CardContent } from "@/components/os/ui/Card";
import { StatusBadge } from "@/components/os/ui/StatusBadge";
import { MoreHorizontal, Plus, Calendar, Target } from "lucide-react";
import { Button } from "@/components/os/ui/Button";

interface Campaign {
    id: string;
    name: string;
    platform: string;
    budget: string;
    date: string;
}

interface Column {
    id: string;
    title: string;
    campaigns: Campaign[];
}

const initialData: Column[] = [
    {
        id: 'draft',
        title: 'Draft',
        campaigns: [
            { id: '1', name: 'Summer Promo', platform: 'Instagram', budget: '$500', date: 'TBD' },
            { id: '2', name: 'Email Blast Q1', platform: 'Email', budget: '$100', date: 'TBD' }
        ]
    },
    {
        id: 'active',
        title: 'Active',
        campaigns: [
            { id: '3', name: 'Brand Awareness', platform: 'Google Ads', budget: '$2,000/mo', date: 'Running' }
        ]
    },
    {
        id: 'completed',
        title: 'Completed',
        campaigns: [
            { id: '4', name: 'Black Friday', platform: 'Multi-channel', budget: '$5,000', date: 'Nov 2024' }
        ]
    }
];

export function CampaignBoard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full overflow-x-auto">
            {initialData.map((column) => (
                <div key={column.id} className="flex flex-col h-full min-w-[300px]">
                    <div className="flex items-center justify-between mb-4 px-2">
                        <h3 className="font-semibold text-structura-black flex items-center gap-2">
                            {column.title}
                            <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full">
                                {column.campaigns.length}
                            </span>
                        </h3>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-slate-200">
                            <Plus className="h-4 w-4 text-slate-500" />
                        </Button>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-3 flex-1 space-y-3">
                        {column.campaigns.map((campaign) => (
                            <Card key={campaign.id} className="shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white">
                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <StatusBadge status={campaign.platform} className="text-[10px] px-2 py-0.5" />
                                        <Button variant="ghost" size="sm" className="-mr-2 -mt-2 h-6 w-6 p-0">
                                            <MoreHorizontal className="h-4 w-4 text-slate-400" />
                                        </Button>
                                    </div>
                                    <h4 className="font-bold text-structura-black text-sm mb-3">{campaign.name}</h4>

                                    <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
                                        <div className="flex items-center gap-1">
                                            <Target className="h-3 w-3" />
                                            <span>{campaign.budget}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            <span>{campaign.date}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
