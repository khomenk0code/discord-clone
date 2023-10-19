'use client'
import { NextPage } from 'next'
import * as z from 'zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import FileUpload from '@/components/file-upload'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useModal } from '@/hooks/use-modal-store'
import { useEffect } from 'react'

const formSchema = z.object({
    name: z.string().min(1, {
        message: 'Server name is required',
    }),
    imageUrl: z.string().min(1, {
        message: 'Server image is required',
    }),
})

const EditServerModal: NextPage = () => {
    const { isOpen, type, onClose, data } = useModal()
    const router = useRouter()

    const isModalOpen = isOpen && type === 'editServer'

    const { server } = data

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            imageUrl: '',
        },
    })

    useEffect(() => {
        if (server) {
            form.setValue('name', server.name)
            form.setValue('imageUrl', server.imageUrl)
        }
    }, [server, form])

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/servers/${server?.id}`, values)

            form.reset()
            router.refresh()
            onClose()
        } catch (e) {
            console.log(e)
        }
    }

    const handleCloseModal = () => {
        form.reset()
        onClose()
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
            <DialogContent className="bg-white dark:bg-dark dark:text-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Customize your server
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500 dark:text-zinc-300">
                        Your server is where you and your friends hang out. Make
                        yours and start talking
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 flex flex-col"
                    >
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField
                                    control={form.control}
                                    name="imageUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    endpoint="serverImage"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                                            Server name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 dark:text-white border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Enter server name"
                                                {...field}
                                            ></Input>
                                        </FormControl>
                                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                                        <div className="text-xs/normal text-zinc-500 dark:text-zinc-300">
                                            By creating a server, you agree to
                                            Discord{"'"}s{' '}
                                            <strong className="text-blue-500">
                                                <Link href="">
                                                    Community Guidelines
                                                </Link>
                                            </strong>
                                            .
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                        </div>
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
                                    size="server"
                                    variant="primary"
                                >
                                    Save
                                </Button>
                            </div>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default EditServerModal
