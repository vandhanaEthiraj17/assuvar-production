'use client';

import { Card, CardContent } from "@/components/os/ui/Card";
import { Folder, FileText, MoreVertical, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/os/ui/Button";

interface FileItem {
    id: string;
    name: string;
    type: 'folder' | 'file' | 'image';
    size?: string;
    date: string;
}

const files: FileItem[] = [
    { id: '1', name: 'Client Contracts', type: 'folder', date: 'Dec 01, 2024' },
    { id: '2', name: 'Marketing Assets', type: 'folder', date: 'Nov 15, 2024' },
    { id: '3', name: 'Q4 Financial Report.pdf', type: 'file', size: '2.4 MB', date: 'Dec 10, 2024' },
    { id: '4', name: 'Logo_Pack_Final.zip', type: 'file', size: '15.6 MB', date: 'Oct 20, 2024' },
    { id: '5', name: 'Banner_Ad.png', type: 'image', size: '1.2 MB', date: 'Dec 12, 2024' },
];

export function FileExplorer() {
    return (
        <Card>
            <CardContent className="p-0">
                <div className="grid grid-cols-1 divide-y divide-structura-border">
                    {files.map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-4">
                                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${file.type === 'folder' ? 'bg-amber-50 text-amber-500' :
                                        file.type === 'image' ? 'bg-purple-50 text-purple-500' : 'bg-slate-100 text-slate-500'
                                    }`}>
                                    {file.type === 'folder' && <Folder className="h-5 w-5 fill-current" />}
                                    {file.type === 'image' && <ImageIcon className="h-5 w-5" />}
                                    {file.type === 'file' && <FileText className="h-5 w-5" />}
                                </div>
                                <div>
                                    <p className="font-medium text-structura-black text-sm">{file.name}</p>
                                    <p className="text-xs text-slate-400">
                                        {file.date} {file.size && `• ${file.size}`}
                                    </p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreVertical className="h-4 w-4 text-slate-400" />
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
