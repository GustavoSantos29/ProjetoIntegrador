import React from 'react'

const ArticleDislpay = ({url, name}) => {
  return (
    <div className={`article-container ${url ? '' : 'hide'}`}>
          <a href={url} className='article-content'>{`${name? name : ''}`}</a>
    </div>
  )
}

export default ArticleDislpay
