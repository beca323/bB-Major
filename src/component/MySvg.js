import React from 'react'

export function LittleSquare() {
  return (
    <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d)">
        <rect x="4" width="14" height="16" fill="#131F32" />
      </g>
      <defs>
        <filter id="filter0_d" x="0" y="0" width="22" height="24" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.791667 0 0 0 0 0.791667 0 0 0 0 0.791667 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  )
}


export function NotPass() {
  return (
    <svg width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="25" cy="25" r="25" fill="#FF0000" />
      <line x1="15.7678" y1="16.2322" x2="33.7678" y2="34.2322" stroke="white" strokeWidth="5" />
      <line x1="33.7678" y1="16.7678" x2="15.7678" y2="34.7678" stroke="white" strokeWidth="5" />
    </svg>
  )
}
export function Pass() {
  return (
    <svg width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="25" cy="25" r="25" fill="#07B174" />
      <path d="M13 23.5L22 32.5L37 17.5" stroke="white" strokeWidth="5" />
    </svg>
  )
}

export function Loading() {
  return (
    <div className="d-flex justify-content-center align-items-center loadingcircleContainer">
      <svg className="loadingcircle" width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100ZM50 89C71.5391 89 89 71.5391 89 50C89 28.4609 71.5391 11 50 11C28.4609 11 11 28.4609 11 50C11 71.5391 28.4609 89 50 89Z" fill="url(#paint0_linear)" />
        <defs>
          <linearGradient id="paint0_linear" x1="35.5" y1="91" x2="50" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2270A9" />
            <stop offset="1" stopColor="#2270A9" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}