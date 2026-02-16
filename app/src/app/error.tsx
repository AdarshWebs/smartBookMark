'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-950 text-white">
            <h2 className="text-2xl font-bold">Something went wrong!</h2>
            <Button onClick={() => reset()}>Try again</Button>
        </div>
    )
}
