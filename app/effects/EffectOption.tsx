import React from 'react'
import { useQueryClient } from 'react-query';
import { IoTrashOutline } from 'react-icons/io5'
import Link from 'next/link';

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
    max_stack: number;
    styles: string;
}

function DisplayEffectValue(props: {value: string}) {
    const value = props.value.split("+");

    if(props.value !== "0"){
        return <span className='text-green-500 font-light'>{props.value}</span>
    }else{
        return null;
    }
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
    <div className={`${effect.styles}`}>
        <div className='flex items-center justify-between'>
        <div>
            <Link href={`/effects/${effect.id}`}>
                <h3 className='font-bold my-2 text-yellow-200/70'>{effect.name}</h3>
            </Link>
            <p className='my-1 text-gray-100 '>{effect.description}</p>
            <div className='flex font-extralight italic '>
                { (effect.magic_effectiveness && effect.magic_effectiveness !== "0") && <p>, <span className='text-green-500 font-light'>{effect.magic_effectiveness}</span> Magic Power   </p>}
                { (effect.physical_damage && effect.physical_damage !== "0") && <p>, <span className='text-green-500 font-light'>{effect.physical_damage}</span> Physical Damage   </p>}
                { (effect.magical_damage && effect.magical_damage !== "0") && <p>, <span className='text-green-500 font-light'>{effect.magical_damage}</span> Magic Damage   </p>}
                { (effect.healing && effect.healing !== "0") && <p>, <span className='text-green-500 font-light'>{effect.healing}</span> Healing   </p>}
                { (effect.vitality_recovery && effect.vitality_recovery !== "0") && <p>Recovers  <span className='text-green-500 font-light'>{effect.vitality_recovery}</span> Vitality   </p>}
                { (effect.essence_recovery && effect.essence_recovery !== "0") && <p>Recovers  <span className='text-green-500 font-light'>{effect.essence_recovery}</span> Essence   </p>}
                { (effect.vitality && effect.vitality !== "0") && <p>, <span className='text-green-500 font-light'>{effect.vitality}</span> Max Vitality   </p>}
                { (effect.range && effect.range !== "0") && <p>, <span className='text-green-500 font-light'>{effect.range}</span> Range   </p>}
                { (effect.damage && effect.damage !== "0") && <p>, <span className='text-green-500 font-light'>{effect.damage}</span> All Damage   </p>}
                { (effect.armor && effect.armor !== "0") && <p>, <span className='text-green-500 font-light'>{effect.armor}</span> Armor   </p>}
                { (effect.magic_armor && effect.magic_armor !== "0") && <p>, <span className='text-green-500 font-light'>{effect.magic_armor}</span> Magic Armor   </p>}
                { (effect.essence && effect.essence !== "0") && <p>, <span className='text-green-500 font-light'>{effect.essence}</span> Max Essence   </p>}
                { (effect.agility && effect.agility !== "0") && <p>, <span className='text-green-500 font-light'>{effect.agility}</span> Agility   </p>}
                { (effect.hit_chance && effect.hit_chance !== "0") && <p>, <span className='text-green-500 font-light'>{effect.hit_chance}</span> Hit Chance   </p>}
                { (effect.evasion && effect.evasion !== "0") && <p>, <span className='text-green-500 font-light'>{effect.evasion}</span> Evasion   </p>}
                { (effect.hit_rate && effect.hit_rate !== "0") && <p>, <span className='text-green-500 font-light'>{effect.hit_rate}</span> Hit Rate   </p>}
                { (effect.movement && effect.movement !== "0") && <p>, <span className='text-green-500 font-light'>{effect.movement}</span> Movement   </p>}
                { (effect.ammo && effect.ammo !== "0") && <p>, <span className='text-green-500 font-light'>{effect.ammo}</span> Ammo   </p>}
                { (effect.shield && effect.shield !== "0") && <p>, <span className='text-green-500 font-light'>{effect.shield}</span> Shield   </p>}
                { ( ( effect.barrier && effect.barrier !== 0) ) && <p>{effect.barrier} Barrier   </p>}
                { ( ( effect.max_stack && effect.barrier !== 0) ) && <p>{effect.max_stack} Stacks   </p>}
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
