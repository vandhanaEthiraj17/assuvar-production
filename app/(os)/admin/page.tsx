import { ArrowUpRight, DollarSign, Users, Briefcase, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/os/ui/PageHeader";
import { Card, CardContent } from "@/components/os/ui/Card";
import { Button } from "@/components/os/ui/Button";
import { StatusBadge } from "@/components/os/ui/StatusBadge";

const stats = [
    { name: 'Total Leads', value: '2,300', change: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Active Quotes', value: '45', change: '+5%', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-100' },
    { name: 'Projects', value: '12', change: '-2%', icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-100' },
    { name: 'Revenue', value: '$120k', change: '+15%', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
];

const recentLeads = [
    { name: "Global Corp Tech", status: "New", value: "$12,000" },
    { name: "Nexus Innovations", status: "Contacted", value: "$8,500" },
    { name: "Stellar Dynamics", status: "Qualifed", value: "$45,000" },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Dashboard"
                description="Overview of your business performance."
            >
                <Button>
                    New Lead
                </Button>
            </PageHeader>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((item) => (
                    <Card key={item.name} className="p-0">
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                                <div className={cn("p-2 rounded-lg", item.bg)}>
                                    <item.icon className={cn("h-6 w-6", item.color)} />
                                </div>
                                <span className={cn("text-xs font-semibold px-2 py-1 rounded-full",
                                    item.change.startsWith('+') ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                )}>
                                    {item.change}
                                </span>
                            </div>
                            <div className="mt-4">
                                <h3 className="text-sm font-medium text-slate-500">{item.name}</h3>
                                <p className="mt-1 text-2xl font-bold text-structura-black">{item.value}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Activity / Placeholders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="min-h-[300px]">
                    <CardContent>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-structura-black">Recent Leads</h3>
                            <Button variant="ghost" size="sm">View All</Button>
                        </div>

                        <div className="space-y-4">
                            {recentLeads.map((lead, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                    <div>
                                        <p className="font-medium text-structura-black">{lead.name}</p>
                                        <p className="text-sm text-slate-500">{lead.value}</p>
                                    </div>
                                    <StatusBadge status={lead.status} />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="min-h-[300px]">
                    <CardContent>
                        <h3 className="text-lg font-semibold text-structura-black mb-4">Pending Quotes</h3>
                        <div className="flex flex-col items-center justify-center h-48 text-slate-400 text-sm">
                            <FileText className="h-10 w-10 mb-2 opacity-20" />
                            No active quotes
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
