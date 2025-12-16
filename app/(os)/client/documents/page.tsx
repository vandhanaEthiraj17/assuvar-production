'use client';

import { PageHeader } from "@/components/os/ui/PageHeader";
import { Card, CardContent } from "@/components/os/ui/Card";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/os/ui/Button";

const documents = [
    { id: 1, name: "Master Services Agreement.pdf", type: "Contract", size: "2.4 MB", date: "Nov 28, 2024" },
    { id: 2, name: "Project Scope of Work.pdf", type: "Scope", size: "1.1 MB", date: "Nov 30, 2024" },
    { id: 3, name: "Q4 Marketing Strategy.pptx", type: "Presentation", size: "14.5 MB", date: "Dec 10, 2024" },
];

export default function ClientDocumentsPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Documents"
                description="Access all project files and agreements."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documents.map((doc) => (
                    <Card key={doc.id} className="hover:shadow-md transition-shadow cursor-pointer group">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 group-hover:bg-blue-50 group-hover:text-structura-blue transition-colors">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Download className="h-4 w-4" />
                                </Button>
                            </div>
                            <h3 className="font-semibold text-structura-black truncate mb-1">{doc.name}</h3>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                <span>{doc.type}</span>
                                <span>•</span>
                                <span>{doc.size}</span>
                                <span>•</span>
                                <span>{doc.date}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
