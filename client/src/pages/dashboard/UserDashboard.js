import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import DirectMessages from '../../components/dashboard/messages/DirectMessages'
import UserSettings from '../../components/dashboard/UserSettings'
import MyProfile from '../../components/dashboard/MyProfile'
import Activity from '../../components/dashboard/Activity'

import customAxios from '../../utils/customAxios';

import "./UserDashboard.scss"

class UserDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeSection: 'activity',
            petitionsNotification: false,
            listOfPetitions: [],
            myOffers: false,
            listOfMyOffers: [],
            messages: [],
            activeMenuItems: [true, false, false, false, false]
        }
        this.openSection = this.openSection.bind(this)
    }
    openSection(selectedSection) {
        this.setState({activeSection: selectedSection})
        //This switch case is for selecting the active item in the menu
        switch(selectedSection) {
            case 'activity':
                this.setState({activeMenuItems: [true, false, false, false]})
                break;
            case 'messages':
                this.setState({activeMenuItems: [false, true, false, false]})
                break;
            case 'profile':
                this.setState({activeMenuItems: [false, false, true, false]})
                break;
            case 'settings':
                this.setState({activeMenuItems: [false, false, false, true]})
                break;
            default:
                this.setState({activeMenuItems: [true, false, false, false]})
        }
    }
    notificationControl = (dataFromRequest, statusControl) => {
        let checkOffers = []
        switch(statusControl) {
            case 'offers':
                for(var i = 0; i < dataFromRequest.length; i++) {
                    if(dataFromRequest[i].status === 'Pending') checkOffers.push('new offer')
                }
                if(checkOffers.length > 0) return this.setState({myOffers: true})
                else return this.setState({myOffers: false})
            case 'petitions':
                for(var j = 0; j < dataFromRequest.length; j++) {
                    if(dataFromRequest[j].status === 'Approved') checkOffers.push('new offer')
                }
                if(checkOffers.length > 0) return this.setState({petitionsNotification: true})
                else return this.setState({petitionsNotification: false})
            default:
            return null
        }
    }
    getMyOffers = () => {
        customAxios({
            method: "get",
            url: "/my-offers"
          })
          .then(responseFromApi => {
            this.setState({
              listOfMyOffers: responseFromApi.data,
            })
            this.notificationControl(responseFromApi.data, 'offers')
          })
    }
    getMyPetitions = () =>{
        customAxios({
          method: "get",
          url: "/my-petitions"
        })
        .then(responseFromApi => {
          this.setState({
            listOfPetitions: responseFromApi.data,
          })
          this.notificationControl(responseFromApi.data, 'petitions')
        })
    }
    cleanNotif = (sectionNotif) => {
        if(sectionNotif === 'offers') this.setState({myOffers: false})
        else if(sectionNotif === 'petitions') this.setState({petitionsNotification: false})
    }
    componentDidMount(){
        this.getMyPetitions()
        this.getMyOffers()
    }
    render() { 

        return (
            <div className="user-dashboard">
                <aside>
                    <ul>
                        {/* TODO do notifications */}
                        <li>
                            <Link className={this.state.activeMenuItems[0] ? "is-active" : "inactive"} onClick={()=> {this.openSection('activity')}}>
                                <span><i className="fas fa-th-large"></i> Activity</span>
                            </Link>
                        </li>
                        {/* <li>
                            {this.state.myOffers ?
                                <Link className={this.state.activeMenuItems[0] ? "is-active" : "has-notification"} onClick={()=> {this.openSection('all requests')}}>
                                    <span><i className="fas fa-th-large"></i> My offers &nbsp;<i className="fas fa-bell"></i></span>
                                </Link>
                                :
                                <Link className={this.state.activeMenuItems[0] ? "is-active" : "inactive"} onClick={()=> {this.openSection('all requests')}}>
                                    <span><i className="fas fa-th-large"></i> My offers &nbsp;<i className="fas fa-bell-slash"></i></span>
                                </Link>
                            }
                        </li>
                        <li>
                            {this.state.petitionsNotification ?
                                <Link className={this.state.activeMenuItems[1] ? "is-active" : "has-notification"} onClick={()=> {this.openSection('my petitions')}}>
                                    <span><i className="fas fa-th-large"></i> My petitions &nbsp;<i className="fas fa-bell"></i></span>
                                </Link>
                                :
                                <Link className={this.state.activeMenuItems[1] ? "is-active" : "inactive"} onClick={()=> {this.openSection('my petitions')}}>
                                    <span><i className="fas fa-th-large"></i> My petitions &nbsp;<i className="fas fa-bell-slash"></i></span>
                                </Link>
                            }
                        </li> */}
                        <li>
                            <Link className={this.state.activeMenuItems[1] ? "is-active" : "inactive"} onClick={()=> {this.openSection('messages')}}>
                                <span><i className="fas fa-comments"></i> Chat</span>
                            </Link>
                        </li>
                        <li>
                            <Link className={this.state.activeMenuItems[2] ? "is-active" : "inactive"} onClick={()=> {this.openSection('profile')}}>
                                <span><i className="fas fa-user-alt"></i> Profile</span>
                            </Link>
                        </li>
                        <li>
                            <Link className={this.state.activeMenuItems[3] ? "is-active" : "inactive"} onClick={()=> {this.openSection('settings')}}>
                                <span><i className="fas fa-sliders-h"></i> Settings</span>
                            </Link>
                        </li>
                    </ul>
                </aside>
                <div className="dashboard-content">
                {(() => {
                    //this switch case is used to open the selected section when you click the menu item
                    /* TODO combinar offers, petitions y (en el futuro) offers bookmarked */
                    switch(this.state.activeSection) {
                        case 'activity':
                            return <Activity {...this.props} {...this.state} cleanNotif={this.cleanNotif} updateOffers={this.getMyOffers} listOfMyOffers={this.state.listOfMyOffers} listOfPetitions={this.state.listOfPetitions}/>;
                        case 'messages':
                            return <DirectMessages/>
                        case 'profile':
                            return <MyProfile />
                        case 'settings':
                            return <UserSettings {...this.props} openSection={this.openSection}/>
                        default:
                            return <Activity {...this.props} {...this.state} cleanNotif={this.cleanNotif} updateOffers={this.getMyOffers} listOfMyOffers={this.state.listOfMyOffers} listOfPetitions={this.state.listOfPetitions}/>;
                    }
                })()}
                </div>
            </div>
        );
    }
}

export default UserDashboard;