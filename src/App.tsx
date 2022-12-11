import { useState } from 'react'
import Candidate from './components/Candidate'

const positions = [
  'President',
  'Vice President',
  'Gen.Secretary',
  'Finance Minister',
  'Treasurer',
]

function App() {
  const [position, setPosition] = useState(0)

  const changePositions = (command: string) => {
    if (command === 'add') {
      setPosition(prev_position => {
        if (prev_position >= positions.length - 1) {
          prev_position = 0
        } else {
          prev_position = prev_position + 1
        }
        return prev_position
      })
      return
    }
    setPosition((prev_position) => {
      if (prev_position <= 0) {
        prev_position = positions.length - 1
      } else {
        prev_position = prev_position - 1
      }
      return prev_position
    })
  }

  return (
    <>
      <li className='w-full h-16 bg-sky-300 flex items-center justify-evenly'>
        <button className='text-sky-800' onClick={() => changePositions('minus')}>
          <svg
            className='w-8 h-8'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z'
            />
          </svg>
        </button>
        <ul className='text-sky-900 font-semibold text-lg'>{positions[position]}</ul>
        <button className='text-sky-800' onClick={() => changePositions('add')}>
          <svg
            className='w-8 h-8'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </button>
      </li>
      <div className='my-8 mx-4 flex flex-wrap items-center gap-4'>
        <Candidate />
        <Candidate />
        <Candidate />
        <Candidate />
        <Candidate />
        <Candidate />
        <Candidate />
        <Candidate />
        <Candidate />
        <Candidate />
      </div>
    </>
  )
}

export default App
