import React, { ReactNode, Dispatch, SetStateAction, useEffect } from 'react'
import ReactDOM from 'react-dom'

export const Modal = ({
  children,
  show,
  setShow,
}: {
  children: ReactNode
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>>
}): JSX.Element => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setShow(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown, false)

    return () => document.removeEventListener('keydown', handleKeyDown, false)
  }, [setShow])

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [show])

  if (!show) return <></>

  return ReactDOM.createPortal(
    <>
      <div
        className='bg-black absolute z-40 w-screen h-screen top-0 left-0 bg-opacity-60'
        onClick={() => {
          setShow(false)
        }}
      ></div>
      <div
        className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 rounded-md z-50 bg-zinc-800 overflow-auto'
        style={{
          maxHeight: '90vh',
        }}
      >
        {children}
      </div>
      ,
    </>,
    document.body
  )
}
