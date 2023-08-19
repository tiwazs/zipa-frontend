import React from 'react'

interface StatsSummaryProps {
    name: string;
    value: number;
}

export default function StatsSummary({name, value}: StatsSummaryProps) {
  return (
    <div className='flex flex-col items-center'>
        <p className='text-gray-400 text-sm font-extralight'>{name}</p>
        <p><span className='text-gray-300 font-light'>{(value !== 0) ? value: 0}</span></p>
    </div>
  )
}
