import React from 'react'
import './EnlargedImg.css'

export default function EnlargedImg({currentPost}) {
  return (
    // <div style={{display: 'flex', flexDirection: 'column', backgroundColor: 'transparent'}}>
    //   <div>
    //     <div id='enlarged-title'>{currentPost.title}</div>
    //     <div id='enlarged-desc'>{currentPost.desc}</div>
    //   </div>
    // </div>
      <div id='enlarged-img-container'>
        <img id='enlarged-img' src={currentPost.img} />
      </div>
  )
}
