import React from 'react'
// import { Button } from 'reactstrap'
import './SearchBar.css'
import { useDispatch } from 'react-redux'
import { actionGetProductsBySearchTerm } from '../../redux/productsActions'
import { useRouteMatch } from 'react-router'
import { Link } from 'react-router-dom'



export default function SearchBar() {
    const dispatch = useDispatch()
    const handleChange = (searchTerm) => {
        dispatch(actionGetProductsBySearchTerm(searchTerm))
    }

    return (
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog==" crossOrigin="anonymous" />
            <div className='search-box'>
                <input className="search-text" type="text" placeholder="¿Que estas buscando?" onKeyPress={e => {
                    if (e.which === 13) {
                        handleChange(e.target.value)
                    }
                }}/>
                <a href="/Search" className="search-btn">
                    <i className="fas fa-search"></i>
                </a>
            </div>
        </div>
    )
}