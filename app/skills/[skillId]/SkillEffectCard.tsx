import DisplayValue from '@/app/_components/DisplayValue';
import Link from 'next/link';
import React from 'react'
import { IoTrashOutline } from 'react-icons/io5';
import { useQueryClient } from 'react-query';

interface SkillEffectCardProps {
    skillId: string;
    skilleffect: any;
    editable: boolean;
}

export default function SkillEffectCard({ skillId, skilleffect, editable }: SkillEffectCardProps) {
    const effect = skilleffect.effect;
    const queryClient = useQueryClient();

    const deleteEffect = async () => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skills/remove_effect/${skillId}?effect_id=${effect.id}`, {
                method: 'PUT',
            });

            console.log(`Response: ${JSON.stringify(response)}`);

            queryClient.invalidateQueries('skill');
        }catch(e){
            console.log(`Error: ${e}`);
        }
    };

    return (
        <div className='group my-2 px-4 py-2 font-light dark:border-2 rounded-md dark:border-yellow-900/50 flex items-center justify-between '>
            <div>
            <div className='flex items-center space-x-3'>
                <img src={`${process.env.NEXT_PUBLIC_API_URL}/static/effects/${effect.id}.jpg`} alt="" className='w-10 h-10 rounded-md border-2 border-gray-500/60 my-2' />
                <p>
                    <Link href={`/effects/${skilleffect.effect.id}`}><span className='text-yellow-400 font-normal'>{effect.name}</span></Link> lasting <span className='text-purple-400'>{skilleffect.duration}</span> T
                </p>
            </div>
            <p>
                <span className='px-4 text-gray-400 font-light'>{effect.description}</span>
                <div className='px-4 flex flex-col font-extralight italic space-x-2 '>
                    <DisplayValue value={effect.magic_effectiveness} after_text=' Magic Power'/>
                    <DisplayValue value={effect.physical_damage} after_text=' Physical Damage'/>
                    <DisplayValue value={effect.magical_damage} after_text=' Magic Damage'/>
                    <DisplayValue value={effect.healing} after_text=' Healing Power'/>
                    <DisplayValue value={effect.vitality_recovery} after_text=' Vitality'/>
                    <DisplayValue value={effect.essence_recovery} after_text=' Essence'/>
                    <DisplayValue value={effect.vitality} after_text=' Max Vitality'/>
                    <DisplayValue value={effect.range} after_text=' Range'/>
                    <DisplayValue value={effect.damage} after_text=' All Damage'/>
                    <DisplayValue value={effect.armor} after_text=' Armor'/>
                    <DisplayValue value={effect.magic_armor} after_text=' Magic Armor'/>
                    <DisplayValue value={effect.essence} after_text=' Max Essence'/>
                    <DisplayValue value={effect.agility} after_text=' Agility'/>
                    <DisplayValue value={effect.hit_chance} after_text=' Hit Chance'/>
                    <DisplayValue value={effect.evasion} after_text=' Evasion'/>
                    <DisplayValue value={effect.hit_rate} after_text=' Hit Rate'/>
                    <DisplayValue value={effect.movement} after_text=' Movement'/>
                    <DisplayValue value={effect.ammo} after_text=' Ammo'/>
                    <DisplayValue value={effect.shield} after_text=' Shield'/>
                    { ( effect.barrier !== 0 ) && <p>{effect.barrier} Barrier   </p>}
                    { ( effect.max_stack !== 0 ) && <p>Stacks {effect.max_stack} Times  </p>}
                </div>
            </p>
            </div>
            <div>
                {editable && <h5 className="invisible group-hover:visible mx-1 rounded-lg px-3 py-1 bg-black border hover:bg-purple-300/10 border-yellow-900/50
                                    active:translate-y-1 text-xl cursor-pointer text-yellow-200/70 " onClick={deleteEffect}><IoTrashOutline/></h5>}
            </div>
        </div>
    )
}
