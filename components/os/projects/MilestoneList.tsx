'use client';

import { CheckCircle, Circle, Clock, MoreHorizontal, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/os/ui/Button";
import { StatusBadge } from "@/components/os/ui/StatusBadge";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/os/ui/Table";

export interface Milestone {
    id: string;
    name: string;
    dueDate: string;
    assignedTo: string;
    status: 'pending' | 'completed' | 'approved';
    amount?: string;
}

interface MilestoneListProps {
    milestones: Milestone[];
    onStatusChange?: (id: string, filteredStatus: Milestone['status']) => void;
}

export function MilestoneList({ milestones, onStatusChange }: MilestoneListProps) {

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[40%]">Milestone Name</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {milestones.map((milestone) => (
                    <TableRow key={milestone.id}>
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "h-8 w-8 rounded-full flex items-center justify-center border",
                                    milestone.status === 'approved' ? "bg-green-100 border-green-200 text-green-600" :
                                        milestone.status === 'completed' ? "bg-blue-100 border-blue-200 text-blue-600" :
                                            "bg-slate-50 border-slate-200 text-slate-400"
                                )}>
                                    {milestone.status === 'approved' ? <ShieldCheck className="h-4 w-4" /> :
                                        milestone.status === 'completed' ? <CheckCircle className="h-4 w-4" /> :
                                            <Circle className="h-4 w-4" />}
                                </div>
                                <div>
                                    <p className="font-medium text-structura-black">{milestone.name}</p>
                                    {milestone.amount && <p className="text-xs text-slate-500">release: {milestone.amount}</p>}
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600">
                                    {milestone.assignedTo.charAt(0)}
                                </div>
                                <span>{milestone.assignedTo}</span>
                            </div>
                        </TableCell>
                        <TableCell className="text-slate-500">{milestone.dueDate}</TableCell>
                        <TableCell>
                            <StatusBadge status={milestone.status} />
                        </TableCell>
                        <TableCell className="text-right">
                            {milestone.status === 'pending' && (
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => onStatusChange?.(milestone.id, 'completed')}
                                >
                                    Mark Complete
                                </Button>
                            )}
                            {milestone.status === 'completed' && (
                                <Button
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700 text-white border-transparent"
                                    onClick={() => onStatusChange?.(milestone.id, 'approved')}
                                >
                                    Approve
                                </Button>
                            )}
                            {milestone.status === 'approved' && (
                                <span className="text-xs text-green-600 font-medium">Synced to Payroll</span>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
