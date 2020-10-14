import React from 'react'
import { useSelector } from 'react-redux';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import './ChatBot.css'

const ChatCustomer = () => {

    const theme = {
        background: 'rgba(74, 74, 74, 0.75);',
        fontFamily: 'Roboto',
        headerBgColor: 'rgb(255, 255, 255)',
        headerFontColor: 'rgb(74, 74, 74)',
        headerFontSize: '8px',
        botBubbleColor: 'rgb(74, 74, 74)',
        botFontColor: '#fff',
        userBubbleColor: 'rgb(74, 74, 74)',
        userFontColor: '#fff',
    };
    return (
        <ThemeProvider theme={theme}>
            <ChatBot className='chatBot'
                floating={true}
                hideSubmitButton={true}
                hideBotAvatar={true}
                handleEnd={() => { }}
                cache={false}
                placeholder={''}
                headerTitle={''}
                steps={[
                    {
                        id: '1',
                        message: `Hola! Como puedo ayudarte?`,
                        trigger: '2',
                    },
                    {
                        id: '2',
                        options: [
                            { value: 1, label: 'No puedo ver mi orden', trigger: '3' },
                            { value: 2, label: 'No recuerdo mi contraseña', trigger: '4' },
                            { value: 3, label: 'Quiero realizar un reclamo', trigger: '5' },
                            { value: 4, label: 'Mi consulta no esta aca', trigger: '6' }
                        ],
                    },
                    {
                        id: '3',
                        message: `Hace click en el icono de CARRITO que esta arriba a la derecha`,
                        trigger: '2'
                    },
                    {
                        id: '4',
                        message: 'Ingresá al botón Login y hace click en OLVIDE MI CONTRASEÑA',
                        trigger: '2'
                    },
                    {
                        id: '5',
                        message: 'Podes contactarte con nosotros mandandonos un mail a lacoseria@gmail.com',
                        trigger: '2'
                    },
                    {
                        id: '6',
                        message: 'No puedo ayudarte, pero contactanos mediante un mail a lacoseria@gmail.com',
                        trigger: '2'
                    },
                ]}
            />
        </ThemeProvider>
    )


}

export default ChatCustomer