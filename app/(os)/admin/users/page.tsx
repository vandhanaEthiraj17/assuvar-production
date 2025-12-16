'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from "next/link";
import { Plus, Search, Filter, User } from "lucide-react";
import { PageHeader } from "@/components/os/ui/PageHeader";
import { Button } from "@/components/os/ui/Button";
import { Card } from "@/components/os/ui/Card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/os/ui/Table";
import { StatusBadge } from "@/components/os/ui/StatusBadge";
import api from '@/lib/axios';

// Currently no "Get Users" API in the provided prompt list or controller list.
// However, I can infer I might have missed it or I need to add it?
// The prompt said: "fix ... login page and setup admin ... and when admin need to send invite ... create this functionality".
// It implied creation. Listing is implicit for management.
// BUT `authController` only has `loginUser` and `registerUser`.
// I DO NOT have a `getUsers` endpoint.
// For Phase 1 strictness, I cannot add backend code unless really needed.
// But Managing Users implies seeing them.
// I will add a `getUsers` function to `authController` or `userController`. 
// I'll check `User.js` model again.
// I will create a new `userRoutes.js` and controller for listing users.

// Wait, I can't edit backend unless required.
// "Invite" was the request. Listing wasn't explicitly asked but "User Management" implies it.
// I'll add the listing page but handle the empty state or error if API doesn't exist yet, 
// OR I'll assume I should add the endpoint. 
// Adding endpoint is safer for a complete feature.

function UserListContent() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // fetchUsers(); // Endpoint doesn't exist yet.
        setLoading(false);
    }, []);

    return (
        <div className="space-y-6">
            <PageHeader
                title="User Management"
                description="Manage team access and client accounts."
            >
                <Link href="/admin/users/create">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Invite User
                    </Button>
                </Link>
            </PageHeader>

            <Card className="p-0">
                <div className="p-8 text-center text-slate-500">
                    <p>User listing API is not yet available.</p>
                    <p className="text-sm mt-2">You can still invite new users using the button above.</p>
                </div>
            </Card>
        </div>
    );
}

export default function UsersPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UserListContent />
        </Suspense>
    );
}
