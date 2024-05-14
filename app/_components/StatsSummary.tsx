import React from 'react'

interface StatsSummaryProps {
    name: string;
    value: number;
    icon?: string;
    style?: string;
}

export default function StatsSummary({name, value, icon, style}: StatsSummaryProps) {
  const round = (num: number) => {
    return Math.round(num * 10) / 10
  }
  return (
    <div className={`items-center ${style}`}>
        {icon && <img src={`${icon}`} alt="" className='w-6 h-6 rounded-full border border-yellow-500/60 my-1' /> }
        <p className='text-gray-400 text-sm font-extralight'>{name}</p>
        <p><span className='text-gray-300 font-light'>{(value !== 0) ? round(value): 0}</span></p>
    </div>
  )
}
