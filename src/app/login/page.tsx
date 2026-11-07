'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoadingButton } from '@/components/shared/loading-button'
import { Badge } from '@/components/ui/badge'
import { Eye, EyeOff, Lock, Mail, ChevronRight, KeyRound, Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import { LoginBranding } from '@/components/auth/login-branding'
import { RoleIcon } from '@/components/auth/role-icon'
import {
    COMPANY_EST,
    COMPANY_LOGO,
    COMPANY_NAME,
    DEMO_ROLES,
} from '@/lib/demo-roles'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showDirectLogin, setShowDirectLogin] = useState(false)
    const { login, user } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (user) {
            router.push('/dashboard')
        }
    }, [user, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const result = await login(email, password)

        if (result.success) {
            if (result.sundayAlert) {
                window.alert(result.sundayAlert)
            }
            toast.success('Welcome back!')
        } else if (result.requiresLeaveOverride) {
            window.alert('You are on leave today.')
            const shouldSendRequest = window.confirm(
                'Do you want to send a login approval request to admin for today?'
            )

            if (shouldSendRequest) {
                const overrideResult = await login(email, password, { requestLeaveOverride: true })
                if (overrideResult.success) {
                    if (overrideResult.sundayAlert) {
                        window.alert(overrideResult.sundayAlert)
                    }
                    toast.success('Welcome back!')
                } else {
                    toast.error(overrideResult.error || 'Login failed')
                }
            }
        } else {
            toast.error(result.error || 'Login failed')
        }

        setLoading(false)
    }

    return (
        <div className="min-h-screen flex">
            {/* Left side - Shared Corporate Branding */}
            <LoginBranding />

            {/* Right side - Role Selection & Login */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-slate-50 dark:bg-[#0a1e3a] overflow-y-auto">
                <div className="w-full max-w-xl py-6">
                    {/* Mobile logo header */}
                    <div className="lg:hidden flex items-center gap-3 mb-6 justify-center">
                        <div className="h-12 w-12 rounded-xl bg-white flex items-center justify-center shadow-md p-1 border border-slate-200">
                            <img
                                src={COMPANY_LOGO}
                                alt={COMPANY_NAME}
                                className="h-full w-full object-contain"
                            />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                                {COMPANY_NAME}
                            </h1>
                            <p className="text-xs text-slate-500">{COMPANY_EST}</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#13498a]/20 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none p-6 sm:p-8 border border-slate-200 dark:border-white/10">
                        {/* Section Header */}
                        <div className="text-center mb-6">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#13498a]/10 dark:bg-white/10 text-[#13498a] dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-2">
                                <Sparkles className="h-3.5 w-3.5 text-[#b12024]" />
                                Client Demo Access
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                                Select Your Role
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 text-sm mt-1 max-w-md mx-auto">
                                Click on any user role below to access that role&apos;s dedicated login page with pre-filled demo credentials.
                            </p>
                        </div>

                        {/* Role-based Navigation Buttons */}
                        <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                            {DEMO_ROLES.map((roleConfig) => (
                                <Link
                                    key={roleConfig.slug}
                                    href={`/login/${roleConfig.slug}`}
                                    className="group flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 hover:border-[#13498a]/40 dark:hover:border-blue-400/40 hover:shadow-md transition-all duration-200"
                                >
                                    <div className="flex items-center gap-3.5 min-w-0">
                                        <div
                                            className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${roleConfig.accentBg}`}
                                        >
                                            <RoleIcon name={roleConfig.iconName} className="h-5 w-5" />
                                        </div>
                                        <div className="text-left min-w-0">
                                            <div className="flex items-center gap-2">
                                                <p className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base group-hover:text-[#13498a] dark:group-hover:text-blue-300 transition-colors">
                                                    {roleConfig.title}
                                                </p>
                                                <Badge
                                                    variant="outline"
                                                    className={`text-[10px] px-1.5 py-0 h-4 uppercase font-bold tracking-wider shrink-0 ${roleConfig.badgeColor}`}
                                                >
                                                    {roleConfig.role}
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                                                {roleConfig.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-slate-400 group-hover:text-[#13498a] dark:group-hover:text-blue-300 pl-2 shrink-0">
                                        <span className="hidden sm:inline text-xs font-medium">Login</span>
                                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Collapsible Direct Custom Login */}
                        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-white/10">
                            {!showDirectLogin ? (
                                <button
                                    type="button"
                                    onClick={() => setShowDirectLogin(true)}
                                    className="w-full flex items-center justify-center gap-2 text-xs font-medium text-slate-500 hover:text-[#13498a] dark:text-slate-400 dark:hover:text-blue-300 py-2 transition-colors"
                                >
                                    <KeyRound className="h-3.5 w-3.5" />
                                    Or sign in with custom email & password
                                </button>
                            ) : (
                                <div className="space-y-4 pt-2">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                                            Direct Login
                                        </h3>
                                        <button
                                            type="button"
                                            onClick={() => setShowDirectLogin(false)}
                                            className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400"
                                        >
                                            Hide
                                        </button>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-1.5">
                                            <Label
                                                htmlFor="email"
                                                className="text-xs text-slate-700 dark:text-slate-300 font-medium"
                                            >
                                                Email Address
                                            </Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="name@ems.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="pl-10 h-10 text-sm bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 rounded-xl focus:ring-[#13498a]"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label
                                                htmlFor="password"
                                                className="text-xs text-slate-700 dark:text-slate-300 font-medium"
                                            >
                                                Password
                                            </Label>
                                            <div className="relative">
                                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                                <Input
                                                    id="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder="••••••••"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="pl-10 pr-10 h-10 text-sm bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 rounded-xl focus:ring-[#13498a]"
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        <LoadingButton
                                            type="submit"
                                            loading={loading}
                                            className="w-full h-10 text-sm bg-gradient-to-r from-[#13498a] to-[#1a3a61] hover:from-[#1a3a61] hover:to-[#13498a] text-white rounded-xl font-semibold shadow-md border-none"
                                        >
                                            Sign In
                                        </LoadingButton>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>

                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6">
                        © 2014-{new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    )
}
