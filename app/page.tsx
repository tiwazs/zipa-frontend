import Image from 'next/image'
import Link from 'next/link'
import MainOptionCard from './mainOptionCard'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        <MainOptionCard title="General" description="General description for battle, units spells and combat rules" link="/general" />
        <MainOptionCard title="Factions" description="Playable factions, their cultures, traits, units and more" link="/factions" />
        <MainOptionCard title="Units" description="All playable units for all factions" link="/units" />
        <MainOptionCard title="Habilities" description="All The available abilities" link="/abilities" />
        <MainOptionCard title="Items" description="All the available items" link="/items" />
      </div>
    </main>
  )
}
