'use client'

import React, { Suspense, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AddUnitDialog from './AddUnitDialog';
import UnitCombatCard from './UnitCombatCard';
import { SubmitHandler, useForm } from 'react-hook-form';
import ActionCard from './ActionCard';

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
            unitList.forEach((unit)=>{
                if(unit.combat_id === target){
                    // Damage the unit
                    unit.combat_status.vitality -= total_damage
                    if(unit.combat_status.vitality <= 0){
                        unit.combat_status.vitality = 0
                    }   
                    // Apply effects
                    if(damageForm.effects.length > 0){
                        damageForm.effects.forEach((effect)=>{
                            effect.magical_power = damageForm.magical_damage
                            unit.combat_status.effects.push(effect)
                        })
                    }
                }
            })

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
        <div className="grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left text-yellow-200/70 ">
            <h2 className={`mb-3 text-4xl font-medium`}>
                Combat Calculator{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                </span>
            </h2>
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
