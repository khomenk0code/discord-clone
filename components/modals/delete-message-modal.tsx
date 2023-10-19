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
import qs from 'query-string'

const DeleteMessageModal: NextPage = () => {
    const { isOpen, onClose, type, data } = useModal()

    const isModalOpen = isOpen && type === 'deleteMessage'
    const { apiUrl, query } = data

    const [isLoading, setIsLoading] = useState(false)

    const handleDeleteMessage = async () => {
        try {
            setIsLoading(true)
            const url = qs.stringifyUrl({
                url: apiUrl || '',
                query,
            })

            await axios.delete(url)

            onClose()
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white dark:bg-dark dark:text-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Delete Message
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500 dark:text-white">
                        Are you sure you want to do this? <br />
                        The message will be permanently deleted.
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
                            onClick={handleDeleteMessage}
                            variant="primary"
                            size="server"
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Delete
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteMessageModal
