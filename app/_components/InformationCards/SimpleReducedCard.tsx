import Link from 'next/link';
import React from 'react'
import { IoTrashOutline } from 'react-icons/io5';
import { useQueryClient } from 'react-query';

interface SimpleReducedCardCardProps {
    object_info: any;
    object_query_key: string;
    redirect_endpoint: string;
    icon_endpoint: string;
    remove_endpoint: string;
    editable: boolean;
    style?: string;
}

export default function SimpleReducedCard({ object_info, object_query_key, redirect_endpoint, icon_endpoint, remove_endpoint, editable, style }: Readonly<SimpleReducedCardCardProps>) {
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
        <div className={`border-yellow-400/50 bg-black group py-1 h-28 w-32 font-light dark:border-2 rounded-md text-yellow-200/70 font-norma ${style}`}>
            <div className='w-full h-full flex flex-col items-center justify-center'>
                <img src={`${process.env.NEXT_PUBLIC_API_URL}${icon_endpoint}`} alt="" className='w-12 h-12 rounded-md border-2 border-gray-500/60 my-1' />
                <h3 className='text-center'>
                    <Link href={`${redirect_endpoint}${object_info.id}`}><span className='mx-1 l'>{object_info.name}</span></Link>
                </h3>
            </div>
            <div>
                {editable && <h5 className="invisible group-hover:visible mx-1 rounded-lg px-3 py-1 bg-black border hover:bg-purple-300/10 border-yellow-900/50
                                    active:translate-y-1 text-xl cursor-pointer text-yellow-200/70 " onClick={deleteTrait}><IoTrashOutline/></h5>}
            </div>
        </div>
    )
}
