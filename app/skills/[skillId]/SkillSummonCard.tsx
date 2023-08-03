import Link from 'next/link';
import React from 'react'
import { IoTrashOutline } from 'react-icons/io5';
import { useQueryClient } from 'react-query';

interface SkillSummonCardProps {
    skillId: string;
    summon: any;
}

export default function SkillSummonCard({ skillId, summon }: SkillSummonCardProps) {
    const queryClient = useQueryClient();

    const deleteEffect = async () => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skills/remove_summon/${skillId}?summon_id=${summon.unit.id}`, {
                method: 'PUT',
            });

            console.log(`Response: ${JSON.stringify(response)}`);

            queryClient.invalidateQueries('skill');
        }catch(e){
            console.log(`Error: ${e}`);
        }
    };
    
    return (
        <div className='group px-4 py-2 font-light dark:border-2 rounded-md dark:border-yellow-900/50 flex items-center justify-between '>
            <div>
            <p>
                <Link href={`/summons/${summon.unit.id}`}><span className='text-yellow-400 font-normal'>{summon.unit.name}</span></Link> lasting <span className='text-purple-400'>{summon.duration}</span> T
            </p>
            <p>
                <span className='px-4 text-gray-400 font-light'>{summon.unit.description}</span>
            </p>
            </div>
            <div>
                <h5 className="invisible group-hover:visible mx-1 rounded-lg px-3 py-1 bg-black border hover:bg-purple-300/10 border-yellow-900/50
                                    active:translate-y-1 text-xl cursor-pointer text-yellow-200/70 " onClick={deleteEffect}><IoTrashOutline/></h5>
            </div>
        </div>
    )
}
