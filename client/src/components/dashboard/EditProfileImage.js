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
                <Dropzone>Drop file here</Dropzone>
            </div>
        );
    }
}
 
export default EditProfileImage;