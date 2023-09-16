import OptionSelection from '@/app/_components/OptionSelection';
import OptionSelectionList from '@/app/_components/OptionSelectionList';
import React, { Suspense, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

interface Effect {

}

interface DamageForm {
	origin: number | null;
	targets: number[];
    phisical_damage: number | null;
    magical_damage: number | null;
    physical_damage_modifiers: string | null;
    magical_damage_modifiers: string | null;
    is_projectile: boolean | null;
    hit_chance: number | null;
    armor_piercing: number | null;
    spell_piercing: number | null;
}

interface DamageCardProps {
    units: any[];
    onActClick?: any;
    style?: string;
}

const BaseActions = [
    {name:"Normal Attack", id:1},
    {name:"Skill", id:2},
    {name:"Pure Effect", id:3}
]

export default function DamageCard({units, onActClick, style}: DamageCardProps) {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<DamageForm>();
    const [unit, setUnit] = useState<any>(undefined)
    const [action, setAction] = useState<any>(undefined)
    const [skill, setSkill] = useState<any>(undefined)
    const [availableSkills, setAvailableSkills] = useState<any[]>([])

    useEffect(() => {
        // Skills List
        if(unit){
            let skills:any = []
            // Specialization Skills
            if(unit.specialization){ 
                unit.specialization.skills.forEach( (skill:any) =>{
                    skills.push(skill.skill)
                })
            }
            // Item Skills
            if(unit.items){
                unit.items.forEach( (item: any) => {
                    if(item.item.skills){ 
                        item.item.skills.forEach( (skill:any) =>{
                            skills.push(skill.skill) 
                        })
                    }
                })
            }

            setAvailableSkills(skills);
        }
    }, [unit])

    const HandleActClick:SubmitHandler<DamageForm> = async (data) => {
        if(action===1 && unit){
            data = {
                origin: unit.combat_id,
                targets: [data.targets.toString().split("|").map((target: string) => parseInt(target) )[0]],
                phisical_damage: unit.physical_damage,
                magical_damage: 0,
                physical_damage_modifiers: "",
                magical_damage_modifiers: "",
                is_projectile: false,
                hit_chance: unit.hit_chance,
                armor_piercing: unit.armor_piercing,
                spell_piercing: 0,
            }
        }else if(action===2 && unit && skill){
            data = {
                origin: unit.combat_id,
                targets: data.targets.toString().split("|").map((target: string) => parseInt(target) ),
                phisical_damage: skill.physical_damage ? unit.physical_damage : 0,
                magical_damage: skill.magical_damage ? unit.magical_damage : 0,
                physical_damage_modifiers: skill.physical_damage,
                magical_damage_modifiers: skill.magical_damage,
                is_projectile: skill.projectile,
                hit_chance: unit.hit_chance,
                armor_piercing: skill.physical_damage ? unit.armor_piercing : 0,
                spell_piercing: skill.magical_damage ? unit.spell_piercing : 0,
            }
        }else if(action===3 && unit && skill){
            data = {
                origin: unit.combat_id,
                targets: data.targets.toString().split("|").map((target: string) => parseInt(target) ),
                phisical_damage: 0,
                magical_damage: 0,
                physical_damage_modifiers: "",
                magical_damage_modifiers: "",
                is_projectile: false,
                hit_chance: 0,
                armor_piercing: 0,
                spell_piercing: 0,
            }
        }

        onActClick(data)
    }


    const HandleUnitSelection = (selection: any) => {
        setUnit(selection)
    }


    const HandleActionSelection = (selection: any) => {
        setAction(selection.id)
    }

    const HandleSkillSelection = (selection: any) => {
        setSkill(selection)
    }

    return (
    <div className={`flex flex-col items-center p-2 border-4 rounded-lg dark:dark:border-yellow-900/50 text-yellow-200/70 dark:bg-[url('/bg1.jpg')] w-2/3 ${style}`}>
        <h2>Action</h2>
        <form className='w-full space-y-2' onSubmit={handleSubmit(HandleActClick)}>
            <div className='flex justify-between'>
                {/* Unit Selection */}
                {units && <div className='flex items-center'>
                        <h3 className='text-yellow-500/80 font-medium'>Origin:</h3>
                        <OptionSelectionList options={units} queryKey={'Units'} onSelectionChange={HandleUnitSelection} style='w-36' />
                    </div>}
                {/* Skill Selection */}
                {unit && <div className='flex items-center'>
                    <h3 className='text-yellow-500/80 font-medium'>Action:</h3>
                    <OptionSelectionList options={BaseActions} queryKey={'Action'} onSelectionChange={HandleActionSelection} style='w-56' />
                </div>}
                {/* Skill Selection */}
                {(action==2) && <div className='flex items-center'>
                        <h3 className='text-yellow-500/80 font-medium'>Skill:</h3>
                        <OptionSelectionList options={availableSkills} queryKey={'Skills'} onSelectionChange={HandleSkillSelection} style='w-56' />
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
            <button className='inline-flex justify-center hover:text-gray-200 border dark:border-yellow-900/50 shadow-md rounded-lg px-4 py-2 bg-black hover:bg-purple-300/10
                                cursor-pointer disabled:bg-black' disabled={!unit || !action}>
                                    
                    <input type="submit" value="Act" className='text-gray-400 text-sm cursor-pointer' disabled={!unit || !action}/>
            </button>
        </form>
    </div>
  )
}
