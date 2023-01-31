import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { InsertDeviceForm, Modal } from '../../../../components'
import { useClient } from '../../../../hooks/models'

export const NewClientDevicePage = (): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(true)

  const { clientId = '' } = useParams()

  const { mutate } = useClient(clientId)

  const navigate = useNavigate()

  useEffect(() => {
    if (!showModal) navigate(`/admin/clients/${clientId}`)
  }, [showModal])

  const handleSubmit = (): void => {
    setShowModal(false)
    mutate().catch((e) => {
      console.error(e)
    })
  }

  return (
    <Modal show={showModal} setShow={setShowModal}>
      <InsertDeviceForm onSubmit={handleSubmit} />
    </Modal>
  )
}
