import React from 'react'
import { useQuery } from 'react-query';
import TraitOption from './TraitOption';

const getTraits = async () => {
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/traits/?include_effects=true`, {
            method: 'GET',
        });

        return await response.json();
    }catch(e){
        console.log(`Error: ${e}`);
        return [];
    }
}

export default function EffectList() {
    const query = useQuery(["traits", getTraits], getTraits);

    if (query.isLoading) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            {query.data.map((trait: any) => (
                <TraitOption
                    key={trait.id} 
                    id={trait.id} 
                    name={trait.name} 
                    description={trait.description}
                    effects={trait.effects}
                    styles={"group border-4 border-transparent px-5 py-2 transition-colors hover:border-purple-500 hover:bg-purple-300 hover:dark:border-yellow-700/50 hover:dark:bg-purple-900/20 \
                                dark:border-yellow-900/50  my-2 rounded-md \
                                dark:bg-[url('/bg1.jpg')]"}
                    />
            ))}  
        </>
    )
}
