// import React, {Fragment, useState} from 'react';
// import axios from 'axios';
// import { useDispatch, useSelector} from 'react-redux';
// import { actionFileUpload } from "../../redux/usersActions";


// const FileUpload = (props) => {
    
//     const {user} = props;
//     const dispatch = useDispatch();

//     const [file,setFile]= useState();
//     const [fileName, setFileName] = useState('ChooseFile');

//     const onChange  = e => {
//         setFile(e.target.files[0]);  // en teoria aca capturo el nombre del file
//         setFileName(e.target.files[0].name)
//     };

//     const onSubmit = async e =>{
//         e.preventdefault();   
//     }




// /* 
//     const img = useSelector(store => store.userReducer.img); */
// /* 
//     const [file,setFile]= useState();
//     const [fileName, setFileName] = useState('ChooseFile');
//     const [uploadedFile, setUploadedFile] = useState({}); //aca esta el objeto que mando del back


//     const onChange = e => {
//         setFile(e.target.files[0]);
//         setFileName(e.target.files[0].name)
//     };

//     const onSubmit = async e =>{
//         e.preventdefault();
//         const formData = new FormData(); // para enviar inputs del form se envia con 
//         formData.append('file',file); //del baack

//         try{
//         const res = await axios.post('/:upload', formData ,{
//             header: {
//                 'Content-Type':  'multipart/form-data'
//             }
//         });
//         const {fileName,filePath} = res.data;
//         setUploadedFile({fileName,filePath})

//         } catch(err) {

//             if(err.response.status === 500) {
//                 console.log('Hubo un problema con el servidor')
//             } else {
//                 console.log(err.response.data.msg)
//             }
//         }

//     } */

//     return(
      
//             <Fragment>
//                 <form onSubmit={onSubmit}>
//                 <div className="custom-file">
//                 <input 
//                 type="file" 
//                 className="custom-file-input" 
//                 id="customFile"  
//                 onChange={onChange}/>
//                 <label className="custom-file-label" htmlFor="customFile">
//                     {fileName}
//                 </label>
//                 </div>

//                 <input
//                 type='submit'
//                 value='upload' 
//                 className= 'btn btn-primary btn-block '
//                 onClick={event => {
//                     dispatch(actionFileUpload(fileName,file));
//                 }}
//                     />
//                 </form>
//             </Fragment>
     
//     )
// }



// export default FileUpload;