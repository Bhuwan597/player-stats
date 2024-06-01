import React from 'react'

const HorizontalDivider = ({title}: {title: string}) => {
  return (
    <div className="relative flex py-5 justify-center items-center">
    <span className="flex-shrink mx-4 text-blue-600 text-2xl font-bold animate-pulse">{title}</span>
</div>
  )
}

export default HorizontalDivider