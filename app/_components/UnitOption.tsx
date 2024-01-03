import React, { useEffect } from 'react'
import { useQueryClient } from 'react-query';
import { IoTrashOutline } from 'react-icons/io5'
import Link from 'next/link';
import StatsSummary from './StatsSummary';
import { paintRarity, paintTier, writeTier } from '@/app/_libs/text_paint_methods';
import { value_multiplier } from '../_libs/equations';

interface UnitOptionProps {
    id: string;
    user_id: string;
    race_id: string;
    specialization_id: string;
    name: string;
    title?: string;
    prefix_title?: string;
    description?: string;
    vitality: number;
    strength: number;
    dexterity: number;
    mind: number;
    faith: number;
    essence: number;
    agility: number;
    hit_chance: number;
    evasion: number;
    armor: number;
    magic_armor: number;
    armor_piercing: number;
    spell_piercing: number;
    hit_rate: number;
    movement: number;
    shield: number;
    physical_damage: number;
    magical_damage: number;
    weight: number;
    weight_penalty: number;
    skill_picks?: string;
    rank: number;
    items?: any[];
    race: any;
    culture: any;
    belief: any;
    specialization: any;
    removeEndpoint: string;
    endpointMethod: string;
    queryInvalidateKey?: string;
    styles: string;
}

export default function UnitOption(unit: UnitOptionProps) {
    const queryClient = useQueryClient();
    const [pickedSkills, setPickedSkills] = React.useState<number[]>([]);
    useEffect(() => {
        if(unit){
            //setPickedSkills(unit.skill_picks ? parseInt(unit.skill_picks.split("|")) : []);
            setPickedSkills(unit.skill_picks ? unit.skill_picks.split("|").map((skill: string) => parseInt(skill)-1) : []);
        }
    }, [unit])


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
                    <h3 className={`font-bold text-yellow-200/70`}>
                        {unit.prefix_title &&  <span className=' font-normal '> {unit.prefix_title} </span>}
                        {unit.name} <span className='font-extralight italic text-orange-500'> {unit.title ? unit.title : ""} </span>
                    </h3>
                    <div className='flex items-center italic font-medium text-sm'>
                        <h3 className={`text-yellow-200/70 `}>{unit.specialization.name}</h3>
                        <p className={`mx-2 ${paintTier(unit.specialization.tier)} font-extrabold font-serif`}>{`${writeTier(unit.specialization.tier)}`}</p>
                    </div>
                    <div className='flex items-center italic font-light text-sm'>
                        <h3 className={`text-yellow-200/70 `}> <span className=' font-medium '> {unit.race.name}</span>,  {unit.culture.name} | {unit.belief.name}</h3>
                    </div>
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
                    {/* Race Tratis*/}
                    {unit.race.traits.map((trait: any) => {
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
                    {unit.specialization.skills.map((skill: any, index: number) => {
                        return  (
                            pickedSkills.includes(index) && <div key={skill.skill.id} className='px-4 font-light italic m-1'>
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
                        Items:
                    </p>}
                    {unit.items!.map((item: any) => {
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
                    <div className='flex flex-col items-center'>
                    <div className='flex space-x-3 items-center'>
                        <StatsSummary icon="/gen_icons/vitality.png" name={'Vit'} value={ unit.vitality } />
                        <StatsSummary icon="/gen_icons/strength.png" name={'Str'} value={ unit.strength } />
                        <StatsSummary icon="/gen_icons/dexterity.png" name={'Dex'} value={ unit.dexterity } />
                        <StatsSummary icon="/gen_icons/mind.png" name={'Min'} value={ unit.mind } />
                        <StatsSummary icon="/gen_icons/faith.png" name={'Fth'} value={ unit.faith } />
                        <StatsSummary icon="/gen_icons/essence.png" name={'Ess'} value={ unit.essence } />
                        <StatsSummary icon="/gen_icons/agility.png" name={'Agi'} value={ unit.agility } />                        
                        <StatsSummary icon="/gen_icons/evasion.png" name={'Eva'} value={ unit.evasion } />
                        <StatsSummary icon="/gen_icons/armor.png" name={'Arm'} value={ unit.armor } />
                        <StatsSummary icon="/gen_icons/magic_armor.png" name={'Mar'} value={ unit.magic_armor } />
                        <StatsSummary icon="/gen_icons/shield.png" name={'Shd'} value={ unit.shield } />
                        <StatsSummary icon="/gen_icons/movement.png" name={'Mov'} value={ unit.movement } />
                    </div>
                    <div className='flex space-x-3 items-center'>
                        <StatsSummary icon="/gen_icons/physical_damage.png" name={'Pdg'} value={ unit.physical_damage } />
                        <StatsSummary icon="/gen_icons/magical_damage.png" name={'Mdg'} value={ unit.magical_damage } />
                        <StatsSummary icon="/gen_icons/hit_chance.png" name={'Hit'} value={ unit.hit_chance  } />
                        <StatsSummary icon="/gen_icons/hit_rate.png" name={'Hir'} value={ unit.hit_rate } />
                        <StatsSummary icon="/gen_icons/armor_piercing.png" name={'Arp'} value={ unit.armor_piercing } />
                        <StatsSummary icon="/gen_icons/spell_piercing.png" name={'Spp'} value={ unit.spell_piercing } />
                    </div>
                    </div>
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
