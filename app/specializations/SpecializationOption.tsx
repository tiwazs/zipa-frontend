import React from 'react'
import { useQueryClient } from 'react-query';
import { IoTrashOutline } from 'react-icons/io5'
import Link from 'next/link';
import StatsSummary from './StatsSummary';
import { paintTier, writeTier } from './[specializationId]/DetailedSpecializationChart';

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
                <p className='my-1 text-gray-100 '>{specialization.description}</p>
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
                {/* Specialization Skills*/}
                { (specialization.skills && specialization.skills.length > 0) && 
                        <p>
                            Effects:
                        </p>}
                        {specialization.skills.map((skill: any) => {
                            return (
                            <div key={skill.skill.id} className='px-4 font-light'>
                                <p>
                                    <Link href={`/skills/${skill.skill.id}`}><span className='text-yellow-400 font-normal'>{skill.skill.name}</span></Link>
                                </p>
                                <p>
                                    <span className='px-4 text-gray-400 font-light'>{skill.skill.description}</span>
                                </p>
                                <div className='px-4 flex space-x-2'>
                                    <p className='font-light text-gray-400 text-sm'>CD: <span className='text-purple-400'> {skill.cooldown}</span> T</p>
                                    <p className='font-light text-gray-400 text-sm'>Cost: <span className='text-blue-400'> {skill.essence_cost}</span> P</p>
                                </div>
                            </div>
                            )
                        })}
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
