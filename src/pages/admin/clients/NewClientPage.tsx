import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal } from '../../../components'
import { InsertUserForm } from '../../../components/forms/models/user/InsertUserForm'

export const NewClientPage = (): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(true)

  const navigate = useNavigate()

  useEffect(() => {
    if (!showModal) navigate('/admin/clients')
  }, [showModal])

  return (
    <Modal show={showModal} setShow={setShowModal}>
      <InsertUserForm />
    </Modal>
  )
}
