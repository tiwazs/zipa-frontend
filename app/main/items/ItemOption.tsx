import React from 'react'
import { useQueryClient } from 'react-query';
import { IoTrashOutline } from 'react-icons/io5'
import Link from 'next/link';
import DisplayValue from '../../_components/DisplayValue';
import { paintRarity } from '../../_libs/text_paint_methods';

interface ItemOptionProps {
    id: string;
    name: string;
    description: string;
    conditions: string;
    is_weapon: boolean;
    object_type: string;
    rarity: string;
    magic_effectiveness: string;
    physical_damage: string;
    magical_damage: string;
    healing: string;
    armor_piercing: string;
    spell_piercing: string;
    vitality_recovery: string;
    essence_recovery: string;
    vitality: string;
    range: string;
    damage: string;
    armor: string;
    magic_armor: string;
    essence: string;
    agility: string;
    hit_chance: string;
    evasion: string;
    hit_rate: string;
    movement: string;
    ammo: string;
    shield: string;
    dexterity_requirement?: number;
    strength_requirement?: number;
    mind_requirement?: number;
    faith_requirement?: number;
    weight?: number;
    skills: any;
    traits: any;
    vertical?: boolean;
    styles: string;
}

export default function ItemOption(item: ItemOptionProps) {
    const queryClient = useQueryClient();


    const deleteItem = async () => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/${item.id}`, {
                method: 'DELETE',
            });

            console.log(`Response: ${JSON.stringify(response)}`);

            queryClient.invalidateQueries('items');
        }catch(e){
            console.log(`Error: ${e}`);
        }
    };

    return (
    <div className={`${item.styles} flex space-x-3`}>
        <Link href={`/main/items/${item.id}`}>
            <img src={`${process.env.NEXT_PUBLIC_API_URL}/static/items/${item.id}.jpg`} alt="" className='w-12 h-12 rounded-md border-2 border-gray-500/60 my-2' />
        </Link>
        <div className='w-full flex justify-between'>
        <div>
            <Link href={`/main/items/${item.id}`}>
                <div className='my-2'>
                    <h3 className={`font-bold ${paintRarity(item.rarity)}`}>{item.name}</h3>
                    <div className={`flex space-x-1 text-xs italic font-light ${paintRarity(item.rarity)}`}>
                        <h4>{item.rarity}</h4>
                        <h4>|</h4>
                        <h4>{item.object_type}</h4>
                    </div>
                </div>
            </Link>
            <div>
                <p className='my-1 text-gray-100 '>{item.description}</p>
                <div className='flex flex-col font-extralight italic '>
                    {/*Damage Types*/}
                    <div className='flex flex-col'>
                        { (item.conditions && item.conditions !== "0") && <p>Conditions: <span className='text-orange-500 font-light'>{item.conditions}</span> </p>}
                        <DisplayValue value={item.physical_damage} after_text=' Physical Damage' />
                        <DisplayValue value={item.magical_damage} after_text=' Magical Damage' />
                        <DisplayValue value={item.healing} after_text=' Healing Power' />
                        <DisplayValue value={item.armor_piercing} after_text=' Armor Piercing' />
                        <DisplayValue value={item.spell_piercing} after_text=' Spell Piercing' />
                        <DisplayValue value={item.vitality_recovery} after_text=' Vitality' />
                        <DisplayValue value={item.essence_recovery} after_text=' Essence' />
                        <DisplayValue value={item.vitality} after_text=' Max Vitality' />
                        <DisplayValue value={item.range} after_text=' Range' />
                        <DisplayValue value={item.damage} after_text=' Damage' />
                        <DisplayValue value={item.armor} after_text=' Armor' />
                        <DisplayValue value={item.magic_armor} after_text=' Magic' />
                        <DisplayValue value={item.essence} after_text=' Essence' />
                        <DisplayValue value={item.agility} after_text=' Agility' />
                        <DisplayValue value={item.hit_chance} after_text=' Hit' />
                        <DisplayValue value={item.evasion} after_text=' Evasion' />
                        <DisplayValue value={item.hit_rate} after_text=' Hit' />
                        <DisplayValue value={item.movement} after_text=' Movement' />
                        <DisplayValue value={item.ammo} after_text=' Ammo' />
                        <DisplayValue value={item.shield} after_text=' Shield' />
                    </div>
                    {/* Item Skills*/}
                    { (item.skills && item.skills.length > 0) && 
                            <p>
                                Skills:
                            </p>}
                            {item.skills.map((skill: any) => {
                                return (
                                <div key={skill.skill.id} className='px-4 font-ligh'>
                                    <div className='flex items-center space-x-3'>
                                        <img src={`${process.env.NEXT_PUBLIC_API_URL}/static/skills/${skill.skill.id}.jpg`} alt="" className='w-10 h-10 rounded-md border-2 border-gray-500/60 my-2' />
                                        <p>
                                            <Link href={`/main/skills/${skill.skill.id}`}><span className='text-yellow-400 font-normal'>{skill.skill.name}</span></Link>
                                        </p>
                                    </div>
                                    <p>
                                        <span className='px-4 text-gray-400 font-light'>{skill.skill.description}</span>
                                    </p>
                                    <div className='px-4 flex space-x-2'>
                                        { (skill.essence_cost && skill.essence_cost !== "0") && <p className='font-light text-sm'>Cost <span className='text-blue-500'>{skill.essence_cost}</span> E</p>}
                                        { (skill.vitality_cost && skill.vitality_cost !== "0") && <p className='font-light text-sm'>Cost <span className='text-red-500'>{skill.vitality_cost}</span> V</p>}
                                        { (skill.cooldown && skill.cooldown !== "0") && <p className='font-light text-sm'>CD <span className='text-purple-400'>{skill.cooldown}</span> T </p>}
                                    </div>
                                </div>
                                )
                            })}
                    {/* Item Tratis*/}
                    { (item.traits && item.traits.length > 0) && 
                    <p className='italic font-light'>
                        Traits:
                    </p>}
                    {item.traits.map((trait: any) => {
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
                                { (trait.trait.essence_cost && trait.trait.essence_cost !== "0") && <p>Cost <span className='text-blue-500 font-light'>{trait.trait.essence_cost}</span> E</p>}
                                { (trait.trait.vitality_cost && trait.trait.vitality_cost !== "0") && <p>Cost <span className='text-red-500 font-light'>{trait.trait.vitality_cost}</span> V</p>}
                                { (trait.trait.cooldown && trait.trait.cooldown !== 0) && <p>CD <span className='text-purple-400 font-light'>{trait.traits.cooldown}</span> T </p>}
                            </div>
                        </div>
                        )
                    })}
                    <div>
                        <p>Weight: <span className='text-orange-500 font-light'>{(item.weight && item.weight !== 0 ) ? item.weight?.toString() : "0"}</span> </p>
                        {((item.dexterity_requirement !==0) || 
                            (item.strength_requirement!==0) || 
                            (item.mind_requirement!==0) || 
                            (item.faith_requirement!==0)) && <p>Requires:</p>}
                        <div className='px-6 text-orange-500 font-light text-sm'>
                            <DisplayValue value={item.dexterity_requirement} after_text=' Dexterity' />
                            <DisplayValue value={item.strength_requirement} after_text=' Strength' />
                            <DisplayValue value={item.mind_requirement} after_text=' Mind' />
                            <DisplayValue value={item.faith_requirement} after_text=' Faith' />
                        </div>
                    </div>                        
                </div>
            </div>
        </div>
        <div>
            <h5 className="invisible group-hover:visible mx-1 rounded-lg px-3 py-1 bg-black border hover:bg-purple-300/10 border-yellow-900/50
                                 active:translate-y-1 text-xl cursor-pointer text-yellow-200/70 " onClick={deleteItem}><IoTrashOutline/></h5>
        </div>
        </div>
    </div>
    )
}
