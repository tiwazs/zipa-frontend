'use client'

import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoAddSharp } from 'react-icons/io5'
import { useQueryClient } from 'react-query';  
import ObjectTypeSelection from './ObjectTypeSelection';

interface CreateSpecializationFormOptions {
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
    skills?: string[];
    items?: string[];
    traits?: string[];
}

interface NewSpecializationDialogProps {
    styles?: string;
}

export interface OjbectOptionType{
    label: string;
    value: string;
    realValue: string;
}

export const opbjectTypeOptions:OjbectOptionType[]  = ['CURVED_SWORD_1H','CURVED_SWORD_2H','STRAIGHT_SWORD_1H','STRAIGHT_SWORD_2H','AXE_1H','AXE_2H','HAMMER_1H','HAMMER_2H','SPEAR_1H','SPEAR_2H','JAVELIN_1H','STAFF_1H','STAFF_2H','BOW_2H','CROSSBOW_2H','DAGGER_1H','OTHER'].map(
  (item) => ({ label: item, value: item.replace(/_/g," "), realValue: item })
);

function ObjectTypeSelectedList({removeObjectType,selectedObjectTypes, styles}: {removeObjectType: any, selectedObjectTypes: OjbectOptionType[], styles?:string}) {

    function RemoveObjectType(selectedEvent: OjbectOptionType){
        removeObjectType(selectedEvent);
    }

    return (
      <div className={`${styles}`}>
        {selectedObjectTypes.map((object: any) => (
          <div key={object.label} className="border-2 border-yellow-500/50 rounded-xl w-18 h-18 p-1 bg-opacity-50 bg-black">
            <div className='flex flex-col items-end' onClick={()=>RemoveObjectType(object)}>
              <button className='text-xs'>
                x
              </button>
            </div>
            <span className="block font-light text-xs text-yellow-200/70 ">
              {object.value}
            </span>
          </div>
        ))}
      </div>
    )
}


export default function NewSpecializationDialog({styles}: NewSpecializationDialogProps) {
    let [isOpen, setIsOpen] = useState(false);
    let [objectTypesSelected, setObjectTypesSelected] = useState<OjbectOptionType[]>([]);
    let [objectTypesRemaining, setObjectTypesRemaining] = useState<OjbectOptionType[]>(opbjectTypeOptions);
    let [weaponProficiencies, setWeaponProficiencies] = useState<string>("");
    const { register, handleSubmit, watch, formState: { errors } } = useForm<CreateSpecializationFormOptions>();
    
    const queryClient = useQueryClient();
    
    const onSubmit: SubmitHandler<CreateSpecializationFormOptions> = async data => {
        console.log(data);

        // Not setting the content type. aparently the browser will do that for us, including the boundary
        try{
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/specializations/`, {
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
          queryClient.invalidateQueries('specializations');
      }catch(e){
          console.log(`Error: ${e}`);
          setIsOpen(false);
      }
    };

    function handleObjectTypeAdded(selectedObjectType: OjbectOptionType) {
        // Remove the selected object type from the remaining options
        setObjectTypesRemaining(
            objectTypesRemaining.filter((item) => item.realValue !== selectedObjectType.realValue)
        );
        
        // Keep track of the selected object types
        let objectTypesSelectedBuffer = [...objectTypesSelected,selectedObjectType]
        setObjectTypesSelected(
            objectTypesSelectedBuffer
        );

        // Generate the weapon proficiencies string 
        // Since the selected object types are not updated yet (done in the lines above, but state is async), we cannot use the objectTypesSelected variable.
        setWeaponProficiencies(
            objectTypesSelectedBuffer.map((item) => item.realValue).join('|')
        );
    }
    function handleObjectTypeRemoved(selectedObjectType: OjbectOptionType) {
        // Remove the object type from the selected options
        let objectTypesSelectedBuffer =  objectTypesSelected.filter((item) => item.realValue !== selectedObjectType.realValue)
        setObjectTypesSelected(
          objectTypesSelectedBuffer
        );

        // Keep track of the remaining object types
        setObjectTypesRemaining(
            [
              ...objectTypesRemaining,
              selectedObjectType
            ]
        );

        // Generate the weapon proficiencies string
        // Since the selected object types are not updated yet (done in the lines above, but state is async), we cannot use the objectTypesSelected variable.
        setWeaponProficiencies(
            objectTypesSelectedBuffer.map((item) => item.realValue).join('|')
        );
    }


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
                                    {...register("vitality", { required: true, valueAsNumber: true })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="number"
                                    name="vitality"
                                    placeholder="vitality"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("strength", { required: true, valueAsNumber: true })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="number"
                                    name="strength"
                                    placeholder="strength"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("dexterity", { required: true, valueAsNumber: true })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="number"
                                    name="dexterity"
                                    placeholder="dexterity"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("mind", { required: true, valueAsNumber: true })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="number"
                                    name="mind"
                                    placeholder="mind"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("faith", { required: true, valueAsNumber: true })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="number"
                                    name="faith"
                                    placeholder="faith"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("armor", { required: true, valueAsNumber: true })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="number"
                                    name="armor"
                                    placeholder="armor"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("magic_armor", { required: true, valueAsNumber: true })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="number"
                                    name="magic_armor"
                                    placeholder="magic_armor"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("essence", { required: true, valueAsNumber: true })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="number"
                                    name="essence"
                                    placeholder="essence"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("agility", { required: true, valueAsNumber: true })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="number"
                                    name="agility"
                                    placeholder="agility"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("hit_chance", { required: true, valueAsNumber: true })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="number"
                                    name="hit_chance"
                                    placeholder="Hit Chance"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("evasion", { required: true, valueAsNumber: true })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="number"
                                    name="evasion"
                                    placeholder="evasion"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("hit_rate", { required: true, valueAsNumber: true })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="number"
                                    name="hit_rate"
                                    placeholder="Hit Rate"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("movement", { required: true, valueAsNumber: true })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="number"
                                    name="movement"
                                    placeholder="movement"
                                />                                
                            </div>
                            <div>
                                <input 
                                    {...register("weapon_proficiencies", { required: true })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="text"
                                    name="weapon_proficiencies"
                                    value={weaponProficiencies}
                                />                                
                            </div>
                            <ObjectTypeSelectedList removeObjectType={handleObjectTypeRemoved} selectedObjectTypes={objectTypesSelected} styles='w-full grid grid-cols-5 gap-1' />
                            <ObjectTypeSelection addObjectType={handleObjectTypeAdded} objectTypes={objectTypesRemaining} selectedObjectTypes={objectTypesSelected} />
                            <div>
                                <input 
                                    {...register("tier", { required: true, valueAsNumber: true })}
                                    className='my-4 w-full rounded-lg p-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                    type="number"
                                    name="tier"
                                    placeholder="tier"
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
