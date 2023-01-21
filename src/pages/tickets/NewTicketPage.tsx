import React, { useState, useEffect } from 'react'
import { InsertTicketForm, Modal } from '../../components'
import { useNavigate } from 'react-router-dom'

export const NewTicketPage = (): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(true)

  const navigate = useNavigate()

  useEffect(() => {
    if (!showModal) navigate('/devices')
  }, [showModal])

  return (
    <>
      <Modal show={showModal} setShow={setShowModal}>
        <InsertTicketForm
          onSubmit={() => {
            navigate('/devices')
          }}
        />
      </Modal>
    </>
  )
}
