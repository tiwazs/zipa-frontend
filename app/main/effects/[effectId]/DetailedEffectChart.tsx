import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';

interface Effect {
    id: string;
    name: string;
    description: string;
    magic_effectiveness?: string;
    physical_damage?: string;
    magical_damage?: string;
    healing?: string;
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
    ammo?: string;
    shield?: string;
    barrier?: string;
    instant_vitality_recovery: string;
    instant_essence_recovery: string;
    instant_physical_damage: string;
    instant_magical_damage: string;
    instant_target: string;
    instant_area_of_effect: string;
    instant_conditions: string;
    max_stack?: number;
    icon?: File[];
}

type DetailedEffectChartProps = {
    effect: Effect;
    styles?: string;
}


export default function DetailedEffectChart({effect, styles}: DetailedEffectChartProps) {
    const [ editing, setEditing ] = useState(false);
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<Effect>();
    const queryClient = useQueryClient();

    const onCancel = () => {
        reset();
        setEditing(!editing) 
    }

    const onSubmit:SubmitHandler<Effect> = async (data) => {
        console.log(`Submitting data:  ${JSON.stringify(data)}`);

        let form = new FormData();
        if(data.icon && data.icon.length > 0){
            form.append('image', data.icon[0]);
            form.append('type', 'image/jpeg');
            
            try{
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/effects/image/${effect.id}`, {
                    method: "POST",
                    body: form
                });
                console.log(`Response: ${JSON.stringify(response)}`);
            }catch(e){
                console.log(`Error: ${e}`);
            }

            delete data.icon;
        }

        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/effects/${effect.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            });
            console.log(`Response: ${JSON.stringify(response)}`);


            queryClient.invalidateQueries(`effect`);
            setEditing(false);
        }catch(e){
            console.log(`Error: ${e}`);
            setEditing(false);
        }
    }
    return (
    <>
        <div className="transform overflow-hidden rounded-2xl p-6 text-left shadow-xl transition-all 
                                  group border-transparent border-4 dark:dark:border-yellow-900/50 text-yellow-200/70 dark:bg-[url('/bg1.jpg')]">
            <h2 className={`mb-3 text-xl font-medium`}>
              Detailed Information{' '}
            </h2>
            <form className='rounded-2xl' onSubmit={handleSubmit(onSubmit)}>
                <div className='mx-2 lg:grid lg:grid-cols-4'>
                    <div className='flex items-center space-x-2'>
                        <h1>Magic Power</h1>
                        <input 
                            {...register("magic_effectiveness", { required: false })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="text"
                            name="magic_effectiveness"
                            disabled={!editing}
                            placeholder={effect.magic_effectiveness ? effect.magic_effectiveness : "N/A"}
                        />
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Physical Damage</h1>
                        <input 
                            {...register("physical_damage", { required: false })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="text"
                            name="physical_damage"
                            disabled={!editing}
                            placeholder={effect.physical_damage ? effect.physical_damage : "N/A"}
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
                            placeholder={effect.magical_damage ? effect.magical_damage : "N/A"}
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
                            placeholder={effect.healing ? effect.healing : "N/A"}
                        />                                
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Vitality</h1>
                        <input 
                            {...register("vitality", { required: false })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="text"
                            name="vitality"
                            disabled={!editing}
                            placeholder={effect.vitality ? effect.vitality : "N/A"}
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
                            placeholder={effect.range ? effect.range : "N/A"}
                        />                                
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Damage</h1>
                        <input 
                            {...register("damage", { required: false })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="text"
                            name="damage"
                            disabled={!editing}
                            placeholder={effect.damage ? effect.damage : "N/A"}
                        />                                
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Armor</h1>
                        <input 
                            {...register("armor", { required: false })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="text"
                            name="armor"
                            disabled={!editing}
                            placeholder={effect.armor ? effect.armor : "N/A"}
                        />                                
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Magic Armor</h1>
                        <input 
                            {...register("magic_armor", { required: false })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="text"
                            name="magic_armor"
                            disabled={!editing}
                            placeholder={effect.magic_armor ? effect.magic_armor : "N/A"}
                        />                                
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Essence</h1>
                        <input 
                            {...register("essence", { required: false })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="text"
                            name="essence"
                            disabled={!editing}
                            placeholder={effect.essence ? effect.essence : "N/A"}
                        />                                
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Agility</h1>
                        <input 
                            {...register("agility", { required: false })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="text"
                            name="agility"
                            disabled={!editing}
                            placeholder={effect.agility ? effect.agility : "N/A"}
                        />                                
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Hit Chance</h1>
                        <input 
                            {...register("hit_chance", { required: false })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="text"
                            name="hit_chance"
                            disabled={!editing}
                            placeholder={effect.hit_chance ? effect.hit_chance : "N/A"}
                        />                                
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Evasion</h1>
                        <input 
                            {...register("evasion", { required: false })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="text"
                            name="evasion"
                            disabled={!editing}
                            placeholder={effect.evasion ? effect.evasion : "N/A"}
                        />                                
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Hit Rate</h1>
                        <input 
                            {...register("hit_rate", { required: false })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="text"
                            name="hit_rate"
                            disabled={!editing}
                            placeholder={effect.hit_rate ? effect.hit_rate : "N/A"}
                        />                                
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Movement</h1>
                        <input 
                            {...register("movement", { required: false })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="text"
                            name="movement"
                            disabled={!editing}
                            placeholder={effect.movement ? effect.movement : "N/A"}
                        />                                
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Ammo</h1>
                        <input 
                            {...register("ammo", { required: false })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="text"
                            name="ammo"
                            disabled={!editing}
                            placeholder={effect.ammo ? effect.ammo : "N/A"}
                        />                                
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Shield</h1>
                        <input 
                            {...register("shield", { required: false })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="text"
                            name="shield"
                            disabled={!editing}
                            placeholder={effect.shield ? effect.shield : "N/A"}
                        />                                
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Barrier</h1>
                        <input 
                            {...register("barrier", { required: false })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="text"
                            name="barrier"
                            disabled={!editing}
                            placeholder={effect.barrier ? effect.barrier : "N/A"}
                        />                                
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Shield</h1>
                        <input 
                            {...register("shield", { required: false })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="text"
                            name="shield"
                            disabled={!editing}
                            placeholder={effect.shield ? effect.shield : "N/A"}
                        />                                
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Max Stack</h1>
                        { editing ? <input 
                            {...register("max_stack", { required: false, valueAsNumber: true })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="number"
                            name="max_stack"
                            disabled={!editing}
                            placeholder={ (effect.max_stack && effect.max_stack!==0) ? effect.max_stack.toString() : "0"}
                        /> : <h1 className='text-gray-400'>{effect.max_stack ? effect.max_stack : "N/A"}</h1> }
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Instant Vitality Recovery</h1>
                        <input 
                            {...register("instant_vitality_recovery", { required: false })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="text"
                            name="instant_vitality_recovery"
                            disabled={!editing}
                            placeholder={effect.instant_vitality_recovery ? effect.instant_vitality_recovery : "N/A"}
                        />                                
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Instant Essence Recovery</h1>
                        <input 
                            {...register("instant_essence_recovery", { required: false })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="text"
                            name="instant_essence_recovery"
                            disabled={!editing}
                            placeholder={effect.instant_essence_recovery ? effect.instant_essence_recovery : "N/A"}
                        />                                
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Instant Physical Damage</h1>
                        <input 
                            {...register("instant_physical_damage", { required: false })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="text"
                            name="instant_physical_damage"
                            disabled={!editing}
                            placeholder={effect.instant_physical_damage ? effect.instant_physical_damage : "N/A"}
                        />                                
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Instant Magical Damage</h1>
                        <input 
                            {...register("instant_magical_damage", { required: false })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="text"
                            name="instant_magical_damage"
                            disabled={!editing}
                            placeholder={effect.instant_magical_damage ? effect.instant_magical_damage : "N/A"}
                        />                                
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Instant Target</h1>
                        {editing ? <select 
                            {...register("instant_target", { required: false })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            name="instant_target"
                            placeholder=""
                            disabled={!editing}
                        >   
                            <option value=""></option>    
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
                        </select> : <h1 className='my-2 py-3'>{effect.instant_target}</h1> }
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Instant Area of Effect</h1>
                        <input 
                            {...register("instant_area_of_effect", { required: false })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="text"
                            name="instant_area_of_effect"
                            disabled={!editing}
                            placeholder={effect.instant_area_of_effect ? effect.instant_area_of_effect : "N/A"}
                        />                                
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Instant Conditions</h1>
                        <input 
                            {...register("instant_conditions", { required: false })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="text"
                            name="instant_conditions"
                            disabled={!editing}
                            placeholder={effect.instant_conditions ? effect.instant_conditions : "N/A"}
                        />                                
                    </div>
                    <div className='flex items-center space-x-2 col-span-3'>
                        <h1 className={`${editing ? "" : "hidden"}`}>Description</h1>
                        <textarea 
                            {...register("description", { required: false })}
                            className={`my-2 w-full rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : "hidden"}`}
                            name="description"
                            disabled={!editing}
                            placeholder={ effect.description ? effect.description : "Description" }
                        />                                
                    </div>
                    <div className='flex items-center space-x-2 col-span-3'>
                        <h1 className={`${editing ? "" : "hidden"}`}>Icon</h1>
                        <input 
                            {...register("icon", { required: false })}
                            className={`my-2 w-full rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "" : "hidden"}`}
                            type="file"
                            name="icon"
                            
                        />                                
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
