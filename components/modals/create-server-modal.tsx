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

const formSchema = z.object({
    name: z.string().min(1, {
        message: 'Server name is required',
    }),
    imageUrl: z.string().min(1, {
        message: 'Server image is required',
    }),
})

const CreateServerModal: NextPage = () => {
    const { isOpen, type, onClose } = useModal()
    const router = useRouter()

    const isModalOpen = isOpen && type === 'createServer'

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            imageUrl: '',
        },
    })

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post('/api/servers', values)

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
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Customize your server
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
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
                                        <FormLabel
                                            className="uppercase text-xs font-bold text-zinc-500
                                   dark:text-secondary/70"
                                        >
                                            Server name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Enter server name"
                                                {...field}
                                            ></Input>
                                        </FormControl>
                                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                                        <div className="text-xs/normal text-zinc-500">
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
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button variant="ghost">Back</Button>
                            <Button
                                size="server"
                                disabled={isLoading}
                                variant="primary"
                            >
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateServerModal
