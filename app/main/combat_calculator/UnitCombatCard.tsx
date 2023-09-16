import { paintRarity, paintTier, writeTier } from '@/app/_libs/text_paint_methods';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { IoTrashOutline } from 'react-icons/io5';

interface UnitCombatCardProps {
    combat_id: number;
    unit: any;
    onRemoveClick?: any;
}

function UnitCombatCard({combat_id, unit, onRemoveClick}: UnitCombatCardProps) {
    const [pickedSkills, setPickedSkills] = React.useState<number[]>([]);
    useEffect(() => {
        if(unit){
            //setPickedSkills(unit.skill_picks ? parseInt(unit.skill_picks.split("|")) : []);
            setPickedSkills(unit.skill_picks ? unit.skill_picks.split("|").map((skill: string) => parseInt(skill)-1) : []);
        }
    }, [])

    const HandleRemoveClick = () => {
        onRemoveClick(combat_id)
    }
    
    return (
    <div className="group w-96 rounded-2xl p-2 text-left shadow-xl 
                    border-transparent border-4 dark:dark:border-yellow-900/50 text-yellow-200/70 dark:bg-[url('/bg1.jpg')]">
        <div className='flex justify-between'>
            <div>
                <Link href={`/main/units/${unit.id}`}>
                <h3 className={`font-bold text-yellow-200/70`}>
                    {unit.prefix_title &&  <span className=' font-normal '> {unit.prefix_title} </span>}
                    {unit.name} <span className='font-extralight italic text-orange-500'> {unit.title ? unit.title : ""} </span>
                </h3>
                <div className='flex items-center italic font-light text-sm'>
                    <h3 className={`text-yellow-200/70 `}>{unit.specialization.name}</h3>
                    <p className={`mx-2 ${paintTier(unit.specialization.tier)} font-extrabold font-serif`}>{`${writeTier(unit.specialization.tier)}`}</p>
                </div>
                </Link>
            </div>
            <div className='flex'>
                <div>
                    <h5 className="invisible group-hover:visible mx-1 rounded-lg px-3 py-1 bg-black border hover:bg-purple-300/10 border-yellow-900/50
                                     active:translate-y-1 text-xl cursor-pointer text-yellow-200/70 " onClick={HandleRemoveClick}><IoTrashOutline/></h5>
                </div>
                {combat_id}
            </div>
        </div>
        <div className='w-full flex space-x-4'>
            <div className='w-full'>
                <div className='w-full flex items-center space-x-2'>
                    <img src={`/gen_icons/vitality.png`} alt="" className='w-7 h-7 rounded-full border border-yellow-500/60 my-2' />
                    <div className='w-full flex justify-between items-center'>
                        <h1>Vitality</h1>
                        <h1 className='my-2 py-1 text-orange-500 font-light'>{unit.vitality}</h1>
                    </div>
                </div>
                <div className='w-full flex items-center space-x-2'>
                    <img src={`/gen_icons/strength.png`} alt="" className='w-7 h-7 rounded-full border border-yellow-500/60 my-2' />
                    <div className='w-full flex justify-between items-center'>
                        <h1>Strength</h1>
                        <h1 className='my-2 py-1 text-orange-500 font-light'>{unit.strength}</h1>
                    </div>
                </div>
                <div className='w-full flex items-center space-x-2'>
                    <img src={`/gen_icons/dexterity.png`} alt="" className='w-7 h-7 rounded-full border border-yellow-500/60 my-2' />
                    <div className='w-full flex justify-between items-center'>
                        <h1>Dexterity</h1>
                        <h1 className='my-2 py-1 text-orange-500 font-light'>{unit.dexterity}</h1>
                    </div>
                </div>
                <div className='w-full flex items-center space-x-2'>
                    <img src={`/gen_icons/mind.png`} alt="" className='w-7 h-7 rounded-full border border-yellow-500/60 my-2' />
                    <div className='w-full flex justify-between items-center'>
                        <h1>Mind</h1>
                        <h1 className='my-2 py-1 text-orange-500 font-light'>{unit.mind}</h1>
                    </div>
                </div>
                <div className='w-full flex items-center space-x-2'>
                    <img src={`/gen_icons/faith.png`} alt="" className='w-7 h-7 rounded-full border border-yellow-500/60 my-2' />
                    <div className='w-full flex justify-between items-center'>
                        <h1>Faith</h1>
                        <h1 className='my-2 py-1 text-orange-500 font-light'>{unit.faith}</h1>
                    </div>
                </div>
                <div className='w-full flex items-center space-x-2'>
                    <img src={`/gen_icons/essence.png`} alt="" className='w-7 h-7 rounded-full border border-yellow-500/60 my-2' />
                    <div className='w-full flex justify-between items-center'>
                        <h1>Essence</h1>
                        <h1 className='my-2 py-1 text-orange-500 font-light'>{unit.essence}</h1>
                    </div>
                </div>
                <div className='w-full flex items-center space-x-2'>
                    <img src={`/gen_icons/agility.png`} alt="" className='w-7 h-7 rounded-full border border-yellow-500/60 my-2' />
                    <div className='w-full flex justify-between items-center'>
                        <h1>Agility</h1>
                        <h1 className='my-2 py-1 text-orange-500 font-light'>{unit.agility}</h1>
                    </div>
                </div>
                <div className='w-full flex items-center space-x-2'>
                    <img src={`/gen_icons/hit_chance.png`} alt="" className='w-7 h-7 rounded-full border border-yellow-500/60 my-2' />
                    <div className='w-full flex justify-between items-center'>
                        <h1>Hit Chance</h1>
                        <h1 className='my-2 py-1 text-orange-500 font-light'>{unit.hit_chance}</h1>
                    </div>
                </div>
                <div className='w-full flex items-center space-x-2'>
                    <img src={`/gen_icons/evasion.png`} alt="" className='w-7 h-7 rounded-full border border-yellow-500/60 my-2' />
                    <div className='w-full flex justify-between items-center'>
                        <h1>Evasion</h1>
                        <h1 className='my-2 py-1 text-orange-500 font-light'>{unit.evasion}</h1>
                    </div>
                </div>
                <div className='w-full flex items-center space-x-2'>
                    <img src={`/gen_icons/movement.png`} alt="" className='w-7 h-7 rounded-full border border-yellow-500/60 my-2' />
                    <div className='w-full flex justify-between items-center'>
                        <h1>Movement</h1>
                        <h1 className='my-2 py-1 text-orange-500 font-light'>{unit.movement}</h1>
                    </div>
                </div>
            </div>
            <div className='w-full'>
                <div className='w-full flex items-center space-x-2'>
                    <img src={`/gen_icons/armor.png`} alt="" className='w-7 h-7 rounded-full border border-yellow-500/60 my-2' />
                    <div className='w-full flex justify-between items-center'>
                        <h1>Armor</h1>
                        <h1 className='my-2 py-1 text-orange-500 font-light'>{unit.armor}</h1>
                    </div>
                </div>
                <div className='w-full flex items-center space-x-2'>
                    <img src={`/gen_icons/magic_armor.png`} alt="" className='w-7 h-7 rounded-full border border-yellow-500/60 my-2' />
                    <div className='w-full flex justify-between items-center'>
                        <h1>Magic Armor</h1>
                        <h1 className='my-2 py-1 text-orange-500 font-light'>{unit.magic_armor}</h1>
                    </div>
                </div>
                <div className='w-full flex items-center space-x-2'>
                    <img src={`/gen_icons/hit_rate.png`} alt="" className='w-7 h-7 rounded-full border border-yellow-500/60 my-2' />
                    <div className='w-full flex justify-between items-center'>
                        <h1>Hit Rate</h1>
                        <h1 className='my-2 py-1 text-orange-500 font-light'>{unit.hit_rate}</h1>
                    </div>
                </div>
                <div className='w-full flex items-center space-x-2'>
                    <img src={`/gen_icons/shield.png`} alt="" className='w-7 h-7 rounded-full border border-yellow-500/60 my-2' />
                    <div className='w-full flex justify-between items-center'>
                        <h1>Shield</h1>
                        <h1 className='my-2 py-1 text-orange-500 font-light'>{unit.shield}</h1>
                    </div>
                </div>
                <div className='w-full flex items-center space-x-2'>
                    <img src={`/gen_icons/armor_piercing.png`} alt="" className='w-7 h-7 rounded-full border border-yellow-500/60 my-2' />
                    <div className='w-full flex justify-between items-center'>
                        <h1>Armor Piercing</h1>
                        <h1 className='my-2 py-1 text-orange-500 font-light'>{unit.armor_piercing}</h1>
                    </div>
                </div>
                <div className='w-full flex items-center space-x-2'>
                    <img src={`/gen_icons/spell_piercing.png`} alt="" className='w-7 h-7 rounded-full border border-yellow-500/60 my-2' />
                    <div className='w-full flex justify-between items-center'>
                        <h1>Spell Piercing</h1>
                        <h1 className='my-2 py-1 text-orange-500 font-light'>{unit.spell_piercing}</h1>
                    </div>
                </div>
                <div className='w-full flex items-center space-x-2'>
                    <img src={`/gen_icons/physical_damage.png`} alt="" className='w-7 h-7 rounded-full border border-yellow-500/60 my-2' />
                    <div className='w-full flex justify-between items-center'>
                        <h1>Physical Damage</h1>
                        <h1 className='my-2 py-1 text-orange-500 font-light'>{unit.physical_damage}</h1>
                    </div>
                </div>
                <div className='w-full flex items-center space-x-2'>
                    <img src={`/gen_icons/magical_damage.png`} alt="" className='w-7 h-7 rounded-full border border-yellow-500/60 my-2' />
                    <div className='w-full flex justify-between items-center'>
                        <h1>Magical Damage</h1>
                        <h1 className='my-2 py-1 text-orange-500 font-light'>{unit.magical_damage}</h1>
                    </div>
                </div>
                <div className='w-full flex items-center space-x-2'>
                    <img src={`/gen_icons/weight.png`} alt="" className='w-7 h-7 rounded-full border border-yellow-500/60 my-2' />
                    <div className='w-full flex justify-between items-center'>
                        <h1>Weight</h1>
                        <h1 className='my-2 py-1 text-orange-500 font-light'>{unit.weight}</h1>
                    </div>
                </div>
                <div className='w-full flex items-center space-x-2'>
                    <img src={`/gen_icons/weight.png`} alt="" className='w-7 h-7 rounded-full border border-yellow-500/60 my-2' />
                    <div className='w-full flex justify-between items-center'>
                        <h1>Weight Penalty</h1>
                        <h1 className='my-2 py-1 text-orange-500 font-light'>{unit.weight_penalty}</h1>
                    </div>
                </div>
            </div>
        </div>
        <div>
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
    </div>
  )
}

export default UnitCombatCard