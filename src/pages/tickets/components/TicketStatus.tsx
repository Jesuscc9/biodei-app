import React from 'react'
import { iTicket } from '../../../types'
import { BsChevronDown } from 'react-icons/bs'

const statusClasses: Record<iTicket['status'], string> = {
  NOT_STARTED: 'bg-gray-600 text-white dark:bg-gray-300 dark:bg-opacity-10 bg-opacity-60 dark:text-gray-200',
  ACTIVE: 'bg-green-500',
  CLOSED: 'bg-red-500',
}

const statusTitles: Record<iTicket['status'], string> = {
  NOT_STARTED: 'No iniciado',
  ACTIVE: 'Activo',
  CLOSED: 'Cerrado',
}

export const TicketStatus = ({ status }: { status: iTicket['status'] }): JSX.Element => {
  return (
    <button
      type='button'
      title='Cambiar estado'
      className={`${statusClasses[status]} w-min whitespace-nowrap rounded-md px-3 py-2 text-xs flex items-center gap-2`}
    >
      {statusTitles[status]}
      <BsChevronDown />
    </button>
  )
}
