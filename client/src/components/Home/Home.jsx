import SearchBar from '../SearchBar/SearchBar'
import React from 'react'
import './Home.css'
const Home = (props) => {
    return (

        <div className='Home'>
            <div className='Container'>
                <h1 className='titulo'>La Cosería</h1>
                <SearchBar></SearchBar>
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