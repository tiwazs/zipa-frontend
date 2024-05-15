import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
//import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import {AiOutlineCheck, AiOutlineDown } from 'react-icons/ai'
import { useQuery, useQueryClient } from 'react-query'
import { SubmitHandler, useForm } from 'react-hook-form'

interface OptionSelectionProps {
    options: any[];
    queryKey: string;
    onSelectionChange?: any;
    style?: string;
}

export default function OptionSelection({options, queryKey, onSelectionChange,style}: OptionSelectionProps) {
    const [selected, setSelected] = useState<any>(null)

    const HandleSelectionChange = (selection: any) => {
        setSelected(selection)
        onSelectionChange(selection)
    }

    return (
      <div className={`flex flex-col items-center ${style} overflow-y-visible`}>
        <div className=" w-full overflow-y-visible">
          <Listbox value={selected} onChange={HandleSelectionChange}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-black hover:bg-purple-300/10 text-yellow-200/70 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none
                            focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 
                            focus-visible:ring-offset-orange-300 sm:text-sm ">
                <span className="block truncate">{selected ? selected.name : `Select a ${queryKey}`}</span>
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
                  {options.map((object: any, index: any) => (
                    <Listbox.Option
                      key={`${queryKey}-${object.name}-${index}`}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-purple-400/30 text-yellow-200/70' : 'text-gray-300'
                        }`
                      }
                      value={object}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {object.name}
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
      </div>
    )
}
