import React, { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { Modal } from '../../../components'
import { useDevice } from '../../../hooks/models'

export const DeviceDetailPage = (): JSX.Element => {
  const params = useParams()

  const [showModal, setShowModal] = useState<boolean>(false)

  const { deviceId } = params

  const { data: device, isLoading, error } = useDevice(deviceId)

  if (isLoading) return <div>Cargando...</div>

  if (error !== undefined) return <div>Error cargando este dispositivo</div>

  return (
    <>
      <Outlet />

      <Modal show={showModal} setShow={setShowModal}>
        Hola
      </Modal>
    </>
  )
}
