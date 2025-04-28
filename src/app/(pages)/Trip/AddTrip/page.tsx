
import AddTripComponent from '@/components/AddTripComponent'
import React, { Suspense } from 'react'

const AddTrip = () => {
  return (
      <>
      {/*suspense for using search params on component*/}
    <Suspense fallback={<div>Loading Trip List...</div>}>
    <AddTripComponent />
  </Suspense>
      </>
  )
}

export default AddTrip