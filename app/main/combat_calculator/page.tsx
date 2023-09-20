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
    const [combatLog, setCombatLog] = React.useState<any[]>([]);
    const [phaseLog, setPhaseLog] = React.useState<any[]>([]);
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
    }

    const HandlePhase = async () => {
        let unitList = [...units]
        let actionLogs = []

        for( const unit of unitList){
            if(unit.combat_id===0 || unit.combat_id===1) continue
            
            // Apply effects
            if(unit.combat_status.effects.length > 0){
                for( const effect of unit.combat_status.effects) {
                    // Effect Damage or Heal
                    if(effect.effect.instant_vitality_recovery){
                        if(effect.effect.instant_vitality_recovery.includes("%")){
                            console.log(effect.origin_healing_power)
                            let healing = mod_parameter_operation(effect.effect.instant_vitality_recovery, effect.origin_healing_power)
                            unit.combat_status.vitality += healing
                            console.log(healing)
                            actionLogs.push(`${unit.name} Recovers ${Math.round(healing)} Vit from ${effect.effect.name}`)
                        }else{
                            let vitality_text = effect.effect.instant_vitality_recovery.includes("+") ? "Recovers " : "Loses "
                            unit.combat_status.vitality = mod_parameter_operation(effect.effect.instant_vitality_recovery, unit.combat_status.vitality)
                            actionLogs.push(`${unit.name} ${vitality_text} ${Math.round(effect.effect.instant_vitality_recovery)} Vit from ${effect.effect.name}`)
                            actionLogs.push(`${unit.name} ${Math.round(unit.combat_status.vitality)} Vit (${effect.effect.instant_vitality_recovery})`)
                        }
                    }
                    if(effect.effect.instant_essence_recovery){
                        let essence_text = effect.effect.instant_essence_recovery.includes("+") ? "Recovers " : "Loses "
                        unit.combat_status.essence = mod_parameter_operation(effect.effect.instant_essence_recovery, unit.combat_status.essence)
                        actionLogs.push(`${unit.name} ${essence_text} ${Math.round(effect.effect.instant_essence_recovery)} Ess from ${effect.effect.name}`)
                        actionLogs.push(`${unit.name} ${Math.round(unit.combat_status.essence)} Ess (${effect.effect.instant_essence_recovery})`)
                    }

                    // Effect Physical Damage
                    if(effect.effect.instant_physical_damage && effect.effect.instant_physical_damage !== "0"){
                        let damageCalculationRequest: DamageCalculationRequest = {
                            damage: effect.origin_physical_damage,
                            hit_chance: 100,
                            armor: unit.armor ? unit.armor : 0,
                            evasion: 0,
                            damage_modifiers: [effect.effect.instant_physical_damage]
                        }
                        let response = await DamageCalculationRequest(damageCalculationRequest, 0, 0, false)
                        unit.combat_status.vitality -= response.final_damage

                        actionLogs.push(`${GetDamageText(unit.name, response, 1)}  from ${effect.effect.name}`)
                        actionLogs.push(`${unit.name} ${Math.round(unit.combat_status.vitality)} Vit (-${Math.round(response.final_damage)})`)
                    }

                    // Effect Magical Damage
                    if(effect.effect.instant_magical_damage && effect.effect.instant_magical_damage !== "0"){
                        let damageCalculationRequest: DamageCalculationRequest = {
                            damage: effect.origin_magical_power,
                            hit_chance: 100,
                            armor: unit.magic_armor ? unit.magic_armor : 0,
                            evasion: 0,
                            damage_modifiers: [effect.effect.instant_magical_damage]
                        }
                        let response = await DamageCalculationRequest(damageCalculationRequest, 0, 0, false)
                        unit.combat_status.vitality -= response.final_damage

                        actionLogs.push(`${GetDamageText(unit.name, response, 2)}  from ${effect.effect.name}`)
                        actionLogs.push(`${unit.name} ${Math.round(unit.combat_status.vitality)} Vit (-${Math.round(response.final_damage)})`)
                    }

                    // Max and Min values
                    if(unit.combat_status.vitality < 0) unit.combat_status.vitality = 0
                    if(unit.combat_status.vitality > unit.vitality) unit.combat_status.vitality = unit.vitality
                    if(unit.combat_status.essence < 0) unit.combat_status.essence = 0
                    if(unit.combat_status.essence > unit.essence) unit.combat_status.essence = unit.essence

                    // Effect Fading. Duration usually is a number, but if it's INF, it will never fade
                    if(effect.duration!=="INF"){ effect.duration -= 1 }
                    
                }
                unit.combat_status.effects = unit.combat_status.effects.filter( (effect:any) => effect.duration > 0 || effect.duration==="INF" )
            }
        }

        setUnits(unitList)
        let combatLogList = [...phaseLog]
        actionLogs.forEach((log)=>{
            combatLogList.push(log)
        })
        setPhaseLog(combatLogList)
        setPhase(phase + 1)
    }

    const GetDamageText = (targetName: string, damage_result: any, type: number) => {
        let damage_type = type===1 ? "Pdg" : "Mdg"
        let armor_type = type===1 ? "A" : "MA"
        let piercing_type = type===1 ? "Arp" : "Spp"
        
        let physical_damage_text = `${targetName} suffers ${Math.round(damage_result.final_damage)} ${damage_type} \
            (${Math.round(damage_result.result_details.critical_probability)}% Crit, \
            ${Math.round(damage_result.result_details.hit_probability)}% Hit, \
            ${Math.round(damage_result.result_details.deflect_probability)}% Dfl, \
            ${Math.round(damage_result.result_details.evasion_probability)}% Eva) \
            (${Math.round(damage_result.damage_after_modifiers)} Base, \
            ${damage_result.result_details.hit_evasion_result} -> ${Math.round(damage_result.result_details.damage_after_hit_evasion)} ${damage_type}, \
            ${Math.round(damage_result.result_details.armor)} ${armor_type} -> ${Math.round(damage_result.result_details.damage_after_base_armor)} ${damage_type},\
            ${Math.round(damage_result.armor_penetration)} ${piercing_type} -> ${Math.round(damage_result.result_details.damage_after_total_armor)} ${damage_type})`
        
        return physical_damage_text
    }

    const HandleAction = async (actionForm: ActionForm) => {
        // Remove Vitality and Essence from origin based on cost
        let unitList = [...units]
        let origin = unitList.filter( (unit:any) => unit.combat_id === actionForm.origin )[0]
        let targets = unitList.filter( (unit:any) => actionForm.targets.includes(unit.combat_id) )

        
        let vitality_cost = actionForm.vitality_cost ? actionForm.vitality_cost : 0
        let essence_cost = actionForm.essence_cost ? actionForm.essence_cost : 0
        unitList.forEach((unit)=>{
            if(unit.combat_id === actionForm.origin){
                
                unit.combat_status.vitality -= vitality_cost
                unit.combat_status.essence -= essence_cost
            }
        })
        setUnits(unitList)
        
        // Create Log
        let vitality_cost_text = vitality_cost ? `(-${vitality_cost} Vit)` : ""
        let essence_cost_text = essence_cost ? `(-${essence_cost} Ess)` : ""
        let action_text = (actionForm.action===1) ? "Striked" : (actionForm.action===2) ? "Used" : "Inflicted"
        let actionLogs = []
        actionLogs.push(`${origin.name} ${action_text} ${actionForm.skill_effect ? actionForm.skill_effect : ""} ${vitality_cost_text} ${essence_cost_text} on ${targets.map((target)=> target.name)}`)

        for( let target of targets ){
            let total_damage = 0

            // Physical Damage
            if(actionForm.phisical_damage){
                let damageCalculationRequest: DamageCalculationRequest = {
                    damage: actionForm.phisical_damage ? actionForm.phisical_damage : 0,
                    hit_chance: actionForm.hit_chance ? actionForm.hit_chance : 0,
                    armor: target.armor ? target.armor : 0,
                    evasion: target.evasion ? target.evasion : 0,
                    damage_modifiers: actionForm.physical_damage_modifiers ? actionForm.physical_damage_modifiers.split("|") : []
                }

                let response = await DamageCalculationRequest(damageCalculationRequest, target.shield, actionForm.armor_piercing ? actionForm.armor_piercing : 0, actionForm.is_projectile ? actionForm.is_projectile : false)
                total_damage += response.final_damage

                actionLogs.push(GetDamageText(target.name, response, 1))
            }

            // Magical Damage
            if(actionForm.magical_damage){
                let damageCalculationRequest: DamageCalculationRequest = {
                    damage: actionForm.magical_damage ? actionForm.magical_damage : 0,
                    hit_chance: actionForm.hit_chance ? actionForm.hit_chance : 0,
                    armor: target.magic_armor ? target.magic_armor : 0,
                    evasion: target.evasion ? target.evasion : 0,
                    damage_modifiers: actionForm.magical_damage_modifiers ? actionForm.magical_damage_modifiers.split("|") : []
                }

                let response = await DamageCalculationRequest(damageCalculationRequest, target.shield, actionForm.spell_piercing ? actionForm.spell_piercing : 0, actionForm.is_projectile ? actionForm.is_projectile : false)
                total_damage += response.final_damage

                actionLogs.push(GetDamageText(target.name, response, 2))
            }

            // Healing
            if(actionForm.healing_power){
                console.log(actionForm.healing_power)
                let healing = actionForm.healing_modifiers ? mod_parameter_operation(actionForm.healing_modifiers, actionForm.healing_power) : actionForm.healing_power
                target.combat_status.vitality += healing
                actionLogs.push(`${target.name} Recovers (${Math.round(healing)} Vit)`)
            }

            // Vitality Recovery (This is direct vitality recovery a set amount, whereas healing is based on the healing power)
            if(actionForm.vitality_recovery && actionForm.vitality_recovery !== "0"){
                target.combat_status.vitality = mod_parameter_operation(actionForm.vitality_recovery, target.combat_status.vitality)
                actionLogs.push(`${target.name} Recovers ${actionForm.vitality_recovery} Vit`)
            }

            // Essence Recovery
            if(actionForm.essence_recovery && actionForm.essence_recovery !== "0"){
                target.combat_status.essence = mod_parameter_operation(actionForm.essence_recovery, target.combat_status.essence)
                actionLogs.push(`${target.name} Recovers ${actionForm.essence_recovery} Ess`)
            }
            
            let unitList = [...units]
            for(const unit of unitList){
                if(unit.combat_id === target.combat_id){
                    // Damage the unit
                    unit.combat_status.vitality -= total_damage
                    // Vitality Limits
                    if(unit.combat_status.vitality <= 0){
                        unit.combat_status.vitality = 0
                    }
                    if(unit.combat_status.vitality > unit.vitality){
                        unit.combat_status.vitality = unit.vitality
                    } 
                    actionLogs.push(`${target.name} ${Math.round(target.combat_status.vitality)} Vit (-${Math.round(total_damage)})`)
                      
                    // Apply effects
                    if(actionForm.effects.length > 0){
                        for(const effectNew of actionForm.effects){
                            actionLogs.push(`${target.name} gets ${effectNew.effect.name} for ${effectNew.duration} turns`)    

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
        
        let combatLogList = [...phaseLog]
        actionLogs.forEach((log)=>{
            combatLogList.push(log)
        })
        setPhaseLog(combatLogList)
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
            <ActionCard units={units} onActClick={HandleAction} style='my-1'/>
        </div>

        <div className='flex space-x-2'>
            {units && units.map((unit) => (
                (unit.combat_id!==0) && <UnitCombatCard key={unit.combat_id} combat_id={unit.combat_id} unit={unit} onRemoveClick={HandleRemoveUnit} />
            ))}
        </div>
        <div className="space-x-2 p-1 border-2 rounded-lg dark:dark:border-yellow-900/50 text-yellow-200/70 dark:bg-[url('/bg1.jpg')]">
            <h1 className='text-center text-yellow-200/70'>Combat Log</h1>
            <div className='bg-black rounded-lg p-2 border border-yellow-900/50 flex flex-col'>
                {phaseLog.map((Log: string, index: number) => (
                    <p key={index} className='text-yellow-200/70 text-sm'>{Log}</p>
                ))}
            </div>
        </div>
    </main>
    )
}
