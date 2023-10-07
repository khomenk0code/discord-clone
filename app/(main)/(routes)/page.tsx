import { UserButton } from '@clerk/nextjs'
import { ModeToggle } from '@/components/theme-toggle'

export default function Home() {
    return (
        <div>
            <UserButton afterSignOutUrl="/" />
            <ModeToggle />
        </div>
    )
}
