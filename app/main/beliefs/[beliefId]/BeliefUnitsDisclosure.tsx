import SpecializationOption from '@/app/_components/SpecializationOption';
import { paintTier, writeTier } from '@/app/_libs/text_paint_methods';

import { Disclosure } from '@headlessui/react'
//import { AiOutlineDown } from '@heroicons/react/20/solid'
import { AiOutlineDown } from 'react-icons/ai'

interface DisclosureInformation {
    title: string | number;
    information: any;
}

interface BeliefUnitsDisclosureProps {
    beliefId: string;
    disclosureInformationList: DisclosureInformation[];
}

export default function BeliefUnitsDisclosure({ beliefId, disclosureInformationList }: Readonly<BeliefUnitsDisclosureProps>) {

  if (!disclosureInformationList) return <h2>Loading...</h2>
  return (
    <div className="w-full">
      <div className="mx-auto w-full rounded-2xl bg-[url('/bg1.jpg')] p-2">

        {/* Disclosure Options*/}
        {disclosureInformationList.map((disclosureInformation, index) => (
          <div key={index} className='my-2'>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex items-center w-full justify-between rounded-lg bg-black text-yellow-200/70 px-4 py-2 text-left text-sm font-medium 
                                              hover:bg-purple-300/10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 
                                              focus-visible:ring-opacity-75">
                  <div></div>
                  {/* Disclosure Title */}
                  <span className={`text-2xl font-extrabold font-serif ${(typeof(disclosureInformation.title) === "number") ? paintTier(disclosureInformation.title) : disclosureInformation.title}`}>
                    {(typeof(disclosureInformation.title) === "number") ? writeTier(disclosureInformation.title) : disclosureInformation.title}
                  </span>
                  <AiOutlineDown className={`${ open ? 'rotate-180 transform' : ''} h-5 w-5 text-yellow-200/70`} />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  {/*Disclosure Units go Here*/}
                  {disclosureInformation.information.map((unit: any) => (
                    <SpecializationOption 
                                        key={unit.id}
                                        id={unit.id}
                                        name={unit.name}
                                        description={unit.description}
                                        vitality={unit.vitality}
                                        strength={unit.strength}
                                        dexterity={unit.dexterity}
                                        mind={unit.mind}
                                        faith={unit.faith}
                                        armor={unit.armor}
                                        magic_armor={unit.magic_armor}
                                        essence={unit.essence}
                                        agility={unit.agility}
                                        hit_chance={unit.hit_chance}
                                        evasion={unit.evasion}
                                        hit_rate={unit.hit_rate}
                                        movement={unit.movement}
                                        weapon_proficiencies={unit.weapon_proficiencies}
                                        tier={unit.tier}
                                        skills={unit.skills}
                                        items={unit.items}
                                        traits={unit.traits}
                                        removeEndpoint={`/beliefs/remove_unit/${beliefId}?unit_id=`}
                                        endpointMethod='PUT'
                                        queryInvalidateKey='beliefSpecializations'
                                        styles={"group border-4 border-transparent px-5 py-2 transition-colors hover:border-purple-500 hover:bg-purple-300 hover:dark:border-yellow-700/50 hover:dark:bg-purple-900/20 \
                                                    dark:border-yellow-900/50  my-2 rounded-md \
                                                    dark:bg-[url('/bg1.jpg')]"} />
                  ))}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          </div>
        ))}
      </div>
    </div>
  )
}
