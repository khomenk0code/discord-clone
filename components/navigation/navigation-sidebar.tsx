import { NextPage } from 'next'
import { currentProfile } from '@/lib/current-profile'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import NavigationAction from './navigation-action'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'
import NavigationItem from '@/components/navigation/navigation-item'
import { ModeToggle } from '@/components/theme-toggle'
import { UserButton } from '@clerk/nextjs'

interface NavigationSidebarProps {}

const NavigationSidebar: NextPage<NavigationSidebarProps> = async () => {
    const profile = await currentProfile()

    if (!profile) {
        return redirect('/')
    }

    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id,
                },
            },
        },
    })

    return (
        <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-darker bg-[#E3E5E8] py-3">
            <NavigationAction />
            <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700" />
            <ScrollArea className="flex-1 w-full">
                {servers.map((server) => (
                    <div key={server.id} className="mb-4">
                        <NavigationItem
                            id={server.id}
                            name={server.name}
                            imageUrl={server.imageUrl}
                        />
                    </div>
                ))}
            </ScrollArea>
            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                <ModeToggle />
                <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: 'h-12 w-12',
                        },
                    }}
                />
            </div>
        </div>
    )
}

export default NavigationSidebar
