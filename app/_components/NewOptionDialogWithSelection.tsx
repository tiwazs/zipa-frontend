'use client'

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, use, useEffect, useState } from 'react';
import { IoAddSharp } from 'react-icons/io5';
import OptionSelection from './OptionSelection';
import { useQueryClient } from 'react-query'

interface NewOptionDialogProps {
    title: string;
    description: string;
    addEndpoint: string;
    selectionEndpoint: string;
    selecttionQueryKey: string;
    selectionKey: string;
    selectionIdOnEndpoint: boolean;
    invalidationKey?: string;
    extraFormParams?: string[];
    styles?: string;
}

export default function NewOptionDialog({ title, description, addEndpoint, selectionEndpoint, selecttionQueryKey, selectionKey, selectionIdOnEndpoint , invalidationKey, extraFormParams, styles}: NewOptionDialogProps) {
    let [isOpen, setIsOpen] = useState(false);
    let [selected, setSelected] = useState<any>(undefined)
    let [extraFormValues, setExtraFormValues] = useState<any>(undefined)
    useEffect(() => {
        if(extraFormParams){
            let extraFormValuesTemp: any = {};
            extraFormParams.forEach((param: string) => {
                extraFormValuesTemp[param] = "";
            });
            setExtraFormValues(extraFormValuesTemp);
        }
    }, []);


    const queryClient = useQueryClient();

    const HandleSelectionChange = (selection: any) => {
        setSelected(selection)
    }

    const HandleExtraFormChange = (e: any) => {
        let extraFormValuesTemp = extraFormValues;
        extraFormValuesTemp[e.target.id] = e.target.value;
        setExtraFormValues(extraFormValuesTemp);
    }
    
    const onAdd = async () => {
        let data = {};
        if(selectionIdOnEndpoint && extraFormValues){
            data = {...extraFormValues};
        }else if(!selectionIdOnEndpoint && extraFormValues){
            data = {
                [`${selectionKey}_id`]: selected.id,
                ...extraFormValues
            }
        }


        // Not setting the content type. aparently the browser will do that for us, including the boundary
        try{
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${addEndpoint}${selectionIdOnEndpoint ? selected.id : ""}`, {
              method: "PUT",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          });
          console.log(`Response: ${JSON.stringify(response)}`);
        
          queryClient.invalidateQueries(invalidationKey);
        }catch(e){
            console.log(`Error: ${e}`);
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
                    {title}
                  </Dialog.Title>
                  <div className="mt-2 flex flex-col space-y-6">
                      <p className="text-sm text-gray-400">
                          {description}
                      </p>
                      <OptionSelection endpoint={selectionEndpoint} queryKey={selecttionQueryKey} onSelectionChange={HandleSelectionChange} style='' /> 
                      {/* Form */}
                      <div className='flex flex-col w-full'>
                        {extraFormParams && extraFormParams.map((param: string) => {
                            return  <div key={param} className='flex items-center'>
                                        <h1>{param}</h1>
                                        <input className='w-full my-2 rounded-lg py-3 text-gray-400 text-md bg-[#2b2532] bg-opacity-10 focus:bg-opacity-30 focus:outline-none border dark:border-yellow-900/50'
                                            type="text" id={param} onChange={(e)=>{HandleExtraFormChange(e)}}/>
                                    </div>
                        })}
                      </div>
                      <div className='flex justify-between'>
                          <button
                              type="button"
                              className="inline-flex justify-center rounded-md bg-black hover:bg-purple-300/10 border dark:border-yellow-900/50 px-4 py-2 text-sm font-medium text-gray-400  focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2"
                              onClick={closeModal}
                              >
                              Close
                          </button>
                          <button
                              type="button"
                              className="inline-flex justify-center rounded-md bg-black hover:bg-purple-300/10 border dark:border-yellow-900/50 px-4 py-2 text-sm font-medium text-gray-400  focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2"
                              onClick={onAdd}
                              >
                              Save
                          </button>
                      </div>
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
