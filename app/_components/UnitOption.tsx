import React from 'react'
import { useQueryClient } from 'react-query';
import { IoTrashOutline } from 'react-icons/io5'
import Link from 'next/link';
import StatsSummary from './StatsSummary';
import { paintRarity, paintTier, writeTier } from '@/app/_libs/text_paint_methods';
import { value_multiplier } from '../_libs/equations';

interface UnitOptionProps {
    id: string;
    user_id: string;
    faction_id: string;
    specialization_id: string;
    name: string;
    title?: string;
    description?: string;
    base_vitality: number;
    base_strength: number;
    base_dexterity: number;
    base_mind: number;
    base_faith: number;
    base_essence: number;
    base_agility: number;
    base_hit_chance: number;
    base_evasion: number;
    skill_picks?: string;
    rank: number;
    items?: any[];
    faction: any;
    specialization: any;
    removeEndpoint: string;
    endpointMethod: string;
    queryInvalidateKey?: string;
    styles: string;
}

export default function UnitOption(unit: UnitOptionProps) {
    const queryClient = useQueryClient();


    const deleteUnit = async () => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${unit.removeEndpoint}${unit.id}`, {
                method: `${unit.endpointMethod}`,
            });

            console.log(`Response: ${JSON.stringify(response)}`);

            queryClient.invalidateQueries(`${unit.queryInvalidateKey}`);
        }catch(e){
            console.log(`Error: ${e}`);
        }
    };

    return (
    <div className={`${unit.styles}`}>
        <div className='flex items-center justify-between'>
        <div className='w-full'>
            <Link href={`/main/units/${unit.id}`}>
                <div className='my-2'>
                    <h3 className={`font-bold text-yellow-200/70`}>{unit.name} <span className='font-light'> {unit.title ? unit.title : ""} </span></h3>
                    <h3 className={`text-orange-500 italic font-extralight`}>{unit.specialization.name}</h3>
                </div>
            </Link>
            <div className='w-full flex items-center justify-between'>
                <div>
                    <p className='my-1 text-gray-100 '>{unit.description}</p>
                    {/* Unit Tratis*/}
                    { (unit.specialization.traits && unit.specialization.traits.length > 0) && 
                    <p className='italic font-light'>
                        Traits:
                    </p>}
                    {/* Faction Tratis*/}
                    {unit.faction.traits.map((trait: any) => {
                        return (
                        <div key={trait.trait.id} className='px-4 font-light italic m-1'>
                            <div className='flex items-center space-x-3'>
                                <img src={`${process.env.NEXT_PUBLIC_API_URL}/static/traits/${trait.trait.id}.jpg`} alt="" className='w-10 h-10 rounded-md border-2 border-gray-500/60 my-2' />
                                <p>
                                    <Link href={`/main/traits/${trait.trait.id}`}><span className='text-yellow-400 font-normal'>{trait.trait.name}</span></Link>
                                </p>
                            </div>
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
                    {unit.specialization.traits.map((trait: any) => {
                        return (
                        <div key={trait.trait.id} className='px-4 font-light italic m-1'>
                            <div className='flex items-center space-x-3'>
                                <img src={`${process.env.NEXT_PUBLIC_API_URL}/static/traits/${trait.trait.id}.jpg`} alt="" className='w-10 h-10 rounded-md border-2 border-gray-500/60 my-2' />
                                <p>
                                    <Link href={`/main/traits/${trait.trait.id}`}><span className='text-yellow-400 font-normal'>{trait.trait.name}</span></Link>
                                </p>
                            </div>
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
                    {/* Unit Skills*/}
                    { (unit.specialization.skills && unit.specialization.skills.length > 0) && 
                    <p className='italic font-light'>
                        Skills:
                    </p>}
                    {unit.specialization.skills.map((skill: any) => {
                        return (
                        <div key={skill.skill.id} className='px-4 font-light italic m-1'>
                            <div className='flex items-center space-x-3'>
                                <img src={`${process.env.NEXT_PUBLIC_API_URL}/static/skills/${skill.skill.id}.jpg`} alt="" className='w-10 h-10 rounded-md border-2 border-gray-500/60 my-2' />
                                <p>
                                    <Link href={`/main/skills/${skill.skill.id}`}><span className='text-yellow-400 font-normal'>{skill.skill.name}</span></Link>
                                </p>
                            </div>
                            <p>
                                <span className='px-4 text-gray-400 font-light'>{skill.skill.description}</span>
                            </p>
                            <div className='px-4 flex font-light text-gray-400 text-sm space-x-2'>
                                { (skill.skill.essence_cost && skill.skill.essence_cost !== "0") && <p>Cost <span className='text-blue-500 font-light'>{skill.skill.essence_cost}</span> E</p>}
                                { (skill.skill.vitality_cost && skill.skill.vitality_cost !== "0") && <p>Cost <span className='text-red-500 font-light'>{skill.skill.vitality_cost}</span> V</p>}
                                { (skill.skill.cooldown && skill.skill.cooldown !== "0") && <p>CD <span className='text-purple-400 font-light'>{skill.skill.cooldown}</span> T </p>}
                            </div>
                        </div>
                        )
                    })}
                    {/* Unit Initial Items*/}
                    { (unit.items && unit.items.length > 0) && 
                    <p className='italic font-light'>
                        Initial Items:
                    </p>}
                    {unit.specialization.items.map((item: any) => {
                        return (
                        <div key={item.item.id} className='px-4 font-light italic m-1'>
                            <div className='flex items-center space-x-3'>
                               <img src={`${process.env.NEXT_PUBLIC_API_URL}/static/items/${item.item.id}.jpg`} alt="" className='w-10 h-10 rounded-md border-2 border-gray-500/60 my-2' />
                               <p>
                                   <Link href={`/main/items/${item.item.id}`}><span className={`font-normal ${paintRarity(item.item.rarity)}`}>{item.item.name}</span></Link>
                               </p>
                            </div>
                            <p>
                                <span className='px-4 text-gray-400 font-light'>{item.item.description}</span>
                            </p>
                            <div className='px-4 flex font-light text-gray-400 text-sm space-x-2'>
                                { (item.item.essence_cost && item.item.essence_cost !== "0") && <p>Cost <span className='text-blue-500 font-light'>{item.item.essence_cost}</span> P</p>}
                                { (item.item.vitality_cost && item.item.vitality_cost !== "0") && <p>Cost <span className='text-red-500 font-light'>{item.item.vitality_cost}</span> V</p>}
                                { (item.item.cooldown && item.item.cooldown !== "0") && <p>CD <span className='text-purple-400 font-light'>{item.item.cooldown}</span> T </p>}
                            </div>
                        </div>
                        )
                    })}
                </div>
                {/*Stats*/}
                <div className='flex space-x-3 items-center'>
                    <p className={`px-3 ${paintTier(unit.rank)} text-2xl font-extrabold font-serif`}>{writeTier(unit.rank)}</p>
                    <StatsSummary name={'Vit'} value={ value_multiplier( unit.base_vitality, unit.specialization.vitality, 10 )} />
                    <StatsSummary name={'Str'} value={ value_multiplier( unit.base_strength, unit.specialization.strength, 5 )} />
                    <StatsSummary name={'Dex'} value={ value_multiplier( unit.base_dexterity, unit.specialization.dexterity, 5 )} />
                    <StatsSummary name={'Min'} value={ value_multiplier( unit.base_mind, unit.specialization.mind, 5 )} />
                    <StatsSummary name={'Fth'} value={ value_multiplier( unit.base_faith, unit.specialization.faith, 5 )} />
                    <StatsSummary name={'Ess'} value={ value_multiplier( unit.base_essence, unit.specialization.essence, 10 )} />
                    <StatsSummary name={'Agi'} value={ value_multiplier( unit.base_agility, unit.specialization.agility, 5 )} />                        
                    <StatsSummary name={'Hit'} value={ value_multiplier( unit.base_hit_chance, unit.specialization.hit_chance, 5 )} />
                    <StatsSummary name={'Eva'} value={ value_multiplier( unit.base_evasion, unit.specialization.evasion, 5 )} />
                    <StatsSummary name={'Hir'} value={ unit.specialization.hit_rate } />
                    <StatsSummary name={'Mov'} value={ unit.specialization.movement } />
                </div>
            </div>
        </div>
        <div>
            <h5 className="invisible group-hover:visible mx-1 rounded-lg px-3 py-1 bg-black border hover:bg-purple-300/10 border-yellow-900/50
                                 active:translate-y-1 text-xl cursor-pointer text-yellow-200/70 " onClick={deleteUnit}><IoTrashOutline/></h5>
        </div>
        </div>
    </div>
    )
}
