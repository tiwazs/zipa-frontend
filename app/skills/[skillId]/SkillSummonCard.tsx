import Link from 'next/link';
import React from 'react'
import { IoTrashOutline } from 'react-icons/io5';
import { useQueryClient } from 'react-query';

interface SkillSummonCardProps {
    skillId: string;
    summon: any;
    editable: boolean;
}

export default function SkillSummonCard({ skillId, summon, editable }: SkillSummonCardProps) {
    const queryClient = useQueryClient();

    const deleteEffect = async () => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skills/remove_summon/${skillId}?summon_id=${summon.unit_specialization.id}`, {
                method: 'PUT',
            });

            console.log(`Response: ${JSON.stringify(response)}`);

            queryClient.invalidateQueries('skill');
        }catch(e){
            console.log(`Error: ${e}`);
        }
    };
    
    return (
        <div className='group my-2 px-4 py-2 font-light dark:border-2 rounded-md dark:border-yellow-900/50 flex items-center justify-between '>
            <div>
            <div className='flex items-center space-x-3'>
                <img src={`${process.env.NEXT_PUBLIC_API_URL}/static/specializations/${summon.unit_specialization.id}.jpg`} alt="" className='w-10 h-10 rounded-md border-2 border-gray-500/60 my-2' />
                <p>
                    <Link href={`/summons/${summon.unit_specialization.id}`}><span className='text-yellow-400 font-normal'>{summon.unit_specialization.name}</span></Link> lasting <span className='text-purple-400'>{summon.duration}</span> T
                </p>
            </div>
            <p>
                <span className='px-4 text-gray-400 font-light'>{summon.unit_specialization.description}</span>
            </p>
            </div>
            <div>
                { editable && <h5 className="invisible group-hover:visible mx-1 rounded-lg px-3 py-1 bg-black border hover:bg-purple-300/10 border-yellow-900/50
                                    active:translate-y-1 text-xl cursor-pointer text-yellow-200/70 " onClick={deleteEffect}><IoTrashOutline/></h5>}
            </div>
        </div>
    )
}
