'use client';

import {
    Building2,
    Mail,
    Phone,
    MapPin,
    Globe,
    Linkedin,
    Edit,
    MoreHorizontal,
    Trash2,
    Calendar,
    User
} from 'lucide-react';
import { PageHeader } from '@/components/os/ui/PageHeader';
import { Button } from '@/components/os/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/os/ui/Card';
import { StatusBadge } from '@/components/os/ui/StatusBadge';
import { LeadStatusTimeline } from '@/components/os/crm/LeadStatusTimeline';
import { LeadActivityLog } from '@/components/os/crm/LeadActivityLog';
import { use } from 'react';

// Dummy Data
const leadData = {
    id: 1,
    name: "Acme Corp",
    website: "www.acme.com",
    industry: "Manufacturing",
    employees: "50-200",
    address: "123 Industrial Way, Tech City",
    status: "Negotiation",
    value: "$120,000",
    probability: "75%",
    contacts: [
        { name: "John Doe", title: "CTO", email: "john@acme.com", phone: "+1 (555) 123-4567" },
    ]
};

const timelineSteps = [
    { status: 'new', label: 'Lead Created', date: 'Dec 01, 2024', isCompleted: true, isCurrent: false },
    { status: 'contacted', label: 'Contacted', date: 'Dec 03, 2024', isCompleted: true, isCurrent: false },
    { status: 'qualified', label: 'Qualified', date: 'Dec 05, 2024', isCompleted: true, isCurrent: false },
    { status: 'quoted', label: 'Proposal Sent', date: 'Dec 10, 2024', isCompleted: true, isCurrent: false },
    { status: 'negotiation', label: 'Negotiation', date: 'Current', isCompleted: false, isCurrent: true },
    { status: 'won', label: 'Closed Won', isCompleted: false, isCurrent: false },
];

const activityHistory: any[] = [
    { id: '1', type: 'call', title: 'Call with John Doe', description: 'Discussed pricing tier and implementation timeline. Client seems positive.', date: '2 hours ago', user: 'Alice Smith' },
    { id: '2', type: 'email', title: 'Sent Follow-up Email', description: 'Attached updated proposal v2.', date: 'Yesterday', user: 'Alice Smith' },
    { id: '3', type: 'status_change', title: 'Moved to Negotiation', date: 'Yesterday', user: 'System' },
    { id: '4', type: 'meeting', title: 'Discovery Meeting', description: 'Initial requirements gathering.', date: 'Dec 05, 2024', user: 'Bob Jones' },
];

export default function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
    // Unwrap params using React.use()
    const { id } = use(params);

    return (
        <div className="space-y-6">
            <PageHeader
                title={leadData.name}
                description="Lead Details & History"
            >
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                    </Button>
                    <Button variant="danger">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </Button>
                </div>
            </PageHeader>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT COLUMN: Profile & Contact Info */}
                <div className="space-y-6 lg:col-span-1">

                    {/* Lead Status Card */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center text-center">
                                <div className="h-20 w-20 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
                                    <Building2 className="h-10 w-10 text-slate-400" />
                                </div>
                                <h2 className="text-xl font-bold font-display text-structura-black">{leadData.name}</h2>
                                <a href={`https://${leadData.website}`} target="_blank" className="text-sm text-structura-blue hover:underline mt-1">{leadData.website}</a>

                                <div className="mt-6 flex gap-2 w-full">
                                    <StatusBadge status={leadData.status} className="justify-center w-full py-2 text-sm" />
                                </div>

                                <div className="grid grid-cols-2 w-full gap-4 mt-6 pt-6 border-t border-structura-border">
                                    <div className="text-center">
                                        <p className="text-xs text-slate-500 uppercase font-semibold">Value</p>
                                        <p className="text-lg font-bold text-structura-black">{leadData.value}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs text-slate-500 uppercase font-semibold">Probability</p>
                                        <p className="text-lg font-bold text-structura-black">{leadData.probability}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Info Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Company Info</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3">
                                <MapPin className="h-4 w-4 text-slate-400 mt-1" />
                                <span className="text-sm text-slate-600">{leadData.address}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Globe className="h-4 w-4 text-slate-400" />
                                <span className="text-sm text-slate-600">{leadData.industry}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <User className="h-4 w-4 text-slate-400" />
                                <span className="text-sm text-slate-600">{leadData.employees} employees</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contacts */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Contacts</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {leadData.contacts.map((contact, i) => (
                                <div key={i} className="flex flex-col gap-1 pb-4 border-b border-structura-border last:border-0 last:pb-0">
                                    <p className="font-medium text-structura-black">{contact.name}</p>
                                    <p className="text-xs text-slate-500">{contact.title}</p>
                                    <div className="mt-2 space-y-1">
                                        <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-xs text-slate-600 hover:text-structura-blue">
                                            <Mail className="h-3 w-3" /> {contact.email}
                                        </a>
                                        <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-xs text-slate-600 hover:text-structura-blue">
                                            <Phone className="h-3 w-3" /> {contact.phone}
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                </div>

                {/* RIGHT COLUMN: Timeline & Activity */}
                <div className="space-y-6 lg:col-span-2">

                    {/* Pipeline Stage */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Status Timeline</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="pt-2 pl-2">
                                <LeadStatusTimeline steps={timelineSteps} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Activity Log */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-base">Activity Logs</CardTitle>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" className="h-8">
                                    <Calendar className="mr-2 h-3.5 w-3.5" />
                                    Log Meeting
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8">
                                    <Phone className="mr-2 h-3.5 w-3.5" />
                                    Log Call
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <LeadActivityLog activities={activityHistory} />
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    );
}
