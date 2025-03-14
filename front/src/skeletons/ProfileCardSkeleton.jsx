import React from 'react'
import ContentLoader from 'react-content-loader'

const SnapchatThread = props => {
  return (
    <ContentLoader
      height={60}
      width={210}
      viewBox="0 0 320 54"
      backgroundColor="#757575"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="27" cy="27" r="18" />
      <rect x="53" y="14" rx="3" ry="3" width="180" height="13" />
      <rect x="53" y="30" rx="3" ry="3" width="10" height="10" />
      <rect x="67" y="30" rx="3" ry="3" width="74" height="10" />
      <circle cx="305" cy="27" r="8" />
      <rect x="0" y="53" rx="0" ry="0" width="320" height="1" />
      <rect x="219" y="146" rx="0" ry="0" width="0" height="0" />
    </ContentLoader>
  )
}



export default SnapchatThread