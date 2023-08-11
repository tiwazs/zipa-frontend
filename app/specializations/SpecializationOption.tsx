import React from 'react'
import { useQueryClient } from 'react-query';
import { IoTrashOutline } from 'react-icons/io5'
import Link from 'next/link';
import StatsSummary from './StatsSummary';
import { paintTier, writeTier } from './[specializationId]/DetailedSpecializationChart';
import { paintRarity } from '../items/[itemId]/DetailedItemChart';

interface SpecializationOptionProps {
    id: string;
    name: string;
    description: string;
    vitality: number;
    strength: number;
    dexterity: number;
    mind: number;
    faith: number;
    armor: number;
    magic_armor: number;
    essence: number;
    agility: number;
    hit_chance: number;
    evasion: number;
    hit_rate: number;
    movement: number;
    weapon_proficiencies: string;
    tier: number;
    skills: any;
    items: any;
    traits: any;
    styles: string;
}

function DisplaySpecializationValue(props: {value: string}) {
    const value = props.value.split("+");

    if(props.value !== "0"){
        return <span className='text-green-500 font-light'>{props.value}</span>
    }else{
        return null;
    }
}

export default function SpecializationOption(specialization: SpecializationOptionProps) {
    const queryClient = useQueryClient();


    const deleteSpecialization = async () => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/specializations/${specialization.id}`, {
                method: 'DELETE',
            });

            console.log(`Response: ${JSON.stringify(response)}`);

            queryClient.invalidateQueries('specializations');
        }catch(e){
            console.log(`Error: ${e}`);
        }
    };

    return (
    <div className={`${specialization.styles}`}>
        <div className='flex items-center justify-between'>
        <div className='w-full'>
            <Link href={`/specializations/${specialization.id}`}>
                <div className='my-2'>
                    <h3 className={`font-bold text-yellow-200/70`}>{specialization.name}</h3>
                </div>
            </Link>
            <div className='w-full flex items-center justify-between'>
                <div>
                    <p className='my-1 text-gray-100 '>{specialization.description}</p>
                    {/* Specialization Tratis*/}
                    { (specialization.traits && specialization.traits.length > 0) && 
                    <p className='italic font-light'>
                        Traits:
                    </p>}
                    {specialization.traits.map((trait: any) => {
                        return (
                        <div key={trait.trait.id} className='px-4 font-light italic m-1'>
                            <p>
                                <Link href={`/traits/${trait.trait.id}`}><span className='text-yellow-400 font-normal'>{trait.trait.name}</span></Link>
                            </p>
                            <p>
                                <span className='px-4 text-gray-400 font-light'>{trait.trait.description}</span>
                            </p>
                            <div className='px-4 flex font-light text-gray-400 text-sm space-x-2'>
                                { (trait.trait.essence_cost && trait.trait.essence_cost !== "0") && <p>Cost <span className='text-blue-500 font-light'>{trait.trait.essence_cost}</span> P</p>}
                                { (trait.trait.vitality_cost && trait.trait.vitality_cost !== "0") && <p>Cost <span className='text-red-500 font-light'>{trait.trait.vitality_cost}</span> V</p>}
                                { (trait.trait.cooldown && trait.trait.cooldown !== 0) && <p>CD <span className='text-purple-400 font-light'>{trait.traits.cooldown}</span> T </p>}
                            </div>
                        </div>
                        )
                    })}
                    {/* Specialization Skills*/}
                    { (specialization.skills && specialization.skills.length > 0) && 
                    <p className='italic font-light'>
                        Skills:
                    </p>}
                    {specialization.skills.map((skill: any) => {
                        return (
                        <div key={skill.skill.id} className='px-4 font-light italic m-1'>
                            <p>
                                <Link href={`/skills/${skill.skill.id}`}><span className='text-yellow-400 font-normal'>{skill.skill.name}</span></Link>
                            </p>
                            <p>
                                <span className='px-4 text-gray-400 font-light'>{skill.skill.description}</span>
                            </p>
                            <div className='px-4 flex font-light text-gray-400 text-sm space-x-2'>
                                { (skill.skill.essence_cost && skill.skill.essence_cost !== "0") && <p>Cost <span className='text-blue-500 font-light'>{skill.skill.essence_cost}</span> P</p>}
                                { (skill.skill.vitality_cost && skill.skill.vitality_cost !== "0") && <p>Cost <span className='text-red-500 font-light'>{skill.skill.vitality_cost}</span> V</p>}
                                { (skill.skill.cooldown && skill.skill.cooldown !== 0) && <p>CD <span className='text-purple-400 font-light'>{skill.skill.cooldown}</span> T </p>}
                            </div>
                        </div>
                        )
                    })}
                    {/* Specialization Initial Items*/}
                    { (specialization.items && specialization.items.length > 0) && 
                    <p className='italic font-light'>
                        Initial Items:
                    </p>}
                    {specialization.items.map((item: any) => {
                        return (
                        <div key={item.item.id} className='px-4 font-light italic m-1'>
                            <p>
                                <Link href={`/skills/${item.item.id}`}><span className={`font-normal ${paintRarity(item.item.rarity)}`}>{item.item.name}</span></Link>
                            </p>
                            <p>
                                <span className='px-4 text-gray-400 font-light'>{item.item.description}</span>
                            </p>
                            <div className='px-4 flex font-light text-gray-400 text-sm space-x-2'>
                                { (item.item.essence_cost && item.item.essence_cost !== "0") && <p>Cost <span className='text-blue-500 font-light'>{item.item.essence_cost}</span> P</p>}
                                { (item.item.vitality_cost && item.item.vitality_cost !== "0") && <p>Cost <span className='text-red-500 font-light'>{item.item.vitality_cost}</span> V</p>}
                                { (item.item.cooldown && item.item.cooldown !== 0) && <p>CD <span className='text-purple-400 font-light'>{item.item.cooldown}</span> T </p>}
                            </div>
                        </div>
                        )
                    })}
                </div>
                {/*Stats*/}
                <div className='flex space-x-2 items-center'>
                    <p className={`px-3 ${paintTier(specialization.tier)} text-2xl font-extrabold font-serif`}>{writeTier(specialization.tier)}</p>
                    <StatsSummary name={'Vit'} value={specialization.vitality} />
                    <StatsSummary name={'Str'} value={specialization.strength} />
                    <StatsSummary name={'Dex'} value={specialization.dexterity} />
                    <StatsSummary name={'Min'} value={specialization.mind} />
                    <StatsSummary name={'Fth'} value={specialization.faith} />
                    <StatsSummary name={'Arm'} value={specialization.armor} />
                    <StatsSummary name={'Mar'} value={specialization.magic_armor} />
                    <StatsSummary name={'Ess'} value={specialization.essence} />
                    <StatsSummary name={'Agi'} value={specialization.agility} />                        
                    <StatsSummary name={'Hit'} value={specialization.hit_chance} />
                    <StatsSummary name={'Eva'} value={specialization.evasion} />
                    <StatsSummary name={'Hir'} value={specialization.hit_rate} />
                    <StatsSummary name={'Mov'} value={specialization.movement} />
                </div>
            </div>
        </div>
        <div>
            <h5 className="invisible group-hover:visible mx-1 rounded-lg px-3 py-1 bg-black border hover:bg-purple-300/10 border-yellow-900/50
                                 active:translate-y-1 text-xl cursor-pointer text-yellow-200/70 " onClick={deleteSpecialization}><IoTrashOutline/></h5>
        </div>
        </div>
    </div>
    )
}
