import { Mail, Phone, Calendar, ArrowRight, UserPlus, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface Activity {
    id: string;
    type: 'email' | 'call' | 'meeting' | 'status_change' | 'note' | 'created';
    title: string;
    description?: string;
    date: string;
    user: string;
}

const icons = {
    email: Mail,
    call: Phone,
    meeting: Calendar,
    status_change: ArrowRight,
    note: FileText,
    created: UserPlus
};

const colors = {
    email: "bg-blue-100 text-blue-600",
    call: "bg-green-100 text-green-600",
    meeting: "bg-purple-100 text-purple-600",
    status_change: "bg-amber-100 text-amber-600",
    note: "bg-slate-100 text-slate-600",
    created: "bg-indigo-100 text-indigo-600"
};

export function LeadActivityLog({ activities }: { activities: Activity[] }) {
    return (
        <div className="space-y-6">
            {activities.map((activity) => {
                const Icon = icons[activity.type] || FileText;
                const colorClass = colors[activity.type] || colors.note;

                return (
                    <div key={activity.id} className="flex gap-4">
                        <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg", colorClass)}>
                            <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-structura-black">
                                    {activity.title} <span className="font-normal text-slate-500">by {activity.user}</span>
                                </p>
                                <span className="text-xs text-slate-400">{activity.date}</span>
                            </div>
                            {activity.description && (
                                <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 mt-2">
                                    {activity.description}
                                </p>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
