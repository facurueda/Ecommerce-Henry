import React from 'react'
import { actionAddToCart } from '../../redux/ordersActions'
import { actionUserCreate } from '../../redux/usersActions'
import { connect } from 'react-redux'
import { useEffect } from 'react'

// name, email, password, level
// ejecutar props.actionUserCreate({ name: input.name, email: input.email, password: input.password, level: input.level })
const CreateUser = (props) => {

    return (
        <div>

        </div>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        actionUserCreate: (props) => {
            dispatch(actionUserCreate(props))
        }
    }
}

export default connect(() => { }, mapDispatchToProps)(CreateUser);