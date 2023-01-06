import React, { useState, useEffect } from 'react'
import { InsertMaintenanceForm, Modal } from '../../../components'
import { useNavigate } from 'react-router-dom'

export const NewMaintenancePage = (): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(true)

  const navigate = useNavigate()

  useEffect(() => {
    if (!showModal) navigate('/devices')
  }, [showModal])

  return (
    <>
      <Modal show={showModal} setShow={setShowModal}>
        <InsertMaintenanceForm
          onSubmit={() => {
            navigate('/devices')
          }}
        />
      </Modal>
    </>
  )
}
