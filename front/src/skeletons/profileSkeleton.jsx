import React from 'react'
import ContentLoader from 'react-content-loader'

const HeaderLoader = props => {
  return (
    <ContentLoader
      height={400}
      width={400}
      backgroundColor="#d9d9d9"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="20" rx="0" ry="0" width="280" height="100" />
      <circle cx="140" cy="120" r="50" />
      <rect x="290" y="20" rx="0" ry="0" width="100" height="50" />
      <rect x="290" y="75" rx="0" ry="0" width="70" height="5" />
      <rect x="290" y="85" rx="0" ry="0" width="40" height="6" />
    </ContentLoader>
  )
}


const LinkedinFeed = props => {
  return (
    <ContentLoader
      viewBox="0 0 380 200"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="60" cy="25" r="25" />
      <rect x="95" y="2" rx="5" ry="5" width="160" height="11" />
      <rect x="95" y="19" rx="5" ry="5" width="140" height="9" />
      <rect x="95" y="34" rx="5" ry="5" width="120" height="9" />

      <rect x="39" y="65" rx="5" ry="5" width="295" height="10" />
      <rect x="39" y="82" rx="5" ry="5" width="275" height="10" />

      <rect x="35" y="103" width="310" height="160" />
    </ContentLoader>
  )
}





export  {HeaderLoader,LinkedinFeed}