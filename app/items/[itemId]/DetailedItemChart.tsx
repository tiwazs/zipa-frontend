import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import NewItemOptionDialog from './NewItemOptionDialog';
import ItemSkillCard from './ItemSkillCard';
import { paintRarity } from '@/app/_libs/text_paint_methods';

interface Item {
    id: string;
    name: string;
    description: string;
    conditions?: string;
    rarity: string;
    is_weapon: boolean;
    object_type: string;
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
    ammo?: string;
    shield?: string;
    dexterity_requirement?: number;
    strength_requirement?: number;
    mind_requirement?: number;
    faith_requirement?: number;
    weight?: number;
    skills: any[];
    icon?: File[];
}

type DetailedItemChartProps = {
    item: Item;
    styles?: string;
}


export default function DetailedItemChart({item, styles}: DetailedItemChartProps) {
    const [ editing, setEditing ] = useState(false);
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<Item>();
    const queryClient = useQueryClient();

    const onCancel = () => {
        reset();
        setEditing(!editing) 
    }

    const onSubmit:SubmitHandler<Item> = async (data) => {
        console.log(`Submitting data:  ${JSON.stringify(data)}`);

        let form = new FormData();
        if(data.icon){
            form.append('image', data.icon[0]);
            form.append('type', 'image/jpeg');
            
            try{
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/image/${item.id}`, {
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/update/${item.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            });
            console.log(`Response: ${JSON.stringify(response)}`);


            queryClient.invalidateQueries(`item`);
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
                        <h1>Rarity</h1>
                        {editing ? <select 
                            {...register("rarity", { required: false })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            name='rarity'
                            placeholder=""
                            disabled={!editing}
                        >
                            <option value=""></option>
                            <option value="COMMON">COMMON</option>
                            <option value="UNCOMMON">UNCOMMON</option>
                            <option value="RARE">RARE</option>
                            <option value="EPIC">EPIC</option>
                            <option value="LEGENDARY">LEGENDARY</option>
                        </select> : <h1 className={`my-2 py-3 ${paintRarity(item.rarity)}`}>{item.rarity}</h1> }

                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Magic Power</h1>
                        <input 
                            {...register("magic_effectiveness", { required: false })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="text"
                            name="magic_effectiveness"
                            disabled={!editing}
                            placeholder={item.magic_effectiveness ? item.magic_effectiveness : "N/A"}
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
                            placeholder={item.physical_damage ? item.physical_damage : "N/A"}
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
                            placeholder={item.magical_damage ? item.magical_damage : "N/A"}
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
                            placeholder={item.healing ? item.healing : "N/A"}
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
                            placeholder={item.vitality_recovery ? item.vitality_recovery : "N/A"}
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
                            placeholder={item.essence_recovery ? item.essence_recovery : "N/A"}
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
                            placeholder={item.vitality ? item.vitality : "N/A"}
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
                            placeholder={item.range ? item.range : "N/A"}
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
                            placeholder={item.damage ? item.damage : "N/A"}
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
                            placeholder={item.armor ? item.armor : "N/A"}
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
                            placeholder={item.magic_armor ? item.magic_armor : "N/A"}
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
                            placeholder={item.essence ? item.essence : "N/A"}
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
                            placeholder={item.agility ? item.agility : "N/A"}
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
                            placeholder={item.hit_chance ? item.hit_chance : "N/A"}
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
                            placeholder={item.evasion ? item.evasion : "N/A"}
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
                            placeholder={item.hit_rate ? item.hit_rate : "N/A"}
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
                            placeholder={item.movement ? item.movement : "N/A"}
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
                            placeholder={item.ammo ? item.ammo : "N/A"}
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
                            placeholder={item.shield ? item.shield : "N/A"}
                        />                                
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Dexterity Requirement</h1>
                        {editing ? <input 
                            {...register("dexterity_requirement", { required: false, valueAsNumber: true })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="number"
                            name="dexterity_requirement"
                            disabled={!editing}
                            placeholder={(item.dexterity_requirement && item.dexterity_requirement !== 0 ) ? item.dexterity_requirement?.toString() : "0"}
                        /> : <h1 className='my-2 py-3 text-orange-500 font-light'>{(item.dexterity_requirement && item.dexterity_requirement !== 0 ) ? item.dexterity_requirement?.toString() : "0"}</h1>}                           
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Strength Requirement</h1>
                        {editing ? <input 
                            {...register("strength_requirement", { required: false, valueAsNumber: true })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="number"
                            name="strength_requirement"
                            disabled={!editing}
                            placeholder={(item.strength_requirement && item.strength_requirement !== 0 ) ? item.strength_requirement?.toString() : "0"}
                        /> : <h1 className='my-2 py-3 text-orange-500 font-light'>{(item.strength_requirement && item.strength_requirement !== 0 ) ? item.strength_requirement?.toString() : "0"}</h1>}                           
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Mind Requirement</h1>
                        {editing ? <input 
                            {...register("mind_requirement", { required: false, valueAsNumber: true })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="number"
                            name="mind_requirement"
                            disabled={!editing}
                            placeholder={(item.mind_requirement && item.mind_requirement !== 0 ) ? item.mind_requirement?.toString() : "0"}
                        /> : <h1 className='my-2 py-3 text-orange-500 font-light'>{(item.mind_requirement && item.mind_requirement !== 0 ) ? item.mind_requirement?.toString() : "0"}</h1>}                           
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Faith Requirement</h1>
                        {editing ? <input 
                            {...register("faith_requirement", { required: false, valueAsNumber: true })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="number"
                            name="faith_requirement"
                            disabled={!editing}
                            placeholder={(item.faith_requirement && item.faith_requirement !== 0 ) ? item.faith_requirement?.toString() : "0"}
                        /> : <h1 className='my-2 py-3 text-orange-500 font-light'>{(item.faith_requirement && item.faith_requirement !== 0 ) ? item.faith_requirement?.toString() : "0"}</h1>}                           
                    </div>
                    <div className='flex items-center space-x-2'>
                        <h1>Weight</h1>
                        {editing ? <input 
                            {...register("weight", { required: false, valueAsNumber: true })}
                            className={`my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            type="number"
                            name="weight"
                            disabled={!editing}
                            placeholder={(item.weight && item.weight !== 0 ) ? item.weight?.toString() : "0"}
                        /> : <h1 className='my-2 py-3 text-orange-500 font-light'>{(item.weight && item.weight !== 0 ) ? item.weight?.toString() : "0"}</h1>}                           
                    </div>
                    <div className='flex items-center space-x-2 col-span-4'>
                        <h1>Conditions</h1>      
                        { editing ? <textarea 
                            {...register("conditions", { required: false })}
                            className={`my-2 w-full rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : ""}`}
                            name="conditions"
                            disabled={!editing}
                            placeholder={item.conditions ? item.conditions : "N/A"}
                        /> : <h1 className='my-2 py-3 text-orange-500 font-light'>{item.conditions ? item.conditions : "N/A"}</h1> }
                    </div>
                    <div className='flex items-center space-x-2 col-span-4'>
                        <h1 className={`${editing ? "" : "hidden"}`}>Description</h1>
                        <textarea 
                            {...register("description", { required: false })}
                            className={`my-2 w-full rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none ${editing ? "border dark:border-yellow-900/50" : "hidden"}`}
                            name="description"
                            disabled={!editing}
                            placeholder={ item.description ? item.description : "Description" }
                        />                                
                    </div>
                    <div className='items-center space-x-2 col-span-4 my-4'>
                        <div className='flex space-x-2'>
                            <h1>Skills</h1>
                            {editing && <NewItemOptionDialog itemId={item.id} styles='bg-black hover:bg-purple-300/10 border dark:border-yellow-900/50 rounded-md' 
                                    title={'Add Skills'} 
                                    description={'Some items are imbued with ancient arts and magic which allows the wielder to use special skills, old spells and magic to aid them in battle.'} 
                            />}
                        </div>
                        {(item.skills && item.skills.length > 0) ? item.skills.map((skill: any) => {
                            return <ItemSkillCard key={skill.skill.id} itemskill={skill} itemId={item.id} editable={editing} />       
                        }) : <h1 className='px-4 text-gray-400'>N/A</h1>}
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
