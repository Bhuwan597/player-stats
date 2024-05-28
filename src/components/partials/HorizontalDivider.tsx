import React from 'react'

const HorizontalDivider = ({title}: {title: string}) => {
  return (
    <div className="relative flex py-5 items-center">
    <div className="flex-grow h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400"></div>
    <span className="flex-shrink mx-4 text-gray-400 text-xl">{title}</span>
    <div className="flex-grow h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400"></div>
</div>
  )
}

export default HorizontalDivider