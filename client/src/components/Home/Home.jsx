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
                <div className='ButtonsLocos'> 
                    <button className='but'>
                        <a className='nounderline' href='/Categories'>Categories</a>
                    </button>
                    <button className='but'>
                        <a className='nounderline' href='/Catalogue'>Products</a>
                    </button>
                    <button className='but'>
                        <a className='nounderline' href='/MenuCrud'>Edit Products</a>
                    </button>
                </div>
                
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