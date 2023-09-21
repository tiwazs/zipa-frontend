import Link from 'next/link';
import React from 'react'
import { IoTrashOutline } from 'react-icons/io5';

interface EffectCombatCardProps {
    effect: any;
    onHandleRemoveEffectClick?: any;
    styles?: string;
}

function EffectCombatCard({effect, onHandleRemoveEffectClick}: EffectCombatCardProps) {

    const HandleRemoveEffectClick = () => {
        onHandleRemoveEffectClick(effect)
    }

    return (
        <div className='mx-2 font-extralight flex items-center justify-between'>
            <div className='flex items-center space-x-'>
                <img src={`${process.env.NEXT_PUBLIC_API_URL}/static/effects/${effect.effect.id}.jpg`} alt="" className='w-8 h-8 rounded-md border-2 border-gray-500/60 ' />
                <h3>
                    <Link href={`/main/effects/${effect.effect.id}`}><span className='text-yellow-400'>{effect.effect.name}</span></Link>
                </h3>
            </div>
            <div className='flex items-center'>
                <h3 className='text-blue-500 font-normal'>{effect.duration} T</h3>
                <h5 className="invisible group-hover:visible mx-1 rounded-lg px-3 py-1 bg-black border hover:bg-purple-300/10 border-yellow-900/50
                        active:translate-y-1 text-sm cursor-pointer text-yellow-200/70 " onClick={HandleRemoveEffectClick}><IoTrashOutline/></h5>
            </div>
        </div>
    )
}

export default EffectCombatCard