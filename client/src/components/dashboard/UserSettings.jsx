import React, { Component } from 'react';
import customAxios from '../../utils/customAxios';
import EditProfileImage from "./EditProfileImage"
import { getUser } from '../../utils/authMethods'
// TODO asegurarme de que subir foto es opcional y que no crash si no la suben



class UserSettings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            bio: '',
            error: ''
        }
    }

    handleInput = (event)=> {
        let myInput = {}
        myInput[event.target.name] = event.target.value
        this.setState(myInput)
    }

    handleSubmitProfileImage = (event, blob) => {
        event.preventDefault();
        let formData = new FormData()
        formData.append('profile-image', blob);
        customAxios({
            method: 'post',
            url: '/profile-image',
            config: { headers: {'Content-Type': 'multipart/form-data' }},
            data: formData
        }).then(() => {
            this.props.openSection('profile')
            this.props.history.push('/dashboard')

        }).catch(err => {
            this.setState({error: 'Could not edit personal information'})
        })
    }

    handleSubmitPersonalInfo = (event) => {
        event.preventDefault();
        let editUser = this.state
        customAxios({
            method: 'post',
            url: '/user-settings',
            data: editUser
        }).then(() => {
            this.props.openSection('profile')
            this.props.history.push('/dashboard')
        }).catch(err => {
            this.setState({error: 'Could not edit personal information'})
        })
    }

    render() { 
        return (
                <section>
                    <div>
                        <h3>User's settings</h3>
                        <EditProfileImage handleSubmitProfileImage={this.handleSubmitProfileImage}/>
                        <div>
                            <form onSubmit={this.handleSubmitPersonalInfo}>
                                <div>
                                    <div>
                                        <p>First name: {getUser().firstname}</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <p>Last name: {getUser().lastname}</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <p>Username: {getUser().username}</p>
                                    </div>
                                </div>
                                <div>
                                    <label>Bio</label>
                                    <div>
                                    <div>
                                        <textarea onChange={this.handleInput} 
                                        name='bio' placeholder="Describe yourself in max 250 characters" 
                                        maxLength="250"
                                        value={this.state.bio}/>
                                    </div>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <input onChange={this.handleInput} type="email" name="email" placeholder="e-mail" value={this.state.email}/>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <p>Date of birth: {getUser().birth}</p>
                                    </div>
                                </div>
                                <div>
                                    <p>
                                        <input onChange={this.handleInput} type="password" name="password" placeholder="Password" value={this.state.password} pattern="^[a-zA-Z0-9]{8,}$" title="At least 8 characters"/>
                                        <span>
                                        <i className="fa fa-lock" aria-hidden="true"></i>
                                        </span>
                                    </p>
                                </div>
                                <p style={{color: 'red'}}>{this.state.error? this.state.error:''}</p>
                                <button value="submit">Edit personal information</button>
                            </form>
                        </div>
                    </div>
                </section>
        );
    }
}
 
export default UserSettings;