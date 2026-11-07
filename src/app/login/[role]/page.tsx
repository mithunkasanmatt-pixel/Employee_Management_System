'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/auth-context'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoadingButton } from '@/components/shared/loading-button'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff, Lock, Mail, ArrowLeft, Check, Copy, RotateCcw } from 'lucide-react'
import { toast } from 'sonner'
import { LoginBranding } from '@/components/auth/login-branding'
import { RoleIcon } from '@/components/auth/role-icon'
import {
    COMPANY_EST,
    COMPANY_LOGO,
    COMPANY_NAME,
    getDemoRoleBySlug,
} from '@/lib/demo-roles'

export default function RoleLoginPage() {
    const params = useParams()
    const router = useRouter()
    const { login, user } = useAuth()

    const roleSlug = typeof params?.role === 'string' ? params.role : ''
    const roleConfig = getDemoRoleBySlug(roleSlug)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [copiedEmail, setCopiedEmail] = useState(false)

    // Pre-populate credentials for this role
    useEffect(() => {
        if (roleConfig) {
            setEmail(roleConfig.email)
            setPassword(roleConfig.password)
        }
    }, [roleConfig])

    // Redirect to dashboard if already logged in
    useEffect(() => {
        if (user) {
            router.push('/dashboard')
        }
    }, [user, router])

    if (!roleConfig) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-[#0a1e3a]">
                <div className="max-w-md w-full bg-white dark:bg-[#13498a]/20 p-8 rounded-3xl shadow-xl text-center border border-slate-200 dark:border-white/10">
                    <div className="h-14 w-14 rounded-2xl bg-[#b12024]/10 text-[#b12024] flex items-center justify-center mx-auto mb-4">
                        <Lock className="h-6 w-6" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Role Not Found</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 mb-6">
                        The requested role &quot;{roleSlug}&quot; is not configured in the demo portal.
                    </p>
                    <Button
                        onClick={() => router.push('/login')}
                        className="w-full bg-[#13498a] hover:bg-[#0f3d73] text-white rounded-xl"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Role Selection
                    </Button>
                </div>
            </div>
        )
    }

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(roleConfig.email)
        setCopiedEmail(true)
        toast.success('Email copied to clipboard')
        setTimeout(() => setCopiedEmail(false), 2000)
    }

    const handleResetCredentials = () => {
        setEmail(roleConfig.email)
        setPassword(roleConfig.password)
        toast.info('Credentials reset to default')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const result = await login(email, password)

        if (result.success) {
            if (result.sundayAlert) {
                window.alert(result.sundayAlert)
            }
            toast.success(`Welcome back, ${roleConfig.title}!`)
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
            toast.error(result.error || 'Login failed. Please check credentials.')
        }

        setLoading(false)
    }

    return (
        <div className="min-h-screen flex">
            {/* Left side - Shared Corporate Branding */}
            <LoginBranding />

            {/* Right side - Dedicated Role Login */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-slate-50 dark:bg-[#0a1e3a] overflow-y-auto">
                <div className="w-full max-w-md py-6">
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
                        {/* Top Back Navigation */}
                        <div className="flex items-center justify-between mb-6">
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-[#13498a] dark:text-slate-400 dark:hover:text-blue-300 transition-colors"
                            >
                                <ArrowLeft className="h-3.5 w-3.5" />
                                All Roles
                            </Link>

                            <Badge
                                variant="outline"
                                className={`text-[10px] px-2 py-0.5 uppercase font-bold tracking-wider ${roleConfig.badgeColor}`}
                            >
                                {roleConfig.role}
                            </Badge>
                        </div>

                        {/* Role Header */}
                        <div className="flex items-center gap-3.5 mb-6">
                            <div
                                className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 ${roleConfig.accentBg}`}
                            >
                                <RoleIcon name={roleConfig.iconName} className="h-6 w-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {roleConfig.title}
                                </h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                    {roleConfig.department} • {roleConfig.designation}
                                </p>
                            </div>
                        </div>

                        {/* Demo Credentials Quick-View Box */}
                        <div className="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-slate-700 dark:text-slate-300">
                                    Demo Credentials:
                                </span>
                                <button
                                    type="button"
                                    onClick={handleResetCredentials}
                                    className="inline-flex items-center gap-1 text-[11px] text-[#13498a] dark:text-blue-300 hover:underline"
                                    title="Reset to default demo values"
                                >
                                    <RotateCcw className="h-3 w-3" />
                                    Reset
                                </button>
                            </div>

                            <div className="flex items-center justify-between bg-white dark:bg-black/20 p-2 rounded-lg border border-slate-200/80 dark:border-white/5 font-mono">
                                <span className="text-slate-800 dark:text-slate-200 truncate mr-2">
                                    {roleConfig.email}
                                </span>
                                <button
                                    type="button"
                                    onClick={handleCopyEmail}
                                    className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 shrink-0"
                                    title="Copy email"
                                >
                                    {copiedEmail ? (
                                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                                    ) : (
                                        <Copy className="h-3.5 w-3.5" />
                                    )}
                                </button>
                            </div>

                            <div className="flex items-center justify-between bg-white dark:bg-black/20 p-2 rounded-lg border border-slate-200/80 dark:border-white/5 font-mono">
                                <span className="text-slate-800 dark:text-slate-200">
                                    {roleConfig.password}
                                </span>
                                <span className="text-[10px] text-slate-400 font-sans">Pre-filled</span>
                            </div>
                        </div>

                        {/* Login Form */}
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
                                        className="pl-10 h-11 text-sm bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 rounded-xl focus:ring-[#13498a]"
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
                                        className="pl-10 pr-10 h-11 text-sm bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 rounded-xl focus:ring-[#13498a]"
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
                                className="w-full h-11 bg-gradient-to-r from-[#13498a] to-[#1a3a61] hover:from-[#1a3a61] hover:to-[#13498a] text-white rounded-xl font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all border-none"
                            >
                                Sign In as {roleConfig.shortTitle}
                            </LoadingButton>
                        </form>

                        {/* Switch Role link */}
                        <div className="mt-5 text-center">
                            <Link
                                href="/login"
                                className="text-xs text-slate-500 hover:text-[#13498a] dark:text-slate-400 dark:hover:text-blue-300 transition-colors"
                            >
                                Need to demonstrate a different role?{' '}
                                <span className="font-semibold underline">Switch role</span>
                            </Link>
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
