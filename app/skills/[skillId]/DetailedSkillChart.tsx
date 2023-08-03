import Link from 'next/link';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import SkillEffectCard from './SkillEffectCard';
import SkillSummonCard from './SkillSummonCard';
import NewSkillEffectDialog from './NewSkillOptionDialog';

interface Skill {
    id: string;
    name: string;
    description: string;
    conditions?: string;
    physical_damage?: string;
    magical_damage?: string;
    healing?: string;
    vitality_recovery?: string;
    essence_recovery?: string;
    range?: string;
    area_of_effect?: string;
    essence_cost?: string;
    vitality_cost?: string;
    cooldown?: number;
    channeled?: number;
    target?: string
    skill_on?: string
    skill_types?: any[]
    effects?: any[]
    summons?: any[]
}

type DetailedSkillChartProps = {
    skill: Skill;
    styles?: string;
}


export default function DetailedSkillChart({skill, styles}: DetailedSkillChartProps) {
    const [ editing, setEditing ] = useState(false);
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<Skill>();
    const queryClient = useQueryClient();

    const onCancel = () => {
        reset();
        setEditing(!editing) 
    }

    const onSubmit:SubmitHandler<Skill> = async (data) => {
        console.log(`Submitting data:  ${JSON.stringify(data)}`);

        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skills/${skill.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            });
            console.log(`Response: ${JSON.stringify(response)}`);


            queryClient.invalidateQueries(`skill`);
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
                    <div className='flex items-center space-x-2'>
                        <h1>Physical Damage</h1>
                        <input 
                            {...register("physical_damage", { required: false })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="text"
                            name="physical_damage"
                            disabled={!editing}
                            placeholder={skill.physical_damage ? skill.physical_damage : "N/A"}
                        />                                
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Magical Damage</h1>
                        <input 
                            {...register("magical_damage", { required: false })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="text"
                            name="magical_damage"
                            disabled={!editing}
                            placeholder={skill.magical_damage ? skill.magical_damage : "N/A"}
                        />                                
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Healing</h1>
                        <input 
                            {...register("healing", { required: false })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="text"
                            name="healing"
                            disabled={!editing}
                            placeholder={skill.healing ? skill.healing : "N/A"}
                        />                                
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Vitality Recovery</h1>
                        <input 
                            {...register("vitality_recovery", { required: false })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="text"
                            name="vitality_recovery"
                            disabled={!editing}
                            placeholder={skill.vitality_recovery ? skill.vitality_recovery : "N/A"}
                        />                                
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Essence Recovery</h1>
                        <input 
                            {...register("essence_recovery", { required: false })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="text"
                            name="essence_recovery"
                            disabled={!editing}
                            placeholder={skill.essence_recovery ? skill.essence_recovery : "N/A"}
                        />                                
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Range</h1>
                        <input 
                            {...register("range", { required: false })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="text"
                            name="range"
                            disabled={!editing}
                            placeholder={skill.range ? skill.range : "N/A"}
                        />                                
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Area of Effect</h1>
                        <input 
                            {...register("area_of_effect", { required: false })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="text"
                            name="area_of_effect"
                            disabled={!editing}
                            placeholder={skill.area_of_effect ? skill.area_of_effect : "N/A"}
                        />                                
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Essence Cost</h1>
                        <input 
                            {...register("essence_cost", { required: false })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="text"
                            name="essence_cost"
                            disabled={!editing}
                            placeholder={skill.essence_cost ? skill.essence_cost : "N/A"}
                        />                                
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Vitality Cost</h1>
                        <input 
                            {...register("vitality_cost", { required: false })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="text"
                            name="vitality_cost"
                            disabled={!editing}
                            placeholder={skill.vitality_cost ? skill.vitality_cost : "N/A"}
                        />                                
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Cooldown</h1>
                        {editing ? <input 
                            {...register("cooldown", { required: false, valueAsNumber: true })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="number"
                            name="cooldown"
                            disabled={!editing}
                            placeholder={(skill.cooldown && skill.cooldown !== 0 ) ? skill.cooldown?.toString() : "0"}
                        /> : <h1>{(skill.cooldown && skill.cooldown !== 0 ) ? skill.cooldown?.toString() : "0"}</h1>}                           
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Channeled</h1>
                        {editing ? <input 
                            {...register("channeled", { required: false, valueAsNumber: true })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="number"
                            name="channeled"
                            disabled={!editing}
                            placeholder={skill.channeled ? skill.channeled?.toString() : "False"}
                        /> : <h1>{skill.channeled ? skill.channeled?.toString() : "False"}</h1>}                       
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Target</h1>
                        {editing ? <select 
                            {...register("target", { required: false })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            name="target"
                            placeholder="ENEMY"
                            disabled={!editing}
                        >       
                            <option value="NONE">NONE</option>
                            <option value="SELF">SELF</option>
                            <option value="ALLY">ALLY</option>
                            <option value="ALLY_SUMMON">ALLY_SUMMON</option>
                            <option value="ALLY_AROUND">ALLY_AROUND</option>
                            <option value="ALLY_EXCEPT_SELF">ALLY_EXCEPT_SELF</option>
                            <option value="ENEMY">ENEMY</option>
                            <option value="ENEMY_SUMMON">ENEMY_SUMMON</option>
                            <option value="ENEMY_AROUND">ENEMY_AROUND</option>
                            <option value="ANY">ANY</option>
                            <option value="ANY_AROUND">ANY_AROUND</option>
                            <option value="ANY_EXCEPT_SELF">ANY_EXCEPT_SELF</option>
                            <option value="ANY_SUMMON">ANY_SUMMON</option>
                            <option value="POINT">POINT</option>
                            <option value="POINT_ENEMY">POINT_ENEMY</option>
                            <option value="POINT_ALLY">POINT_ALLY</option>
                            <option value="AREA">AREA</option>
                            <option value="AREA_ENEMY">AREA_ENEMY</option>
                            <option value="AREA_ALLY">AREA_ALLY</option>
                        </select> : <h1 className='my-2 py-3'>{skill.target}</h1> }
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Target Type</h1>
                        {editing ? <select 
                            {...register("skill_on", { required: false })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            name='skill_on'
                            placeholder="INSTANT"
                            disabled={!editing}
                        >
                            <option value="INSTANT">INSTANT</option>
                            <option value="OVER_TIME">OVER_TIME</option>
                            <option value="DURING_CHANNEL">DURING_CHANNEL</option>
                            <option value="AFTER_CHANNEL">AFTER_CHANNEL</option>
                            <option value="DELAYED">DELAYED</option>
                        </select> : <h1 className='my-2 py-3'>{skill.skill_on}</h1> }

                    </div>
                    <div className='flex items-center space-x-2 col-span-4'>
                        <h1>Conditions</h1>      
                        { editing ? <textarea 
                            {...register("conditions", { required: true })}
                            className={`my-2 w-full rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            name="conditions"
                            disabled={!editing}
                            placeholder={skill.conditions ? skill.conditions : "N/A"}
                        /> : <h1 className='my-2 py-3'>{skill.conditions ? skill.conditions : "N/A"}</h1> }
                    </div>
                    <div className='flex items-center space-x-2 col-span-4'>
                        <h1 className={`${editing ? "" : "hidden"}`}>Description</h1>
                        <textarea 
                            {...register("description", { required: false })}
                            className={`my-2 w-full rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : "hidden"}`}
                            name="description"
                            disabled={!editing}
                            placeholder={ skill.description ? skill.description : "Description" }
                        />                                
                    </div>
                    <div className='items-center space-x-2 col-span-4 my-4'>
                        <div className='flex space-x-2'>
                            <h1>Effects</h1>
                            {editing && <NewSkillEffectDialog skillId={skill.id} styles='bg-black hover:bg-purple-300/10 border dark:border-yellow-900/50 rounded-md' 
                                    title={'Add Effects'} 
                                    description={'Skills may leave lasting effects on the target. These effects can be positive or negative. select the type of effect you want to add to this skill.'} 
                                    selection={'effects'} 
                            />}
                        </div>
                        {(skill.effects && skill.effects.length > 0) ? skill.effects.map((effect: any) => {
                            return <SkillEffectCard skilleffect={effect} skillId={skill.id} editable={editing} />       
                        }) : <h1 className='px-4 text-gray-400'>N/A</h1>}
                    </div>
                    <div className='items-center space-x-2 col-span-4 my-4'>
                        <div className='flex space-x-2'>
                            <h1>Summons</h1>
                            {editing && <NewSkillEffectDialog skillId={skill.id} styles='bg-black hover:bg-purple-300/10 border dark:border-yellow-900/50 rounded-md' 
                                        title={'Add Summons'} 
                                        description={'Skills may summon other entities to the battlefield. These summons can be positive or negative. select the type of summon you want to add to this skill.'}
                                        selection={'summons'} 
                            />}
                        </div>
                        {(skill.summons && skill.summons.length > 0) ? skill.summons.map((summon: any) => {
                            return <SkillSummonCard summon={summon} skillId={skill.id} editable={editing} />
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
