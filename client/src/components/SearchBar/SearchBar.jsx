import React from 'react'
// import { Button } from 'reactstrap'
import './SearchBar.css'
import { connect, useDispatch } from 'react-redux'
import { actionGetProductsBySearchTerm } from '../../redux/productsActions'
import { useHistory, withRouter } from 'react-router'



function SearchBarr(props) {
    const dispatch = useDispatch()
    const history = useHistory()
    const searchFunction = (value) => {
        dispatch(actionGetProductsBySearchTerm(value))
        history.push('/search')
    }
    return (
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog==" crossOrigin="anonymous" />
            <div className='search-box'>
                <input className="search-text" type="text" placeholder="¿Que estas buscando?" onKeyPress={e => {
                    if (e.key === 'Enter') {
                        searchFunction(e.target.value.toLowerCase())
                    }
                }}/>
                <a href="/Search" className="search-btn">
                    <i className="fas fa-search"></i>
                </a>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.productsReducer.products,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        actionGetProductsBySearchTerm: (term) => {
            dispatch(actionGetProductsBySearchTerm(term))
        }
    }
}

const SearchBar = withRouter(SearchBarr)
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);