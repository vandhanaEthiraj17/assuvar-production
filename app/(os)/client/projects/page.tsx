'use client';

import { PageHeader } from "@/components/os/ui/PageHeader";
import { Card, CardContent } from "@/components/os/ui/Card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/os/ui/Table";
import { StatusBadge } from "@/components/os/ui/StatusBadge";
import { Briefcase, CheckCircle, Clock } from "lucide-react";

const milestones = [
    { id: 1, name: "Discovery Phase", status: "completed", date: "Dec 05, 2024" },
    { id: 2, name: "Design Mockups", status: "completed", date: "Dec 15, 2024" },
    { id: 3, name: "Development Sprint 1", status: "in_progress", date: "Due Jan 05, 2025" },
];

export default function ClientProjectsPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Your Project: Acme Web Overhaul"
                description="Track the progress and delivery milestones of your project."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-1 md:col-span-2">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <h3 className="text-lg font-bold text-structura-black">Overall Progress</h3>
                            <StatusBadge status="In Progress" />
                        </div>
                        <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden mb-2">
                            <div className="h-full w-[65%] bg-structura-blue rounded-full" />
                        </div>
                        <p className="text-sm text-slate-500">65% Complete</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6 flex flex-col justify-center h-full">
                        <p className="text-sm font-medium text-slate-500 uppercase mb-2">Next Milestone</p>
                        <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-structura-blue" />
                            <div>
                                <p className="font-bold text-structura-black">Dev Sprint 1</p>
                                <p className="text-sm text-slate-500">Due Jan 05</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <div className="p-6 border-b border-structura-border">
                    <h3 className="text-base font-semibold text-structura-black">Milestone Timeline</h3>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Milestone</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Completion Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {milestones.map((milestone) => (
                            <TableRow key={milestone.id}>
                                <TableCell className="font-medium text-structura-black flex items-center gap-3">
                                    {milestone.status === 'completed' ? (
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                    ) : (
                                        <div className="h-4 w-4 rounded-full border-2 border-slate-300" />
                                    )}
                                    {milestone.name}
                                </TableCell>
                                <TableCell>
                                    <StatusBadge status={milestone.status.replace('_', ' ')} />
                                </TableCell>
                                <TableCell className="text-right text-slate-500">{milestone.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
