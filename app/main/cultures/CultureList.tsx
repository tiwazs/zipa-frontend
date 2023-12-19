import React from 'react'
import { useQuery } from 'react-query';
import CultureOption from '../../_components/CultureOption';

const getCultures = async () => {
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cultures/?include_traits=true&include_units=true`, {
            method: 'GET',
        });

        return await response.json();
    }catch(e){
        console.log(`Error: ${e}`);
        return [];
    }
}

export default function CultureList() {
    const query = useQuery(["cultures", getCultures], getCultures);

    if (query.isLoading) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            {query.data.map((culture: any) => (
                <CultureOption
                    key={culture.id}
                    id={culture.id}
                    name={culture.name}
                    description={culture.description}
                    identity={culture.identity}
                    aspects={culture.aspects}
                    unit_specializations={culture.unit_specializations}
                    traits={culture.traits}
                    styles={"group border-4 border-transparent px-5 py-2 transition-colors hover:border-purple-500 hover:bg-purple-300 hover:dark:border-yellow-700/50 hover:dark:bg-purple-900/20 \
                                dark:border-yellow-900/50  my-2 rounded-md \
                                dark:bg-[url('/bg1.jpg')]"} />
            ))}  
        </>
    )
}
