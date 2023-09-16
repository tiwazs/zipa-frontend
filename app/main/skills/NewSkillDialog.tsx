'use client'

import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoAddSharp } from 'react-icons/io5'
import { useQueryClient } from 'react-query';

interface CreateEffectFormOptions {
    name: string;
    description: string;
    conditions?: string;
    physical_damage?: string;
    magical_damage?: string;
    healing?: string;
    vitality_recovery?: string;
    essence_recovery?: string;
    range?: string;
    area_of_effect?: string;
    essence_cost?: string;
    vitality_cost?: string;
    cooldown?: string;
    channeled?: string;
    projectile?: string;
    target?: string;
    skill_on?: string;
    skill_types?: string[];
    effects?: string[];
    summons?: string[];
}

interface NewEffectDialogProps {
    styles?: string;
}

export default function NewEffectDialog({styles}: NewEffectDialogProps) {
    let [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<CreateEffectFormOptions>();
    
    const queryClient = useQueryClient();
    
    const onSubmit: SubmitHandler<CreateEffectFormOptions> = async data => {
        console.log(data);

        // Not setting the content type. aparently the browser will do that for us, including the boundary
        try{
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skills/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(data)
          });
          console.log(`Response: ${JSON.stringify(response)}`);
          setIsOpen(false);

          // TODO: Remove this once use hook is fixed
          //router.refresh();        
          queryClient.invalidateQueries('skills');
      }catch(e){
          console.log(`Error: ${e}`);
          setIsOpen(false);
      }
    };

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className="inset-0 justify-center">
        <button
          type="button"
          onClick={openModal}
          className={`${styles}`}
        >
          <IoAddSharp className='text-2xl font-thin text-gray-400"' />
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left shadow-xl transition-all 
                                            group border-transparent border-4 dark:dark:border-yellow-900/50 text-yellow-200/70 dark:bg-[url('/bg1.jpg')]">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-yellow-200/70"
                  >
                    New Skill
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-400">
                      Create a new skill that can be used by units. skills can be used by units to attack, heal, buff, debuff, etc. they also
                      can be magical, physical and can be used to target a variety of targets.
                    </p>
                    <form className='rounded-2xl flex-row justify-between ' onSubmit={handleSubmit(onSubmit)}>
                        <div className='mx-4'>
                            <div>
                                <input 
                                    {...register("name", { required: true })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("description", { required: true })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="text"
                                    name="description"
                                    placeholder="Description"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("conditions", { required: false })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="text"
                                    name="conditions"
                                    placeholder="Conditions"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("physical_damage", { required: false })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="text"
                                    name="physical_damage"
                                    placeholder="Physical Damage"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("magical_damage", { required: false })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="text"
                                    name="magical_damage"
                                    placeholder="Magical Damage"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("healing", { required: false })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="text"
                                    name="healing"
                                    placeholder="Healing"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("vitality_recovery", { required: false })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="text"
                                    name="vitality_recovery"
                                    placeholder="Vitality Recovery"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("essence_recovery", { required: false })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="text"
                                    name="essence_recovery"
                                    placeholder="Essence Recovery"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("range", { required: false })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="text"
                                    name="range"
                                    placeholder="Range"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("area_of_effect", { required: false })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="text"
                                    name="area_of_effect"
                                    placeholder="Area of Effect"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("essence_cost", { required: false })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="text"
                                    name="essence_cost"
                                    placeholder="Essence Cost"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("vitality_cost", { required: false })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="text"
                                    name="vitality_cost"
                                    placeholder="Vitality Cost"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("cooldown", { required: false })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="text"
                                    name="cooldown"
                                     placeholder="Cooldown"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("channeled", { required: false })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="text"
                                    name="channeled"
                                    placeholder="Channeled"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("projectile", { required: false, valueAsNumber: true })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="number"
                                    name="projectile"
                                    placeholder="Projectile"
                                />                                
                            </div>
                            <div>
                                <select 
                                    {...register("target", { required: false })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    name="target"
                                    placeholder="ENEMY"
                                >       
                                    <option value="NONE">NONE</option>
                                    <option value="SELF">SELF</option>
                                    <option value="ALLY">ALLY</option>
                                    <option value="ALLY_SUMMON">ALLY_SUMMON</option>
                                    <option value="ALLY_AROUND">ALLY_AROUND</option>
                                    <option value="ALLY_EXCEPT_SELF">ALLY_EXCEPT_SELF</option>
                                    <option value="ENEMY">ENEMY</option>
                                    <option value="ENEMY_SUMMON">ENEMY_SUMMON</option>
                                    <option value="ENEMY_AROUND">ENEMY_AROUND</option>
                                    <option value="ANY">ANY</option>
                                    <option value="ANY_AROUND">ANY_AROUND</option>
                                    <option value="ANY_EXCEPT_SELF">ANY_EXCEPT_SELF</option>
                                    <option value="ANY_SUMMON">ANY_SUMMON</option>
                                    <option value="POINT">POINT</option>
                                    <option value="POINT_ENEMY">POINT_ENEMY</option>
                                    <option value="POINT_ALLY">POINT_ALLY</option>
                                    <option value="AREA">AREA</option>
                                    <option value="AREA_ENEMY">AREA_ENEMY</option>
                                    <option value="AREA_ALLY">AREA_ALLY</option>
                                </select>
                            </div>
                            <div>
                                <select 
                                    {...register("skill_on", { required: false })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    name='skill_on'
                                    placeholder="INSTANT"
                                >
                                    <option value="INSTANT">INSTANT</option>
                                    <option value="OVER_TIME">OVER_TIME</option>
                                    <option value="DURING_CHANNEL">DURING_CHANNEL</option>
                                    <option value="AFTER_CHANNEL">AFTER_CHANNEL</option>
                                    <option value="DELAYED">DELAYED</option>
                                </select>

                            </div>
                        </div>
                        <div className="mt-4 flex justify-between">
                            <button
                            type="button"
                            className="inline-flex justify-center rounded-md bg-black hover:bg-purple-300/10 border dark:border-yellow-900/50 px-4 py-2 text-sm font-medium text-gray-400  focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2"
                            onClick={closeModal}
                            >
                            Cancel
                            </button>
                            <div className='inline-flex justify-center hover:text-gray-200 border dark:border-yellow-900/50 shadow-md rounded-lg px-4 py-2 bg-black hover:bg-purple-300/10
                                                cursor-pointer'>
                                    <input type="submit" value="Create" className='text-gray-400 text-sm cursor-pointer'/>
                            </div>
                        </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
