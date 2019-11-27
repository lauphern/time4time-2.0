import React, { Component, useState } from 'react';
import customAxios from '../../utils/customAxios';
import EditProfileImage from "./EditProfileImage"

// TODO asegurarme de que subir foto es opcional y que no crash si no la suben

// function Test(props){
//     const [test, setTest] = useState(1)
//     if(test) {
//         debugger
//     }
//     return (
//         <>
//             <h1>This is the variable from your state: {test}</h1>
//             <button onClick={() => setTest(test + 1)}>Click meeeeh</button>
//         </>
//     )
// }

class UserSettings extends Component {
    constructor(props) {
        super(props)
        this.form = React.createRef()
    }
    state = {
        email: '',
        bio: '',
        user: [],
        error: ''
    }
    handleInput = (event)=> {
        let myInput = {} //empty object
        myInput[event.target.name] = event.target.value
        this.setState(myInput)
    }

    // handleSubmitProfileImage = (event) => {
    //     event.preventDefault();
    //     // TODO revisar que funciona que this esta bound
    //     let formData = new FormData(this.form.current) 
    //     customAxios({
    //         method: 'post',
    //         url: '/profile-image',
    //         config: { headers: {'Content-Type': 'multipart/form-data' }},
    //         data: formData
    //     }).then(() => {
    //         this.props.openSection('profile')
    //         this.props.history.push('/dashboard')

    //     }).catch(err => {
    //         this.setState({error: 'Could not edit personal information'})
    //     })
    // }
    handleSubmitProfileImage = (blob) => {
        debugger
        customAxios({
            method: 'post',
            url: '/profile-image',
            config: { headers: {'Content-Type': 'multipart/form-data' }},
            data: blob
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
                                {/* <Test /> */}
                                <div>
                                    <form ref={this.form} onSubmit={this.handleSubmitProfileImage}>
                                        <div>
                                        <label>Image</label>
                                            <div>
                                                <input onChange={this.handleInput} name='profile-image' type="file"/>
                                            </div>
                                        </div>
                                        <p style={{color: 'red'}}>{this.state.error? this.state.error:''}</p>
                                        <button value="submit">Edit profile image</button>
                                    </form>
                                </div>
                                <div>
                                    <form onSubmit={this.handleSubmitPersonalInfo}>
                                        <div>
                                            <div>
                                                <p>{this.state.user.firstname}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                            <p>{this.state.user.lastname}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                            <p>{this.state.user.username}</p>
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
                                            <p>{this.state.user.birth}</p>
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