import { Check, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaymentMilestone {
    label: string;
    amount: string;
    dueDate: string;
    status: 'paid' | 'pending' | 'overdue' | 'future';
    paidDate?: string;
}

export function PaymentTimeline({ milestones }: { milestones: PaymentMilestone[] }) {
    return (
        <div className="space-y-6">
            <div className="relative">
                {/* Vertical Bar */}
                <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-slate-100" />

                {milestones.map((milestone, index) => {
                    const statusStyles = {
                        paid: "bg-green-100 border-green-200 text-green-700",
                        pending: "bg-amber-50 border-amber-200 text-amber-700",
                        overdue: "bg-red-100 border-red-200 text-red-700",
                        future: "bg-white border-slate-200 text-slate-400"
                    };

                    const icons = {
                        paid: Check,
                        pending: Clock,
                        overdue: AlertCircle,
                        future: Clock
                    };

                    const Icon = icons[milestone.status];

                    return (
                        <div key={index} className="relative flex gap-4 items-start mb-6 last:mb-0">
                            <div className={cn(
                                "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2",
                                milestone.status === 'paid' ? "bg-structura-blue border-structura-blue text-white" : "bg-white border-slate-200"
                            )}>
                                <Icon className={cn("h-5 w-5", milestone.status === 'paid' ? "text-white" : "text-slate-400")} />
                            </div>

                            <div className="flex-1 bg-white rounded-lg border border-structura-border p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <h4 className="font-semibold text-structura-black">{milestone.label}</h4>
                                        <p className="text-sm text-slate-500">Due: {milestone.dueDate}</p>
                                    </div>
                                    <span className="text-lg font-bold text-structura-black">{milestone.amount}</span>
                                </div>

                                <span className={cn(
                                    "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wide",
                                    statusStyles[milestone.status].split(' ').slice(0, 3).join(' ') // Helper to grab bg/text colors
                                )}>
                                    {milestone.status}
                                </span>

                                {milestone.status === 'paid' && milestone.paidDate && (
                                    <p className="mt-2 text-xs text-green-600 flex items-center">
                                        <Check className="h-3 w-3 mr-1" /> Paid on {milestone.paidDate}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
