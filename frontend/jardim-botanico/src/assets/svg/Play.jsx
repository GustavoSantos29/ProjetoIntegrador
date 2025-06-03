import React from 'react'

const Play = ({width = 24, height = 29, color = "#005C8B" }) => {
  return (
    <div>
          <svg width={width} height={height} viewBox="0 0 24 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.4993 10.314C24.5483 12.2838 24.5483 16.7437 21.4993 18.7135L7.96327 27.4585C4.63628 29.6079 0.249999 27.2196 0.249999 23.2587L0.25 5.76878C0.25 1.80787 4.63628 -0.580406 7.96327 1.569L21.4993 10.314Z"
                  fill={color} />
    </svg>

    </div>
  )
}

export default Play
