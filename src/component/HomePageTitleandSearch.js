import React from 'react'
import Tags from './Tags'
import { LittleSquare } from './MySvg'

export default function HomePageTitleandSearch({ setSearchInput, handleSelect, tags, handleSearch, handleRecommendBtn }) {

  return (
    <div className="py-5">
      <div className="head d-flex justify-content-between" style={{ width: '100%' }}>
        <div className="fs-3">
          <LittleSquare />
          練團 <span className="fs-5">小</span> 心得</div>
        <div><input className="r-btn-blue" onClick={handleRecommendBtn} type="submit" value="我要推薦樂曲" /></div>
      </div>
      <div className="my-5 searching-area">
        <form onSubmit={handleSearch} className="p-2">
          <input type="text" placeholder="請輸入曲名"
            className="ps-3"
            onChange={e => setSearchInput(e.target.value)} />
          <div className="search-btn"
            style={{ cursor: 'pointer', borderLeft: '1px solid lightgray' }}>
            <i className="text-center px-2 fas fa-search"
              onClick={handleSearch}></i>
          </div>
        </form>
      </div>
      <div>
        <Tags tags={tags} handleSelect={handleSelect} />
      </div>
    </div>
  )
}
