import React from 'react'
import EffectOption from './EffectOption';
import { useQuery } from 'react-query';

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
    const query = useQuery(["effects", getEffects], getEffects);

    if (query.isLoading) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
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
                    vitality={effect.vitality}
                    range={effect.range}
                    damage={effect.damage}
                    armor={effect.armor}
                    magic_armor={effect.magic_armor}
                    essence={effect.essence}
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
                    styles={"group border-4 border-transparent px-5 py-2 transition-colors hover:border-purple-500 hover:bg-purple-300 hover:dark:border-yellow-700/50 hover:dark:bg-purple-900/20 \
                    dark:border-yellow-900/50  my-2 rounded-md \
                    dark:bg-[url('/bg1.jpg')]"} />
            ))}  
        </>
    )
}
