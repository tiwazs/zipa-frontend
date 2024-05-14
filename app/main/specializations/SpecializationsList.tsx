import React from 'react'
import { useQuery } from 'react-query';
import SpecializationOption from '../../_components/SpecializationOption';
import { Switch } from '@headlessui/react';

const getSpecializations = async (url: string) => {
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
            method: 'GET',
        });

        return await response.json();
    }catch(e){
        console.log(`Error: ${e}`);
        return [];
    }
}

interface SpecializationListProps {
    url: string;        
}

export default function SpecializationList({url}: SpecializationListProps) {
    const [enabled, setEnabled] = React.useState(false);
    const query = useQuery(["specializations", url], () => getSpecializations(url));

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
                    vertical={!enabled}
                    styles={"w-full group border-4 border-transparent px-5 transition-colors hover:border-purple-500 hover:bg-purple-300 hover:dark:border-yellow-700/50 hover:dark:bg-purple-900/20 \
                                dark:border-yellow-900/50 my-1 rounded-md \
                                dark:bg-[url('/bg1.jpg')]"} />
                                ))}  
        </div>
        </>
    )
}
