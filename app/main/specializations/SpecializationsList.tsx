import React from 'react'
import { useQuery } from 'react-query';
import SpecializationOption from '../../_components/SpecializationOption';

const getSpecializations = async () => {
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/specializations/?include_traits=true&include_skills=true&include_items=true`, {
            method: 'GET',
        });

        return await response.json();
    }catch(e){
        console.log(`Error: ${e}`);
        return [];
    }
}

export default function EffectList() {
    const query = useQuery(["specializations", getSpecializations], getSpecializations);

    if (query.isLoading) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            {query.data.map((specialization: any) => (
                <SpecializationOption
                    key={specialization.id}
                    id={specialization.id}
                    name={specialization.name}
                    description={specialization.description}
                    vitality={specialization.vitality}
                    strength={specialization.strength}
                    dexterity={specialization.dexterity}
                    mind={specialization.mind}
                    faith={specialization.faith}
                    armor={specialization.armor}
                    magic_armor={specialization.magic_armor}
                    essence={specialization.essence}
                    agility={specialization.agility}
                    hit_chance={specialization.hit_chance}
                    evasion={specialization.evasion}
                    hit_rate={specialization.hit_rate}
                    movement={specialization.movement}
                    weapon_proficiencies={specialization.weapon_proficiencies}
                    tier={specialization.tier}
                    skills={specialization.skills}
                    items={specialization.items}
                    traits={specialization.traits}
                    removeEndpoint='/specializations/'
                    endpointMethod='DELETE'
                    queryInvalidateKey='specializations'
                    styles={"group border-4 border-transparent px-5 py-2 transition-colors hover:border-purple-500 hover:bg-purple-300 hover:dark:border-yellow-700/50 hover:dark:bg-purple-900/20 \
                                dark:border-yellow-900/50  my-2 rounded-md \
                                dark:bg-[url('/bg1.jpg')]"} />
            ))}  
        </>
    )
}
