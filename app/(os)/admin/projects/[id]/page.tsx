'use client';

import { useState } from 'react';
import { use } from 'react';
import {
    Briefcase,
    Settings,
    Users,
    DollarSign,
    Calendar,
    MoreHorizontal,
    Clock
} from 'lucide-react';
import { PageHeader } from '@/components/os/ui/PageHeader';
import { Button } from '@/components/os/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/os/ui/Card';
import { StatusBadge } from '@/components/os/ui/StatusBadge';
import { MilestoneList, Milestone } from '@/components/os/projects/MilestoneList';

// Dummy Data
const projectData = {
    id: 'PRJ-001',
    name: "Acme Web Overhaul",
    client: "Acme Corp",
    status: "In Progress",
    budget: "$15,000",
    spent: "$4,500",
    startDate: "Dec 01, 2024",
    dueDate: "Jan 15, 2025",
    team: ["Alice Smith", "Bob Jones", "Charlie Day"]
};

// Initial Milestone Data
const initialMilestones: Milestone[] = [
    { id: '1', name: "Discovery Phase", assignedTo: "Alice Smith", dueDate: "Dec 05, 2024", status: "approved", amount: "$3,000" },
    { id: '2', name: "Design Mockups", assignedTo: "Bob Jones", dueDate: "Dec 15, 2024", status: "completed", amount: "$4,500" },
    { id: '3', name: "Frontend Development", assignedTo: "Charlie Day", dueDate: "Jan 05, 2025", status: "pending", amount: "$5,000" },
    { id: '4', name: "QA & Launch", assignedTo: "Alice Smith", dueDate: "Jan 15, 2025", status: "pending", amount: "$2,500" },
];

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [milestones, setMilestones] = useState<Milestone[]>(initialMilestones);

    const handleStatusChange = (milestoneId: string, newStatus: Milestone['status']) => {
        // In a real app, this would be an API call
        console.log(`Updating milestone ${milestoneId} to ${newStatus}`);
        setMilestones(prev => prev.map(m =>
            m.id === milestoneId ? { ...m, status: newStatus } : m
        ));
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title={projectData.name}
                description={`Client: ${projectData.client} • ID: ${id}`}
            >
                <div className="flex gap-2">
                    <StatusBadge status={projectData.status} className="h-9 px-4 text-sm" />
                    <Button variant="outline">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </Button>
                </div>
            </PageHeader>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* Left: Milestones (Main Content) */}
                <div className="lg:col-span-3 space-y-6">

                    {/* Project Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Card>
                            <CardContent className="p-4 flex items-center gap-4">
                                <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                                    <DollarSign className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-semibold">Budget</p>
                                    <p className="text-lg font-bold text-structura-black">{projectData.budget}</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 flex items-center gap-4">
                                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                    <Clock className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-semibold">Deadline</p>
                                    <p className="text-lg font-bold text-structura-black">{projectData.dueDate}</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 flex items-center gap-4">
                                <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                                    <Users className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-semibold">Team Size</p>
                                    <p className="text-lg font-bold text-structura-black">{projectData.team.length} Members</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Milestones Table */}
                    <Card className="min-h-[400px]">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-base">Delivery Milestones</CardTitle>
                            <Button size="sm" variant="outline">Add Milestone</Button>
                        </CardHeader>
                        <CardContent>
                            <MilestoneList
                                milestones={milestones}
                                onStatusChange={handleStatusChange}
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Right: Sidebar Info */}
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Team Members</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {projectData.team.map((member, i) => (
                                <div key={i} className="flex items-center gap-3 pb-3 border-b border-structura-border last:border-0 last:pb-0">
                                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-semibold text-structura-black">
                                        {member.charAt(0)}
                                    </div>
                                    <span className="text-sm font-medium text-slate-700">{member}</span>
                                </div>
                            ))}
                            <Button variant="ghost" size="sm" className="w-full text-slate-500">
                                + Add Member
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Project Notes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-500">
                                Client requires weekly updates on Friday. Design system must follow their existing brand guidelines.
                            </p>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}
