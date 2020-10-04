import SearchBar from '../SearchBar/SearchBar'
import React from 'react'
import './Home.css'
import ChatCustomer from '../ChatBot/ChatBot'
const Home = () => {
    return (
        <div className='Home'>
            <div className='Container'>
                <h1 className='titulo'>La Cosería</h1>
                <SearchBar></SearchBar>
            </div>
            <ChatCustomer/>
        </div>
    )
}
export default Home