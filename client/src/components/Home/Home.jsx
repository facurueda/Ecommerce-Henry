import SearchBar from '../SearchBar/SearchBar'
import React from 'react'
import './Home.css'
const Home = () => {
    return (
        <div className='Home'>
            <div>
                <h1 className='titulo'>La Cosería</h1>
                <SearchBar></SearchBar>
            </div>
        </div>
    )
}
export default Home;