import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import FactionTraitCard from './FactionTraitCard';
import NewFactionOptionDialog from './NewFactionOptionDialog';

interface Faction {
    id: string;
    name: string;
    description: string;
    identity: string;
    aspects: string;
    unit_specializations?: string[];
    traits?: string[];
}

type DetailedFactionChartProps = {
    faction: Faction;
    styles?: string;
}

export const paintTier = (tier: number | undefined) => {
    switch(tier){
        case 1:
            return "text-orange-800";
        case 2:
            return "text-zinc-300/80";
        case 3:
            return "text-zinc-300";
        case 4:
            return "text-amber-600/90";
        case 5:
            return "text-amber-500";
        default:
            return "text-gray-100";
    }
}

export const writeTier = (tier: number | undefined) => {
    switch(tier){
        case 1:
            return "I";
        case 2:
            return "II";
        case 3:
            return "III";
        case 4:
            return "IV";
        case 5:
            return "V";
        default:
            return "";
    }
}

export const splitWeaponProficiencies = (weapon_proficiencies: string | undefined) => {
    if(weapon_proficiencies === undefined) return [];

    return weapon_proficiencies?.split("|");
}

export default function DetailedFactionChart({faction, styles}: DetailedFactionChartProps) {
    const [ editing, setEditing ] = useState(false);
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<Faction>();
    const queryClient = useQueryClient();

    const onCancel = () => {
        reset();
        setEditing(!editing) 
    }

    const onSubmit:SubmitHandler<Faction> = async (data) => {
        console.log(`Submitting data:  ${JSON.stringify(data)}`);

        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/factions/update/${faction.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            });
            console.log(`Response: ${JSON.stringify(response)}`);


            queryClient.invalidateQueries(`faction`);
            setEditing(false);
        }catch(e){
            console.log(`Error: ${e}`);
            setEditing(false);
        }
    }

    return (
    <>
        <div className="transform overflow-hidden rounded-2xl p-6 text-left shadow-xl transition-all 
                                  border-transparent border-4 dark:dark:border-yellow-900/50 text-yellow-200/70 dark:bg-[url('/bg1.jpg')]">
            <h2 className={`mb-3 text-xl font-medium`}>
              Detailed Information{' '}
            </h2>
            <form className='rounded-2xl' onSubmit={handleSubmit(onSubmit)}>
                <div className='mx-2 lg:grid lg:grid-cols-4'>

                    <div className='flex items-center space-x-2 col-span-4'>
                        <h1 className={`${editing ? "" : "hidden"}`}>Description</h1>
                        <textarea 
                            {...register("description", { required: false })}
                            className={`my-2 w-full rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : "hidden"}`}
                            name="description"
                            disabled={!editing}
                            placeholder={ faction.description ? faction.description : "Description" }
                        />                                
                    </div>
                    <div className='items-center space-x-2 col-span-4 my-4'>
                        <div className='flex space-x-2'>
                            <h1>Traits</h1>
                            {editing && <NewFactionOptionDialog factionId={faction.id} styles='bg-black hover:bg-purple-300/10 border dark:border-yellow-900/50 rounded-md'
                                title={'Add Traits'}
                                description={'Some items are imbued with ancient arts and magic which allows the wielder to use special skills, old spells and magic to aid them in battle.'} 
                                selection={'traits'}/>}
                        </div>
                        {(faction.traits && faction.traits.length > 0) ? faction.traits.map((trait: any) => {
                            return <FactionTraitCard key={trait.trait.id} factiontrait={trait} factionId={faction.id} editable={editing} />
                        }) : <h1 className='px-4 text-gray-400'>N/A</h1>}
                    </div>
                </div>
                <div className="mt-4 flex justify-between">
                    <button
                        type="button"
                        className="inline-flex justify-center rounded-md bg-black hover:bg-purple-300/10 border dark:border-yellow-900/50 px-4 py-2 text-sm font-medium text-gray-400  focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2"
                        onClick={onCancel}
                        >
                        {editing ? "Cancel" : "Edit"}
                    </button>
                    {editing && <div className='inline-flex justify-center hover:text-gray-200 border dark:border-yellow-900/50 shadow-md rounded-lg px-4 py-2 bg-black hover:bg-purple-300/10
                                      cursor-pointer'>
                        <input type="submit" value="Save" className='text-gray-400 text-sm cursor-pointer'/>
                    </div>}
                </div>
            </form>
        </div>
    </>
    )
}
