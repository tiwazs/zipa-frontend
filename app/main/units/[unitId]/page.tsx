'use client'
import React from 'react'
import { useQuery, useQueryClient } from 'react-query';
import DetailedUnitChart from './DetailedUnitChart';
import { paintTier, writeTier } from '@/app/_libs/text_paint_methods';

type UnitPageProps = {
    params: {
        unitId: string;
    }
}

const getUnit = async (unitId: string) => {

    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/units/extended/${unitId}?include_items=true&include_race=true&include_specialization=true`, {
            method: 'GET',
        });
        console.log(`Response: ${JSON.stringify(response)}`);


        return await response.json();
    }catch(e){
        console.log(`Error: ${e}`);
        return [];
    }
}

export default function UnitPage({ params: { unitId } }: UnitPageProps) {
    const query = useQuery([`unit`, unitId], () => getUnit(unitId) );
    
    if (query.isLoading) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            <main className="items-center justify-between p-24">
                <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left text-yellow-200/70 ">
                    <h2 className={`mb-3 text-4xl font-medium `}>
                        <div>
                            {query.data.prefix_title &&  <span className=''> {query.data.prefix_title} </span>}{query.data.name}{' '} 
                            <span className='italic text-orange-500 font-extralight'>{query.data.title}</span>
                            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                                -&gt;
                            </span>
                        </div>
                        <div className='flex items-center italic font-medium text-2xl'>
                            <span className='italic'>{query.data.specialization.name}</span>
                            <h3 className={`mx-2 ${paintTier(query.data.specialization.tier)} font-extrabold font-serif`}>{`${writeTier(query.data.specialization.tier)}`}</h3>
                        </div>
                        <div className='flex flex-col italic font-light text-lg'>
                            <h3><span className=' font-medium '>{query.data.race.name}, </span>{query.data.culture.name} | {query.data.Belief.name}</h3>
                        </div>
                    </h2>
                </div>
                <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial
                        before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 
                        after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent 
                        before:dark:to-purple-700 before:dark:opacity-10 after:dark:from-purple-900 after:dark:via-[#9101ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
                </div>

                <h3 className='my-4 mx-2'>{query.data.description}</h3>

                {/*Unit Data*/}
                <DetailedUnitChart unit={query.data} />
            </main>           
        </>
    )
}
