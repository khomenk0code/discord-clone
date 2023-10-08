'use client'
import { NextPage } from 'next'
import { UploadDropzone } from '@/lib/uploadthing'

import { X } from 'lucide-react'
import Image from 'next/image'
import '@uploadthing/react/styles.css'

interface FileUploadProps {
    onChange: (url?: string) => void
    value: string
    endpoint: 'messageFile' | 'serverImage'
}

export const FileUpload: NextPage<FileUploadProps> = ({
    onChange,
    value,
    endpoint,
}) => {
    const fileType = value?.split('.').pop()

    if (value && fileType !== 'pdf') {
        return (
            <div className="relative h-20 w-20">
                <Image
                    fill
                    src={value}
                    alt="Upload"
                    className="rounded-full"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <button
                    onClick={() => onChange('')}
                    className="absolute bg-error text-white p-1 top-0 right-0 shadow-sm rounded-full"
                    type="button"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        )
    }

    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url)
            }}
            onUploadError={(error: Error) => {
                console.log(error)
            }}
        />
    )
}

export default FileUpload
