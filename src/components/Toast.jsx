import React from 'react'
import Alert from 'react-bootstrap/Alert';

const Toast = ({message, variant}) => {
  return (
    <div className='position-absolute top-0 end-0'>
      <Alert key={variant} variant={variant}>
          {message}
      </Alert>
    </div>
  )
}

export default Toast