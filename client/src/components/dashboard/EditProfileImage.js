// import React, { Component } from 'react';
// import Dropzone from 'react-dropzone'

import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import ReactCrop from 'react-image-crop';

import 'react-image-crop/lib/ReactCrop.scss';


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
    const [crop, setCrop] = useState({
        aspect: 1/1
    });

    const [croppedImageUrl, setCroppedImageUrl] = useState(null)

    const [imageRef, setImageRef] = useState(undefined)


    let fileUrl

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

    // CROP

    const onImageLoaded = image => {
        setImageRef(image)
    }

    const handleOnCrop = newCrop => {
        console.log("handle on crop")
        setCrop(newCrop)
    }

    // const handleImageLoaded = image => {
    //     console.log(image)
    // }

    const handleOnCropComplete = crop => {
        makeClientCrop(crop)
    }

    const makeClientCrop = async crop => {
        if (imageRef) {
            debugger
            const croppedImageUrl = await getCroppedImg(
                imageRef,
                crop,
                'newFile.jpeg'
            );
            // TODO revisar
            setCroppedImageUrl(croppedImageUrl)
        }
    }

    const getCroppedImg = (image, crop, fileName) => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
    
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
    
        return new Promise((resolve, reject) => {
          canvas.toBlob(blob => {
            if (!blob) {
                //reject(new Error('Canvas is empty'));
                console.error('Canvas is empty');
                return;
            }
            blob.name = fileName;
            window.URL.revokeObjectURL(fileUrl);
            fileUrl = window.URL.createObjectURL(blob);
            resolve(fileUrl);
          }, 'image/jpeg');
        });
    }

    const previewImg = files.map(file => (
        <div key={file.name}>
            <p>Preview</p>
            <ReactCrop
                src={file.preview}
                onImageLoaded={onImageLoaded}
                crop={crop}
                onChange={handleOnCrop}
                ruleOfThirds
                // onImageLoaded={handleImageLoaded}
                onComplete={handleOnCropComplete}
            />
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
            {previewImg}
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