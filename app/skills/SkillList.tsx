import React from 'react'
import { useQuery } from 'react-query';
import SkillOption from './SkillOption';

const getSkills = async () => {
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skills/?include_type=true&include_effects=true`, {
            method: 'GET',
        });

        return await response.json();
    }catch(e){
        console.log(`Error: ${e}`);
        return [];
    }
}

export default function EffectList() {
    const query = useQuery(["skills", getSkills], getSkills);

    if (query.isLoading) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            {query.data.map((skill: any) => (
                <SkillOption
                    key={skill.id} 
                    id={skill.id} 
                    name={skill.name} 
                    description={skill.description} 
                    physical_damage={skill.physical_damage}
                    magical_damage={skill.magical_damage}
                    healing={skill.healing}
                    vitality_recovery={skill.vitality_recovery} 
                    essence_recovery={skill.essence_recovery}
                    range={skill.range}
                    area_of_effect={skill.area_of_effect} 
                    essence_cost={skill.essence_cost}
                    vitality_cost={skill.vitality_cost}
                    cooldown={skill.cooldown}
                    channeled={skill.channeled}
                    target={skill.target}
                    skill_on={skill.skill_on}
                    skill_types={skill.skill_types}
                    effects={skill.effects}
                    summons={skill.summons}      
                    styles={"group border-4 border-transparent px-5 py-2 transition-colors hover:border-purple-500 hover:bg-purple-300 hover:dark:border-yellow-700/50 hover:dark:bg-purple-900/20 \
                                dark:border-yellow-900/50  my-2 rounded-md \
                                dark:bg-[url('/bg1.jpg')]"}
                    />
            ))}  
        </>
    )
}
