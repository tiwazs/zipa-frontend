import Link from 'next/link';
import React from 'react'
import { IoTrashOutline } from 'react-icons/io5';
import { useQueryClient } from 'react-query';

interface SimpleExtendedCardCardProps {
    object_info: any;
    object_query_key: string;
    redirect_endpoint: string;
    icon_endpoint: string;
    remove_endpoint: string;
    editable: boolean;
}

export default function SimpleExtendedCard({ object_info, object_query_key, redirect_endpoint, icon_endpoint, remove_endpoint, editable }: Readonly<SimpleExtendedCardCardProps>) {
    const queryClient = useQueryClient();

    const deleteTrait = async () => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${remove_endpoint}${object_info.id}`, {
                method: 'PUT',
            });

            console.log(`Response: ${JSON.stringify(response)}`);

            queryClient.invalidateQueries(object_query_key);
        }catch(e){
            console.log(`Error: ${e}`);
        }
    };

    return (
        <div className='group my-2 px-4 py-2 font-light dark:border-2 rounded-md dark:border-yellow-900/50 flex items-center justify-between '>
            <div>
            <div className='flex items-center space-x-2'>
                <img src={`${process.env.NEXT_PUBLIC_API_URL}${icon_endpoint}`} alt="" className='w-12 h-12 rounded-md border-2 border-gray-500/60 my-2' />
                <p>
                    <Link href={`${redirect_endpoint}${object_info.id}`}><span className='text-yellow-400 font-normal'>{object_info.name}</span></Link>
                </p>
            </div>
            <p>
                <span className='px-4 text-gray-400 font-light'>{object_info.description}</span>
                <div className='px-4 flex flex-col font-extralight italic '>

                </div>
            </p>
            </div>
            <div>
                {editable && <h5 className="invisible group-hover:visible mx-1 rounded-lg px-3 py-1 bg-black border hover:bg-purple-300/10 border-yellow-900/50
                                    active:translate-y-1 text-xl cursor-pointer text-yellow-200/70 " onClick={deleteTrait}><IoTrashOutline/></h5>}
            </div>
        </div>
    )
}
