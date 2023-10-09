import { NextPage } from 'next'
import React from 'react'
import { currentProfile } from '@/lib/current-profile'
import { redirectToSignIn } from '@clerk/nextjs'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import ServerSidebar from '@/components/server/server-sidebar'

interface ServerIdLayoutProps {
    children: React.ReactNode
    params: { serverId: string }
}

const ServerIdLayout: NextPage<ServerIdLayoutProps> = async ({
    children,
    params,
}) => {
    const profile = await currentProfile()

    if (!profile) {
        return redirectToSignIn()
    }

    const server = await db.server.findUnique({
        where: {
            id: params.serverId,
            members: {
                some: {
                    profileId: profile.id,
                },
            },
        },
    })

    if (!server) {
        return redirect('/')
    }

    return (
        <div className="full">
            <div className="hidden fixed md:flex h-full w-60 z-20 flex-col inset-y-0">
                <ServerSidebar serverId={params.serverId} />
            </div>
            <main className="h-full md:pl-60">{children}</main>
        </div>
    )
}

export default ServerIdLayout
