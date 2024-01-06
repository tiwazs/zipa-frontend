import React from 'react'
import { useQuery } from 'react-query';
import RaceGroupOption from './RaceGroupOption';

const getRaceGroups = async () => {
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/race_groups/`, {
            method: 'GET',
        });

        return await response.json();
    }catch(e){
        console.log(`Error: ${e}`);
        return [];
    }
}

export default function RaceGroupList() {
    const query = useQuery(["race_groups", getRaceGroups], getRaceGroups);

    if (query.isLoading) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            {query.data.map((race_group: any) => (
                <RaceGroupOption
                    key={race_group.id}
                    id={race_group.id}
                    name={race_group.name}
                    description={race_group.description}
                    identity={race_group.identity}
                    aspects={race_group.aspects}
                    unit_specializations={race_group.unit_specializations}
                    traits={race_group.traits}
                    styles={"group border-4 border-transparent px-5 py-2 transition-colors hover:border-purple-500 hover:bg-purple-300 hover:dark:border-yellow-700/50 hover:dark:bg-purple-900/20 \
                                dark:border-yellow-900/50  my-2 rounded-md \
                                dark:bg-[url('/bg1.jpg')]"} />
            ))}  
        </>
    )
}
