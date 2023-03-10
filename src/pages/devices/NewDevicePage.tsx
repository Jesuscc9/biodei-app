import React, { useState, useEffect } from 'react'
import { InsertDeviceForm, Modal } from '../../components'
import { useNavigate } from 'react-router-dom'

export const NewDevicePage = (): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(true)

  const navigate = useNavigate()

  useEffect(() => {
    if (!showModal) navigate('/devices')
  }, [showModal])

  return (
    <>
      <Modal show={showModal} setShow={setShowModal}>
        <InsertDeviceForm onSubmit={() => setShowModal(false)} />
      </Modal>
    </>
  )
}
