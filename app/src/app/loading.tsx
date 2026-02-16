export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/10 via-transparent to-brand-secondary/10 pointer-events-none" />

            <div className="relative flex flex-col items-center gap-6">
                <div className="w-24 h-24 relative">
                    <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-t-brand-primary border-r-brand-secondary border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-4 border-4 border-white/5 rounded-full"></div>
                    <div className="absolute inset-4 border-4 border-t-transparent border-r-transparent border-b-brand-accent border-l-brand-primary rounded-full animate-spin animation-delay-2000"></div>
                </div>
                <p className="text-gray-400 font-medium tracking-wide animate-pulse">
                    LOADING
                </p>
            </div>
        </div>
    )
}
