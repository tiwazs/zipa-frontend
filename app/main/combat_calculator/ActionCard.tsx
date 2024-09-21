import OptionSelection from '@/app/_components/OptionSelection';
import OptionSelectionList from '@/app/_components/OptionSelectionList';
import React, { Suspense, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoTrashOutline } from 'react-icons/io5';

interface ActionForm {
	origin: number;
	targets: number[];
    action: number;
    skill_effect: string | null;
    phisical_damage: number | null;
    magical_damage: number | null;
    physical_damage_modifiers: string | null;
    magical_damage_modifiers: string | null;
    is_projectile: boolean | null;
    hit_chance: number | null;
    armor_piercing: number | null;
    spell_piercing: number | null;
    healing_power: number | null;
    healing_modifiers: string | null;
    vitality_recovery: string | null;
    essence_recovery: string | null;
    essence_cost: number | null;
    vitality_cost: number | null;
    effects: any[];
    duration: string | null;
}

interface DamageCardProps {
    units: any[];
    onActClick?: any;
    style?: string;
    onRemoveClick?: any;
}

const BaseActions = [
    {name:"Normal Attack", id:1},
    {name:"Skill", id:2},
    {name:"Pure Effect", id:3}
]

export default function DamageCard({units, onActClick, style, onRemoveClick}: DamageCardProps) {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ActionForm>();
    const [unit, setUnit] = useState<any>(null)
    const [action, setAction] = useState<any>(null)
    const [skill, setSkill] = useState<any>(null)
    const [availableSkills, setAvailableSkills] = useState<any[]>([])
    const [availableEffects, setAvailableEffects] = useState<any[]>([])

    useEffect(() => {
        if(unit){
            // Skills List
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

            // Effects List
            let effects:any = []
            // Specialization Trait Effects
            if(unit.specialization){
                // Specialization Trait Effects
                unit.specialization.traits.forEach( (trait:any) =>{
                    if(trait.trait.effects){
                        trait.trait.effects.forEach( (effect:any) =>{
                            effects.push(effect.effect)
                        })
                    }
                })

                // Specialization Skills Effects
                unit.specialization.skills.forEach( (skill:any) =>{
                    if(skill.skill.effects){
                        skill.skill.effects.forEach( (effect:any) =>{
                            effects.push(effect.effect)
                        })
                    }
                })

            }
            // Race Trait Effects
            if(unit.race){
                unit.race.traits.forEach( (trait:any) =>{
                    if(trait.trait.effects){
                        trait.trait.effects.forEach( (effect:any) =>{
                            effects.push(effect.effect)
                        })
                    }
                })
            }
            // Culture Trait Effects
            if(unit.culture){
                unit.culture.traits.forEach( (trait:any) =>{
                    if(trait.trait.effects){
                        trait.trait.effects.forEach( (effect:any) =>{
                            effects.push(effect.effect)
                        })
                    }
                })
            }
            // Belief Trait Effects
            if(unit.Belief){
                unit.Belief.traits.forEach( (trait:any) =>{
                    if(trait.trait.effects){
                        trait.trait.effects.forEach( (effect:any) =>{
                            effects.push(effect.effect)
                        })
                    }
                })
            }
            // Item Trait Effects
            if(unit.items){
                unit.items.forEach( (item:any) =>{
                    if(item.item.traits){
                        item.item.traits.forEach( (trait:any) =>{
                            if(trait.trait.effects){
                                trait.trait.effects.forEach( (effect:any) =>{
                                    effects.push(effect.effect)
                                })
                            }
                        })
                    }
                })
            }
            

            setAvailableEffects(effects);
        }
    }, [unit])

    const HandleRemoveClick = () => {
        onRemoveClick()
    }

    const HandleActClick:SubmitHandler<ActionForm> = async (data) => {
        if(action===1 && unit){
            data = {
                origin: unit.combat_id,
                targets: [data.targets.toString().split("|").map((target: string) => parseInt(target) )[0]],
                action: 1,
                skill_effect: null,
                phisical_damage: unit.physical_damage + unit.combat_status.bonus_physical_damage,
                magical_damage: 0,
                physical_damage_modifiers: data.physical_damage_modifiers,
                magical_damage_modifiers: "",
                is_projectile: unit.range > 1 ? true : false,
                hit_chance: unit.hit_chance + unit.combat_status.bonus_hit_chance,
                armor_piercing: unit.armor_piercing + unit.combat_status.bonus_armor_piercing,
                healing_power: 0,
                healing_modifiers: "",
                vitality_recovery: "0",
                essence_recovery: "0",
                spell_piercing: 0,
                vitality_cost: 0,
                essence_cost: 0,
                effects: [],
                duration: null
            }
        }else if(action===2 && unit && skill){
            skill.effects.forEach( (effect:any) => {
                effect.origin_magical_power = unit.magical_damage + unit.combat_status.bonus_magical_damage;
                effect.origin_physical_damage = unit.origin_physical_damage  + unit.combat_status.bonus_physical_damage;
                effect.origin_healing_power = unit.magical_damage + unit.combat_status.bonus_magical_damage;
            })

            let physical_modifiers = data.physical_damage_modifiers ? data.physical_damage_modifiers : ""
            let magical_modifiers = data.physical_damage_modifiers ? data.physical_damage_modifiers : ""
            let healing_modifiers = data.physical_damage_modifiers ? data.physical_damage_modifiers : ""

            physical_modifiers = `${physical_modifiers}|${skill.physical_damage}`
            magical_modifiers = `${magical_modifiers}|${skill.magical_damage}`
            healing_modifiers = `${healing_modifiers}|${skill.healing}`

            console.log(skill.magical_damage && skill.magical_damage!=='0' ? unit.magical_damage + unit.combat_status.bonus_magical_damage : 0)
            data = {
                origin: unit.combat_id,
                targets: data.targets.toString().split("|").map((target: string) => parseInt(target) ),
                action: 2,
                skill_effect: skill.name,
                phisical_damage: (skill.physical_damage&&skill.physical_damage!=='0') ? unit.physical_damage + unit.combat_status.bonus_physical_damage : 0,
                magical_damage: (skill.magical_damage&&skill.magical_damage!=='0') ? unit.magical_damage + unit.combat_status.bonus_magical_damage : 0,
                physical_damage_modifiers: physical_modifiers,
                magical_damage_modifiers: magical_modifiers,
                is_projectile: skill.projectile,
                hit_chance: unit.hit_chance + unit.combat_status.bonus_hit_chance,
                armor_piercing: (skill.physical_damage&&skill.physical_damage!=='0') ? unit.armor_piercing + unit.combat_status.bonus_armor_piercing : 0,
                spell_piercing: (skill.magical_damage&&skill.magical_damage!=='0') ? unit.spell_piercing + unit.combat_status.bonus_spell_piercing : 0,
                healing_power: (skill.healing&&skill.healing!=='0') ? unit.magical_damage + unit.combat_status.bonus_magical_damage : 0,
                healing_modifiers: healing_modifiers,
                vitality_recovery: skill.vitality_recovery,
                essence_recovery: skill.essence_recovery,
                vitality_cost: skill.vitality_cost,
                essence_cost: skill.essence_cost,
                effects: skill.effects ? [...skill.effects] : [],
                duration: null
            }
        }else if(action===3 && unit && skill){
            let effects = [...skill.effects]

            for( const effect of effects){
                effect.duration = data.duration;
                effect.origin_physical_damage = unit.physical_damage + unit.combat_status.bonus_physical_damage;
                effect.origin_magical_power = unit.magical_damage + unit.combat_status.bonus_magical_damage;
                effect.origin_healing_power = unit.magical_damage + unit.combat_status.bonus_magical_damage;
            }

            data = {
                origin: unit.combat_id,
                targets: data.targets.toString().split("|").map((target: string) => parseInt(target) ),
                action: 3,
                skill_effect: skill.name,
                phisical_damage: 0,
                magical_damage: 0,
                physical_damage_modifiers: "",
                magical_damage_modifiers: "",
                is_projectile: false,
                hit_chance: 0,
                armor_piercing: 0,
                spell_piercing: 0,
                healing_power: 0,
                healing_modifiers: "",
                vitality_recovery: "0",
                essence_recovery: "0",
                vitality_cost: 0,
                essence_cost: 0,
                effects: skill.effects ? [...skill.effects] : [],
                duration: null                               
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

    const HandleEffectSelection = (selection: any) => {
        // Create a fake skill to carry the effect

        let effect = {
            id: selection.id,
            name: selection.name,
            duration: 0,
            effect: selection
        }

        let skill = {
            name: selection.name,
            physical_damage: 0,
            magical_damage: 0,
            projectile: false,
            hit_chance: 0,
            armor_piercing: 0,
            spell_piercing: 0,
            vitality_cost: 0,
            essence_cost: 0,
            effects: [effect]
        }

        setSkill(skill)
    }

    return (
    <div className={`group flex flex-col items-center p-2 border-4 rounded-lg dark:dark:border-yellow-900/50 text-yellow-200/70 dark:bg-[url('/bg1.jpg')] w-2/3 ${style}`}>
        <div className='w-full flex items-center justify-between'>
            <div></div>
            <h2>Action</h2>
            <h5 className="invisible group-hover:visible mx-1 rounded-lg px-3 py-1 bg-black border hover:bg-purple-300/10 border-yellow-900/50
                        active:translate-y-1 text-xl cursor-pointer text-yellow-200/70 " onClick={HandleRemoveClick}><IoTrashOutline/></h5>
        </div>
        <form className='w-full space-y-2' onSubmit={handleSubmit(HandleActClick)}>
            <div className='flex justify-between space-x-3'>
                {/* Unit Selection */}
                {units && <div className='flex items-center'>
                    <h3 className='text-yellow-500/80 font-medium'>Origin:</h3>
                    <OptionSelectionList options={units} queryKey={'Units'} onSelectionChange={HandleUnitSelection} style='w-36' />
                </div>}
                {/* Action Selection */}
                {unit && <div className='flex items-center'>
                    <h3 className='text-yellow-500/80 font-medium'>Action:</h3>
                    <OptionSelectionList options={BaseActions} queryKey={'Action'} onSelectionChange={HandleActionSelection} style='w-56' />
                </div>}
                {/* Normal Attack */}
                {(action==1) && <div className='flex items-center'>
                    <h3 className='text-yellow-500/80 font-medium'>Modifiers:</h3>
                    <input 
                        {...register("physical_damage_modifiers", { required: false })}
                        className='w-full rounded-lg p-1 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                        type="text"
                        name="physical_damage_modifiers"
                        placeholder="Physical Modifiers"
                    />                                
                </div>}
                {/* Skill Selection */}
                {(action==2) && <div className='flex items-center'>
                    <h3 className='text-yellow-500/80 font-medium'>Skill:</h3>
                    <OptionSelectionList options={availableSkills} queryKey={'Skills'} onSelectionChange={HandleSkillSelection} style='w-56' />
                </div>}
                {(action==2) && <div className='flex items-center'>
                    <h3 className='text-yellow-500/80 font-medium'>Modifiers:</h3>
                    <input 
                        {...register("physical_damage_modifiers", { required: false })}
                        className='w-full rounded-lg p-1 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                        type="text"
                        name="physical_damage_modifiers"
                        placeholder="Modifiers"
                    />                                
                </div>}
                {/* Effect Selection */}
                {(action==3) && <div className='flex items-center'>
                    <h3 className='text-yellow-500/80 font-medium'>Skill:</h3>
                    <OptionSelectionList options={availableEffects} queryKey={'Effects'} onSelectionChange={HandleEffectSelection} style='w-56' />
                </div>}
                {(action==3) && <div className='flex items-center'>
                    <h3 className='text-yellow-500/80 font-medium'>Duration:</h3>
                    <input 
                        {...register("duration", { required: false })}
                        className='w-full rounded-lg p-1 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                        type="text"
                        name="duration"
                        placeholder="Duration"
                    />                                
                </div>}
                <div className='flex items-center'>
                    <h3 className='text-yellow-500/80 font-medium'>Target(s):</h3>
                    <input 
                        {...register("targets", { required: false })}
                        className='w-full rounded-lg p-1 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                        type="text"
                        name="targets"
                        placeholder="Targets"
                    />                                
                </div>
            </div>
            <div className='flex flex-col items-center'>
                {(action==2 && skill) && <div className='flex items-center'>
                    <img src={`${process.env.NEXT_PUBLIC_API_URL}/static/skills/${skill.id}.jpg`} alt="" className='w-8 h-8 rounded-md border-2 border-gray-500/60 ' />
                    <h3 className='text-yellow-500/80 font-medium'>{skill.name}</h3>
                </div>}
                {(action==3 && skill) && <div className='flex items-center'>
                    {skill.effects.map( (effect:any) => {
                        return (<>
                        <img src={`${process.env.NEXT_PUBLIC_API_URL}/static/effects/${effect.effect.id}.jpg`} alt="" className='w-8 h-8 rounded-md border-2 border-gray-500/60 ' />
                        <h3 className='text-yellow-500/80 font-medium'>{effect.effect.name}</h3>
                        </>)
                    })}
                </div>}
            </div>
            <button className='inline-flex justify-center hover:text-gray-200 border dark:border-yellow-900/50 shadow-md rounded-lg px-4 py-2 bg-black hover:bg-purple-300/10
                                cursor-pointer disabled:bg-black' disabled={!unit || !action}>
                                    
                    <input type="submit" value="Act" className='text-gray-400 text-sm cursor-pointer' disabled={!unit || !action}/>
            </button>
        </form>
    </div>
  )
}
