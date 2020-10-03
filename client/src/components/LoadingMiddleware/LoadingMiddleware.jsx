import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import { useSelector } from 'react-redux';
import './LoadingMiddleware.css'
const Loading = (props) => {
    const { loadingClose } = props;
    const urlCheckout = useSelector(store => store.ordersReducer.urlCheckout)
    if(props.isPayLoading && urlCheckout !== ''){
        window.location.href = urlCheckout
    }
    return (
        <Loader type="Rings" className = 'ringLoader'/>
    )
}

export default Loading