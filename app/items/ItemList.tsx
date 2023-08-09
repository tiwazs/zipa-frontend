import React from 'react'
import { useQuery } from 'react-query';
import ItemOption from './ItemOption';

const getItems = async () => {
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/?include_skills=true`, {
            method: 'GET',
        });

        return await response.json();
    }catch(e){
        console.log(`Error: ${e}`);
        return [];
    }
}

export default function EffectList() {
    const query = useQuery(["items", getItems], getItems);

    if (query.isLoading) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            {query.data.map((skill: any) => (
                <ItemOption
                    key={skill.id}
                    id={skill.id}
                    name={skill.name}
                    description={skill.description}
                    conditions={skill.conditions}
                    is_weapon={skill.is_weapon}
                    object_type={skill.object_type}
                    rarity={skill.rarity}
                    magic_effectiveness={skill.magic_effectiveness}
                    physical_damage={skill.physical_damage}
                    magical_damage={skill.magical_damage}
                    healing={skill.healing}
                    vitality_recovery={skill.vitality_recovery}
                    essence_recovery={skill.essence_recovery}
                    vitality={skill.vitality}
                    range={skill.range}
                    damage={skill.damage}
                    armor={skill.armor}
                    magic_armor={skill.magic_armor}
                    essence={skill.essence}
                    agility={skill.agility}
                    hit_chance={skill.hit_chance}
                    evasion={skill.evasion}
                    hit_rate={skill.hit_rate}
                    movement={skill.movement}
                    ammo={skill.ammo}
                    shield={skill.shield}
                    dexterity_requirement={skill.dexterity_requirement}
                    strength_requirement={skill.strength_requirement}
                    mind_requirement={skill.mind_requirement}
                    faith_requirement={skill.faith_requirement}
                    weight={skill.weight}
                    skills={skill.skills}        

                    styles={"group border-4 border-transparent px-5 py-2 transition-colors hover:border-purple-500 hover:bg-purple-300 hover:dark:border-yellow-700/50 hover:dark:bg-purple-900/20 \
                                dark:border-yellow-900/50  my-2 rounded-md \
                                dark:bg-[url('/bg1.jpg')]"} />
            ))}  
        </>
    )
}
