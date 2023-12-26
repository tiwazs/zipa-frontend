'use client'

import React, { Suspense, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from 'react-query';
import OptionSelection from '../../../_components/OptionSelection'
import InformationOption from '../../../_components/InformationOption'
import { useRouter } from 'next/navigation';
import { AiFillEdit } from 'react-icons/ai';

interface CreateUnitFormOptions {
    user_id: string;
    race_id: string;
    culture_id: string;
    belief_id: string;
    specialization_id: string;
    name: string;
    title?: string;
    prefix_title?: string;
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
    onCreate: any;
    onClose: any;
}

const genUnitValues = async () => {
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/unit_gen/?sigma_divider=5`, {
            method: 'GET',
        });

        return await response.json();
    }catch(e){
        console.log(`Error: ${e}`);
        return [];
    }
}


function NewUnit({user_id, onCreate, onClose}: NewUnitProps) {
    const query = useQuery(["unitvalues", genUnitValues], genUnitValues);
    let [race, setRace] = React.useState<any>(undefined)
    let [culture, setCulture] = React.useState<any>(undefined)
    let [belief, setBelief] = React.useState<any>(undefined)
    let [specialization, setSpecialization] = React.useState<any>(undefined)

    let [editVitality, setEditVitality] = React.useState<boolean>(false)
    let [editStrength, setEditStrength] = React.useState<boolean>(false)
    let [editDexterity, setEditDexterity] = React.useState<boolean>(false)
    let [editMind, setEditMind] = React.useState<boolean>(false)
    let [editFaith, setEditFaith] = React.useState<boolean>(false)
    let [editEssence, setEditEssence] = React.useState<boolean>(false)
    let [editAgility, setEditAgility] = React.useState<boolean>(false)
    let [editHitChance, setEditHitChance] = React.useState<boolean>(false)
    let [editEvasion, setEditEvasion] = React.useState<boolean>(false)
    let [editSkillPicks, setEditSkillPicks] = React.useState<boolean>(false)
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<CreateUnitFormOptions>();

    // useState is async, so we need to use useEffect to set the value for the Form after the state is set
    useEffect(() => {
        setValue("race_id", race?.id)
        setValue("culture_id", culture?.id)
        setValue("belief_id", belief?.id)
        setValue("specialization_id", specialization?.id)
    }, [race, culture, belief, specialization])

    const queryClient = useQueryClient();

    const onSubmit: SubmitHandler<CreateUnitFormOptions> = async data => {
        console.log(data);

        if(!editVitality){ data.base_vitality = query.data.vitality }
        if(!editStrength){ data.base_strength = query.data.strength }
        if(!editDexterity){ data.base_dexterity = query.data.dexterity }
        if(!editMind){ data.base_mind = query.data.mind }
        if(!editFaith){ data.base_faith = query.data.faith }
        if(!editEssence){ data.base_essence = query.data.essence }
        if(!editAgility){ data.base_agility = query.data.agility }
        if(!editHitChance){ data.base_hit_chance = query.data.hit_chance }
        if(!editEvasion){ data.base_evasion = query.data.evasion }
        if(!editSkillPicks){ data.skill_picks = "1|2|3" }

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
            queryClient.invalidateQueries('units');
            
            onCreate();
      }catch(e){
          console.log(`Error: ${e}`);
      }
    };

    const handleRaceChange = (race: any) => {
        setRace(race)
    }

    const handleCultureChange = (culture: any) => {
        setCulture(culture)
    }

    const handleBeliefChange = (belief: any) => {
        setBelief(belief)
    }

    const handleSpecializationChange = (specialization: any) => {
        setSpecialization(specialization)
    }

    if (query.isLoading) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            {/* Background Card*/}
            <InformationOption >
                <Suspense fallback={<div className="text-green-700">Loading...</div>}>
                    {/* Race Selection */}
                    <div className='flex items-center'>
                        <p className='text-yellow-500/80 font-medium'>Race:</p>
                        <OptionSelection endpoint='/races/' queryKey='races' onSelectionChange={handleRaceChange} style='' />
                    </div>

                    {/* Culture Selection */}
                    <div className='flex items-center'>
                        <p className='text-yellow-500/80 font-medium'>Culture:</p>
                        <OptionSelection endpoint='/cultures/' queryKey='cultures' onSelectionChange={handleCultureChange} style='' />
                    </div>

                    {/* Belief Selection */}
                    <div className='flex items-center'>
                        <p className='text-yellow-500/80 font-medium'>Belief:</p>
                        <OptionSelection endpoint='/beliefs/' queryKey='beliefs' onSelectionChange={handleBeliefChange} style='' />
                    </div>

                    {/* Specialization Selection */}
                    <Suspense fallback={<div className="text-green-700">Loading...</div>}>
                        {(race && culture && belief) && <div className='flex items-center'>
                                <p className='text-yellow-500/80 font-medium'>Specialization:</p>
                                <OptionSelection endpoint={`/specializations/group?culture_id=${culture.id}&belief_id=${belief.id}`} queryKey='specializations' onSelectionChange={handleSpecializationChange} style='' />
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
                            {...register("race_id", {required: true})}
                            type="hidden"
                            name="race_id"
                        />
                    </div>
                    <div>
                        <input 
                            {...register("culture_id", {required: true})}
                            type="hidden"
                            name="culture_id"
                        />
                    </div>
                    <div>
                        <input 
                            {...register("belief_id", {required: true})}
                            type="hidden"
                            name="belief_id"
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
                                {...register("prefix_title", { required: false })}
                                className='my-2 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                type="text"
                                name="prefix_title"
                                placeholder="Prefix Title"
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
                    <div className='group flex items-center'>
                        <h3 className='my-2 text-yellow-500/80'>Base Vitality</h3>
                        {editVitality ? <input 
                                {...register("base_vitality", { required: true, valueAsNumber: true })}
                                className='my-2 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                type="number"
                                step="0.01"
                                name="base_vitality"
                                placeholder="Base Vitality"
                            />: <>
                                <p className='my-2 text-orange-500 font-light ml-2'>{query.data.vitality}</p>
                                <h5 className="invisible group-hover:visible mx-1 rounded-lg px-3 py-1 bg-black border hover:bg-purple-300/10 border-yellow-900/50
                                 active:translate-y-1 text-xl cursor-pointer text-yellow-200/70 " onClick={()=>{setEditVitality(true)}}><AiFillEdit/></h5>
                            </>}
                    </div>
                    <div className='group flex items-center'>
                        <h3 className='my-2 text-yellow-500/80'>Base Strength</h3>
                        {editStrength ? <input 
                                {...register("base_strength", { required: true, valueAsNumber: true })}
                                className='my-2 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                type="number"
                                step="0.01"
                                name="base_strength"
                                placeholder="Base Strength"
                            /> : <>
                                <p className='my-2 text-orange-500 font-light ml-2'>{query.data.strength}</p>
                                <h5 className="invisible group-hover:visible mx-1 rounded-lg px-3 py-1 bg-black border hover:bg-purple-300/10 border-yellow-900/50
                                 active:translate-y-1 text-xl cursor-pointer text-yellow-200/70 " onClick={()=>{setEditStrength(true)}}><AiFillEdit/></h5>
                            </>}
                    </div>
                    <div className='group flex items-center'>
                        <h3 className='my-2 text-yellow-500/80'>Base Dexterity</h3>
                        {editDexterity ? <input 
                                {...register("base_dexterity", { required: true, valueAsNumber: true })}
                                className='my-2 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                type="number"
                                step="0.01"
                                name="base_dexterity"
                                placeholder="Base Dexterity"
                            />   : <>
                                <p className='my-2 text-orange-500 font-light ml-2'>{query.data.dexterity}</p>
                                <h5 className="invisible group-hover:visible mx-1 rounded-lg px-3 py-1 bg-black border hover:bg-purple-300/10 border-yellow-900/50
                                 active:translate-y-1 text-xl cursor-pointer text-yellow-200/70 " onClick={()=>{setEditDexterity(true)}}><AiFillEdit/></h5>
                            </>}
                    </div>
                    <div className='group flex items-center'>
                        <h3 className='my-2 text-yellow-500/80'>Base Mind</h3>
                        {editMind ? <input 
                                {...register("base_mind", { required: true, valueAsNumber: true })}
                                className='my-2 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                type="number"
                                step="0.01"
                                name="base_mind"
                                placeholder="Base Mind"
                            />   : <>
                                <p className='my-2 text-orange-500 font-light ml-2'>{query.data.mind}</p>
                                <h5 className="invisible group-hover:visible mx-1 rounded-lg px-3 py-1 bg-black border hover:bg-purple-300/10 border-yellow-900/50
                                 active:translate-y-1 text-xl cursor-pointer text-yellow-200/70 " onClick={()=>{setEditMind(true)}}><AiFillEdit/></h5>
                            </>}
                    </div>
                    <div className='group flex items-center'>
                        <h3 className='my-2 text-yellow-500/80'>Base Faith</h3>
                        {editFaith ? <input 
                                {...register("base_faith", { required: true, valueAsNumber: true })}
                                className='my-2 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                type="number"
                                step="0.01"
                                name="base_faith"
                                placeholder="Base Faith"
                            />    : <>
                                <p className='my-2 text-orange-500 font-light ml-2'>{query.data.faith}</p>
                                <h5 className="invisible group-hover:visible mx-1 rounded-lg px-3 py-1 bg-black border hover:bg-purple-300/10 border-yellow-900/50
                                 active:translate-y-1 text-xl cursor-pointer text-yellow-200/70 " onClick={()=>{setEditFaith(true)}}><AiFillEdit/></h5>
                            </>}
                    </div>
                    <div className='group flex items-center'>
                        <h3 className='my-2 text-yellow-500/80'>Base Essence</h3>
                        {editEssence ? <input 
                                {...register("base_essence", { required: true, valueAsNumber: true })}
                                className='my-2 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                type="number"
                                step="0.01"
                                name="base_essence"
                                placeholder="Base Essence"
                            /> : <>
                                <p className='my-2 text-orange-500 font-light ml-2'>{query.data.essence}</p>
                                <h5 className="invisible group-hover:visible mx-1 rounded-lg px-3 py-1 bg-black border hover:bg-purple-300/10 border-yellow-900/50
                                 active:translate-y-1 text-xl cursor-pointer text-yellow-200/70 " onClick={()=>{setEditEssence(true)}}><AiFillEdit/></h5>
                            </>}
                    </div>
                    <div className='group flex items-center'>
                        <h3 className='my-2 text-yellow-500/80'>Base Agility</h3>
                        {editAgility ? <input 
                                {...register("base_agility", { required: true, valueAsNumber: true })}
                                className='my-2 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                type="number"
                                step="0.01"
                                name="base_agility"
                                placeholder="Base Agility"
                            /> : <>
                                <p className='my-2 text-orange-500 font-light ml-2'>{query.data.agility}</p>
                                <h5 className="invisible group-hover:visible mx-1 rounded-lg px-3 py-1 bg-black border hover:bg-purple-300/10 border-yellow-900/50
                                 active:translate-y-1 text-xl cursor-pointer text-yellow-200/70 " onClick={()=>{setEditAgility(true)}}><AiFillEdit/></h5>
                            </>}
                    </div>
                    <div className='group flex items-center'>
                        <h3 className='my-2 text-yellow-500/80'>Base Hit Chance</h3>
                        {editHitChance ? <input 
                                {...register("base_hit_chance", { required: true, valueAsNumber: true })}
                                className='my-2 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                type="number"
                                step="0.01"
                                name="base_hit_chance"
                                placeholder="Base Hit Chance"
                            /> : <>
                                <p className='my-2 text-orange-500 font-light ml-2'>{query.data.hit_chance}</p>
                                <h5 className="invisible group-hover:visible mx-1 rounded-lg px-3 py-1 bg-black border hover:bg-purple-300/10 border-yellow-900/50
                                 active:translate-y-1 text-xl cursor-pointer text-yellow-200/70 " onClick={()=>{setEditHitChance(true)}}><AiFillEdit/></h5>
                            </>}
                    </div>
                    <div className='group flex items-center'>
                        <h3 className='my-2 text-yellow-500/80'>Base Evasion</h3>
                        {editEvasion ? <input 
                                {...register("base_evasion", { required: true, valueAsNumber: true })}
                                className='my-2 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                type="number"
                                step="0.01"
                                name="base_evasion"
                                placeholder="Base Evasion"
                            /> : <>
                                <p className='my-2 text-orange-500 font-light ml-2'>{query.data.evasion}</p>
                                <h5 className="invisible group-hover:visible mx-1 rounded-lg px-3 py-1 bg-black border hover:bg-purple-300/10 border-yellow-900/50
                                 active:translate-y-1 text-xl cursor-pointer text-yellow-200/70 " onClick={()=>{setEditEvasion(true)}}><AiFillEdit/></h5>
                            </>}
                    </div>
                    <div className='group flex items-center'>
                        <h3 className='my-2 text-yellow-500/80'>Skill Picks</h3>
                        {editSkillPicks ? <input 
                                {...register("skill_picks", { required: false })}
                                className='my-2 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                type="text"
                                name="skill_picks"
                                placeholder="Skill Picks"
                            /> : <>
                                <p className='my-2 text-orange-500 font-light ml-2'>{"1|2|3"}</p>
                                <h5 className="invisible group-hover:visible mx-1 rounded-lg px-3 py-1 bg-black border hover:bg-purple-300/10 border-yellow-900/50
                                 active:translate-y-1 text-xl cursor-pointer text-yellow-200/70 " onClick={()=>{setEditSkillPicks(true)}}><AiFillEdit/></h5>
                            </>}
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
                            <button
                            type="button"
                            className="inline-flex justify-center rounded-md bg-black hover:bg-purple-300/10 border dark:border-yellow-900/50 px-4 py-2 text-sm font-medium text-gray-400  focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2"
                            onClick={onClose}
                            >
                            Cancel
                            </button>
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