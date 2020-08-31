import SearchBar from '../SearchBar/SearchBar'
import React from 'react'
import './Home.css'
import { connect } from 'react-redux'
import fetchCategories from "../../redux/categoriesActions";
const Home = (props) => {
    return (
        <div className = 'Home'>
            <div className = 'Container'>
                <h1 className = 'titulo'>La Cosería</h1>
                <SearchBar></SearchBar>
                <button className='ButtonsLocos' onClick={() => {
                    props.fetchCategories()
                }}><a href='/Categories'>Categories</a></button>
            </div>
        </div>
    )
}
// const mapStateToProps = (state) => {
//     console.log('state', state)
//     return {
//       categories: state.categoriesReducer.categories,
//     }
//   }
//   const mapDispatchToProps = (dispatch) => {
//     return {
//       fetchCategories: () => {
//         dispatch(fetchCategories())
//       }
//     }
//   }
// export default connect(mapStateToProps,mapDispatchToProps)(Home);
export default Home