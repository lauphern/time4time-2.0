// import React, { Component } from 'react';
// import Dropzone from 'react-dropzone'

import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';


// class EditProfileImage extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {

//         }
//     }

//     handleOnDrop = (acceptedFiles) => {
//         console.log(acceptedFiles)
//     }

//     render() { 
//         return (
//             <div class="edit-image-modal">
//             <h2>Drop and crop</h2>
//             <Dropzone 
//                 onDrop={this.handleOnDrop}
//             >
//                 {({getRootProps, getInputProps}) => (
//                     <section>
//                     <div {...getRootProps()}>
//                         <input {...getInputProps()} />
//                         <p>Drag 'n' drop some files here, or click to select files</p>
//                     </div>
//                     </section>
//                 )}
//             </Dropzone>
//             </div>
//         );
//     }
// }


//Using React Hooks
function EditProfileImage(props) {

    const [files, setFiles] = useState([]);

    const maxSize = 10000000000

    const handleAcceptedFiles = acceptedFiles => {
        alert("accepted files")
        console.log(acceptedFiles)
    }

    const handleRejectedFiles = rejectedFiles => {
        if(rejectedFiles[0].size > maxSize) {
            alert(`The file is too big, the maximum size is ${maxSize}`)
        } else alert("rejected files")
        console.log(rejectedFiles)
    }

    const {acceptedFiles, rejectedFiles, getRootProps, getInputProps} = useDropzone({
        accept: 'image/jpeg, image/png',
        multiple: false,
        maxSize: maxSize,
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
              preview: URL.createObjectURL(file)
            })));
        },
        onDropAccepted: handleAcceptedFiles,
        onDropRejected: handleRejectedFiles
    });

    const thumbs = files.map(file => (
        <div key={file.name}>
          <div>
            <img
              src={file.preview}
            />
          </div>
        </div>
      ));
    
      useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
      }, [files]);

    const acceptedFilesItems = acceptedFiles.map(file => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));
  
    const rejectedFilesItems = rejectedFiles.map(file => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));

    
  
    return (
      <section className="container">
        <div {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
          <em>(Only *.jpeg and *.png images will be accepted)</em>
        </div>
        <aside>
            {thumbs}
          <h4>Accepted files</h4>
          <ul>
            {acceptedFilesItems}
          </ul>
          <h4>Rejected files</h4>
          <ul>
            {rejectedFilesItems}
          </ul>
        </aside>
      </section>
    );
  }
 
export default EditProfileImage;