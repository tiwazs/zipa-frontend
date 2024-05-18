import React from 'react'
import { useQueryClient } from 'react-query';
import { IoTrashOutline } from 'react-icons/io5'
import Link from 'next/link';

interface RaceOptionProps {
    id: string;
    name: string;
    description: string;
    identity: string;
    aspects: string;
    unit_specializations: any;
    traits: any;
    styles: string;
}

export default function RaceOption(race: Readonly<RaceOptionProps>) {
    const queryClient = useQueryClient();


    const deleteRace = async () => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/races/${race.id}`, {
                method: 'DELETE',
            });

            console.log(`Response: ${JSON.stringify(response)}`);

            queryClient.invalidateQueries('races');
        }catch(e){
            console.log(`Error: ${e}`);
        }
    };

    return (
    <div className={`${race.styles}`}>
        <div className='flex items-center justify-between'>
        <div className='w-full'>
            <Link href={`/main/races/${race.id}`} className='w-14 h-14'>
                <div className='my-2'>
                    <h3 className={`font-bold text-yellow-200/70`}>{race.name}</h3>
                </div>
            </Link>
            <div className='w-full flex justify-between'>
                <div>
                    <p className='my-1 text-gray-100 '>{race.description}</p>
                    {/* Race Tratis*/}
                    { (race.traits && race.traits.length > 0) && 
                    <p className='italic font-light'>
                        Traits:
                    </p>}
                    {race.traits.map((trait: any) => {
                        return (
                        <div key={trait.trait.id} className='px-4 font-light italic m-1'>
                            <div className='flex items-center space-x-3'>
                                <img src={`${process.env.NEXT_PUBLIC_API_URL}/static/traits/${trait.trait.id}.jpg`} alt="" className='w-10 h-10 rounded-md border-2 border-gray-500/60 my-2' />
                                <p>
                                    <Link href={`/main/traits/${trait.trait.id}`}><span className='text-yellow-400 font-normal'>{trait.trait.name}</span></Link>
                                </p>
                            </div>
                            <p>
                                <span className='px-4 text-gray-400 font-light'>{trait.trait.description}</span>
                            </p>
                            <div className='px-4 flex font-light text-gray-400 text-sm space-x-2'>
                                { (trait.trait.essence_cost && trait.trait.essence_cost !== "0") && <p>Cost <span className='text-blue-500 font-light'>{trait.trait.essence_cost}</span> E</p>}
                                { (trait.trait.vitality_cost && trait.trait.vitality_cost !== "0") && <p>Cost <span className='text-red-500 font-light'>{trait.trait.vitality_cost}</span> V</p>}
                                { (trait.trait.cooldown && trait.trait.cooldown !== 0) && <p>CD <span className='text-purple-400 font-light'>{trait.traits.cooldown}</span> T </p>}
                            </div>
                        </div>
                        )
                    })}
                </div>
            </div>
        </div>
        <div>
            <h5 className="invisible group-hover:visible mx-1 rounded-lg px-3 py-1 bg-black border hover:bg-purple-300/10 border-yellow-900/50
                                 active:translate-y-1 text-xl cursor-pointer text-yellow-200/70 " onClick={deleteRace}><IoTrashOutline/></h5>
        </div>
        </div>
    </div>
    )
}
