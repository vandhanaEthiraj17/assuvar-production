import { Check, Circle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineStep {
    status: string;
    label: string;
    date?: string; // e.g., "Dec 12, 2024"
    isCompleted: boolean;
    isCurrent: boolean;
}

interface LeadStatusTimelineProps {
    steps: TimelineStep[];
}

export function LeadStatusTimeline({ steps }: LeadStatusTimelineProps) {
    return (
        <div className="relative space-y-0">
            {steps.map((step, index) => {
                const isLast = index === steps.length - 1;

                return (
                    <div key={step.status} className="relative flex gap-4 pb-8 last:pb-0">
                        {/* Connector Line */}
                        {!isLast && (
                            <div
                                className={cn(
                                    "absolute left-[15px] top-[30px] h-[calc(100%-10px)] w-[2px]",
                                    step.isCompleted ? "bg-structura-blue" : "bg-slate-200"
                                )}
                            />
                        )}

                        {/* Icon/Dot */}
                        <div className={cn(
                            "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 bg-white transition-colors",
                            step.isCompleted ? "border-structura-blue bg-structura-blue text-white" :
                                step.isCurrent ? "border-structura-blue ring-4 ring-blue-50" : "border-slate-300"
                        )}>
                            {step.isCompleted ? <Check className="h-4 w-4" /> :
                                step.isCurrent ? <Circle className="h-3 w-3 fill-structura-blue text-structura-blue" /> :
                                    <Circle className="h-3 w-3 text-slate-300" />}
                        </div>

                        {/* Content */}
                        <div className="flex flex-col pt-1">
                            <span className={cn(
                                "text-sm font-semibold",
                                step.isCompleted || step.isCurrent ? "text-structura-black" : "text-slate-500"
                            )}>
                                {step.label}
                            </span>
                            {step.date && <span className="text-xs text-slate-400 mt-0.5">{step.date}</span>}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
