'use client'
import { NextPage } from 'next'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { useModal } from '@/hooks/use-modal-store'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import qs from 'query-string'

const DeleteChannelModal: NextPage = () => {
    const { isOpen, type, onClose, data } = useModal()
    const { channel, server } = data
    const router = useRouter()

    const isModalOpen = isOpen && type === 'deleteChannel'

    const [isLoading, setIsLoading] = useState(false)

    const handleDeleteServer = async () => {
        try {
            setIsLoading(true)

            const url = qs.stringifyUrl({
                url: `/api/channels/${channel?.id}`,
                query: {
                    serverId: server?.id,
                },
            })

            await axios.delete(url)

            onClose()
            router.refresh()
            router.push(`/servers/${server?.id}`)
        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white dark:bg-dark dark:text-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Delete channel
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500 dark:text-white">
                        Are you sure you want to do this? <br />
                        <span className="font-semibold text-indigo-500 dark:text-white">
                            # {channel?.name}
                        </span>{' '}
                        will be permanently deleted.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 dark:bg-[#2b2d31] px-6 py-4">
                    <div className="flex items-center w-full justify-end">
                        <Button
                            className="hover:underline dark:text-white mr-3"
                            variant="ghost"
                            onClick={() => onClose()}
                            type="button"
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={isLoading}
                            onClick={handleDeleteServer}
                            variant="primary"
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Delete Channel
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteChannelModal
