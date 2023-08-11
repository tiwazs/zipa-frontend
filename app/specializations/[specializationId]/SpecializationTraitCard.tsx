import Link from 'next/link';
import React from 'react'
import { IoTrashOutline } from 'react-icons/io5';
import { useQueryClient } from 'react-query';

interface SpecializationTraitCardProps {
    specializationId: string;
    specializationtrait: any;
    editable: boolean;
}

export default function SpecializationTraitCard({ specializationId, specializationtrait, editable }: SpecializationTraitCardProps) {
    const trait = specializationtrait.trait;
    const queryClient = useQueryClient();

    const deleteTrait = async () => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/specializations/remove_trait/${specializationId}?trait_id=${trait.id}`, {
                method: 'PUT',
            });

            console.log(`Response: ${JSON.stringify(response)}`);

            queryClient.invalidateQueries('specialization');
        }catch(e){
            console.log(`Error: ${e}`);
        }
    };

    return (
        <div className='group my-2 px-4 py-2 font-light dark:border-2 rounded-md dark:border-yellow-900/50 flex items-center justify-between '>
            <div>
            <p>
                <Link href={`/traits/${specializationtrait.trait.id}`}><span className='text-yellow-400 font-normal'>{trait.name}</span></Link>
            </p>
            <p>
                <span className='px-4 text-gray-400 font-light'>{trait.description}</span>
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
