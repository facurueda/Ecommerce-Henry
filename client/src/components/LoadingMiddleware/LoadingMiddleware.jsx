import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

const Loading = (props) => {
    const { loadingClose } = props;

    

    return (
        <Loader type="Rings" color="white" height={80} width={80} />
    )
}

export default Loading