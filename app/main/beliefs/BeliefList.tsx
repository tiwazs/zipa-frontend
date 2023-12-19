import React from 'react'
import { useQuery } from 'react-query';
import BeliefOption from '../../_components/BeliefOption';

const getBeliefs = async () => {
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/beliefs/?include_traits=true&include_units=true`, {
            method: 'GET',
        });

        return await response.json();
    }catch(e){
        console.log(`Error: ${e}`);
        return [];
    }
}

export default function BeliefList() {
    const query = useQuery(["beliefs", getBeliefs], getBeliefs);

    if (query.isLoading) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            {query.data.map((belief: any) => (
                <BeliefOption
                    key={belief.id}
                    id={belief.id}
                    name={belief.name}
                    description={belief.description}
                    identity={belief.identity}
                    aspects={belief.aspects}
                    unit_specializations={belief.unit_specializations}
                    traits={belief.traits}
                    styles={"group border-4 border-transparent px-5 py-2 transition-colors hover:border-purple-500 hover:bg-purple-300 hover:dark:border-yellow-700/50 hover:dark:bg-purple-900/20 \
                                dark:border-yellow-900/50  my-2 rounded-md \
                                dark:bg-[url('/bg1.jpg')]"} />
            ))}  
        </>
    )
}
