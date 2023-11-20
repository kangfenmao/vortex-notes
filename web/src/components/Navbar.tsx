import { Link, useSearchParams } from 'react-router-dom'
import SearchIcon from '@/assets/images/search_icon.svg'
import React, { useState } from 'react'

interface Props {}

const Navbar: React.FC<Props> = () => {
  const [searchParams] = useSearchParams()
  const keywords = searchParams.get('keywords') || ''
  const [input, setInput] = useState(keywords)

  return (
    <div
      className="flex flex-row h-20 items-center fixed top-0 left-0 right-0 border-b-white border-opacity-10"
      style={{ backgroundColor: '#242424', zIndex: 100, borderBottomWidth: '1px' }}>
      <div className="flex flex-row items-center m-auto w-full px-5 max-w-lg sm:max-w-6xl">
        <Link to="/">
          <h1
            className="text-2xl md:text-4xl font-bold text-white mr-5"
            style={{ fontFamily: 'Major Mono Display' }}>
            <span className="text-violet-700">V</span>
            <span className="text-red-500">o</span>rtex
          </h1>
        </Link>
        <form className="relative flex-1" method="get" action="/search">
          <input
            type="text"
            name="keywords"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Search"
            className="w-full px-4 py-2 outline-none"
          />
          <button
            type="submit"
            className="absolute top-0 bottom-0 right-0 w-12 flex flex-row justify-center items-center cursor-pointer">
            <img src={SearchIcon} alt="" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default Navbar
