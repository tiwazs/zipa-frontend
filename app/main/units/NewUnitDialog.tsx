'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoAddSharp } from 'react-icons/io5'
import { useQueryClient } from 'react-query';  
import NewUnit from './new/NewUnit';

interface NewUnitDialogProps {
    user_id: string;
    styles?: string;
}

export interface OjbectOptionType{
    label: string;
    value: string;
    realValue: string;
}


export default function NewUnitDialog({user_id, styles}: NewUnitDialogProps) {
    let [isOpen, setIsOpen] = useState(false);

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
                                            border-transparent border-4 dark:dark:border-yellow-900/50 text-yellow-200/70 dark:bg-[url('/bg1.jpg')]">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-yellow-200/70"
                  >
                    New Unit
                  </Dialog.Title>

                  {/* Dialog Content */}
                  <NewUnit user_id={user_id} onCreate={closeModal} onClose={closeModal}/>


                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
