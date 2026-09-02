"use client";

import { useRouter } from "next/navigation";
import { Box, ShoppingCart, Search } from "lucide-react";

type Item = {
    name: string;
    price: number;
};

type Category = {
    label: string;
    image: string; // swap this for your own licensed product art
    items: Item[];
};

const CATEGORIES: Category[] = [
    {
        label: "Roblox Gift Card",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9uErhbqIK9zoIW7xmVAahmYHuF7T_GHKHbALbsTo6sA&s=10",
        items: [10, 15, 25, 50, 100].map((price) => ({
            name: `Roblox Gift Card $${price}`,
            price,
        })),
    },
    {
        label: "Valorant Points",
        image: "https://www.dragon4deals.com/wp-content/uploads/2025/01/Valorant-PointsN.png",
        items: [
            { vp: 420, price: 4.99 },
            { vp: 700, price: 9.99 },
            { vp: 1375, price: 14.99 },
            { vp: 2400, price: 29.99 },
            { vp: 4000, price: 49.99 },
        ].map(({ vp, price }) => ({ name: `${vp} Valorant Points`, price })),
    },
    {
        label: "Minecoins",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0P7vUq_el0YWtV9ga64swsuFLh-CLI5-cshdl_k_H09tYjg_0dU_UyVo&s=10",
        items: [
            { mc: 320, price: 1.99 },
            { mc: 1020, price: 4.99 },
            { mc: 1720, price: 6.99 },
            { mc: 3500, price: 12.99 },
            { mc: 8800, price: 23.99 },
        ].map(({ mc, price }) => ({ name: `${mc} Minecoins`, price })),
    },
];

const ALL_ITEMS = CATEGORIES.flatMap((c) => c.items);
const SUBTOTAL = ALL_ITEMS.reduce((sum, item) => sum + item.price, 0);
const CART_COUNT = 3;

export default function SuperStore() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-white text-slate-900">
            {/* Nav */}
            <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
                <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900">
                            <Box className="h-4 w-4 text-white" strokeWidth={2.5} />
                        </div>
                        <span className="text-[15px] font-semibold tracking-tight">Super Store</span>
                    </div>

                    <div className="hidden flex-1 max-w-sm items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-400 sm:flex">
                        <Search className="h-3.5 w-3.5" />
                        <span>Search top-ups…</span>
                    </div>

                    <button
                        onClick={() => router.push("/cart")}
                        className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
                    >
                        <ShoppingCart className="h-4 w-4" />
                        {CART_COUNT}
                    </button>
                </div>
            </header>

            {/* Body */}
            <main className="mx-auto max-w-6xl px-6 pb-32 pt-10">
                <h1 className="text-2xl font-semibold tracking-tight">Super Store</h1>
                <p className="mt-1.5 text-[13px] text-slate-500">
                    Roblox, Valorant &amp; Minecraft top-ups. {ALL_ITEMS.length} packs currently indexed.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                    {CATEGORIES.flatMap((category) =>
                        category.items.map((item) => (
                            <div
                                key={item.name}
                                className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md"
                            >
                                <img
                                    src={category.image}
                                    alt={category.label}
                                    className="mb-4 h-16 w-16 rounded-lg object-cover"
                                />
                                <p className="text-[13px] font-medium leading-snug text-slate-800">
                                    {item.name}
                                </p>
                                <p className="mt-1 text-[13px] text-slate-500">${item.price.toFixed(2)}</p>
                            </div>
                        ))
                    )}
                </div>
            </main>

            {/* Checkout bar */}
            <div className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 backdrop-blur">
                <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex gap-8">
                        <div>
                            <p className="text-[11px] uppercase tracking-wide text-slate-400">Selected items</p>
                            <p className="mt-0.5 text-sm font-semibold text-slate-900">
                                {ALL_ITEMS.length} / {ALL_ITEMS.length} Packs
                            </p>
                        </div>
                        <div>
                            <p className="text-[11px] uppercase tracking-wide text-slate-400">Subtotal</p>
                            <p className="mt-0.5 text-sm font-semibold text-slate-900">
                                ${SUBTOTAL.toFixed(2)}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => router.push("/cart")}
                        className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
                    >
                        <ShoppingCart className="h-4 w-4" />
                        Buy Top-Up Pack
                    </button>
                </div>
            </div>
        </div>
    );
}