'use client';

import Link from "next/link";
import { Plus, Search, Filter, Briefcase, Clock } from "lucide-react";
import { PageHeader } from "@/components/os/ui/PageHeader";
import { Button } from "@/components/os/ui/Button";
import { Card } from "@/components/os/ui/Card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/os/ui/Table";
import { StatusBadge } from "@/components/os/ui/StatusBadge";
import { cn } from "@/lib/utils";

// Dummy Data
const projects = [
    { id: 'PRJ-001', name: "Acme Web Overhaul", client: "Acme Corp", progress: 65, status: "In Progress", dueDate: "Jan 15, 2025" },
    { id: 'PRJ-002', name: "Global Cloud Migration", client: "Global Tech", progress: 30, status: "In Progress", dueDate: "Feb 01, 2025" },
    { id: 'PRJ-003', name: "Stellar Security Audit", client: "Stellar Systems", progress: 100, status: "Completed", dueDate: "Dec 10, 2024" },
];

export default function ProjectsPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Projects"
                description="Track delivery milestones and manage implementation."
            >
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Project
                </Button>
            </PageHeader>

            <Card className="p-0">
                <div className="flex items-center justify-between p-4 border-b border-structura-border bg-white rounded-t-xl">
                    <div className="relative w-72">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            className="h-10 w-full rounded-lg border border-structura-border pl-10 pr-4 text-sm focus:border-structura-blue focus:outline-none focus:ring-1 focus:ring-structura-blue"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Filter className="mr-2 h-4 w-4" />
                            Filter
                        </Button>
                    </div>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Project Name</TableHead>
                            <TableHead>Client</TableHead>
                            <TableHead>Progress</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects.map((project) => (
                            <TableRow key={project.id} className="cursor-pointer hover:bg-slate-50">
                                <TableCell>
                                    <Link href={`/admin/projects/${project.id}`} className="block">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                                                <Briefcase className="h-4 w-4" />
                                            </div>
                                            <span className="font-medium text-structura-black hover:text-structura-blue transition-colors">{project.name}</span>
                                        </div>
                                    </Link>
                                </TableCell>
                                <TableCell className="text-slate-600">{project.client}</TableCell>
                                <TableCell className="w-48">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-structura-blue rounded-full transition-all duration-500"
                                                style={{ width: `${project.progress}%` }}
                                            />
                                        </div>
                                        <span className="text-xs font-medium text-slate-600">{project.progress}%</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <StatusBadge status={project.status} />
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <Clock className="h-3.5 w-3.5" />
                                        {project.dueDate}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Link href={`/admin/projects/${project.id}`}>
                                        <Button variant="ghost" size="sm">Manage</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
