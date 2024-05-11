'use client'

import React, { Suspense, useEffect } from 'react'
import SpecializationList from './SpecializationsList'
import NewSpecializationDialog from './NewSpecializationDialog'
import OptionSelection from '../../_components/OptionSelection'

export default function SpecializationsPage() {
    let [baseUrl, setBaseUrl] = React.useState<string>('/specializations/')
    let [race, setRace] = React.useState<any>(undefined)
    let [culture, setCulture] = React.useState<any>(undefined)
    let [belief, setBelief] = React.useState<any>(undefined) 
    
    useEffect(() => {
        let culture_section = culture ? `culture_id=${culture.id}&` : ''
        let belief_section = belief ? `belief_id=${belief.id}&` : ''
        let either_section = culture_section || belief_section ? 'group?' : '?'

        setBaseUrl(`/specializations/${either_section}${culture_section}${belief_section}`)

        
    }, [race, culture, belief])
    
    const handleRaceChange = (race: any) => {
        setRace(race)
    }

    const handleCultureChange = (culture: any) => {
        setCulture(culture)
    }

    const handleBeliefChange = (belief: any) => {
        setBelief(belief)
    }
    
    return (
    <main className="items-center justify-between p-24">
        <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left text-yellow-200/70 ">
            <h2 className={`mb-3 text-4xl font-medium`}>
                Unit Specializations{' '}
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
            <NewSpecializationDialog styles="group rounded-lg border border-transparent px-3 py-2 transition-colors border-4 hover:dark:dark:border-yellow-900/50 hover:bg-black 
                                    hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 text-yellow-200/70"/>
            <div className='w-full mx-40 flex  justify-between'>
                <div className='flex items-center justify-between'>
                    <p className='text-yellow-500/80 font-medium'>Race:</p>
                    <OptionSelection endpoint='/races/' queryKey='races' onSelectionChange={handleRaceChange} style='z-40' />
                </div>

                {/* Culture Selection */}
                <div className='flex items-center justify-between'>
                    <p className='text-yellow-500/80 font-medium'>Culture:</p>
                    {race && <OptionSelection endpoint={`/cultures/?by_race_id=${race?.id}`} queryKey='cultures' onSelectionChange={handleCultureChange} style='z-30' />}
                </div>

                {/* Belief Selection */}
                <div className='flex items-center justify-between'>
                    <p className='text-yellow-500/80 font-medium'>Belief:</p>
                    {race && <OptionSelection endpoint={`/beliefs/?by_race_id=${race?.id}`} queryKey='beliefs' onSelectionChange={handleBeliefChange} style='z-20' />}
                </div>
            </div>
        </div>
        <Suspense fallback={<div className="text-green-700">Loading...</div>}>
            <SpecializationList url={`${baseUrl}include_traits=true&include_skills=true&include_items=true`} />
        </Suspense>
    </main>
    )
}
