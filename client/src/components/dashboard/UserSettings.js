import React, { Component } from 'react';
import customAxios from '../../utils/customAxios';

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

    handleSubmitProfileImage = (event) => {
        event.preventDefault();
        let formData = new FormData(this.form.current) 
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
                            <div className="column">
                                <h3 className="title has-text-grey">User's settings</h3>
                                <div className="box">
                                    <form ref={this.form} onSubmit={this.handleSubmitProfileImage}>
                                        <div className="field">
                                        <label className="label">Image</label>
                                            <div className="control">
                                                <input onChange={this.handleInput} name='profile-image' className="input" type="file"/>
                                            </div>
                                        </div>
                                        <p style={{color: 'red'}}>{this.state.error? this.state.error:''}</p>
                                        <button className="button is-block is-large is-fullwidth" value="submit">Edit profile image</button>
                                    </form>
                                </div>
                                <div className="box">
                                    <form onSubmit={this.handleSubmitPersonalInfo}>
                                        <div className="field">
                                            <div className="control">
                                                <p>{this.state.user.firstname}</p>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <div className="control">
                                            <p>{this.state.user.lastname}</p>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <div className="control">
                                            <p>{this.state.user.username}</p>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <label className="label">Bio</label>
                                            <div className="control has-icons-left has-icons-right">
                                            <div className="control">
                                                <textarea onChange={this.handleInput} 
                                                name='bio' className="textarea" placeholder="Describe yourself in max 250 characters" 
                                                maxLength="250"
                                                value={this.state.bio}/>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <div className="control">
                                                <input onChange={this.handleInput} className="input is-large" type="email" name="email" placeholder="e-mail" value={this.state.email}/>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <div className="control">
                                            <p>{this.state.user.birth}</p>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <p className="control has-icons-left">
                                                <input onChange={this.handleInput} className="input is-large" type="password" name="password" placeholder="Password" value={this.state.password} pattern="^[a-zA-Z0-9]{8,}$" title="At least 8 characters"/>
                                                <span className="icon is-small is-left">
                                                <i className="fa fa-lock" aria-hidden="true"></i>
                                                </span>
                                            </p>
                                        </div>
                                        <p style={{color: 'red'}}>{this.state.error? this.state.error:''}</p>
                                        <button className="button is-block is-large is-fullwidth" value="submit">Edit personal information</button>
                                    </form>
                                </div>
                            </div>
                </section>
        );
    }
}
 
export default UserSettings;