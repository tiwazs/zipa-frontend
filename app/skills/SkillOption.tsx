import React from 'react'
import { useQueryClient } from 'react-query';
import { IoTrashOutline } from 'react-icons/io5'
import Link from 'next/link';
import DisplayValue from '../_components/DisplayValue';
import { GetTargetText } from '../_constants/TargetStrings';

interface SkillOptionProps {
    id: string;
    name: string;
    description: string;
    conditions: string;
    physical_damage: string;
    magical_damage: string;
    healing: string;
    vitality_recovery: string;
    essence_recovery: string;
    range: string;
    area_of_effect: string;
    essence_cost: string;
    vitality_cost: string;
    cooldown: number;
    channeled: boolean;
    target: string;
    skill_on: string;
    skill_types: any;
    effects: any;
    summons: any;
    styles: string;
}

const TargetText = (text: string) => {
    switch(text){
        case "NONE":
            return ""
        case "SELF":
            return "Self"
        case "ALLY":
            return "Ally"
        case "ALLY_SUMMON":
            return "Allied Summons"
        case "ALLY_AROUND":
            return "Allies Around"
        case "ALLY_EXCEPT_SELF":
            return "Ally Except Self"
        case "ENEMY":
            return "Enemy"
        case "ENEMY_SUMMON":
            return "Enemy Summons"
        case "ENEMY_AROUND":
            return "Enemies Around"
        case "ANY":
            return "Anyone"
        case "ANY_AROUND":
            return "Anyone Around"
        case "ANY_EXCEPT_SELF":
            return "Anyone Except Self"
        case "ANY_SUMMON":
            return "Anyone Summoned"
        case "POINT":
            return "Point"
        case "POINT_ENEMY":
            return "Enemy at a Point"
        case "POINT_ALLY":
            return "Ally at a Point"
        case "AREA":
            return "Everyone in Area"
        case "AREA_ENEMY":
            return "Enemies in Area"
        case "AREA_ALLY":
            return "Allies in Area"
    }
}

function DisplaySkillValue(props: {value: string}) {
    const value = props.value.split("+");

    if(props.value !== "0"){
        return <span className='text-green-500 font-light'>{props.value}</span>
    }else{
        return null;
    }
}

export default function SkillOption(skill: SkillOptionProps) {
    const queryClient = useQueryClient();


    const deleteSkill = async () => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skills/${skill.id}`, {
                method: 'DELETE',
            });

            console.log(`Response: ${JSON.stringify(response)}`);

            queryClient.invalidateQueries('skills');
        }catch(e){
            console.log(`Error: ${e}`);
        }
    };

    return (
    <div className={`${skill.styles}`}>
        <div className='flex items-center justify-between'>
        <div>
            <Link href={`/skills/${skill.id}`}>
                <h3 className='font-bold my-2 text-yellow-200/70'>{skill.name}</h3>
            </Link>
            <div>
                <p className='my-1 text-gray-100 '>{skill.description}</p>
                <div className='flex flex-col font-extralight italic '>
                    { (skill.conditions && skill.conditions !== "0") && <p>Conditions: <span className='text-orange-500 font-light'>{skill.conditions}</span> </p>}
                    {/*Damage Types*/}
                    <div className='flex'>
                        <DisplayValue previous_text='Deals 'value={skill.physical_damage} after_text=' Physical Damage'/>
                        <DisplayValue previous_text='Deals 'value={skill.magical_damage} after_text=' Magical Damage'/>
                        <DisplayValue previous_text='Restores 'value={skill.vitality_recovery} after_text=' Vitality'/>
                        <DisplayValue previous_text='Restores 'value={skill.essence_recovery} after_text=' Essence'/>
                    </div>
                    {/*Other Skill Details: Range, AoE, Targe, Etc*/}
                    <DisplayValue previous_text='Range: 'value={skill.range} after_text=' Mts' />
                    <DisplayValue previous_text='Area: 'value={skill.area_of_effect} after_text=' Mts' />
                    <DisplayValue previous_text='Target: 'value={GetTargetText(skill.target)} />
                    { skill.channeled && <DisplayValue value={'Channelled'}/>}
                    {/* Skill Effects*/}
                    { (skill.effects && skill.effects.length > 0) && 
                            <p>
                                Effects:
                            </p>}
                            {skill.effects.map((effect: any) => {
                                return (
                                <div key={effect.effect.id} className='px-4 font-light'>
                                    <p>
                                        <Link href={`/effects/${effect.effect.id}`}><span className='text-yellow-400 font-normal'>{effect.effect.name}</span></Link> lasting <span className='text-purple-400'>{effect.duration}</span> T
                                    </p>
                                    <p>
                                        <span className='px-4 text-gray-400 font-light'>{effect.effect.description}</span>
                                    </p>
                                </div>
                                )
                            })}
                    {/* Skill Summons*/}
                    { (skill.summons && skill.summons.length > 0) && 
                            <p>
                                Summons:
                            </p>}
                            {skill.summons.map((summon: any) => {
                                return (
                                <div key={summon.unit_specialization.id} className='px-4 font-light dark:border-2 rounded-md dark:border-yellow-900/50 w-full m-1'>
                                    <p>
                                        <Link href={`/summons/${summon.unit_specialization.id}`}><span className='text-yellow-400 font-normal'>{summon.unit_specialization.name}</span></Link> lasting <span className='text-purple-400'>{summon.duration}</span> T
                                    </p>
                                    <p>
                                        <span className='px-4 text-gray-400 font-light'>{summon.unit_specialization.description}</span>
                                    </p>
                                </div>
                                )
                            })}
                        
                </div>
                
                
            </div>
            {/*General Skill Details. Resource and CD*/}
            <div className='my-2 flex space-x-2 font-light text-sm'>
                { (skill.essence_cost && skill.essence_cost !== "0") && <p>Cost <span className='text-blue-500 font-light'>{skill.essence_cost}</span> P</p>}
                { (skill.vitality_cost && skill.vitality_cost !== "0") && <p>Cost <span className='text-red-500 font-light'>{skill.vitality_cost}</span> V</p>}
                { (skill.cooldown && skill.cooldown !== 0) && <p>CD <span className='text-purple-400 font-light'>{skill.cooldown}</span> T </p>}
            </div>
        </div>
        <div>
            <h5 className="invisible group-hover:visible mx-1 rounded-lg px-3 py-1 bg-black border hover:bg-purple-300/10 border-yellow-900/50
                                 active:translate-y-1 text-xl cursor-pointer text-yellow-200/70 " onClick={deleteSkill}><IoTrashOutline/></h5>
        </div>
        </div>
    </div>
    )
}
