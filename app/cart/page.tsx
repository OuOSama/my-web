"use client";

import { useState } from "react";
import { Zap, Users, ShieldCheck, Ticket, Minus, Plus, X, Wallet } from "lucide-react";
import Link from "next/link";

type CartItem = {
    id: string;
    title: string;
    subtitle: string;
    code: string;
    region: string;
    price: number;
    qty: number;
    icon: string;
    iconBg: string;
};

const initialItems: CartItem[] = [
    {
        id: "ff",
        title: "Free Fire — 520 Diamonds",
        subtitle: "Delivered to your account instantly",
        code: "384710225",
        region: "TH",
        price: 329,
        qty: 1,
        icon: "🔥",
        iconBg: "bg-orange-100",
    },
    {
        id: "rov",
        title: "RoV — 900 Vouchers",
        subtitle: "Use for heroes and skins",
        code: "91827364",
        region: "TH",
        price: 499,
        qty: 1,
        icon: "🛡️",
        iconBg: "bg-violet-100",
    },
    {
        id: "pubg",
        title: "PUBG Mobile — 660 UC",
        subtitle: "Top-up direct to your ID",
        code: "550192837",
        region: "Global",
        price: 699,
        qty: 1,
        icon: "🪂",
        iconBg: "bg-sky-100",
    },
];

function formatTHB(n: number) {
    return n.toLocaleString("en-US");
}

export default function CartPage() {
    const [showSuccess, setShowSuccess] = useState(false);
    const handleCheckout = () => {
        // TODO: your actual checkout logic here
        setShowSuccess(true);
    };
    const [items, setItems] = useState<CartItem[]>(initialItems);
    const [promo, setPromo] = useState("");

    const updateQty = (id: string, delta: number) => {
        setItems((prev) =>
            prev.map((it) =>
                it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it
            )
        );
    };

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((it) => it.id !== id));
    };

    const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
    const discount = subtotal > 0 ? 30 : 0;
    const fee = 0;
    const total = subtotal - discount + fee;

    return (
        <div className="min-h-screen bg-[#FAFAFB] px-4 py-10 sm:px-8">
            <div className="mx-auto max-w-5xl">
                {/* Top bar */}
                <header className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
                                S
                            </div>
                            <span className="text-[15px] font-semibold text-slate-900">
                                Super Store
                            </span>
                        </Link>
                    </div>
                    <nav className="flex items-center gap-2 text-sm text-slate-400">
                        <span className="font-medium text-indigo-600">Cart</span>
                        <span>/</span>
                        <span>Checkout</span>
                        <span>/</span>
                        <span>Done</span>
                    </nav>
                </header>

                {/* Title */}
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-slate-900">
                        Your Cart
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Review your top-up items and game IDs before checking out
                    </p>
                </div>

                {/* Stat cards */}
                <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <StatCard
                        icon={<Users className="h-4 w-4" />}
                        iconBg="bg-indigo-50 text-indigo-600"
                        value="100k+"
                        label="Customers served"
                    />
                    <StatCard
                        icon={<ShieldCheck className="h-4 w-4" />}
                        iconBg="bg-emerald-50 text-emerald-600"
                        value="20+"
                        label="Payment channels"
                    />
                    <StatCard
                        icon={<Zap className="h-4 w-4" />}
                        iconBg="bg-amber-50 text-amber-600"
                        value="10 sec"
                        label="Fastest delivery time"
                    />
                </div>

                {/* Promo bar */}
                <div className="mb-4 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 pl-4">
                    <Ticket className="h-4 w-4 text-slate-400" />
                    <input
                        value={promo}
                        onChange={(e) => setPromo(e.target.value)}
                        placeholder="Enter promo code"
                        className="flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                    />
                    <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
                        Apply
                    </button>
                </div>

                {/* Content grid */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
                    {/* Items list */}
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                        <div className="hidden grid-cols-[1fr_140px_110px_90px_32px] gap-2 border-b border-slate-100 px-5 py-3 text-xs font-medium text-slate-400 sm:grid">
                            <span>Item</span>
                            <span>Account</span>
                            <span>Qty</span>
                            <span className="text-right">Price</span>
                            <span />
                        </div>

                        <ul className="divide-y divide-slate-100">
                            {items.map((item) => (
                                <li
                                    key={item.id}
                                    className="grid grid-cols-1 items-center gap-3 px-5 py-4 sm:grid-cols-[1fr_140px_110px_90px_32px] sm:gap-2"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-base ${item.iconBg}`}
                                        >
                                            {item.icon}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">
                                                {item.title}
                                            </p>
                                            <p className="text-xs text-slate-400">
                                                {item.subtitle}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="text-xs text-slate-500">
                                        <p>ID: {item.code}</p>
                                        <p>Server: {item.region}</p>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => updateQty(item.id, -1)}
                                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50"
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus className="h-3 w-3" />
                                        </button>
                                        <span className="w-6 text-center text-sm text-slate-700">
                                            {item.qty}
                                        </span>
                                        <button
                                            onClick={() => updateQty(item.id, 1)}
                                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50"
                                            aria-label="Increase quantity"
                                        >
                                            <Plus className="h-3 w-3" />
                                        </button>
                                    </div>

                                    <p className="text-sm font-semibold text-slate-900 sm:text-right">
                                        ฿{formatTHB(item.price * item.qty)}
                                    </p>

                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-300 transition hover:bg-red-50 hover:text-red-500 sm:justify-self-end"
                                        aria-label="Remove item"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </li>
                            ))}

                            {items.length === 0 && (
                                <li className="px-5 py-10 text-center text-sm text-slate-400">
                                    Your cart is empty
                                </li>
                            )}
                        </ul>

                        {items.length > 0 && (
                            <p className="border-t border-slate-100 px-5 py-3 text-xs text-slate-400">
                                {items.length} item{items.length > 1 ? "s" : ""} in your cart
                            </p>
                        )}
                    </div>

                    {/* Summary */}
                    <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5">
                        <h2 className="mb-4 text-sm font-semibold text-slate-900">
                            Order Summary
                        </h2>

                        <dl className="space-y-2.5 text-sm">
                            <div className="flex justify-between text-slate-500">
                                <dt>Subtotal ({items.length} items)</dt>
                                <dd className="text-slate-700">฿{formatTHB(subtotal)}</dd>
                            </div>
                            <div className="flex justify-between text-slate-500">
                                <dt>Discount</dt>
                                <dd className="text-emerald-600">-฿{formatTHB(discount)}</dd>
                            </div>
                            <div className="flex justify-between text-slate-500">
                                <dt>Transaction fee</dt>
                                <dd className="text-slate-700">฿{formatTHB(fee)}</dd>
                            </div>
                        </dl>

                        <div className="my-4 border-t border-dashed border-slate-200" />

                        <div className="mb-4 flex items-baseline justify-between">
                            <span className="text-sm font-medium text-slate-900">
                                Total due
                            </span>
                            <span className="text-xl font-bold text-slate-900">
                                ฿{formatTHB(total)}
                            </span>
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={items.length === 0}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                        >
                            <Wallet className="h-4 w-4" />
                            Proceed to Checkout
                        </button>
                        {showSuccess && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                                <div className="rounded-xl bg-white p-6 text-center shadow-lg">
                                    <h2 className="mb-2 text-lg font-semibold text-slate-800">Purchase Complete!</h2>
                                    <p className="mb-4 text-sm text-slate-500">Thank you for your order.</p>
                                    <button
                                        onClick={() => setShowSuccess(false)}
                                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}

                        <p className="mt-3 text-center text-[11px] text-slate-400">
                            Secure encrypted checkout · Instant automatic delivery
                        </p>
                    </aside>
                </div>
            </div>
        </div>
    );
}

function StatCard({
    icon,
    iconBg,
    value,
    label,
}: {
    icon: React.ReactNode;
    iconBg: string;
    value: string;
    label: string;
}) {
    return (
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3.5">
            <div>
                <p className="text-lg font-semibold text-slate-900">{value}</p>
                <p className="text-xs text-slate-400">{label}</p>
            </div>
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconBg}`}>
                {icon}
            </div>
        </div>
    );
}