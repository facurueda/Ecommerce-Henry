import React from 'react'

export default function SearchBar(){

    const [ search, setSearch ] = useState()

    handleChange = (e) => {
        const { name, value } = event.target
        setSearch(        
              
        )
    }

    return ( 
        <div>
            <form onSubmit={objeto => {

            }} >
                <input type="text" onChange={e => handleChange(e) } />
                <button type= "submit"></button>
            </form>
        </div>)
}