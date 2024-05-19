import React from 'react'
import { useQueryClient } from 'react-query';
import { IoTrashOutline } from 'react-icons/io5'
import Link from 'next/link';
import StatsSummary from './StatsSummary';
import { paintRarity, paintTier, writeTier } from '@/app/_libs/text_paint_methods';

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
    removeEndpoint: string;
    endpointMethod: string;
    queryInvalidateKey?: string;
    vertical?: boolean;
    detailedTraits?: boolean;
    detailedSkills?: boolean;
    styles: string;
}

export default function SpecializationOption(specialization: SpecializationOptionProps) {
    const queryClient = useQueryClient();


    const deleteSpecialization = async () => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${specialization.removeEndpoint}${specialization.id}`, {
                method: `${specialization.endpointMethod}`,
            });

            console.log(`Response: ${JSON.stringify(response)}`);

            queryClient.invalidateQueries(`${specialization.queryInvalidateKey}`);
        }catch(e){
            console.log(`Error: ${e}`);
        }
    };

    return (
    <div className={`${specialization.styles}`}>
        <div className='flex items-center justify-between'>
        <div className='w-full'>
            <Link href={`/main/specializations/${specialization.id}`}>
                <div className='my-2 flex items-center justify-between'>
                    <h3 className={`font-bold text-yellow-200/70`}>{specialization.name}</h3>
                    <div className='flex items-center space-x-1'>
                        <img src={`/gen_icons/tier.png`} alt="" className='w-7 h-7 rounded-full border border-yellow-500/60 my-2' />
                        <p className={`${paintTier(specialization.tier)} text-2xl font-extrabold font-serif`}>{writeTier(specialization.tier)}</p>
                    </div>
                </div>
            </Link>
            <div className='w-full flex justify-between'>
                <div>
                    <p className='my-1 text-gray-100 '>{specialization.description}</p>
                    {/* Specialization Tratis*/}
                    { (specialization.traits && specialization.traits.length > 0) && 
                    <p className='italic font-light'>
                        Traits:
                    </p>}
                    {specialization.detailedTraits ? specialization.traits.map((trait: any) => {
                        return (
                            <div key={trait.trait.id} className='px-4 font-light italic m-1'>
                                <div className='flex items-center space-x-3'>
                                    <Link href={`/main/traits/${trait.trait.id}`}>
                                        <img src={`${process.env.NEXT_PUBLIC_API_URL}/static/traits/${trait.trait.id}.jpg`} alt="" className='w-10 h-10 rounded-md border-2 border-gray-500/60 my-2' />
                                    </Link>
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
                        })
                        :
                        <div className='flex mx-4 space-x-2'>
                            {specialization.traits.map((trait: any) => {
                                return (
                                        <Link  key={trait.trait.id} href={`/main/traits/${trait.trait.id}`}>
                                            <img className='w-10 h-10 rounded-md border-2 border-gray-500/60 my-2'
                                            src={`${process.env.NEXT_PUBLIC_API_URL}/static/traits/${trait.trait.id}.jpg`} alt="" />
                                        </Link>
                                    )
                            })}
                        </div>
                    }
                    {/* Specialization Skills*/}
                    { (specialization.skills && specialization.skills.length > 0) && 
                    <p className='italic font-light'>
                        Skills:
                    </p>}
                    {specialization.detailedSkills ? specialization.skills.map((skill: any) => {
                        return (
                                <div key={skill.skill.id} className='px-4 font-light italic m-1'>
                                    <div className='flex items-center space-x-3'>
                                        <Link href={`/main/skills/${skill.skill.id}`}>
                                            <img src={`${process.env.NEXT_PUBLIC_API_URL}/static/skills/${skill.skill.id}.jpg`} alt="" className='w-10 h-10 rounded-md border-2 border-gray-500/60 my-2' />
                                        </Link>
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
                        })
                        :
                        <div className='flex mx-4 space-x-2'>
                            {specialization.skills.map((skill: any) => {
                                    return(
                                            <Link  key={skill.skill.id} href={`/main/skills/${skill.skill.id}`}>
                                                <img className='w-10 h-10 rounded-md border-2 border-gray-500/60 my-2'
                                                src={`${process.env.NEXT_PUBLIC_API_URL}/static/skills/${skill.skill.id}.jpg`} alt="" />
                                            </Link>
                                        )
                            })}
                        </div>
                    }
                    {/* Specialization Initial Items*/}
                    { (specialization.items && specialization.items.length > 0) && 
                    <p className='italic font-light'>
                        Initial Items:
                    </p>}
                    {specialization.items.map((item: any) => {
                        return (
                        <div key={item.item.id} className='px-4 font-light italic m-1'>
                            <div className='flex items-center space-x-3'>
                                <Link href={`/main/items/${item.item.id}`}>
                                    <img src={`${process.env.NEXT_PUBLIC_API_URL}/static/items/${item.item.id}.jpg`} alt="" className='w-10 h-10 rounded-md border-2 border-gray-500/60 my-2' />
                                </Link>
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
                <div className={`flex ${specialization.vertical ? "flex-col" : "" } space-x-3 items-center`}>
                    <div></div>
                    <StatsSummary icon="/gen_icons/vitality.png" name={'Vit'} value={specialization.vitality} style={`${specialization.vertical ? 'flex space-x-1' : ''}`} />
                    <StatsSummary icon="/gen_icons/strength.png" name={'Str'} value={specialization.strength} style={`${specialization.vertical ? 'flex space-x-1' : ''}`} />
                    <StatsSummary icon="/gen_icons/dexterity.png" name={'Dex'} value={specialization.dexterity} style={`${specialization.vertical ? 'flex space-x-1' : ''}`} />
                    <StatsSummary icon="/gen_icons/mind.png" name={'Min'} value={specialization.mind} style={`${specialization.vertical ? 'flex space-x-1' : ''}`} />
                    <StatsSummary icon="/gen_icons/faith.png" name={'Fth'} value={specialization.faith} style={`${specialization.vertical ? 'flex space-x-1' : ''}`} />
                    <StatsSummary icon="/gen_icons/essence.png" name={'Ess'} value={specialization.essence} style={`${specialization.vertical ? 'flex space-x-1' : ''}`} />
                    <StatsSummary icon="/gen_icons/agility.png" name={'Agi'} value={specialization.agility} style={`${specialization.vertical ? 'flex space-x-1' : ''}`} />                        
                    <StatsSummary icon="/gen_icons/hit_chance.png" name={'Hit'} value={specialization.hit_chance} style={`${specialization.vertical ? 'flex space-x-1' : ''}`} />
                    <StatsSummary icon="/gen_icons/evasion.png" name={'Eva'} value={specialization.evasion} style={`${specialization.vertical ? 'flex space-x-1' : ''}`} />
                    <StatsSummary icon="/gen_icons/hit_rate.png" name={'Hir'} value={specialization.hit_rate} style={`${specialization.vertical ? 'flex space-x-1' : ''}`} />
                    <StatsSummary icon="/gen_icons/movement.png" name={'Mov'} value={specialization.movement} style={`${specialization.vertical ? 'flex space-x-1' : ''}`} />
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
