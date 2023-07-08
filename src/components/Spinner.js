import React from 'react'
import loading from './loading.png'

const Spinner = () => {
  return (
    <div className='text-center'>
      <img src={loading} alt="loading"></img>
    </div>
  )
}

export default Spinner;
