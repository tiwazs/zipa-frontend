import React from 'react'
import { useForm } from 'react-hook-form';

interface Effect {

}

interface DamageForm {
	origin: number | null;
	victims: number[];
    damage_pure: number | null;
    damage_modifiers: string | null;
    hit_chance: number | null;
    armor_piercing: number | null;
    is_magical: boolean | null;
}

interface DamageCardProps {
    HandleDamageDealClick?: any;
    style?: string;
}

export default function DamageCard({HandleDamageDealClick, style}: DamageCardProps) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<DamageForm>();

    return (
    <div className={`flex flex-col items-center p-2 border-4 rounded-lg dark:dark:border-yellow-900/50 text-yellow-200/70 dark:bg-[url('/bg1.jpg')] w-2/3 ${style}`}>
        <h2>Damage</h2>
        <form className='w-full space-y-2' onSubmit={handleSubmit(HandleDamageDealClick)}>
            <div className='flex justify-between'>
                <div className=''>
                    <input 
                        {...register("origin", { required: true, valueAsNumber: true })}
                        className='w-full rounded-lg p-1 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                        type="number"
                        name="origin"
                        placeholder="Origin"
                    />                                
                </div>
                <div className=''>
                    <input 
                        {...register("victims", { required: false })}
                        className='w-full rounded-lg p-1 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                        type="text"
                        name="victims"
                        placeholder="Vitims"
                    />                                
                </div>
            </div>
            <div className='flex justify-between'>
                <div className=''>
                    <input 
                        {...register("damage_pure", { required: false })}
                        className='w-full rounded-lg p-1 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                        type="text"
                        name="damage_pure"
                        placeholder="Pure Damage"
                    />                                
                </div>
                <div className=''>
                    <input 
                        {...register("damage_modifiers", { required: false })}
                        className='w-full rounded-lg p-1 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                        type="text"
                        name="damage_modifiers"
                        placeholder="Damage Modifiers"
                    />                                
                </div>
                <div className=''>
                    <input 
                        {...register("hit_chance", { required: false })}
                        className='w-full rounded-lg p-1 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                        type="text"
                        name="hit_chance"
                        placeholder="Hit Chance"
                    />                                
                </div>
                <div className=''>
                    <input 
                        {...register("armor_piercing", { required: false })}
                        className='w-full rounded-lg p-1 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                        type="text"
                        name="armor_piercing"
                        placeholder="Armor Piercing"
                    />                                
                </div>
                <div className='inline-flex justify-center hover:text-gray-200 border dark:border-yellow-900/50 shadow-md rounded-lg px-4 py-2 bg-black hover:bg-purple-300/10
                                    cursor-pointer'>
                        <input type="submit" value="Deal" className='text-gray-400 text-sm cursor-pointer'/>
                </div>
            </div>
        </form>
    </div>
  )
}
