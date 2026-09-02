"use client";

import { useState } from "react";
import {
    Search,
    ChevronDown,
    Calendar,
    Download,
    LifeBuoy,
    Archive,
    Truck,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    ShoppingBag,
    Package,
} from "lucide-react";

type OrderStatus = "Delivered" | "Shipped" | "Processing" | "Cancelled";

type Order = {
    id: string;
    datePlaced: string;
    itemTitle: string;
    itemSubtitle: string;
    total: string;
    status: OrderStatus;
};

const orders: Order[] = [
    {
        id: "#ORD-20248",
        datePlaced: "Oct 24, 2024",
        itemTitle: "Warm Woolen Beanie (Navy Blue)",
        itemSubtitle: "and 1 other item",
        total: "$48.00",
        status: "Delivered",
    },
    {
        id: "#ORD-20247",
        datePlaced: "Oct 21, 2024",
        itemTitle: "Ergonomic Task Office Chair",
        itemSubtitle: "Standard size, lumbar support",
        total: "$320.00",
        status: "Shipped",
    },
    {
        id: "#ORD-20244",
        datePlaced: "Oct 18, 2024",
        itemTitle: "Wireless Noise-Cancelling Headphones",
        itemSubtitle: "and 2 other items",
        total: "$210.50",
        status: "Delivered",
    },
    {
        id: "#ORD-20239",
        datePlaced: "Oct 15, 2024",
        itemTitle: "Mechanical Tactile Keyboard",
        itemSubtitle: "Quiet brown switches",
        total: "$129.00",
        status: "Processing",
    },
    {
        id: "#ORD-20231",
        datePlaced: "Oct 12, 2024",
        itemTitle: "Leather Weekend Duffle Bag",
        itemSubtitle: "and 1 other item",
        total: "$185.00",
        status: "Cancelled",
    },
    {
        id: "#ORD-20228",
        datePlaced: "Oct 09, 2024",
        itemTitle: "Smart Health Watch Tracker v2",
        itemSubtitle: "and 3 other items",
        total: "$95.00",
        status: "Delivered",
    },
    {
        id: "#ORD-20215",
        datePlaced: "Oct 05, 2024",
        itemTitle: "Insulated Reusable Water Bottle",
        itemSubtitle: "Matte black, 32 oz",
        total: "$32.00",
        status: "Delivered",
    },
];

const statusStyles: Record<OrderStatus, string> = {
    Delivered: "bg-emerald-50 text-emerald-700",
    Shipped: "bg-blue-50 text-blue-700",
    Processing: "bg-amber-50 text-amber-700",
    Cancelled: "bg-rose-50 text-rose-700",
};

function StatCard({
    label,
    value,
    caption,
    icon,
}: {
    label: string;
    value: string;
    caption: string;
    icon: React.ReactNode;
}) {
    return (
        <div className="flex-1 rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between">
                <span className="text-xs font-medium text-slate-500">{label}</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                    {icon}
                </span>
            </div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">{value}</div>
            <div className="mt-0.5 text-xs text-slate-400">{caption}</div>
        </div>
    );
}

export default function OrderHistoryPage() {
    const [search, setSearch] = useState("");
    const page = 1;
    const totalPages = 6;

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Top nav */}
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600">
                                <ShoppingBag className="h-4 w-4 text-white" strokeWidth={2.5} />
                            </span>
                            <span className="text-[15px] font-semibold text-slate-900">
                                CartSaaS
                            </span>
                        </div>
                        <nav className="flex items-center gap-6 text-sm">
                            <a href="/" className="text-slate-500 hover:text-slate-900">
                                Home
                            </a>
                            <a href="#" className="font-medium text-indigo-600">
                                Orders
                            </a>
                            <a href="#" className="text-slate-500 hover:text-slate-900">
                                Account
                            </a>
                        </nav>
                    </div>
                    <div className="flex items-center gap-5">
                        <button className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900">
                            <LifeBuoy className="h-4 w-4" />
                            Support
                        </button>
                        <div className="h-8 w-8 overflow-hidden rounded-full bg-slate-200">
                            <div className="h-full w-full bg-gradient-to-br from-slate-300 to-slate-400" />
                        </div>
                    </div>
                </div>
            </header>

            <div className="mx-auto max-w-6xl px-6 py-8">
                {/* Heading */}
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-slate-900">Order History</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Manage, track, and review your recent e-commerce purchases and receipts.
                    </p>
                </div>

                {/* Stat cards */}
                <div className="mb-6 flex gap-4">
                    <StatCard
                        label="Total Orders"
                        value="38"
                        caption="Lifetime order count"
                        icon={<Archive className="h-3.5 w-3.5" />}
                    />
                    <StatCard
                        label="In Transit"
                        value="2"
                        caption="Currently with carrier"
                        icon={<Truck className="h-3.5 w-3.5" />}
                    />
                    <StatCard
                        label="Delivered This Month"
                        value="5"
                        caption="Delivered in October"
                        icon={<CheckCircle2 className="h-3.5 w-3.5" />}
                    />
                </div>

                {/* Toolbar */}
                <div className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3">
                    <div className="flex flex-1 items-center gap-3">
                        <div className="relative max-w-xs flex-1">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by Order ID or item..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                            />
                        </div>
                        <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
                            Status: All
                            <ChevronDown className="h-3.5 w-3.5" />
                        </button>
                        <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
                            <Calendar className="h-3.5 w-3.5" />
                            Last 30 Days
                            <ChevronDown className="h-3.5 w-3.5" />
                        </button>
                    </div>
                    <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                        <Download className="h-3.5 w-3.5" />
                        Export CSV
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-slate-100 text-[11px] font-medium text-slate-400">
                                <th className="px-5 py-3 font-medium">Order ID</th>
                                <th className="px-3 py-3 font-medium">Date Placed</th>
                                <th className="px-3 py-3 font-medium">Items Summary</th>
                                <th className="px-3 py-3 text-right font-medium">Total</th>
                                <th className="px-3 py-3 font-medium">Status</th>
                                <th className="px-5 py-3 text-right font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
                                >
                                    <td className="px-5 py-3.5 font-medium text-slate-900">
                                        {order.id}
                                    </td>
                                    <td className="px-3 py-3.5 text-slate-500">
                                        {order.datePlaced}
                                    </td>
                                    <td className="px-3 py-3.5">
                                        <div className="flex items-center gap-3">
                                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-white">
                                                <Package className="h-4 w-4" />
                                            </span>
                                            <div>
                                                <div className="font-medium text-slate-900">
                                                    {order.itemTitle}
                                                </div>
                                                <div className="text-xs text-slate-400">
                                                    {order.itemSubtitle}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 py-3.5 text-right font-medium text-slate-900">
                                        {order.total}
                                    </td>
                                    <td className="px-3 py-3.5">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[order.status]}`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5 text-right">
                                        <a
                                            href="#"
                                            className="font-medium text-indigo-600 hover:text-indigo-700"
                                        >
                                            View Details
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                    <span>
                        Showing <span className="font-medium text-slate-700">1-7</span> of{" "}
                        <span className="font-medium text-slate-700">38</span> orders
                    </span>
                    <div className="flex items-center gap-1.5">
                        <button className="flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-slate-500 hover:bg-white disabled:opacity-50">
                            <ChevronLeft className="h-3.5 w-3.5" />
                            Previous
                        </button>
                        {[1, 2, 3].map((n) => (
                            <button
                                key={n}
                                className={`h-8 w-8 rounded-lg border text-sm ${n === page
                                        ? "border-indigo-200 bg-indigo-50 font-medium text-indigo-600"
                                        : "border-slate-200 text-slate-600 hover:bg-white"
                                    }`}
                            >
                                {n}
                            </button>
                        ))}
                        <span className="px-1 text-slate-400">…</span>
                        <button className="h-8 w-8 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-white">
                            {totalPages}
                        </button>
                        <button className="flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-slate-500 hover:bg-white">
                            Next
                            <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}