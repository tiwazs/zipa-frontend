'use client'

import React from 'react'
import { useQuery } from 'react-query';
import UnitOption from '../../_components/UnitOption';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const getUnits = async (user_id: string) => {
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/units/user/extended/${user_id}?include_traits=true&include_skills=true&include_items=true`, {
            method: 'GET',
        });

        return await response.json();
    }catch(e){
        console.log(`Error: ${e}`);
        return [];
    }
}

interface EffectListProps {
    user_id: string;
}

export default function EffectList({user_id}: EffectListProps) {
    const query = useQuery(["units", user_id], ()=> getUnits(user_id));
    const router = useRouter();
    // Fucking library. LET ME ADD THE GOD DAMMED USER ID TO THE SESSION TO MAKE REQUESTS
    const { data: session, status }:{update:any, data:any, status:any} = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login');
        },
    })

    if (query.isLoading) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            {query.data.map((unit: any) => (
                <UnitOption
                    key={unit.id}
                    id={unit.id}
                    name={unit.name}
                    title={unit.title}
                    prefix_title={unit.prefix_title}
                    description={unit.description}
                    vitality={unit.vitality}
                    strength={unit.strength}
                    dexterity={unit.dexterity}
                    mind={unit.mind}
                    faith={unit.faith}
                    essence={unit.essence}
                    agility={unit.agility}
                    hit_chance={unit.hit_chance}
                    evasion={unit.evasion}
                    armor={unit.armor}
                    magic_armor={unit.magic_armor}
                    armor_piercing={unit.armor_piercing}
                    spell_piercing={unit.spell_piercing}
                    hit_rate={unit.hit_rate}
                    movement={unit.movement}
                    shield={unit.shield}
                    physical_damage={unit.physical_damage}
                    magical_damage={unit.magical_damage}
                    weight={unit.weight}
                    weight_penalty={unit.weight_penalty}
                    skill_picks={unit.skill_picks}
                    items={unit.items}
                    rank={unit.rank}
                    user_id={session?.user_id}
                    race_id={unit.race_id}
                    specialization_id={unit.specialization_id}
                    race={unit.race}
                    specialization={unit.specialization}
                    removeEndpoint='/units/'
                    endpointMethod='DELETE'
                    queryInvalidateKey='units'
                    styles={"group border-4 border-transparent px-5 py-2 transition-colors hover:border-purple-500 hover:bg-purple-300 hover:dark:border-yellow-700/50 hover:dark:bg-purple-900/20 \
                                dark:border-yellow-900/50  my-2 rounded-md \
                                dark:bg-[url('/bg1.jpg')]"} />
            ))}  
        </>
    )
}
