'use client';

import { useState, useEffect } from 'react';
import { DollarSign, Download, Calendar, CheckCircle, Clock } from 'lucide-react';
import { PageHeader } from '@/components/os/ui/PageHeader';
import { Button } from '@/components/os/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/os/ui/Card';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/os/ui/Table';
import { StatusBadge } from '@/components/os/ui/StatusBadge';
import api from '@/lib/axios';

export default function PayrollPage() {
    const [pendingTasks, setPendingTasks] = useState<any[]>([]);
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [tasksRes, payrollRes] = await Promise.all([
                api.get('/projects/tasks'),
                api.get('/payroll')
            ]);

            const allTasks = tasksRes.data;
            const paidTaskIds = new Set(payrollRes.data.map((p: any) => p.taskId?._id || p.taskId));

            const completedUnpaid = allTasks.filter((t: any) => t.status === 'COMPLETED' && !paidTaskIds.has(t._id));

            setPendingTasks(completedUnpaid);
            setHistory(payrollRes.data);

        } catch (error) {
            console.error("Failed to fetch payroll data", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePay = async (task: any) => {
        if (!confirm(`Confirm payout of $${task.salary} to ${task.employeeId?.name || 'Employee'}?`)) return;

        try {
            await api.post('/payroll/pay', {
                taskId: task._id,
                employeeId: task.employeeId?._id || task.employeeId, // Assuming populate
                amount: task.salary
            });
            fetchData();
        } catch (error) {
            console.error(error);
            alert("Payment failed");
        }
    };

    const totalPending = pendingTasks.reduce((acc, t) => acc + (Number(t.salary) || 0), 0);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Payroll & Expenses"
                description="Manage employee payouts."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="bg-structura-black text-white border-none">
                    <CardContent className="p-6">
                        <p className="text-slate-400 text-sm font-medium uppercase">Pending Release</p>
                        <p className="text-3xl font-bold font-display mt-2">${totalPending}</p>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-6">
                {/* Pending Payouts */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base text-amber-600 flex items-center gap-2">
                            <Clock className="h-4 w-4" /> Pending Payouts (Completed Tasks)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Employee</TableHead>
                                    <TableHead>Task</TableHead>
                                    <TableHead>Date Completed</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pendingTasks.length === 0 ? (
                                    <TableRow><TableCell colSpan={5} className="text-center text-slate-500">No pending payouts.</TableCell></TableRow>
                                ) : (
                                    pendingTasks.map((task) => (
                                        <TableRow key={task._id}>
                                            <TableCell className="font-medium">{task.employeeId?.name || 'Unknown'}</TableCell>
                                            <TableCell>{task.name}</TableCell>
                                            <TableCell>{task.deadline ? new Date(task.deadline).toLocaleDateString() : '-'}</TableCell>
                                            <TableCell className="font-bold">${task.salary}</TableCell>
                                            <TableCell className="text-right">
                                                <Button size="sm" onClick={() => handlePay(task)}>
                                                    Release Payment
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* History */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base text-slate-600 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" /> Payout History
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Employee</TableHead>
                                    <TableHead>Task</TableHead>
                                    <TableHead>Paid Date</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {history.length === 0 ? (
                                    <TableRow><TableCell colSpan={5} className="text-center text-slate-500">No history found.</TableCell></TableRow>
                                ) : (
                                    history.map((record) => (
                                        <TableRow key={record._id}>
                                            <TableCell className="font-medium">{record.employeeId?.name || 'Unknown'}</TableCell>
                                            <TableCell>{record.taskId?.name || 'Unknown Task'}</TableCell>
                                            <TableCell>{record.paidDate ? new Date(record.paidDate).toLocaleDateString() : '-'}</TableCell>
                                            <TableCell className="font-bold text-green-600">${record.amount}</TableCell>
                                            <TableCell>
                                                <StatusBadge status="PAID" />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
