import React from 'react'

export default function Tags({ tags, handleSelect }) {
  return (
    <div>
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