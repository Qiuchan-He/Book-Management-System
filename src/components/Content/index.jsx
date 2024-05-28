import React from 'react'
import "./style.less"


const Content = (props)=>{
    return(
        <>
            <div className='title'>{props.title}
            <span className='btn'>{props.operation}</span>
            </div>
            <div className='content'>
              {props.children}
            </div>
        </>
    )
}


export default Content