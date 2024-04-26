'use client'

import React, { Suspense, useEffect, useState } from 'react'
import ItemList from './ItemList'
import NewItemDialog from './NewItemDialog'
import OptionSelectionList from '@/app/_components/OptionSelectionList'

const ItemTypes = [
    {name:"OTHER", id: 1},
    {name:"CURVED_SWORD_1H", id: 2},
    {name:"CURVED_SWORD_2H", id: 3},
    {name:"STRAIGHT_SWORD_1H", id: 4},
    {name:"STRAIGHT_SWORD_2H", id: 5},
    {name:"AXE_1H", id: 6},
    {name:"AXE_2H", id: 7},
    {name:"HAMMER_1H", id: 8},
    {name:"HAMMER_2H", id: 9},
    {name:"SPEAR_1H", id: 10},
    {name:"SPEAR_2H", id: 11},
    {name:"JAVELIN_1H", id: 12},
    {name:"STAFF_1H", id: 13},
    {name:"STAFF_2H", id: 14},
    {name:"BOW_2H", id: 15},
    {name:"CROSSBOW_2H", id: 16},
    {name:"DAGGER_1H", id: 17},
    {name:"SMALL_SHIELD", id: 18},
    {name:"MEDIUM_SHIELD", id: 19},
    {name:"LARGE_SHIELD", id: 20},
    {name:"LIGHT_ARMOR", id: 21},
    {name:"MEDIUM_ARMOR", id: 22},
    {name:"HEAVY_ARMOR", id: 23},
    {name:"AMULET", id: 24},
    {name:"TRINKET", id: 25},
    {name:"RING", id: 26},
    {name:"CONSUMABLE", id: 27},
    {name:"MATERIAL", id: 28},
    {name:"KEY", id: 29}
]

export default function ItemsPage() {
    const [objectType, setObjectType] = useState<any>(null)
    const [queryParams, setQueryParams] = useState<any>({})

    useEffect(() => {
        if (objectType) {
            setQueryParams(`&by_type=${objectType.name}`)
        }
    }, [objectType])

    const HandleObjectTypeSelection = (selection: any) => {
        setObjectType(selection)
    }

    return (
    <main className="items-center justify-between p-24">
        <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left text-yellow-200/70 ">
            <h2 className={`mb-3 text-4xl font-medium`}>
                Items{' '}
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
        <div className='flex justify-between'>
            <NewItemDialog styles="group rounded-lg border border-transparent px-3 py-2 transition-colors border-4 hover:dark:dark:border-yellow-900/50 hover:bg-black 
                                    hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 text-yellow-200/70"/>
            <OptionSelectionList options={ItemTypes} queryKey={'ItemTypes'} onSelectionChange={HandleObjectTypeSelection} style='w-60' />
            <div></div>
        </div>
        <Suspense fallback={<div className="text-green-700">Loading...</div>}>
            <ItemList queryParams={queryParams} />
        </Suspense>
    </main>
    )
}
