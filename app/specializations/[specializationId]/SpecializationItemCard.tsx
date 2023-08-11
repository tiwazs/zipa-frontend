import Link from 'next/link';
import React from 'react'
import { IoTrashOutline } from 'react-icons/io5';
import { useQueryClient } from 'react-query';

interface SpecializationItemCardProps {
    specializationId: string;
    specializationitem: any;
    editable: boolean;
}

export default function SpecializationItemCard({ specializationId, specializationitem, editable }: SpecializationItemCardProps) {
    const item = specializationitem.item;
    const queryClient = useQueryClient();

    const deleteItem = async () => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/specializations/remove_item/${specializationId}?item_id=${item.id}`, {
                method: 'PUT',
            });

            console.log(`Response: ${JSON.stringify(response)}`);

            queryClient.invalidateQueries('specialization');
        }catch(e){
            console.log(`Error: ${e}`);
        }
    };

    const paintRarity = (rarity: string) => {
        switch(rarity){
            case "COMMON":
                return "text-gray-100";
            case "UNCOMMON":
                return "text-green-700";
            case "RARE":
                return "text-blue-600";
            case "EPIC":
                return "text-purple-700";
            case "LEGENDARY":
                return "text-orange-500";
            default:
                return "text-gray-100";
        }
    }

    return (
        <div className='group my-2 px-4 py-2 font-light dark:border-2 rounded-md dark:border-yellow-900/50 flex items-center justify-between '>
            <div>
            <p>
                <Link href={`/items/${specializationitem.item.id}`}><span className='text-yellow-400 font-normal'>{item.name}</span></Link>
                <div className={`px-4 flex space-x-1 text-xs italic font-light ${paintRarity(item.rarity)}`}>
                    <h4>{item.rarity}</h4>
                    <h4>|</h4>
                    <h4>{item.object_type}</h4>
                </div>
            </p>
            <p>
                <span className='px-4 text-gray-400 font-light'>{item.description}</span>
                <div className='px-4 flex flex-col font-extralight italic '>
                    { (item.conditions && item.conditions !== "0") && <p>Conditions: <span className='text-orange-500 font-light'>{item.conditions}</span> </p>}
                    { (item.physical_damage  && item.physical_damage !== "0") && <p> <span className='text-green-500 font-light'>{item.physical_damage}</span> Physical Damage   </p>}
                    { (item.magical_damage && item.magical_damage !== "0") && <p> <span className='text-green-500 font-light'>{item.magical_damage}</span> Magical Damage   </p>}
                    { (item.healing && item.healing !== "0") && <p> <span className='text-green-500 font-light'>{item.healing}</span>   </p>}
                    { (item.vitality_recovery && item.vitality_recovery !== "0") && <p> <span className='text-green-500 font-light'>{item.vitality_recovery}</span> Recovering   </p>}
                    { (item.essence_recovery && item.essence_recovery !== "0") && <p> <span className='text-green-500 font-light'>{item.essence_recovery}</span> Essence Recovering   </p>}
                    { (item.vitality && item.vitality !== "0") && <p> <span className='text-green-500 font-light'>{item.vitality}</span> Vitality   </p>}
                    { (item.range && item.range !== "0") && <p> <span className='text-green-500 font-light'>{item.range}</span> Range   </p>}
                    { (item.damage && item.damage !== "0") && <p> <span className='text-green-500 font-light'>{item.damage}</span> Damage   </p>}
                    { (item.armor && item.armor !== "0") && <p> <span className='text-green-500 font-light'>{item.armor}</span> Armor   </p>}
                    { (item.magic_armor && item.magic_armor !== "0") && <p> <span className='text-green-500 font-light'>{item.magic_armor}</span> Magic Armor   </p>}
                    { (item.essence && item.essence !== "0") && <p> <span className='text-green-500 font-light'>{item.essence}</span> Essence   </p>}
                    { (item.agility && item.agility !== "0") && <p> <span className='text-green-500 font-light'>{item.agility}</span> Agility   </p>}
                    { (item.hit_chance && item.hit_chance !== "0") && <p> <span className='text-green-500 font-light'>{item.hit_chance}</span> Hit Chance   </p>}
                    { (item.evasion && item.evasion !== "0") && <p> <span className='text-green-500 font-light'>{item.evasion}</span> Evasion   </p>}
                    { (item.hit_rate && item.hit_rate !== "0") && <p> <span className='text-green-500 font-light'>{item.hit_rate}</span> Hit Rate   </p>}
                    { (item.movement && item.movement !== "0") && <p> <span className='text-green-500 font-light'>{item.movement}</span> Movement   </p>}
                    { (item.ammo && item.ammo !== "0") && <p> <span className='text-green-500 font-light'>{item.ammo}</span> Ammo   </p>}
                    { (item.shield && item.shield !== "0") && <p> <span className='text-green-500 font-light'>{item.shield}</span> Shield   </p>}                    
                </div>
                <div className='px-4'>
                    <p>Weight: <span className='text-orange-500 font-light'>{(item.weight && item.weight !== 0 ) ? item.weight?.toString() : "0"}</span> </p>
                    {((item.dexterity_requirement !==0) || 
                        (item.strength_requirement!==0) || 
                        (item.mind_requirement!==0) || 
                        (item.faith_requirement!==0)) && <p>Requires:</p>}
                    <div className='px-6 text-orange-500 font-light text-sm'>
                        {(item.dexterity_requirement !== 0) && <p><span>{item.dexterity_requirement?.toString()} Dexterity</span></p>}
                        {(item.strength_requirement !== 0) && <p><span>{item.strength_requirement?.toString()} Dexterity</span></p>}
                        {(item.mind_requirement !== 0) && <p><span>{item.mind_requirement?.toString()} Dexterity</span></p>}
                        {(item.faith_requirement !== 0) && <p><span>{item.faith_requirement?.toString()} Dexterity</span></p>}
                    </div>
                </div> 
            </p>
            </div>
            <div>
                {editable && <h5 className="invisible group-hover:visible mx-1 rounded-lg px-3 py-1 bg-black border hover:bg-purple-300/10 border-yellow-900/50
                                    active:translate-y-1 text-xl cursor-pointer text-yellow-200/70 " onClick={deleteItem}><IoTrashOutline/></h5>}
            </div>
        </div>
    )
}
