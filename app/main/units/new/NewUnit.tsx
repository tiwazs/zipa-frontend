'use client'

import React, { Suspense, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import OptionSelection from '../../../_components/OptionSelection'
import InformationOption from '../../../_components/InformationOption'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface CreateUnitFormOptions {
    user_id: string;
    faction_id: string;
    specialization_id: string;
    name: string;
    title?: string;
    description?: string;
    base_vitality: number;
    base_strength: number;
    base_dexterity: number;
    base_mind: number;
    base_faith: number;
    base_essence: number;
    base_agility: number;
    base_hit_chance: number;
    base_evasion: number;
    skill_picks?: string;
    rank: number;
}

interface NewUnitProps {
    user_id: string;
}

function NewUnit({user_id}: NewUnitProps) {
    let [faction, setFaction] = React.useState<any>(undefined)
    let [specialization, setSpecialization] = React.useState<any>(undefined)
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<CreateUnitFormOptions>();
    const router = useRouter();

    // useState is async, so we need to use useEffect to set the value for the Form after the state is set
    useEffect(() => {
        setValue("faction_id", faction?.id)
        setValue("specialization_id", specialization?.id)
    }, [faction, specialization])

    const queryClient = useQueryClient();

    const onSubmit: SubmitHandler<CreateUnitFormOptions> = async data => {
        console.log(data);

        // Not setting the content type. aparently the browser will do that for us, including the boundary
        try{
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/units/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(data)
          });
          console.log(`Response: ${JSON.stringify(response)}`);

          // TODO: Remove this once use hook is fixed
          //router.refresh();        
          queryClient.invalidateQueries('/main/units');

          router.push('/units')

      }catch(e){
          console.log(`Error: ${e}`);
      }
    };

    const handleFactionChange = (faction: any) => {
        setFaction(faction)
    }

    const handleSpecializationChange = (specialization: any) => {
        setSpecialization(specialization)
    }
    return (
        <>
            {/* Background Card*/}
            <InformationOption >
                {/* Faction Selection */}
                <Suspense fallback={<div className="text-green-700">Loading...</div>}>
                    <div className='flex items-center'>
                        <p className='text-yellow-500/80 font-medium'>Faction:</p>
                        <OptionSelection endpoint='/factions' queryKey='factions' onSelectionChange={handleFactionChange} style='' />
                    </div>

                    {/* Specialization Selection */}
                    <Suspense fallback={<div className="text-green-700">Loading...</div>}>
                        {faction && <div className='flex items-center'>
                                <p className='text-yellow-500/80 font-medium'>Specialization:</p>
                                <OptionSelection endpoint={`/specializations/faction/${faction.id}`} queryKey='specializations' onSelectionChange={handleSpecializationChange} style='' />
                            </div>}
                    </Suspense>
                </Suspense>

                {/* Form */}
                <form className='rounded-2xl flex-row justify-between ' onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <input 
                            {...register("user_id", {required: true})}
                            type="hidden"
                            name="userId"
                            value={user_id}
                        />
                    </div>
                    <div>
                        <input 
                            {...register("faction_id", {required: true})}
                            type="hidden"
                            name="faction_id"
                        />
                    </div>
                    <div>
                        <input 
                            {...register("specialization_id", {required: true})}
                            type="hidden"
                            name="specialization_id"
                        />
                    </div>
                    <div className=''>
                        <div>
                            <input 
                                {...register("name", { required: true })}
                                className='my-2 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                type="text"
                                name="name"
                                placeholder="Name"
                            />                                
                        </div>
                    </div>
                    <div className=''>
                        <div>
                            <input 
                                {...register("title", { required: false })}
                                className='my-2 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                type="text"
                                name="title"
                                placeholder="Title"
                            />                                
                        </div>
                    </div>
                    <div className=''>
                        <div>
                            <input 
                                {...register("description", { required: false })}
                                className='my-2 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                type="text"
                                name="description"
                                placeholder="Description"
                            />                                
                        </div>
                    </div>
                    <div>
                        <input 
                            {...register("base_vitality", { required: true, valueAsNumber: true})}
                            className='my-2 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                            type="number"
                            step="0.01"
                            name="base_vitality"
                            placeholder="Base Vitality"
                        />                                
                    </div>
                    <div>
                        <input 
                            {...register("base_strength", { required: true, valueAsNumber: true })}
                            className='my-2 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                            type="number"
                            step="0.01"
                            name="base_strength"
                            placeholder="Base Strength"
                        />                                
                    </div>
                    <div>
                        <input 
                            {...register("base_dexterity", { required: true, valueAsNumber: true })}
                            className='my-2 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                            type="number"
                            step="0.01"
                            name="base_dexterity"
                            placeholder="Base Dexterity"
                        />                                
                    </div>
                    <div>
                        <input 
                            {...register("base_mind", { required: true, valueAsNumber: true })}
                            className='my-2 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                            type="number"
                            step="0.01"
                            name="base_mind"
                            placeholder="Base Mind"
                        />                                
                    </div>
                    <div>
                        <input 
                            {...register("base_faith", { required: true, valueAsNumber: true })}
                            className='my-2 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                            type="number"
                            step="0.01"
                            name="base_faith"
                            placeholder="Base Faith"
                        />                                
                    </div>
                    <div>
                        <input 
                            {...register("base_essence", { required: true, valueAsNumber: true })}
                            className='my-2 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                            type="number"
                            step="0.01"
                            name="base_essence"
                            placeholder="Base Essence"
                        />                                
                    </div>
                    <div>
                        <input 
                            {...register("base_agility", { required: true, valueAsNumber: true })}
                            className='my-2 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                            type="number"
                            step="0.01"
                            name="base_agility"
                            placeholder="Base Agility"
                        />                                
                    </div>
                    <div>
                        <input 
                            {...register("base_hit_chance", { required: true, valueAsNumber: true })}
                            className='my-2 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                            type="number"
                            step="0.01"
                            name="base_hit_chance"
                            placeholder="Base Hit Chance"
                        />                                
                    </div>
                    <div>
                        <input 
                            {...register("base_evasion", { required: true, valueAsNumber: true })}
                            className='my-2 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                            type="number"
                            step="0.01"
                            name="base_evasion"
                            placeholder="Base Evasion"
                        />                                
                    </div>
                    <div className=''>
                        <div>
                            <input 
                                {...register("skill_picks", { required: false })}
                                className='my-2 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                type="text"
                                name="skill_picks"
                                placeholder="Skill Picks"
                            />                                
                        </div>
                    </div>
                    <div>
                        <input 
                            {...register("rank", { required: true, valueAsNumber: true })}
                            className='my-2 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                            type="number"
                            name="rank"
                            placeholder="Rank"
                        />                                
                    </div>
                    <div className="mt-4 flex justify-between">
                        <div className='inline-flex justify-center hover:text-gray-200 border dark:border-yellow-900/50 shadow-md rounded-lg px-4 py-2 bg-black hover:bg-purple-300/10
                                            cursor-pointer'>
                                <input type="submit" value="Create" className='text-gray-400 text-sm cursor-pointer'/>
                        </div>
                    </div>
                </form>
            </InformationOption >
        </>
    )
}

export default NewUnit