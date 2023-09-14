'use client'

import React, { Suspense, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AddUnitDialog from './AddUnitDialog';
import UnitCombatCard from './UnitCombatCard';

export default function UnitsPage() {
    const router = useRouter();
    const [unitIdCounter, setUnitIdCounter] = React.useState(0);
    const [units, setUnits] = React.useState<any[]>([]);
    // Fucking library. LET ME ADD THE GOD DAMMED USER ID TO THE SESSION TO MAKE REQUESTS
    const { data: session, status }:{update:any, data:any, status:any} = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login');
        },
    })

    const HandleAddUnit = (unit: any) => {
        let unitDict = {
            combat_id: unitIdCounter + 1,
            unit: unit
        }
        setUnitIdCounter(unitIdCounter+1)

        let unitList = units
        unitList.push(unitDict)
        setUnits(unitList)
    }

    const HandleRemoveUnit = (combat_id: number) => {
        let unitList = units.filter((unit)=> unit.combat_id!==combat_id )
        setUnits(unitList)
        console.log(units)
    }

    if(status === "loading") return <div className="text-green-700">Loading...</div>    
    return (
    <main className="items-center justify-between p-24">
        <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left text-yellow-200/70 ">
            <h2 className={`mb-3 text-4xl font-medium`}>
                Combat Calculator{' '}
                <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                </span>
            </h2>
        </div>

        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial
           before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 
           after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent 
           before:dark:to-purple-700 before:dark:opacity-10 after:dark:from-purple-900 after:dark:via-[#9101ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        </div>
        <div>
            <AddUnitDialog  user_id={session?.user_id} 
                            onAddClick={HandleAddUnit}
                            styles="group rounded-lg border border-transparent px-3 py-2 transition-colors border-4 hover:dark:dark:border-yellow-900/50 hover:bg-black 
                                        hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 text-yellow-200/70"/>
        </div>

        <div className='flex space-x-2'>
            {units && units.map((unit) => (
                <UnitCombatCard key={unit.combat_id} combat_id={unit.combat_id} unit={unit.unit} onRemoveClick={HandleRemoveUnit} />
            ))}
        </div>
    </main>
    )
}
