import React from 'react'
import EffectOption from './EffectOption';
import { useQuery } from 'react-query';
import { Switch } from '@headlessui/react';

const getEffects = async () => {
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/effects/`, {
            method: 'GET',
        });

        return await response.json();
    }catch(e){
        console.log(`Error: ${e}`);
        return [];
    }
}

export default function EffectList() {
    const [enabled, setEnabled] = React.useState(false);
    const query = useQuery(["effects", getEffects], getEffects);

    if (query.isLoading) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            <div className='flex justify-between mx-5'>
                <div></div>
                <Switch
                checked={enabled}
                onChange={setEnabled}
                className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
                >
                <span
                    aria-hidden="true"
                    className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                />
                </Switch>
            </div>
            <div className={`${enabled ? 'flex flex-col items-center' : 'grid grid-cols-3 gap-2' }`}>
            {query.data.map((effect: any) => (
                <EffectOption 
                    key={effect.id}
                    id={effect.id}
                    name={effect.name}
                    description={effect.description}
                    magic_effectiveness={effect.magic_effectiveness}
                    physical_damage={effect.physical_damage}
                    magical_damage={effect.magical_damage}
                    healing={effect.healing}
                    armor_piercing={effect.armor_piercing}
                    spell_piercing={effect.spell_piercing}
                    vitality={effect.vitality}
                    essence={effect.essence}
                    range={effect.range}
                    damage={effect.damage}
                    armor={effect.armor}
                    magic_armor={effect.magic_armor}
                    agility={effect.agility}
                    hit_chance={effect.hit_chance}
                    evasion={effect.evasion}
                    hit_rate={effect.hit_rate}
                    movement={effect.movement}
                    ammo={effect.ammo}
                    shield={effect.shield}
                    barrier={effect.barrier}
                    instant_vitality_recovery={effect.instant_vitality_recovery} 
                    instant_essence_recovery={effect.instant_essence_recovery} 
                    instant_physical_damage={effect.instant_physical_damage}
                    instant_magical_damage={effect.instant_magical_damage}
                    instant_target={effect.instant_target} 
                    instant_area_of_effect={effect.instant_area_of_effect} 
                    instant_conditions={effect.instant_conditions}
                    max_stack={effect.max_stack}
                    styles={"w-full group border-4 border-transparent px-5 py-2 transition-colors hover:border-purple-500 hover:bg-purple-300 hover:dark:border-yellow-700/50 hover:dark:bg-purple-900/20 \
                    dark:border-yellow-900/50  my-1 rounded-md \
                    dark:bg-[url('/bg1.jpg')]"} />
            ))}
            </div>
  
        </>
    )
}
