"use client";

import { useState } from "react";
import { Eye, EyeOff, Sparkles } from "lucide-react";
import { useRouter } from 'next/navigation';

function GithubIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.8 1.18 1.83 1.18 3.09 0 4.43-2.69 5.4-5.26 5.69.42.36.78 1.07.78 2.15 0 1.56-.01 2.81-.01 3.19 0 .31.21.66.79.55A10.53 10.53 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
        </svg>
    );
}

function GoogleIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
            <path
                fill="#4285F4"
                d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.63h6.47c-.28 1.5-1.13 2.77-2.4 3.62v3h3.88c2.27-2.09 3.57-5.17 3.57-8.8z"
            />
            <path
                fill="#34A853"
                d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.95H1.26v3.11C3.24 21.3 7.28 24 12 24z"
            />
            <path
                fill="#FBBC05"
                d="M5.27 14.3a7.2 7.2 0 0 1 0-4.6V6.59H1.26a12 12 0 0 0 0 10.82l4.01-3.11z"
            />
            <path
                fill="#EA4335"
                d="M12 4.75c1.76 0 3.34.61 4.58 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.28 0 3.24 2.7 1.26 6.59l4.01 3.11C6.22 6.86 8.87 4.75 12 4.75z"
            />
        </svg>
    );
}

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Wire this up to your auth provider (NextAuth, Clerk, custom API, etc).
        await new Promise((resolve) => setTimeout(resolve, 900));
        setIsSubmitting(false);
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                {/* Brand */}
                <div className="mb-6 flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                        <Sparkles className="h-4 w-4 text-white" strokeWidth={2.5} />
                    </span>
                    <span className="text-[15px] font-semibold text-slate-900">
                        Super Store
                    </span>
                </div>

                {/* OAuth */}
                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                    >
                        <GoogleIcon />
                        Google
                    </button>
                    <button
                        type="button"
                        className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                    >
                        <GithubIcon />
                        GitHub
                    </button>
                </div>

                {/* Divider */}
                <div className="my-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-slate-200" />
                    <span className="text-[11px] font-medium tracking-wide text-slate-400">
                        OR CONTINUE WITH
                    </span>
                    <div className="h-px flex-1 bg-slate-200" />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-1.5 block text-sm font-medium text-slate-900"
                        >
                            Email address
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-shadow focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                    </div>

                    <div>
                        <div className="mb-1.5 flex items-center justify-between">
                            <label htmlFor="password" className="text-sm font-medium text-slate-900">
                                Password
                            </label>
                            <a
                                href="#"
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                            >
                                Forgot password?
                            </a>
                        </div>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                required
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-lg border border-slate-200 px-3 py-2 pr-10 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-shadow focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        onClick={() => router.push('/order')}
                        className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {isSubmitting ? "Signing in…" : "Sign in to Aura"}
                    </button>
                </form>
            </div>
        </main >
    );
}