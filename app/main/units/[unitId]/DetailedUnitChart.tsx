import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import TraitCard from '@/app/_components/InformationCards/TraitCard';
import SkillCard from '@/app/_components/InformationCards/SkillCard';
import ItemCard from '@/app/_components/InformationCards/ItemCard';
import NewSpecializationOptionDialog from '../../../_components/NewOptionDialogWithSelection';
import NewOptionDialogWithSelection from '../../../_components/NewOptionDialogWithSelection';

interface Unit {
    id: string;
    user_id: string;
    faction_id: string;
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
    items?: any[];
    faction: any;
    specialization: any;
    removeEndpoint: string;
    endpointMethod: string;
    queryInvalidateKey?: string;
    styles: string;
}

type DetailedUnitChartProps = {
    unit: Unit;
    styles?: string;
}

export const splitWeaponProficiencies = (weapon_proficiencies: string | undefined) => {
    if(weapon_proficiencies === undefined) return [];

    return weapon_proficiencies?.split("|");
}

export default function DetailedUnitChart({unit, styles}: DetailedUnitChartProps) {
    const [ editing, setEditing ] = useState(false);
    const { register, handleSubmit, reset, watch, formState: { errors }, setValue } = useForm<Unit>();
    const queryClient = useQueryClient();

    const onCancel = () => {
        reset();
        setEditing(!editing) 
    }

    const onSubmit:SubmitHandler<Unit> = async (data) => {
        console.log(`Submitting data:  ${JSON.stringify(data)}`);

        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/units/update/${unit.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            });
            console.log(`Response: ${JSON.stringify(response)}`);


            queryClient.invalidateQueries(`unit`);
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
                <div className='mx-2'>
                    <div className='flex items-center space-x-2'>
                        <h1>Base Vitality</h1>
                        {editing ? <input 
                            {...register("base_vitality", { required: false, valueAsNumber: true })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="number"
                            name="base_vitality"
                            disabled={!editing}
                            placeholder={(unit.base_vitality && unit.base_vitality !== 0 ) ? unit.base_vitality?.toString() : "0"}
                        /> : <h1 className='my-2 py-3 text-orange-500 font-light'>{(unit.base_vitality && unit.base_vitality !== 0 ) ? unit.base_vitality?.toString() : "0"}</h1>}
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Base Strength</h1>
                        {editing ? <input 
                            {...register("base_strength", { required: false, valueAsNumber: true })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="number"
                            name="base_strength"
                            disabled={!editing}
                            placeholder={(unit.base_strength && unit.base_strength !== 0 ) ? unit.base_strength?.toString() : "0"}
                        /> : <h1 className='my-2 py-3 text-orange-500 font-light'>{(unit.base_strength && unit.base_strength !== 0 ) ? unit.base_strength?.toString() : "0"}</h1>}
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Base Dexterity</h1>
                        {editing ? <input 
                            {...register("base_dexterity", { required: false, valueAsNumber: true })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="number"
                            name="base_dexterity"
                            disabled={!editing}
                            placeholder={(unit.base_dexterity && unit.base_dexterity !== 0 ) ? unit.base_dexterity?.toString() : "0"}
                        /> : <h1 className='my-2 py-3 text-orange-500 font-light'>{(unit.base_dexterity && unit.base_dexterity !== 0 ) ? unit.base_dexterity?.toString() : "0"}</h1>}
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Base Mind</h1>
                        {editing ? <input 
                            {...register("base_mind", { required: false, valueAsNumber: true })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="number"
                            name="base_mind"
                            disabled={!editing}
                            placeholder={(unit.base_mind && unit.base_mind !== 0 ) ? unit.base_mind?.toString() : "0"}
                        /> : <h1 className='my-2 py-3 text-orange-500 font-light'>{(unit.base_mind && unit.base_mind !== 0 ) ? unit.base_mind?.toString() : "0"}</h1>}
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Base Faith</h1>
                        {editing ? <input 
                            {...register("base_faith", { required: false, valueAsNumber: true })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="number"
                            name="base_faith"
                            disabled={!editing}
                            placeholder={(unit.base_faith && unit.base_faith !== 0 ) ? unit.base_faith?.toString() : "0"}
                        /> : <h1 className='my-2 py-3 text-orange-500 font-light'>{(unit.base_faith && unit.base_faith !== 0 ) ? unit.base_faith?.toString() : "0"}</h1>}
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Base Essence</h1>
                        {editing ? <input 
                            {...register("base_essence", { required: false, valueAsNumber: true })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="number"
                            name="base_essence"
                            disabled={!editing}
                            placeholder={(unit.base_essence && unit.base_essence !== 0 ) ? unit.base_essence?.toString() : "0"}
                        /> : <h1 className='my-2 py-3 text-orange-500 font-light'>{(unit.base_essence && unit.base_essence !== 0 ) ? unit.base_essence?.toString() : "0"}</h1>}                           
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Base Agility</h1>
                        {editing ? <input 
                            {...register("base_agility", { required: false, valueAsNumber: true })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="number"
                            name="base_agility"
                            disabled={!editing}
                            placeholder={(unit.base_agility && unit.base_agility !== 0 ) ? unit.base_agility?.toString() : "0"}
                        /> : <h1 className='my-2 py-3 text-orange-500 font-light'>{(unit.base_agility && unit.base_agility !== 0 ) ? unit.base_agility?.toString() : "0"}</h1>}
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Base Hit Chance</h1>
                        {editing ? <input 
                            {...register("base_hit_chance", { required: false, valueAsNumber: true })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="number"
                            name="base_hit_chance"
                            disabled={!editing}
                            placeholder={(unit.base_hit_chance && unit.base_hit_chance !== 0 ) ? unit.base_hit_chance?.toString() : "0"}
                        /> : <h1 className='my-2 py-3 text-orange-500 font-light'>{(unit.base_hit_chance && unit.base_hit_chance !== 0 ) ? unit.base_hit_chance?.toString() : "0"}</h1>}                           
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Base Evasion</h1>
                        {editing ? <input 
                            {...register("base_evasion", { required: false, valueAsNumber: true })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="number"
                            name="base_evasion"
                            disabled={!editing}
                            placeholder={(unit.base_evasion && unit.base_evasion !== 0 ) ? unit.base_evasion?.toString() : "0"}
                        /> : <h1 className='my-2 py-3 text-orange-500 font-light'>{(unit.base_evasion && unit.base_evasion !== 0 ) ? unit.base_evasion?.toString() : "0"}</h1>}                           
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Skill Picks</h1>
                        {editing ? <input 
                            {...register("skill_picks", { required: false})}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="text"
                            name="skill_picks"
                            disabled={!editing}
                            placeholder={unit.skill_picks ? unit.skill_picks : "N/A"}
                        /> : <h1 className='my-2 py-3 text-orange-500 font-light'>{unit.skill_picks ? unit.skill_picks : "N/A"}</h1>}
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Rank</h1>
                        {editing ? <input 
                            {...register("rank", { required: false, valueAsNumber: true })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="number"
                            name="rank"
                            disabled={!editing}
                            placeholder={(unit.rank && unit.rank !== 0 ) ? unit.rank?.toString() : "0"}
                        /> : <h1 className='my-2 py-3 text-orange-500 font-light'>{(unit.rank && unit.rank !== 0 ) ? unit.rank?.toString() : "0"}</h1>}
                    </div>
                    <div className='flex items-center space-x-2 col-span-4'>
                        <h1 className={`${editing ? "" : "hidden"}`}>Title</h1>
                        <input 
                            {...register("title", { required: false })}
                            className={`my-2 w-full rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : "hidden"}`}
                            name="title"
                            disabled={!editing}
                            placeholder={ unit.title ? unit.title : "title" }
                        />                                
                    </div>
                    <div className='flex items-center space-x-2 col-span-4'>
                        <h1 className={`${editing ? "" : "hidden"}`}>Prefix Title</h1>
                        <input 
                            {...register("prefix_title", { required: false })}
                            className={`my-2 w-full rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : "hidden"}`}
                            name="prefix_title"
                            disabled={!editing}
                            placeholder={ unit.prefix_title ? unit.prefix_title : "Prefix Title" }
                        />                                
                    </div>
                    <div className='flex items-center space-x-2 col-span-4'>
                        <h1 className={`${editing ? "" : "hidden"}`}>Description</h1>
                        <textarea 
                            {...register("description", { required: false })}
                            className={`my-2 w-full rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : "hidden"}`}
                            name="description"
                            disabled={!editing}
                            placeholder={ unit.description ? unit.description : "Description" }
                        />                                
                    </div>
                    <div className='items-center space-x-2 col-span-4 my-4'>
                        <div className='flex space-x-2'>
                            <h1>Traits</h1>
                        </div>
                        
                        {/* Faction Traits */}
                        {(unit.faction.traits && unit.faction.traits.length > 0) ? unit.faction.traits.map((trait: any) => {
                            return <TraitCard key={trait.trait.id} specializationtrait={trait} specializationId={unit.faction.id} editable={false} sub_title='Race Trait' />
                        }) : <h1 className='px-4 text-gray-400'>N/A</h1>}

                        {/* Specialization Traits */}
                        {(unit.specialization.traits && unit.specialization.traits.length > 0) ? unit.specialization.traits.map((trait: any) => {
                            return <TraitCard key={trait.trait.id} specializationtrait={trait} specializationId={unit.specialization.id} editable={false} />
                        }) : <h1 className='px-4 text-gray-400'>N/A</h1>}
                    </div>
                    <div className='items-center space-x-2 col-span-4 my-4'>
                        <div className='flex space-x-2'>
                            <h1>Skills</h1>
                        </div>

                        {(unit.specialization.skills && unit.specialization.skills.length > 0) ? unit.specialization.skills.map((skill: any) => {
                            return <SkillCard key={skill.skill.id} specializationskill={skill} specializationId={unit.specialization.id} editable={false} />
                        }) : <h1 className='px-4 text-gray-400'>N/A</h1>}
                    </div>
                    <div className='items-center space-x-2 col-span-4 my-4'>
                        <div className='flex space-x-2'>
                            <h1>Items</h1>
                            {editing && <NewOptionDialogWithSelection 
                                selectionEndpoint={'/items/'} 
                                selecttionQueryKey={'items'}
                                selectionKey='item'
                                selectionIdOnEndpoint={false}
                                addEndpoint={`/units/add_item/${unit.id}?item_id=`}
                                invalidationKey={`unit`} 
                                extraFormParams={['quantity']}
                                title={'Add Items'}
                                description={'Some items are imbued with ancient arts and magic which allows the wielder to use special skills, old spells and magic to aid them in battle.'} 
                                styles='bg-black hover:bg-purple-300/10 border dark:border-yellow-900/50 rounded-md'/>}
                        </div>
                        {(unit.items && unit.items.length > 0) ? unit.items.map((item: any) => {
                            return <ItemCard key={item.item.id} OwnerItem={item} editable={editing} deleteEndpoint={`/units/remove_item/${unit.id}?item_id=`} invaildateQueryKey={'unit'}  />
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
