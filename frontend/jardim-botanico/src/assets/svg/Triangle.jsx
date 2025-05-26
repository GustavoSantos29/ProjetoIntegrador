import React from 'react'

const Triangle = ({  width = 30, height = 30, color = '#B6B8CA' }) => {
  return (
    <div>
          <svg width={width} height={height } viewBox="0 0 33 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 22.3301C-0.833333 20.4056 -0.833335 15.5944 2.5 13.6699L25 0.679492C28.3333 -1.24501 32.5 1.16062 32.5 5.00962L32.5 30.9904C32.5 34.8394 28.3333 37.245 25 35.3205L2.5 22.3301Z"
                  fill= {color} />
</svg>

    </div>
  )
}

export default Triangle
