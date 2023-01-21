import React, { useEffect, useState } from 'react'
import { iTicket } from '../../../types'
import { useParams } from 'react-router-dom'
import { useTicket, useUpdateTicket } from '../../../hooks/models'

const statusClasses: Record<iTicket['status'], string> = {
  NOT_STARTED: 'bg-gray-600 text-white dark:bg-gray-300 dark:bg-opacity-10 bg-opacity-60 dark:text-gray-200',
  ACTIVE: 'bg-green-500 text-white',
  CLOSED: 'bg-red-500 text-white',
}

const statusTitles: Record<iTicket['status'], string> = {
  NOT_STARTED: 'No iniciado',
  ACTIVE: 'Activo',
  CLOSED: 'Cerrado',
}

interface iProps {
  status: iTicket['status']
}

export const TicketStatus = ({ status }: iProps): JSX.Element => {
  const { ticketId } = useParams()
  const { mutate } = useTicket(ticketId)

  const [ticketStatus, setTicketStatus] = useState<iTicket['status']>(status)

  const isEditable = ticketId !== undefined

  const { update } = useUpdateTicket()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setTicketStatus(e.target.value as iTicket['status'])
  }

  useEffect(() => {
    if (ticketId === undefined) return
    update(ticketId, { status: ticketStatus })
      .then(async () => await mutate())
      .catch((e) => console.error(e))
  }, [ticketStatus])

  return (
    <>
      {isEditable ? (
        <>
          <select
            name='status'
            title='status'
            value={status}
            className={`${statusClasses[status]} w-min whitespace-nowrap rounded-md px-3 py-2 text-xs flex items-center gap-2`}
            onChange={handleChange}
          >
            <option value='NOT_STARTED'>No iniciado</option>
            <option value='ACTIVE'>Activo</option>
            <option value='CLOSED'>Cerrado</option>
          </select>
        </>
      ) : (
        <div
          className={`${statusClasses[status]} w-min whitespace-nowrap rounded-sm px-3 py-2 text-xs flex items-center gap-2`}
        >
          {statusTitles[status]}
        </div>
      )}
    </>
  )
}
