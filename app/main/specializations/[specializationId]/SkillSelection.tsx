import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
//import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import {AiOutlineCheck, AiOutlineDown } from 'react-icons/ai'
import { useQuery, useQueryClient } from 'react-query'
import { SubmitHandler, useForm } from 'react-hook-form'

const getSkills = async () => {
  try{
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skills/`, {
          method: 'GET'
          })
      return await response.json();
  }catch(e){
      console.log(`Error: ${e}`);
      return [];
  }
}

interface SkillSelectionProps {
    specializationId: string;
}

export default function SkillSelection({specializationId}: SkillSelectionProps) {
    const query = useQuery(["skills", getSkills], getSkills);
    const [selected, setSelected] = useState<any>(undefined)
    const [essence_cost, setEssenceCost] = useState<string>("0")
    const [cooldown, setCooldown] = useState<string>("0")

    const queryClient = useQueryClient();

    const onAddSkill = async () => {
      // Not setting the content type. aparently the browser will do that for us, including the boundary
      try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/specializations/add_skill/${specializationId}?skill_id=${selected.id}`, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json'
            },
        });
        console.log(`Response: ${JSON.stringify(response)}`);
      
        queryClient.invalidateQueries('specialization');
    }catch(e){
        console.log(`Error: ${e}`);
    }
  };
    
    // List of the coded available groups
    if(query.isLoading) return <div className="text-green-700">Loading...</div>

  return (
    <div className='flex flex-col items-center'>
      <div className="top-16 h-56 w-full overflow-auto">
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-black hover:bg-purple-300/10 text-yellow-200/70 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none
                           focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 
                           focus-visible:ring-offset-orange-300 sm:text-sm ">
              <span className="block truncate">{selected ? selected.name : "Select an Skill"}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <AiOutlineDown
                  className="h-4 w-4 bg-purple-300/10 text-xs"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-black py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {query.data.map((skill: any) => (
                  <Listbox.Option
                    key={skill.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-purple-400/30 text-yellow-200/70' : 'text-gray-300'
                      }`
                    }
                    value={skill}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {skill.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-yellow-200/70">
                            <AiOutlineCheck className="h-4 w-4" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
      {/* Form */}
      <div className='flex flex-col w-full'>
        <div className='flex items-center'>
            <h1>Essence Cost</h1>
            <input className='w-full my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                   value={essence_cost} type="text" id="essence_cost" onChange={(e)=>{setEssenceCost(e.target.value)}}/>
        </div>
        <div className='flex items-center'>
        <h1>Cooldown</h1>
            <input className='w-full my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                   value={cooldown} type="text" id="cooldown" onChange={(e)=>{setCooldown(e.target.value)}}/>
        </div>
      </div>
      <button
          type="button"
          className="w-full inline-flex justify-center rounded-md bg-black hover:bg-purple-300/10 border dark:border-yellow-900/50 px-4 py-2 text-sm font-medium text-gray-400
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2"
          onClick={onAddSkill}
          >
          Add
      </button>
    </div>
  )
}
