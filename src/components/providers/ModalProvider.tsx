import React, { useEffect, useState } from 'react'
import ImportStudentsModal from '../modals/ImportStudentsModal'
import ArchiveUserModal from '../modals/ArchiveUserModal';
import CreateEventModal from '../modals/CreateEventModal';
import ViewEventModal from '../modals/ViewEventModal';
import CreateDiscussion from '../modals/CreateDiscussion';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if(!isMounted) {
    return null
  }
   
  return (
    <>
        <ArchiveUserModal />
        <ImportStudentsModal />
        <CreateEventModal />
        <ViewEventModal />
        <CreateDiscussion />
    </>
  )
}

export default ModalProvider