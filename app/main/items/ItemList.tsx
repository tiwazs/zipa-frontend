import React from 'react'
import { useQuery } from 'react-query';
import ItemOption from './ItemOption';
import { Switch } from '@headlessui/react';

const getItems = async (queryParams: string) => {
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/?include_skills=true&?include_traits=true${queryParams ? queryParams : ""}`, {
            method: 'GET',
        });

        return await response.json();
    }catch(e){
        console.log(`Error: ${e}`);
        return [];
    }
}

interface ItemListProps {
    queryParams?: any;
}

export default function ItemList({queryParams}: ItemListProps) {
    const [enabled, setEnabled] = React.useState(false);
    const query = useQuery(["items", queryParams], () => getItems(queryParams) );

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
                    armor_piercing={skill.armor_piercing}
                    spell_piercing={skill.spell_piercing}
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
                    traits={skill.traits}
                    vertical={!enabled}      
                    styles={"w-full group border-4 border-transparent px-5 py-2 transition-colors hover:border-purple-500 hover:bg-purple-300 hover:dark:border-yellow-700/50 hover:dark:bg-purple-900/20 \
                                dark:border-yellow-900/50  my-1 rounded-md \
                                dark:bg-[url('/bg1.jpg')]"} />
            ))}
            </div>
        </>
    )
}
