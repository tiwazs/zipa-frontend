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
    rarity?: string;
    is_weapon?: boolean;
    object_type?: string;
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
    dexterity_requirement?: number;
    strength_requirement?: number;
    mind_requirement?: number;
    faith_requirement?: number;
    weight?: number;
    skills?: string[];
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
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/`, {
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
          queryClient.invalidateQueries('items');
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
                    New Item
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-400">
                      Create a new item. items can improve the stats of units, or be used to cast skills, magic or even summon units. some are fairly common
                      while others are very rare and powerful.
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
                                <select 
                                    {...register("rarity", { required: false })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    name='rarity'
                                    placeholder="COMMON"
                                >
                                    <option value="COMMON">COMMON</option>
                                    <option value="UNCOMMON">UNCOMMON</option>
                                    <option value="RARE">RARE</option>
                                    <option value="EPIC">EPIC</option>
                                    <option value="LEGENDARY">LEGENDARY</option>
                                </select>

                            </div>
                            <div>
                                <input 
                                    {...register("is_weapon", { required: false, valueAsNumber: true })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="number"
                                    name="is_weapon"
                                    placeholder="is_weapon"
                                />                                
                            </div>
                            <div>
                                <select 
                                    {...register("object_type", { required: true })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    name='object_type'
                                    placeholder="CURVED_SWORD_1H"
                                >
                                    <option value="OTHER">OTHER</option>
                                    <option value="CURVED_SWORD_1H">CURVED_SWORD_1H</option>
                                    <option value="CURVED_SWORD_2H">CURVED_SWORD_2H</option>
                                    <option value="STRAIGHT_SWORD_1H">STRAIGHT_SWORD_1H</option>
                                    <option value="STRAIGHT_SWORD_2H">STRAIGHT_SWORD_2H</option>
                                    <option value="AXE_1H">AXE_1H</option>
                                    <option value="AXE_2H">AXE_2H</option>
                                    <option value="HAMMER_1H">HAMMER_1H</option>
                                    <option value="HAMMER_2H">HAMMER_2H</option>
                                    <option value="SPEAR_1H">SPEAR_1H</option>
                                    <option value="SPEAR_2H">SPEAR_2H</option>
                                    <option value="JAVELIN_1H">JAVELIN_1H</option>
                                    <option value="STAFF_1H">STAFF_1H</option>
                                    <option value="STAFF_2H">STAFF_2H</option>
                                    <option value="BOW_2H">BOW_2H</option>
                                    <option value="CROSSBOW_2H">CROSSBOW_2H</option>
                                    <option value="DAGGER_1H">DAGGER_1H</option>
                                    <option value="SMALL_SHIELD">SMALL_SHIELD</option>
                                    <option value="MEDIUM_SHIELD">MEDIUM_SHIELD</option>
                                    <option value="LARGE_SHIELD">LARGE_SHIELD</option>
                                    <option value="LIGHT_ARMOR">LIGHT_ARMOR</option>
                                    <option value="MEDIUM_ARMOR">MEDIUM_ARMOR</option>
                                    <option value="HEAVY_ARMOR">HEAVY_ARMOR</option>
                                    <option value="AMULET">AMULET</option>
                                    <option value="TRINKET">TRINKET</option>
                                    <option value="RING">RING</option>
                                    <option value="CONSUMABLE">CONSUMABLE</option>
                                    <option value="MATERIAL">MATERIAL</option>
                                    <option value="KEY">KEY</option>                                    
                                </select>

                            </div>
                            <div>
                                <input 
                                    {...register("magic_effectiveness", { required: false })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="text"
                                    name="magic_effectiveness"
                                    placeholder="Magic Effectiveness"
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
                                    {...register("dexterity_requirement", { required: false, valueAsNumber: true })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="number"
                                    name="dexterity_requirement"
                                    placeholder="dexterity_requirement"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("strength_requirement", { required: false, valueAsNumber: true })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="number"
                                    name="strength_requirement"
                                    placeholder="strength_requirement"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("mind_requirement", { required: false, valueAsNumber: true })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="number"
                                    name="mind_requirement"
                                    placeholder="mind_requirement"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("faith_requirement", { required: false, valueAsNumber: true })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="number"
                                    name="faith_requirement"
                                    placeholder="faith_requirement"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("weight", { required: false, valueAsNumber: true })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="number"
                                    name="weight"
                                    placeholder="weight"
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
