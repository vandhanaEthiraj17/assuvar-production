'use client';

import { PageHeader } from "@/components/os/ui/PageHeader";
import { Button } from "@/components/os/ui/Button";
import { Upload, FolderPlus } from "lucide-react";
import { FileExplorer } from "@/components/os/documents/FileExplorer";

export default function DocumentsPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Documents"
                description="Securely manage organization files and assets."
            >
                <div className="flex gap-2">
                    <Button variant="outline">
                        <FolderPlus className="mr-2 h-4 w-4" />
                        New Folder
                    </Button>
                    <Button>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload File
                    </Button>
                </div>
            </PageHeader>

            <FileExplorer />
        </div>
    );
}
