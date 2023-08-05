import React from 'react'
import { useQueryClient } from 'react-query';
import { IoTrashOutline } from 'react-icons/io5'
import Link from 'next/link';

interface TraitOptionProps {
    id: string;
    name: string;
    description: string;
    effects: any;
    styles: string;
}

function DisplayTraitValue(props: {value: string}) {
    const value = props.value.split("+");

    if(props.value !== "0"){
        return <span className='text-green-500 font-light'>{props.value}</span>
    }else{
        return null;
    }
}

export default function TraitOption(trait: TraitOptionProps) {
    const queryClient = useQueryClient();


    const deleteTrait = async () => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/traits/${trait.id}`, {
                method: 'DELETE',
            });

            console.log(`Response: ${JSON.stringify(response)}`);

            queryClient.invalidateQueries('traits');
        }catch(e){
            console.log(`Error: ${e}`);
        }
    };

    return (
    <div className={`${trait.styles}`}>
        <div className='flex items-center justify-between'>
        <div>
            <Link href={`/traits/${trait.id}`}>
                <h3 className='font-bold my-2 text-yellow-200/70'>{trait.name}</h3>
            </Link>
            <div>
                <p className='my-1 text-gray-100 '>{trait.description}</p>
                <div className='flex flex-col font-extralight italic '>
                    {/* Trait Effects*/}
                    { (trait.effects && trait.effects.length > 0) && 
                            <p>
                                Effects:
                            </p>}
                            {trait.effects.map((effect: any) => {
                                return (
                                <div key={effect.effect.id} className='px-4 font-light'>
                                    <p>
                                        <Link href={`/effects/${effect.effect.id}`}><span className='text-yellow-400 font-normal'>{effect.effect.name}</span></Link> lasting <span className='text-purple-400'>{effect.duration}</span> T
                                    </p>
                                    { (effect.conditions && effect.conditions !== "0") && <p className='px-4 font-light text-gray-400 text-sm'>Conditions: <span className='text-orange-500 font-light'>{effect.conditions}</span> </p>}
                                    <p>
                                        <span className='px-4 text-gray-400 font-light'>{effect.effect.description}</span>
                                    </p>
                                    <p className='px-4 font-light text-gray-400 text-sm'>CD: <span className='text-purple-400'> {effect.cooldown}</span> T</p>
                                </div>
                                )
                            })}
                        
                </div>
                
                
            </div>
        </div>
        <div>
            <h5 className="invisible group-hover:visible mx-1 rounded-lg px-3 py-1 bg-black border hover:bg-purple-300/10 border-yellow-900/50
                                 active:translate-y-1 text-xl cursor-pointer text-yellow-200/70 " onClick={deleteTrait}><IoTrashOutline/></h5>
        </div>
        </div>
    </div>
    )
}
