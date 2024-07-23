import React from 'react'
import Modal from './Modal'
import Login from './Login'

const Forms = ({showModal,setshowModal}) => {
  return (
    <div>
      <Modal isVisible={showModal} setshowModal={setshowModal}><Login></Login></Modal>
    </div>
  )
}

export default Forms
