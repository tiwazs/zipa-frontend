'use client'

import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoAddSharp } from 'react-icons/io5'
import { useQueryClient } from 'react-query';
import EffectSelection from './EffectSelection';

const SkillOnList = [
    { value: "INSTANT", label: "INSTANT" },
    { value: "OVER_TIME", label: "OVER_TIME" },
    { value: "DURING_CHANNEL", label: "DURING_CHANNEL" },
    { value: "AFTER_CHANNEL", label: "AFTER_CHANNEL" },
    { value: "DELAYED", label: "DELAYED" }
];  

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
    cooldown?: number;
    channeled?: boolean;
    target?: string;
    skill_on?: string;
    skill_types?: string[];
    effects?: string[];
    summons?: string[];
}

interface NewEffectDialogProps {
    skillId: string;
    styles?: string;
}

export default function NewEffectDialog({ skillId, styles}: NewEffectDialogProps) {
    let [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<CreateEffectFormOptions>();
        

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
                    Add Effects
                  </Dialog.Title>
                  <div className="mt-2 flex flex-col space-y-6">
                    <p className="text-sm text-gray-400">
                      Effects can leave lasting effects on the target. select from the list below.
                    </p>
                    <EffectSelection skillId={skillId} />
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md bg-black hover:bg-purple-300/10 border dark:border-yellow-900/50 px-4 py-2 text-sm font-medium text-gray-400  focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2"
                      onClick={closeModal}
                      >
                      Close
                    </button>
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
