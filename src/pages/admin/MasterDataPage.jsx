import React from 'react'
import { Link } from 'react-router-dom'

const MasterDataPage = () => {
  return (
    <main className="p-5">
      <div className="breadcrumbs text-xl text-[#14532D]">
        <ul>
          <li>Master Data</li>
        </ul>
      </div>
      <Link to="/master-data/add" className='btn btn-accent'>+ Add Product</Link>
    </main>
  )
}

export default MasterDataPage