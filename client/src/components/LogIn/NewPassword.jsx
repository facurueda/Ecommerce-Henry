import React from 'react'

const NewPassword = () => {
    const [secondPassword, setSecondPassword] = useState('')
    const [passwordInputs, setpasswordInputs] = useState({password: 'null'})
    const handleChange = event => {
        const { name, value } = event.target
        if (name === 'secondPassword') {
            setSecondPassword(value);
        }
        setpasswordInputs        
    }
    const Verificar = () => {
        if (secondPassword === setpasswordInputs.password) {
            dispatch(actionPasswordUpdate({...passwordInputs}))
            console.log('Su contraseña fue modificada')
        } else {
            console.log('Las contraseñas no coinciden')
        }
    }
    return(
        <div>
            <h3>Escribí tu nueva contraseña aquí:</h3>
            <input name='password' type="password" placeholder='Password' onChange = {handleChange}></input>
            <input name='password' type="password" placeholder='Repeat your password'  onChange = {handleChange}>{Verificar()}</input>
        </div>
    )

}

export default NewPassword