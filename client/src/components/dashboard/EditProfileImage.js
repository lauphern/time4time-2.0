import React, { Component } from 'react';
import Dropzone from 'react-dropzone'


class EditProfileImage extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() { 
        return (
            <div class="edit-image-modal">
            <h2>Drop and crop</h2>
            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                {({getRootProps, getInputProps}) => (
                    <section>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                    </section>
                )}
            </Dropzone>
            </div>
        );
    }
}
 
export default EditProfileImage;