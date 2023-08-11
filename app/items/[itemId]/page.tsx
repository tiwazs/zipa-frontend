'use client'
import React from 'react'
import { useQuery, useQueryClient } from 'react-query';
import DetailedItemChart from './DetailedItemChart';
import { paintRarity } from '@/app/_libs/text_paint_methods';

type ItemPageProps = {
    params: {
        itemId: string;
    }
}

const getItem = async (itemId: string) => {

    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/${itemId}`, {
            method: 'GET',
        });
        console.log(`Response: ${JSON.stringify(response)}`);


        return await response.json();
    }catch(e){
        console.log(`Error: ${e}`);
        return [];
    }
}

export default function ItemPage({ params: { itemId } }: ItemPageProps) {
    const query = useQuery([`item`, itemId], () => getItem(itemId) );
    
    if (query.isLoading) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            <main className="items-center justify-between p-24">
                <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left text-yellow-200/70 ">
                    <h2 className={`mb-3 text-4xl font-medium ${paintRarity(query.data.rarity)}`}>
                        {query.data.name}{' '}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                </div>
                <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial
                        before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 
                        after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent 
                        before:dark:to-purple-700 before:dark:opacity-10 after:dark:from-purple-900 after:dark:via-[#9101ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
                </div>

                <h3 className='my-4 mx-2'>{query.data.description}</h3>

                {/*Item Data*/}
                <DetailedItemChart item={query.data} />
            </main>           
        </>
    )
}
