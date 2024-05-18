import React from 'react'
import { useQuery } from 'react-query';
import RaceOption from './RaceOption';
import { Switch } from '@headlessui/react';

const getRaces = async () => {
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/races/?include_traits=true&include_units=true`, {
            method: 'GET',
        });

        return await response.json();
    }catch(e){
        console.log(`Error: ${e}`);
        return [];
    }
}

export default function RaceList() {
    const [enabled, setEnabled] = React.useState(false);
    const query = useQuery(["races", getRaces], getRaces);

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
            {query.data.map((race: any) => (
                <RaceOption
                    key={race.id}
                    id={race.id}
                    name={race.name}
                    description={race.description}
                    identity={race.identity}
                    aspects={race.aspects}
                    unit_specializations={race.unit_specializations}
                    traits={race.traits}
                    styles={"w-full group border-4 border-transparent px-5 py-2 transition-colors hover:border-purple-500 hover:bg-purple-300 hover:dark:border-yellow-700/50 hover:dark:bg-purple-900/20 \
                                dark:border-yellow-900/50  my-1 rounded-md \
                                dark:bg-[url('/bg1.jpg')]"} />
            ))}  
            </div>
        </>
    )
}
