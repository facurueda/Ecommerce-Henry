import React from 'react'

export default function SearchBar({ paraonChange }){
    return
        <div>
            <form onSubmit={objeto => {

            }} >
                <input type="text" onChange={ message => paraonChange(message) } />
                <button type= "submit"></button>
            </form>
        </div>
}