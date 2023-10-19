'use client'
import { NextPage } from 'next'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { useModal } from '@/hooks/use-modal-store'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Check, Copy, RefreshCw } from 'lucide-react'
import { useOrigin } from '@/hooks/use-origin'
import { useState } from 'react'
import axios from 'axios'

const InviteModal: NextPage = () => {
    const { onOpen, isOpen, type, onClose, data } = useModal()
    const origin = useOrigin()

    const isModalOpen = isOpen && type === 'invite'
    const { server } = data

    const [copied, setCopied] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const inviteUrl = `${origin}/invite/${server?.inviteCode}`

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl)
        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 1000)
    }

    const onGenerateNewLink = async () => {
        try {
            setIsLoading(true)
            const response = await axios.patch(
                `/api/servers/${server?.id}/invite-code`
            )

            onOpen('invite', { server: response.data })
        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden dark:bg-dark dark:text-white">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Invite Friends
                    </DialogTitle>
                </DialogHeader>
                <div className="p-6 ">
                    <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                        Server invite link
                    </Label>
                    <div className="flex items-center mt-2 gap-x-2  dark:bg-dark">
                        <Input
                            disabled={isLoading}
                            className=" bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                            value={inviteUrl}
                        />
                        <Button
                            disabled={isLoading}
                            onClick={onCopy}
                            size="icon"
                            className="dark:bg-zinc-300/50 bg-zinc-500"
                        >
                            {copied ? <Check /> : <Copy className="w-4 h4" />}
                        </Button>
                    </div>
                    <div className="flex items-center w-full justify-between">
                        <Button
                            disabled={isLoading}
                            onClick={onGenerateNewLink}
                            variant="link"
                            size="sm"
                            className="text-xs text-zinc-500 dark:text-zinc-300 mt-4"
                        >
                            Generate a new link
                            <RefreshCw className="w-4 h-4 ml-2" />
                        </Button>
                        <Button
                            className="hover:underline dark:text-white mt-3"
                            variant="ghost"
                            onClick={() => onClose()}
                            type="button"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default InviteModal
