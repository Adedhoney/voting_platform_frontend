import React from 'react'

const Candidate = () => {
  return (
    <div className='h-60 w-full rounded-lg bg-sky-100 flex flex-col items-center justify-center gap-2'>
      <div className='h-20 w-20 bg-sky-700 rounded-full overlow-hidden'>
        <img src='' alt='' />
      </div>
      <h4 className='font-semibold italic'>Dare Mosunmola</h4>
      <p className='text-gray-700 text-sm'>Lorem ipsum dolor sit amet.</p>
      <div className='space-x-2'>
        <button className='px-2 py-1 rounded-md border border-sky-600 text-sm'>
          VIEW DETAILS
        </button>
        <button className='px-2 py-1 rounded-md bg-sky-600 text-white text-sm'>
          VOTE/UNVOTE
        </button>
      </div>
    </div>
  )
}

export default Candidate