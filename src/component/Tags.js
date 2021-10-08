import React from 'react'

export default function Tags({ tags, handleSelect }) {
  // const handleSelect = (e) => {
  //   const tagIndex = e.target.parentElement.getAttribute('name')
  //   const tag = document.getElementsByClassName('r-tag')[tagIndex]
  //   if (tag.classList.length === 1) {
  //     tag.classList += ' select-tag'
  //   } else {
  //     tag.classList.remove('select-tag')
  //   }
  // }
  return (
    <div
      className=""
      style={{
        // display: '-webkit-inline-box',
        // flexWrap: 'wrap'
      }}>
      {tags.map((tag, i) => {
        return (
          <span key={i} style={{ margin: '5px' }} name={tag.tag}>
            <button style={{ width: 'fit-content', backgroundColor: 'white', marginBottom: '0.5rem' }}
              className={tag.select ? "r-tag select-tag" : "r-tag"}
              onClick={handleSelect}>#{tag.tag}</button>
          </span>)
      })}
    </div>
  )
}