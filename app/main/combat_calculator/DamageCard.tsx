import OptionSelection from '@/app/_components/OptionSelection';
import OptionSelectionList from '@/app/_components/OptionSelectionList';
import React, { Suspense, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

interface Effect {

}

interface DamageForm {
	origin: number | null;
	targets: number[];
    damage: number | null;
    damage_modifiers: string | null;
    hit_chance: number | null;
    armor_piercing: number | null;
    is_magical: boolean | null;
}

interface DamageCardProps {
    units: any[];
    HandleDamageDealClick?: any;
    style?: string;
}

export default function DamageCard({units, HandleDamageDealClick, style}: DamageCardProps) {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<DamageForm>();
    const [unit, setUnit] = useState<any>(undefined)
    const [is_magical, setIs_magical] = useState<boolean>(false)
    const [availableSkills, setAvailableSkills] = useState<any[]>([])

    useEffect(() => {
        // Skills List
        if(unit){
            let skills:any = []
            // Specialization Skills
            if(unit.specialization){ 
                unit.specialization.skills.forEach( (skill:any) =>{
                    skills.push(skill)
                })
            }
            // Item Skills
            if(unit.items){
                unit.items.forEach( (item: any) => {
                    if(item.item.skills){ 
                        item.item.skills.forEach( (skill:any) =>{
                            skills.push(skill) 
                        })
                    }
                })
            }

            setAvailableSkills(skills);
        }
    }, [unit])

    const HandleUnitSelection = (selection: any) => {
        setUnit(selection)
    }

    return (
    <div className={`flex flex-col items-center p-2 border-4 rounded-lg dark:dark:border-yellow-900/50 text-yellow-200/70 dark:bg-[url('/bg1.jpg')] w-2/3 ${style}`}>
        <h2>Action</h2>
        <form className='w-full space-y-2' onSubmit={handleSubmit(HandleDamageDealClick)}>
            <div className='flex justify-between'>
                {/* Unit Selection */}
                {units && <div className='flex items-center'>
                        <h3 className='text-yellow-500/80 font-medium'>Origin:</h3>
                        <OptionSelectionList options={units} queryKey={'Units'} onSelectionChange={HandleUnitSelection} style='w-28' />
                    </div>}
                <div className=''>
                    <input 
                        {...register("targets", { required: false })}
                        className='w-full rounded-lg p-1 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                        type="text"
                        name="targets"
                        placeholder="Targets"
                    />                                
                </div>
            </div>
            <div className='flex justify-between'>
                <div className=''>
                    <input 
                        {...register("damage", { required: false })}
                        className='w-full rounded-lg p-1 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                        type="text"
                        name="damage"
                        placeholder="Damage"
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
                <div className='flex items-center space-x-2'>
                    <h3 className='text-yellow-500/80 font-medium'>Magical:</h3>
                    <input
                        {...register("is_magical", { required: true,})}
                        name="is_magical"
                        type="checkbox"
                        onChange={e => {
                            setValue("is_magical", e.target.checked);
                            setIs_magical(!is_magical);
                        }}
                        checked={is_magical}
                    />
                </div>
            </div>
            {(availableSkills.length > 0) && availableSkills.map((skill: any)=>{
                return <div>{skill.skill.name}</div>
            })}
            <div className='inline-flex justify-center hover:text-gray-200 border dark:border-yellow-900/50 shadow-md rounded-lg px-4 py-2 bg-black hover:bg-purple-300/10
                                cursor-pointer'>
                    <input type="submit" value="Deal" className='text-gray-400 text-sm cursor-pointer'/>
            </div>
        </form>
    </div>
  )
}
