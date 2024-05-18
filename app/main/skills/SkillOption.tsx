import React from 'react'
import { useQueryClient } from 'react-query';
import { IoTrashOutline } from 'react-icons/io5'
import Link from 'next/link';
import DisplayValue from '../../_components/DisplayValue';
import { GetTargetText } from '../../_constants/TargetStrings';

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
    cooldown: string;
    channeled: string;
    target: string;
    skill_on: string;
    skill_types: any;
    effects: any;
    summons: any;
    styles: string;
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
    <div className={`${skill.styles} flex space-x-3`}>
        <Link href={`/main/skills/${skill.id}`}   className='w-14 h-14'>
            <img src={`${process.env.NEXT_PUBLIC_API_URL}/static/skills/${skill.id}.jpg`} alt="" className='w-12 h-12 rounded-md border-2 border-gray-500/60 my-2' />
        </Link>
        <div className='w-full flex justify-between'>
        <div>
            <Link href={`/main/skills/${skill.id}`}>
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
                                    <div className='flex items-center space-x-3'>
                                        <img src={`${process.env.NEXT_PUBLIC_API_URL}/static/effects/${effect.effect.id}.jpg`} alt="" className='w-10 h-10 rounded-md border-2 border-gray-500/60 my-2' />
                                        <p>
                                            <Link href={`/main/effects/${effect.effect.id}`}><span className='text-yellow-400 font-normal'>{effect.effect.name}</span></Link> lasting <span className='text-purple-400'>{effect.duration}</span> T
                                        </p>
                                    </div>
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
                                <div key={summon.unit_specialization.id} className='px-4 font-light rounded-md  w-full m-1'>
                                    <div className='flex items-center space-x-3'>
                                        <img src={`${process.env.NEXT_PUBLIC_API_URL}/static/specializations/${summon.unit_specialization.id}.jpg`} alt="" className='w-10 h-10 rounded-md border-2 border-gray-500/60 my-2' />
                                        <p>
                                            <Link href={`/main/summons/${summon.unit_specialization.id}`}><span className='text-yellow-400 font-normal'>{summon.unit_specialization.name}</span></Link> lasting <span className='text-purple-400'>{summon.duration}</span> T
                                        </p>
                                    </div>
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
                { (skill.essence_cost && skill.essence_cost !== "0") && <p>Cost <span className='text-blue-500 font-light'>{skill.essence_cost}</span> E</p>}
                { (skill.vitality_cost && skill.vitality_cost !== "0") && <p>Cost <span className='text-red-500 font-light'>{skill.vitality_cost}</span> V</p>}
                { (skill.cooldown && skill.cooldown !== "0") && <p>CD <span className='text-purple-400 font-light'>{skill.cooldown}</span> T </p>}
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
