import React from 'react'
import { useQueryClient } from 'react-query';
import { IoTrashOutline } from 'react-icons/io5'
import Link from 'next/link';

interface SkillOptionProps {
    id: string;
    name: string;
    description: string;
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
                    {/*Damage Types*/}
                    <div className='flex'>
                        { (skill.physical_damage  && skill.physical_damage !== "0") && <p>Damage: <span className='text-green-500 font-light'>{skill.physical_damage}</span> Physical Damage   </p>}
                        { (skill.magical_damage && skill.magical_damage !== "0") && <p>Damage: <span className='text-green-500 font-light'>{skill.magical_damage}</span> Magical Damage   </p>}
                        { (skill.vitality_recovery && skill.vitality_recovery !== "0") && <p>Damage: <span className='text-green-500 font-light'>{skill.vitality_recovery}</span> Recovering   </p>}
                        { (skill.essence_recovery && skill.essence_recovery !== "0") && <p>Damage: <span className='text-green-500 font-light'>{skill.essence_recovery}</span> Essence Recovering   </p>}
                    </div>
                    {/*Other Skill Details: Range, AoE, Targe, Etc*/}
                    { (skill.range && skill.range !== "0") && <p>Range: <span className='text-gray-400 font-light'>{skill.range}</span> Mts</p>}
                    { (skill.area_of_effect && skill.area_of_effect !== "0") && <p>Area: <span className='text-gray-400 font-light'>{skill.area_of_effect}</span> Mts Radius</p>}
                    { (skill.target && skill.target !== "0") && <p>Target: <span className='text-yellow-500 font-light'>{TargetText(skill.target)}</span></p>}
                    { skill.channeled && <p><span className='text-gray-400 font-light'>Channeled</span></p>}
                    { (skill.effects && skill.effects.length > 0) && 
                            <p>
                                Effects:
                            </p>}
                            {skill.effects.map((effect: any) => {
                                return (
                                <div className='px-4 font-light'>
                                    <p>
                                        <Link href={`/effects/${effect.effect.id}`}><span className='text-yellow-400 font-normal'>{effect.effect.name}</span></Link> lasting <span className='text-purple-400'>{effect.duration}</span> T
                                    </p>
                                    <p>
                                        <span className='px-4 text-gray-400 font-light'>{effect.effect.description}</span>
                                    </p>
                                </div>
                                )
                            })}
                        
                </div>
                
                
            </div>
            {/*General Skill Details. Resource and CD*/}
            <div className='my-2 flex space-x-2 font-light text-sm'>
                { (skill.essence_cost && skill.essence_cost !== "0") && <p>Cost <span className='text-blue-500 font-light'>{skill.essence_cost}</span> P</p>}
                { (skill.vitality_cost && skill.vitality_cost !== "0") && <p> <span className='text-red-500 font-light'>{skill.vitality_cost}</span> V</p>}
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
