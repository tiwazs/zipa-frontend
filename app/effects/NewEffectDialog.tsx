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
    magic_effectiveness?: string;
    physical_damage?: string;
    magical_damage?: string;
    healing?: string;
    vitality_recovery?: string;
    essence_recovery?: string;
    vitality?: string;
    range?: string;
    damage?: string;
    armor?: string;
    magic_armor?: string;
    essence?: string;
    agility?: string;
    hit_chance?: string;
    evasion?: string;
    hit_rate?: string;
    movement?: string;
    ammo?: string;
    shield?: string;
    barrier?: number;
    incoming_physical_damage?: string;
    incoming_magical_damage?: string;
    max_stack?: number;
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
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/effects/`, {
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
          queryClient.invalidateQueries('effects');
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
                    New Effect
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-400">
                      Upload face Effects for the profile. this allows the face recognition app to identify the profile.
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
                                    placeholder="description"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("magic_effectiveness", { required: false })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="text"
                                    name="magic_effectiveness"
                                    placeholder="Magic Power"
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
                                    {...register("vitality", { required: false })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="text"
                                    name="vitality"
                                    placeholder="Vitality"
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
                                    {...register("damage", { required: false })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="text"
                                    name="damage"
                                    placeholder="Damage"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("armor", { required: false })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="text"
                                    name="armor"
                                    placeholder="Armor"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("magic_armor", { required: false })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="text"
                                    name="magic_armor"
                                    placeholder="Magic Armor"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("essence", { required: false })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="text"
                                    name="essence"
                                    placeholder="Essence"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("agility", { required: false })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="text"
                                    name="agility"
                                    placeholder="Agility"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("hit_chance", { required: false })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="text"
                                    name="hit_chance"
                                    placeholder="Hit Chance"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("evasion", { required: false })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="text"
                                    name="evasion"
                                    placeholder="Evasion"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("hit_rate", { required: false })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="text"
                                    name="hit_rate"
                                    placeholder="Hit Rate"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("movement", { required: false })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="text"
                                    name="movement"
                                    placeholder="Movement"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("ammo", { required: false })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="text"
                                    name="ammo"
                                    placeholder="Ammo"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("shield", { required: false })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="text"
                                    name="shield"
                                    placeholder="Shield"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("barrier", { required: false, valueAsNumber: true })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="number"
                                    name="barrier"
                                    placeholder="Barrier"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("incoming_physical_damage", { required: false })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="text"
                                    name="incoming_physical_damage"
                                    placeholder="Incoming Physical Damage"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("incoming_magical_damage", { required: false })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="text"
                                    name="incoming_magical_damage"
                                    placeholder="Incoming Magical Damage"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("max_stack", { required: false, valueAsNumber: true })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="number"
                                    name="max_stack"
                                    placeholder="Max Stack"
                                />                                
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
