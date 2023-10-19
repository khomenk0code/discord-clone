'use client'

import { NextPage } from 'next'
import ActionTooltip from '@/components/navigation/action-tooltip'
import { cn } from '@/lib/utils'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'

interface NavigationItemProps {
    id: string
    imageUrl: string
    name: string
}

const NavigationItem: NextPage<NavigationItemProps> = ({
    id,
    name,
    imageUrl,
}) => {
    const params = useParams()
    const router = useRouter()

    const handleServerRedirect = () => {
        router.push(`/servers/${id}`)
    }

    return (
        <ActionTooltip side="right" align="center" label={name}>
            <button
                className="flex relative items-center group"
                onClick={handleServerRedirect}
            >
                <div
                    className={cn(
                        'absolute left-0 bg-primary rounded-r-full slideRight w-[4px]',
                        params?.serverId !== id && 'group-hover:h-[20px]',
                        params?.serverId === id ? 'h-[40px]' : 'h-[0px]'
                    )}
                />
                <div
                    className={cn(
                        'relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden',
                        params?.serverId === id &&
                            'bg-primary/10 text-primary rounded-[16px]'
                    )}
                >
                    <Image fill src={imageUrl} alt="Channel" />
                </div>
            </button>
        </ActionTooltip>
    )
}

export default NavigationItem
