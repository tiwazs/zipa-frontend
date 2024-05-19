'use client'

import React from 'react'
import { useQuery } from 'react-query';
import UnitOption from '../../_components/UnitOption';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Switch } from '@headlessui/react';

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
    const [enabled, setEnabled] = React.useState(false);
    const [detailedTraits, setDetailedTraits] = React.useState(false);
    const [detailedSkills, setDetailedSkills] = React.useState(true);
    const [detailedItems, setDetailedItems] = React.useState(false);
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
        <div className='flex justify-between mx-5'>
            <div></div>
            <div className='flex space-x-2'>
                <Switch
                    checked={detailedTraits}
                    onChange={setDetailedTraits}
                    className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
                    >
                    <span
                        aria-hidden="true"
                        className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                    />
                </Switch>
                <Switch
                    checked={detailedSkills}
                    onChange={setDetailedSkills}
                    className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
                    >
                    <span
                        aria-hidden="true"
                        className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                    />
                </Switch>
                <Switch
                    checked={detailedItems}
                    onChange={setDetailedItems}
                    className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
                    >
                    <span
                        aria-hidden="true"
                        className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                    />
                </Switch>
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
        </div>
        <div className={`${enabled ? 'flex flex-col items-center' : 'grid grid-cols-3 gap-2' }`}>
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
                    culture={unit.culture}
                    belief={unit.Belief}
                    specialization={unit.specialization}
                    removeEndpoint='/units/'
                    endpointMethod='DELETE'
                    queryInvalidateKey='units'
                    vertical={!enabled}
                    detailedTraits={detailedTraits}
                    detailedSkills={detailedSkills}
                    detailedItems={detailedItems}
                    styles={"w-full group border-4 border-transparent px-5 py-2 transition-colors hover:border-purple-500 hover:bg-purple-300 hover:dark:border-yellow-700/50 hover:dark:bg-purple-900/20 \
                                dark:border-yellow-900/50  my-2 rounded-md \
                                dark:bg-[url('/bg1.jpg')]"} />
            ))} 
        </div> 
        </>
    )
}
