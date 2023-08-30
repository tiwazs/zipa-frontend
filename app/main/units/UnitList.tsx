'use client'

import React from 'react'
import { useQuery } from 'react-query';
import UnitOption from '../../_components/UnitOption';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const getUnits = async () => {
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/units/?include_traits=true&include_skills=true&include_items=true`, {
            method: 'GET',
        });

        return await response.json();
    }catch(e){
        console.log(`Error: ${e}`);
        return [];
    }
}

export default function EffectList() {
    const query = useQuery(["units", getUnits], getUnits);
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
                    description={unit.description}
                    base_vitality={unit.base_vitality}
                    base_strength={unit.base_strength}
                    base_dexterity={unit.base_dexterity}
                    base_mind={unit.base_mind}
                    base_faith={unit.base_faith}
                    base_essence={unit.base_essence}
                    base_agility={unit.base_agility}
                    base_hit_chance={unit.base_hit_chance}
                    base_evasion={unit.base_evasion}
                    items={unit.items}
                    rank={unit.rank}
                    user_id={session?.user_id}
                    faction_id={unit.faction_id}
                    specialization_id={unit.specialization_id}
                    faction={unit.faction}
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
