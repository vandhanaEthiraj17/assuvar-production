'use client';

import { PageHeader } from "@/components/os/ui/PageHeader";
import { Button } from "@/components/os/ui/Button";
import { Card, CardContent } from "@/components/os/ui/Card";
import { Plus, Users } from "lucide-react";

export default function PartnerLeadsPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Your Leads"
                description="Submit and track leads to earn commissions."
            >
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Submit New Lead
                </Button>
            </PageHeader>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <Users className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500 uppercase">Active Leads</p>
                            <p className="text-2xl font-bold font-display text-structura-black">12</p>
                        </div>
                    </CardContent>
                </Card>
                {/* More stats can be added here */}
            </div>

            <Card>
                <CardContent className="p-12 text-center">
                    <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                        <Users className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-bold text-structura-black mb-2">No leads submitted yet</h3>
                    <p className="text-slate-500 max-w-sm mx-auto mb-6">Start submitting leads to track their progress and earn commissions on successful conversions.</p>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Submit First Lead
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
