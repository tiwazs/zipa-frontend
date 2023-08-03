import Link from 'next/link';
import React from 'react'

interface SkillSummonCardProps {
    summon: any;
}

export default function SkillSummonCard({ summon }: SkillSummonCardProps) {
    return (
        <div className='px-4 font-light'>
            <p>
                <Link href={`/summons/${summon.unit.id}`}><span className='text-yellow-400 font-normal'>{summon.unit.name}</span></Link> lasting <span className='text-purple-400'>{summon.duration}</span> T
            </p>
            <p>
                <span className='px-4 text-gray-400 font-light'>{summon.unit.description}</span>
            </p>
        </div>
    )
}
