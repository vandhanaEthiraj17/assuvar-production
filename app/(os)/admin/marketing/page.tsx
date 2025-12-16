'use client';

import { PageHeader } from "@/components/os/ui/PageHeader";
import { Button } from "@/components/os/ui/Button";
import { Plus } from "lucide-react";
import { CampaignBoard } from "@/components/os/marketing/CampaignBoard";

export default function MarketingPage() {
    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col">
            <PageHeader
                title="Marketing Campaigns"
                description="Manage and track your marketing efforts across channels."
                className="mb-6 flex-none"
            >
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Campaign
                </Button>
            </PageHeader>

            <div className="flex-1 overflow-x-auto pb-4">
                <CampaignBoard />
            </div>
        </div>
    );
}
