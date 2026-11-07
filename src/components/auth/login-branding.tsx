import React from 'react'
import { COMPANY_EST, COMPANY_LOGO, COMPANY_NAME } from '@/lib/demo-roles'

export function LoginBranding() {
    return (
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
            {/* Background Image / Overlay */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#13498a] via-[#1a3a61] to-[#0a1e3a]" />
            </div>

            {/* Background patterns */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#38bdf8]/20 rounded-full blur-3xl opacity-50" />
            </div>

            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center px-16 text-white">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-16 w-16 rounded-2xl bg-white backdrop-blur-sm flex items-center justify-center shadow-xl p-2 border border-white/20">
                        <img
                            src={COMPANY_LOGO}
                            alt={COMPANY_NAME}
                            className="h-full w-full object-contain"
                        />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{COMPANY_NAME}</h1>
                        <p className="text-white/70 text-sm">{COMPANY_EST}</p>
                    </div>
                </div>

                <h2 className="text-4xl font-bold leading-tight mb-6">
                    Modern Workforce <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-white to-blue-200">
                        Management Platform
                    </span>
                </h2>

                <p className="text-lg text-white/80 max-w-md">
                    Streamline project allocation, monitor real-time attendance, manage leaves, and accelerate team productivity with our unified system.
                </p>

                <div className="mt-12 grid grid-cols-2 gap-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                        <p className="text-3xl font-bold">100%</p>
                        <p className="text-white/70 text-sm mt-1">Operational Sync</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                        <p className="text-3xl font-bold">24/7</p>
                        <p className="text-white/70 text-sm mt-1">Real-time Visibility</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
