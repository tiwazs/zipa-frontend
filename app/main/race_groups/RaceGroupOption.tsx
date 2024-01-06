import React from 'react'
import { useQueryClient } from 'react-query';
import { IoTrashOutline } from 'react-icons/io5'
import Link from 'next/link';

interface RaceGroupOptionProps {
    id: string;
    name: string;
    description: string;
    identity: string;
    aspects: string;
    unit_specializations: any;
    traits: any;
    styles: string;
}

export default function RaceGroupOption(race_group: Readonly<RaceGroupOptionProps>) {
    const queryClient = useQueryClient();


    const deleteRaceGroup = async () => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/race_groups/${race_group.id}`, {
                method: 'DELETE',
            });

            console.log(`Response: ${JSON.stringify(response)}`);

            queryClient.invalidateQueries('race_groups');
        }catch(e){
            console.log(`Error: ${e}`);
        }
    };

    return (
    <div className={`${race_group.styles}`}>
        <div className='flex items-center justify-between'>
        <div className='w-full'>
            <Link href={`/main/race_groups/${race_group.id}`}>
                <div className='my-2'>
                    <h3 className={`font-bold text-yellow-200/70`}>{race_group.name}</h3>
                </div>
            </Link>
            <div className='w-full flex items-center justify-between'>
                <div>
                    <p className='my-1 text-gray-100 '>{race_group.description}</p>
                   
                </div>
            </div>
        </div>
        <div>
            <h5 className="invisible group-hover:visible mx-1 rounded-lg px-3 py-1 bg-black border hover:bg-purple-300/10 border-yellow-900/50
                                 active:translate-y-1 text-xl cursor-pointer text-yellow-200/70 " onClick={deleteRaceGroup}><IoTrashOutline/></h5>
        </div>
        </div>
    </div>
    )
}
