import React from 'react'
import { useQuery } from 'react-query';
import FactionOption from './FactionOption';

const getFactions = async () => {
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/factions/?include_traits=true&include_units=true`, {
            method: 'GET',
        });

        return await response.json();
    }catch(e){
        console.log(`Error: ${e}`);
        return [];
    }
}

export default function FactionList() {
    const query = useQuery(["factions", getFactions], getFactions);

    if (query.isLoading) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            {query.data.map((faction: any) => (
                <FactionOption
                    key={faction.id}
                    id={faction.id}
                    name={faction.name}
                    description={faction.description}
                    identity={faction.identity}
                    aspects={faction.aspects}
                    unit_specializations={faction.unit_specializations}
                    traits={faction.traits}
                    styles={"group border-4 border-transparent px-5 py-2 transition-colors hover:border-purple-500 hover:bg-purple-300 hover:dark:border-yellow-700/50 hover:dark:bg-purple-900/20 \
                                dark:border-yellow-900/50  my-2 rounded-md \
                                dark:bg-[url('/bg1.jpg')]"} />
            ))}  
        </>
    )
}
