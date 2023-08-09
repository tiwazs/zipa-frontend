import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import SpecializationSkillCard from './SpecializationSkillCard';
import NewSpecializationOptionDialog from './NewSpecializationOptionDialog';

interface Specialization {
    id: string;
    name: string;
    description: string;
    conditions?: string;
    rarity: string;
    magic_effectiveness?: string;
    physical_damage?: string;
    magical_damage?: string;
    healing?: string;
    vitality_recovery?: string;
    essence_recovery?: string;
    vitality?: string;
    range?: string;
    damage?: string;
    armor?: string;
    magic_armor?: string;
    essence?: string;
    agility?: string;
    hit_chance?: string;
    evasion?: string;
    hit_rate?: string;
    movement?: string;
    weapon_proficiencies: string;
    dexterity_requirement?: number;
    strength_requirement?: number;
    mind_requirement?: number;
    faith_requirement?: number;
    weight?: number;
    skills: any[];
}

type DetailedSpecializationChartProps = {
    specialization: Specialization;
    styles?: string;
}


export default function DetailedSpecializationChart({specialization, styles}: DetailedSpecializationChartProps) {
    const [ editing, setEditing ] = useState(false);
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<Specialization>();
    const queryClient = useQueryClient();

    const onCancel = () => {
        reset();
        setEditing(!editing) 
    }

    const onSubmit:SubmitHandler<Specialization> = async (data) => {
        console.log(`Submitting data:  ${JSON.stringify(data)}`);

        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/specializations/update/${specialization.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            });
            console.log(`Response: ${JSON.stringify(response)}`);


            queryClient.invalidateQueries(`specialization`);
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
                    <div className='items-center space-x-2 col-span-4 my-4'>
                        <div className='flex space-x-2'>
                            <h1>Skills</h1>
                            {editing && <NewSpecializationOptionDialog specializationId={specialization.id} styles='bg-black hover:bg-purple-300/10 border dark:border-yellow-900/50 rounded-md' 
                                    title={'Add Skills'} 
                                    description={'Some items are imbued with ancient arts and magic which allows the wielder to use special skills, old spells and magic to aid them in battle.'} 
                            />}
                        </div>
                        {(specialization.skills && specialization.skills.length > 0) ? specialization.skills.map((skill: any) => {
                            return <SpecializationSkillCard key={skill.skill.id} specializationskill={skill} specializationId={specialization.id} editable={editing} />       
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
