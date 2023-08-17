import React from 'react'
import { useQueryClient } from 'react-query';
import { IoTrashOutline } from 'react-icons/io5'
import Link from 'next/link';
import DisplayValue from '../_components/DisplayValue';

interface EffectOptionProps {
    id: string;
    name: string;
    description: string;
    magic_effectiveness: string;
    physical_damage: string;
    magical_damage: string;
    healing: string;
    vitality_recovery: string;
    essence_recovery: string;
    vitality: string;
    range: string;
    damage: string;
    armor: string;
    magic_armor: string;
    essence: string;
    agility: string;
    hit_chance: string;
    evasion: string;
    hit_rate: string;
    movement: string;
    ammo: string;
    shield: string;
    barrier: number;
    incoming_physical_damage: string;
    incoming_magical_damage: string;
    max_stack: number;
    styles: string;
}

export default function EffectOption(effect: EffectOptionProps) {
    const queryClient = useQueryClient();


    const deleteEffect = async () => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/effects/${effect.id}`, {
                method: 'DELETE',
            });

            console.log(`Response: ${JSON.stringify(response)}`);

            queryClient.invalidateQueries('effects');
        }catch(e){
            console.log(`Error: ${e}`);
        }
    };

    return (
    <div className={`${effect.styles} flex space-x-3`}>
        <Link href={`/effects/${effect.id}`}>
            <img src={`${process.env.NEXT_PUBLIC_API_URL}/static/effects/${effect.id}.jpg`} alt="" className='w-12 h-12 rounded-md border-2 border-gray-500/60 my-2' />
        </Link>
        <div className='flex items-center justify-between'>
        <div>
            <Link href={`/effects/${effect.id}`}>
                <h3 className='font-bold my-2 text-yellow-200/70'>{effect.name}</h3>
            </Link>
            <p className='my-1 text-gray-100 '>{effect.description}</p>
            <div className='flex flex-col font-extralight italic'>
                <DisplayValue value={effect.magic_effectiveness} after_text=' Magic Power'/>
                <DisplayValue value={effect.physical_damage} after_text=' Physical Damage'/>
                <DisplayValue value={effect.magical_damage} after_text=' Magic Damage'/>
                <DisplayValue value={effect.healing} after_text=' Healing Power'/>
                <DisplayValue value={effect.vitality_recovery} after_text=' Vitality'/>
                <DisplayValue value={effect.essence_recovery} after_text=' Essence'/>
                <DisplayValue value={effect.vitality} after_text=' Max Vitality'/>
                <DisplayValue value={effect.range} after_text=' Range'/>
                <DisplayValue value={effect.damage} after_text=' All Damage'/>
                <DisplayValue value={effect.armor} after_text=' Armor'/>
                <DisplayValue value={effect.magic_armor} after_text=' Magic Armor'/>
                <DisplayValue value={effect.essence} after_text=' Max Essence'/>
                <DisplayValue value={effect.agility} after_text=' Agility'/>
                <DisplayValue value={effect.hit_chance} after_text=' Hit Chance'/>
                <DisplayValue value={effect.evasion} after_text=' Evasion'/>
                <DisplayValue value={effect.hit_rate} after_text=' Hit Rate'/>
                <DisplayValue value={effect.movement} after_text=' Movement'/>
                <DisplayValue value={effect.ammo} after_text=' Ammo'/>
                <DisplayValue value={effect.shield} after_text=' Shield'/>
                <DisplayValue previous_text='Suffers ' value={effect.incoming_physical_damage} after_text=' Physical Damage' style='text-red-500'/>
                <DisplayValue previous_text='Suffers ' value={effect.incoming_magical_damage} after_text=' Magical Damage' style='text-red-500'/>
                { ( effect.barrier !== 0 ) && <p>{effect.barrier} Barrier   </p>}
                { ( effect.max_stack !== 0 ) && <p>Stacks {effect.max_stack} Times  </p>}
            </div>
        </div>
        <div>
            <h5 className="invisible group-hover:visible mx-1 rounded-lg px-3 py-1 bg-black border hover:bg-purple-300/10 border-yellow-900/50
                                 active:translate-y-1 text-xl cursor-pointer text-yellow-200/70 " onClick={deleteEffect}><IoTrashOutline/></h5>
        </div>
        </div>
    </div>
    )
}
