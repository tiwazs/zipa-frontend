import { Disclosure } from '@headlessui/react'
import { ReactNode } from 'react';
import { AiOutlineDown } from 'react-icons/ai'

interface FactionUnitsDisclosureProps {
    title: string;
    children?: ReactNode
	style?: string;
}

export default function FactionUnitsDisclosure({ title, children, style }: FactionUnitsDisclosureProps) {

	return (
	<div className={`w-full ${style}`}>
		<div className="mx-auto w-full rounded-2xl bg-[url('/bg1.jpg')] py-1">
		{/* Disclosure Options*/}
			<Disclosure>
			{({ open }) => (
				<>
				<Disclosure.Button className="flex items-center w-full justify-between rounded-lg bg-black text-yellow-200/70 px-1 py-1 text-left text-sm font-medium 
												hover:bg-purple-300/10 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 
												">
					<div></div>
					{/* Disclosure Title */}
					<span className={`text-base text-yellow-200/70`}>{title}</span>
					<AiOutlineDown clatext-base ={`${ open ? 'rotate-180 transform' : ''} h-5 w-5 text-yellow-200/70`} />
				</Disclosure.Button>
				<Disclosure.Panel className="px-1 pt-1 pb-1">
					{/*Disclosure Children go Here*/}
					{children}
				</Disclosure.Panel>
				</>
			)}
			</Disclosure>
		</div>
	</div>
	)
}
