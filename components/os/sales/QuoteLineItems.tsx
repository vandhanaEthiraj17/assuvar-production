'use client';

import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/os/ui/Button";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/os/ui/Table";
import { cn } from "@/lib/utils";

export interface LineItem {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
}

interface QuoteLineItemsProps {
    items: LineItem[];
    currency?: string;
    isEditable?: boolean;
    onItemsChange?: (items: LineItem[]) => void;
}

export function QuoteLineItems({
    items: initialItems,
    currency = "$",
    isEditable = false,
    onItemsChange
}: QuoteLineItemsProps) {
    const [items, setItems] = useState<LineItem[]>(initialItems);

    // Sync internal state with props only if not editing to avoid loops, or use effect carefully
    useEffect(() => {
        setItems(initialItems);
    }, [initialItems]);

    const updateParent = (newItems: LineItem[]) => {
        setItems(newItems);
        onItemsChange?.(newItems);
    };

    const handleAddItem = () => {
        const newItem: LineItem = {
            id: Math.random().toString(36).substr(2, 9),
            description: "New Service / Item",
            quantity: 1,
            unitPrice: 0,
            total: 0
        };
        updateParent([...items, newItem]);
    };

    const handleRemoveItem = (id: string) => {
        const newItems = items.filter(item => item.id !== id);
        updateParent(newItems);
    };

    const handleItemChange = (id: string, field: keyof LineItem, value: any) => {
        const newItems = items.map(item => {
            if (item.id === id) {
                const updatedItem = { ...item, [field]: value };
                // Recalculate total if quantity or price changes
                if (field === 'quantity' || field === 'unitPrice') {
                    updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
                }
                return updatedItem;
            }
            return item;
        });
        updateParent(newItems);
    };

    const grandTotal = items.reduce((sum, item) => sum + item.total, 0);

    return (
        <div className="space-y-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50%]">Description</TableHead>
                        <TableHead className="w-[15%] text-right">Quantity</TableHead>
                        <TableHead className="w-[15%] text-right">Unit Price</TableHead>
                        <TableHead className="w-[15%] text-right">Total</TableHead>
                        {isEditable && <TableHead className="w-[5%]"></TableHead>}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                {isEditable ? (
                                    <input
                                        type="text"
                                        value={item.description}
                                        onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                                        className="w-full bg-transparent border-none focus:ring-0 p-0 font-medium text-structura-black placeholder:text-slate-400"
                                        placeholder="Enter item description..."
                                    />
                                ) : (
                                    <span className="font-medium text-structura-black">{item.description}</span>
                                )}
                            </TableCell>
                            <TableCell className="text-right">
                                {isEditable ? (
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => handleItemChange(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                                        className="w-full bg-transparent border-none focus:ring-0 p-0 text-right text-slate-600"
                                    />
                                ) : (
                                    <span className="text-slate-600">{item.quantity}</span>
                                )}
                            </TableCell>
                            <TableCell className="text-right">
                                {isEditable ? (
                                    <div className="flex items-center justify-end">
                                        <span className="text-slate-400 mr-1">{currency}</span>
                                        <input
                                            type="number"
                                            min="0"
                                            value={item.unitPrice}
                                            onChange={(e) => handleItemChange(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                                            className="w-24 bg-transparent border-none focus:ring-0 p-0 text-right text-slate-600"
                                        />
                                    </div>
                                ) : (
                                    <span className="text-slate-600">{currency}{item.unitPrice.toLocaleString()}</span>
                                )}
                            </TableCell>
                            <TableCell className="text-right font-medium text-structura-black">
                                {currency}{item.total.toLocaleString()}
                            </TableCell>
                            {isEditable && (
                                <TableCell>
                                    <button
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                    {/* Summary Row */}
                    <TableRow className="bg-slate-50 font-bold border-t-2 border-structura-border">
                        <TableCell colSpan={3} className="text-right text-structura-black">Grand Total</TableCell>
                        <TableCell className="text-right text-structura-blue text-lg">
                            {currency}{grandTotal.toLocaleString()}
                        </TableCell>
                        {isEditable && <TableCell></TableCell>}
                    </TableRow>
                </TableBody>
            </Table>

            {isEditable && (
                <Button variant="outline" size="sm" onClick={handleAddItem}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Line Item
                </Button>
            )}
        </div>
    );
}
