import React, { ReactNode } from 'react'
import { IoTrashOutline } from 'react-icons/io5'
import Link from 'next/link';

interface InformationOptionProps {
    title?: string;
    text?: string;
    style?: string;
    innerStyle?: string;
    children?: ReactNode
}

export default function InformationOption({title, text, style, innerStyle, children}: InformationOptionProps) {
    return (
    <div className={`group border-transparent px-5 py-2 transition-colors \
                    hover:border-purple-500 hover:bg-purple-300 hover:dark:border-yellow-700/50 \
                    hover:dark:bg-purple-900/20 dark:border-yellow-900/50  my-2 rounded-md \
                                dark:bg-[url('/bg1.jpg')] ${style} `}>
        <div className='flex items-center justify-between'>
        <div className={`w-full ${innerStyle}`}>
            <div className='my-2'>
                <h3 className={`font-bold text-yellow-200/70`}>{title}</h3>
            </div>
            <div className='w-full flex items-center justify-between'>
                <div className='w-full'>
                    <p className='my-1 text-gray-100 '>{text}</p>
                    <p>{children}</p>
                </div>
            </div>
        </div>
        </div>
    </div>
    )
}
