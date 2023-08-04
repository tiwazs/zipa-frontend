import Link from 'next/link';
import React from 'react'
import { IoTrashOutline } from 'react-icons/io5';
import { useQueryClient } from 'react-query';

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

interface ItemSkillCardProps {
    itemId: string;
    itemskill: any;
    editable: boolean;
}

export default function ItemSkillCard({ itemId, itemskill, editable }: ItemSkillCardProps) {
    const skill = itemskill.skill;
    const queryClient = useQueryClient();

    const deleteSkill = async () => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/remove_skill/${itemId}?skill_id=${skill.id}`, {
                method: 'PUT',
            });

            console.log(`Response: ${JSON.stringify(response)}`);

            queryClient.invalidateQueries('item');
        }catch(e){
            console.log(`Error: ${e}`);
        }
    };

    return (
        <div className='group my-2 px-4 py-2 font-light dark:border-2 rounded-md dark:border-yellow-900/50 flex items-center justify-between '>
            <div>
            <p>
                <Link href={`/skills/${itemskill.id}`}><span className='text-yellow-400 font-normal'>{skill.name}</span></Link> lasting <span className='text-purple-400'>{itemskill.duration}</span> T
            </p>
            <p>
                <span className='px-4 text-gray-400 font-light'>{skill.description}</span>
                <div className='flex flex-col font-extralight italic '>
                    { (skill.conditions && skill.conditions !== "0") && <p>Conditions: <span className='text-orange-500 font-light'>{skill.conditions}</span> </p>}
                    {/*Damage Types*/}
                    <div className='flex'>
                        { (skill.physical_damage  && skill.physical_damage !== "0") && <p>Deals <span className='text-green-500 font-light'>{skill.physical_damage}</span> Physical Damage   </p>}
                        { (skill.magical_damage && skill.magical_damage !== "0") && <p>Deals <span className='text-green-500 font-light'>{skill.magical_damage}</span> Magical Damage   </p>}
                        { (skill.vitality_recovery && skill.vitality_recovery !== "0") && <p>Restores <span className='text-green-500 font-light'>{skill.vitality_recovery}</span> Vitality   </p>}
                        { (skill.essence_recovery && skill.essence_recovery !== "0") && <p>Restores <span className='text-green-500 font-light'>{skill.essence_recovery}</span> Essence </p>}
                    </div>
                    {/*Other Skill Details: Range, AoE, Targe, Etc*/}
                    { (skill.range && skill.range !== "0") && <p>Range: <span className='text-gray-400 font-light'>{skill.range}</span> Mts</p>}
                    { (skill.area_of_effect && skill.area_of_effect !== "0") && <p>Area: <span className='text-gray-400 font-light'>{skill.area_of_effect}</span> Mts Radius</p>}
                    { (skill.target && skill.target !== "0") && <p>Target: <span className='text-yellow-500 font-light'>{TargetText(skill.target)}</span></p>}
                    { skill.channeled && <p><span className='text-gray-400 font-light'>Channeled</span></p>}
                    {/* Skill Effects*/}
                    {/* Skill Summons*/}
                </div>
            </p>
            </div>
            <div>
                {editable && <h5 className="invisible group-hover:visible mx-1 rounded-lg px-3 py-1 bg-black border hover:bg-purple-300/10 border-yellow-900/50
                                    active:translate-y-1 text-xl cursor-pointer text-yellow-200/70 " onClick={deleteSkill}><IoTrashOutline/></h5>}
            </div>
        </div>
    )
}
