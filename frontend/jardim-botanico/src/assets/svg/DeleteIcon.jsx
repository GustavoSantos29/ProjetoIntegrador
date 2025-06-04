import React from 'react'

const DeleteIcon = ({width = '30', height = '30', color = '#AF1D1D'}) => {
  return (
    <div>
      <svg width={width} height={height} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 8.75H6.25V25C6.25 25.663 6.51339 26.2989 6.98223 26.7678C7.45107 27.2366 8.08696 27.5 8.75 27.5H21.25C21.913 27.5 22.5489 27.2366 23.0178 26.7678C23.4866 26.2989 23.75 25.663 23.75 25V8.75H7.5ZM12.5 23.75H10V12.5H12.5V23.75ZM20 23.75H17.5V12.5H20V23.75ZM20.7725 5L18.75 2.5H11.25L9.2275 5H3.75V7.5H26.25V5H20.7725Z"
                  fill={color} />
    </svg>

    </div>
  )
}

export default DeleteIcon
