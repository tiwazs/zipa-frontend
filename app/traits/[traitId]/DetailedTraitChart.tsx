import Link from 'next/link';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import TraitEffectCard from './TraitEffectCard';
import NewSkillEffectDialog from './NewTraitOptionDialog';

interface Trait {
    id: string;
    name: string;
    description: string;
    effects?: any[]
}

type DetailedTraitChartProps = {
    trait: Trait;
    styles?: string;
}


export default function DetailedTraitChart({trait, styles}: DetailedTraitChartProps) {
    const [ editing, setEditing ] = useState(false);
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<Trait>();
    const queryClient = useQueryClient();

    const onCancel = () => {
        reset();
        setEditing(!editing) 
    }

    const onSubmit:SubmitHandler<Trait> = async (data) => {
        console.log(`Submitting data:  ${JSON.stringify(data)}`);

        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/traits/${trait.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            });
            console.log(`Response: ${JSON.stringify(response)}`);


            queryClient.invalidateQueries(`trait`);
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
                            placeholder={ trait.description ? trait.description : "Description" }
                        />                                
                    </div>
                    <div className='items-center space-x-2 col-span-4 my-4'>
                        <div className='flex space-x-2'>
                            <h1>Effects</h1>
                            {editing && <NewSkillEffectDialog traitId={trait.id} styles='bg-black hover:bg-purple-300/10 border dark:border-yellow-900/50 rounded-md' 
                                    title={'Add Effects'} 
                                    description={'Traits may leave lasting effects on the target. These effects can be positive or negative. select the type of effect you want to add to this trait.'} 
                            />}
                        </div>
                        {(trait.effects && trait.effects.length > 0) ? trait.effects.map((effect: any) => {
                            return <TraitEffectCard key={effect.effect.id} traiteffect={effect} traitId={trait.id} editable={editing} />       
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
