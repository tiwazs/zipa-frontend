'use client'

import React, { Suspense, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AddUnitDialog from './AddUnitDialog';
import UnitCombatCard from './UnitCombatCard';
import { SubmitHandler, useForm } from 'react-hook-form';
import ActionCard from './ActionCard';
import { mod_parameter_operation } from '@/app/_libs/equations';

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
    essence_cost: number | null;
    vitality_cost: number | null;
    effects: any[];
}

interface DamageCalculationRequest {
    damage: number;
    hit_chance: number;
    armor: number;
    evasion: number;
    damage_modifiers: string[];
}

export default function UnitsPage() {
    const router = useRouter();
    const [unitIdCounter, setUnitIdCounter] = React.useState(1);
    const [units, setUnits] = React.useState<any[]>([{combat_id:0, name:"none"}]);
    const [phase, setPhase] = React.useState<number>(0);
    // Fucking library. LET ME ADD THE GOD DAMMED USER ID TO THE SESSION TO MAKE REQUESTS
    const { data: session, status }:{update:any, data:any, status:any} = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login');
        },
    })

    const HandleAddUnit = (unit: any) => {
        let unitDict = unit
        unitDict["combat_id"] = unitIdCounter + 1
        unitDict["combat_status"] = { 
            vitality:parseFloat(unit.vitality), 
            essence:parseFloat(unit.essence),
            effects:[] 
        }
        
        setUnitIdCounter(unitIdCounter+1)

        let unitList = units
        unitList.push(unitDict)
        setUnits(unitList)
    }

    const HandleRemoveUnit = (combat_id: number) => {
        let unitList = units.filter((unit)=> unit.combat_id!==combat_id )
        setUnits(unitList)
        console.log(units)
    }

    const HandlePhase = async () => {
        let unitList = [...units]

        for( const unit of unitList){
            if(unit.combat_id===0 || unit.combat_id===1) continue
            
            // Apply effects
            if(unit.combat_status.effects.length > 0){
                for( const effect of unit.combat_status.effects) {
                    // Effect Damage or Heal
                    if(effect.effect.instant_vitality_recovery){
                        if(effect.effect.instant_vitality_recovery.includes("%")){
                            let healing = mod_parameter_operation(effect.effect.instant_vitality_recovery, effect.effect.magical_power)
                            unit.combat_status.vitality += healing
                        }else{
                            unit.combat_status.vitality = mod_parameter_operation(effect.effect.instant_vitality_recovery, unit.combat_status.vitality)
                        }
                    }
                    if(effect.effect.instant_essence_recovery){
                        unit.combat_status.vitality = mod_parameter_operation(effect.effect.instant_essence_recovery, unit.combat_status.vitality)
                    }

                    // Effect Physical Damage
                    if(effect.effect.instant_physical_damage && effect.effect.instant_physical_damage !== "0"){
                        let damageCalculationRequest: DamageCalculationRequest = {
                            damage: effect.physical_damage,
                            hit_chance: 100,
                            armor: unit.armor ? unit.armor : 0,
                            evasion: 0,
                            damage_modifiers: [effect.effect.instant_physical_damage]
                        }
                        let response = await DamageCalculationRequest(damageCalculationRequest, 0, 0, false)
                        unit.combat_status.vitality -= response.final_damage
                    }

                    // Effect Magical Damage
                    if(effect.effect.instant_magical_damage && effect.effect.instant_magical_damage !== "0"){
                        let damageCalculationRequest: DamageCalculationRequest = {
                            damage: effect.magical_power,
                            hit_chance: 100,
                            armor: unit.magic_armor ? unit.magic_armor : 0,
                            evasion: 0,
                            damage_modifiers: [effect.effect.instant_magical_damage]
                        }
                        let response = await DamageCalculationRequest(damageCalculationRequest, 0, 0, false)
                        unit.combat_status.vitality -= response.final_damage
                    }

                    // Effect Fading
                    effect.duration -= 1
                    
                }
                unit.combat_status.effects = unit.combat_status.effects.filter( (effect:any) => effect.duration > 0 )
            }
        }

        setUnits(unitList)
        setPhase(phase + 1)
    }

    const HandleDamageDeal = async (damageForm: DamageForm) => {
        // Remove Vitality and Essence from origin based on cost
        let unitList = [...units]
        unitList.forEach((unit)=>{
            if(unit.combat_id === damageForm.origin){
                unit.combat_status.vitality -= damageForm.vitality_cost ? damageForm.vitality_cost : 0
                unit.combat_status.essence -= damageForm.essence_cost ? damageForm.essence_cost : 0
            }
        })
        setUnits(unitList)

        for( let target of damageForm.targets ){
            let target_unit = units.filter( (unit:any) => unit.combat_id === target )

            let total_damage = 0
            // Physical Damage
            if(damageForm.phisical_damage){
                let damageCalculationRequest: DamageCalculationRequest = {
                    damage: damageForm.phisical_damage ? damageForm.phisical_damage : 0,
                    hit_chance: damageForm.hit_chance ? damageForm.hit_chance : 0,
                    armor: target_unit[0].armor ? target_unit[0].armor : 0,
                    evasion: target_unit[0].evasion ? target_unit[0].evasion : 0,
                    damage_modifiers: damageForm.physical_damage_modifiers ? damageForm.physical_damage_modifiers.split(",") : []
                }

                let response = await DamageCalculationRequest(damageCalculationRequest, target_unit[0].shield, damageForm.armor_piercing ? damageForm.armor_piercing : 0, damageForm.is_projectile ? damageForm.is_projectile : false)
                total_damage += response.final_damage
            }
            // Magical Damage
            if(damageForm.magical_damage){
                let damageCalculationRequest: DamageCalculationRequest = {
                    damage: damageForm.magical_damage ? damageForm.magical_damage : 0,
                    hit_chance: damageForm.hit_chance ? damageForm.hit_chance : 0,
                    armor: target_unit[0].magic_armor ? target_unit[0].magic_armor : 0,
                    evasion: target_unit[0].evasion ? target_unit[0].evasion : 0,
                    damage_modifiers: damageForm.magical_damage_modifiers ? damageForm.magical_damage_modifiers.split(",") : []
                }

                let response = await DamageCalculationRequest(damageCalculationRequest, target_unit[0].shield, damageForm.spell_piercing ? damageForm.spell_piercing : 0, damageForm.is_projectile ? damageForm.is_projectile : false)
                total_damage += response.final_damage
            }

            let unitList = [...units]
            for(const unit of unitList){
                if(unit.combat_id === target){
                    // Damage the unit
                    unit.combat_status.vitality -= total_damage
                    if(unit.combat_status.vitality <= 0){
                        unit.combat_status.vitality = 0
                    } 
                      
                    // Apply effects
                    if(damageForm.effects.length > 0){
                        for(const effectNew of damageForm.effects){
                            effectNew.magical_power = damageForm.magical_damage
                            effectNew.physical_damage = damageForm.phisical_damage

                            // Separate effects similar to the new effect from the rest of the effects on the unit
                            // Similar effects on the unit
                            let sameEffectsOnUnit = unit.combat_status.effects.filter( (effect:any) => effect.effect.name === effectNew.effect.name )
                            // Rest of the effects on the unit
                            unit.combat_status.effects = unit.combat_status.effects.filter( (effect:any) => effect.effect.name !== effectNew.effect.name )

                            if(sameEffectsOnUnit.length > 0){
                                // If there are similar effects on the unit, Update the stack counter of the current effects and add them back to the unit
                                // And add the new effect to the unit with a stack counter of 0

                                // Add the new effect to the unit
                                let effectToApply = {...effectNew}
                                effectToApply.stack_counter = 0
                                unit.combat_status.effects.push(effectToApply)                                

                                // Increase the stack counter of the effects on the unit 
                                // and add them back to the unit if they don't surpass the max stacks
                                sameEffectsOnUnit.forEach( (effectOnUnit:any) => {
                                    effectOnUnit.stack_counter += 1
                                    if(effectOnUnit.stack_counter < effectOnUnit.effect.max_stack){
                                        unit.combat_status.effects.push(effectOnUnit)
                                    }
                                })
                            }else{
                                // If there are no similar effects on the unit, just add the new effect to the unit
                                let effectToApply = {...effectNew}
                                effectToApply.stack_counter = 0
                                unit.combat_status.effects.push(effectToApply)
                            }
                            //
                            // Remove effects with the same name if they exist, but only if the effect doesn't stack

                        }
                    }
                }
            }

            setUnits(unitList)
        }

    }
    
    const DamageCalculationRequest = async (damageCalculationRequest: DamageCalculationRequest, shield: number, armor_piercing:number, is_projectile: boolean) => {

        let response = null
        // Request to damage Calculation Endpoint
        try{
            response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/damage_calculation/?shield=${shield}&armor_penetration=${armor_piercing}&is_projectile=${is_projectile}&block_reduction=50&deflect_reduction=50`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(damageCalculationRequest)
            });
            
            response = await response.json();
        }catch(e){
            console.log(`Error: ${e}`);
        }
        return response
    }

    if(status === "loading") return <div className="text-green-700">Loading...</div>    
    return (
    <main className="items-center justify-between px-20 py-10">
        <div className="flex items-center justify-between text-center lg:mb-0 lg:grid-cols-4 lg:text-left text-yellow-200/70 ">
            <h2 className={`mb-3 text-4xl font-medium`}>
                Combat Calculator{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                </span>
            </h2>
            <div className="flex items-center space-x-2 p-1 border-2 rounded-lg dark:dark:border-yellow-900/50 text-yellow-200/70 dark:bg-[url('/bg1.jpg')]">
                <h1>phase {phase} </h1>
                <button className='inline-flex justify-center hover:text-gray-200 border dark:border-yellow-900/50 shadow-md rounded-lg px-4 py-2 bg-black hover:bg-purple-300/10
                                cursor-pointer disabled:bg-black' onClick={HandlePhase}>
                -&gt;
                </button>
            </div>
        </div>

        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial
           before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 
           after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent 
           before:dark:to-purple-700 before:dark:opacity-10 after:dark:from-purple-900 after:dark:via-[#9101ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        </div>
        <div className='flex items-center justify-between'>
            <AddUnitDialog  user_id={session?.user_id} 
                            onAddClick={HandleAddUnit}
                            styles="group rounded-lg border border-transparent px-3 py-2 transition-colors border-4 hover:dark:dark:border-yellow-900/50 hover:bg-black 
                                        hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 text-yellow-200/70"/>
            <ActionCard units={units} onActClick={HandleDamageDeal} style='my-1'/>
        </div>

        <div className='flex space-x-2'>
            {units && units.map((unit) => (
                (unit.combat_id!==0) && <UnitCombatCard key={unit.combat_id} combat_id={unit.combat_id} unit={unit} onRemoveClick={HandleRemoveUnit} />
            ))}
        </div>
    </main>
    )
}
