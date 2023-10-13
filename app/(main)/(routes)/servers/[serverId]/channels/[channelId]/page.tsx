import { NextPage } from 'next'
import { currentProfile } from '@/lib/current-profile'
import { redirectToSignIn } from '@clerk/nextjs'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import ChatHeader from '@/components/chat/chat-header'
import ChatInput from '@/components/chat/chat-input'
import ChatMessages from '@/components/chat/chat-messages'

interface ChannelIdProps {
    params: {
        serverId: string
        channelId: string
    }
}

const ChannelId: NextPage<ChannelIdProps> = async ({ params }) => {
    const profile = await currentProfile()

    if (!profile) {
        return redirectToSignIn()
    }

    const channel = await db.channel.findUnique({
        where: {
            id: params.channelId,
        },
    })

    const member = await db.member.findFirst({
        where: {
            serverId: params.serverId,
            profileId: profile.id,
        },
    })

    if (!channel || !member) {
        redirect('/')
    }

    return (
        <div className="bg-white dark:bg-dark flex flex-col h-full">
            <ChatHeader
                name={channel.name}
                serverId={channel.serverId}
                type={'channel'}
            />
            channe
            <ChatMessages
                member={member}
                name={channel.name}
                chatId={channel.id}
                type="channel"
                apiUrl="/api/messages"
                socketUrl="/api/socket/messages"
                socketQuery={{
                    channelId: channel.id,
                    serverId: channel.serverId,
                }}
                paramKey="channelId"
                paramValue={channel.id}
            />
            <ChatInput
                name={channel.name}
                type="channel"
                apiUrl="/api/socket/messages"
                query={{
                    channelId: channel.id,
                    serverId: channel.serverId,
                }}
            />
        </div>
    )
}

export default ChannelId
