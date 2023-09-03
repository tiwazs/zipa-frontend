import DisplayValue from '@/app/_components/DisplayValue';
import { paintRarity } from '@/app/_libs/text_paint_methods';
import Link from 'next/link';
import React from 'react'
import { IoTrashOutline } from 'react-icons/io5';
import { useQueryClient } from 'react-query';

interface ItemCardProps {
    OwnerItem: any;
    deleteEndpoint: string;
    invaildateQueryKey: string;
    editable: boolean;
}

export default function ItemCard({ OwnerItem, deleteEndpoint, invaildateQueryKey, editable }: ItemCardProps) {
    const item = OwnerItem.item;
    const queryClient = useQueryClient();

    const deleteItem = async () => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${deleteEndpoint}${item.id}`, {
                method: 'PUT',
            });

            console.log(`Response: ${JSON.stringify(response)}`);

            queryClient.invalidateQueries(invaildateQueryKey);
        }catch(e){
            console.log(`Error: ${e}`);
        }
    };

    return (
        <div className='group my-2 px-4 py-2 font-light dark:border-2 rounded-md dark:border-yellow-900/50 flex items-center justify-between '>
            <div>
            <div className='flex items-center space-x-2'>
                <img src={`${process.env.NEXT_PUBLIC_API_URL}/static/items/${OwnerItem.item.id}.jpg`} alt="" className='w-12 h-12 rounded-md border-2 border-gray-500/60 my-2' />
                <p>
                    <Link href={`/items/${OwnerItem.item.id}`}><span className='text-yellow-400 font-normal'>{item.name}</span></Link>
                    <div className={`px-4 flex space-x-1 text-xs italic font-light ${paintRarity(item.rarity)}`}>
                        <h4>{item.rarity}</h4>
                        <h4>|</h4>
                        <h4>{item.object_type}</h4>
                    </div>
                </p>
            </div>
            <p>
                <span className='px-4 text-gray-400 font-light'>{item.description}</span>
                <div className='px-4 flex flex-col font-extralight italic '>
                    { (item.conditions && item.conditions !== "0") && <p>Conditions: <span className='text-orange-500 font-light'>{item.conditions}</span> </p>}
                    <DisplayValue value={item.physical_damage} after_text=' Physical Damage' />
                    <DisplayValue value={item.magical_damage} after_text=' Magical Damage' />
                    <DisplayValue value={item.healing} after_text=' Healing Power' />
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
                <div className='px-4'>
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
            </p>
            </div>
            <div>
                {editable && <h5 className="invisible group-hover:visible mx-1 rounded-lg px-3 py-1 bg-black border hover:bg-purple-300/10 border-yellow-900/50
                                    active:translate-y-1 text-xl cursor-pointer text-yellow-200/70 " onClick={deleteItem}><IoTrashOutline/></h5>}
            </div>
        </div>
    )
}
