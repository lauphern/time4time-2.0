import React, { Component } from "react";
import DirectMessages from "../../components/dashboard/messages/DirectMessages";
import UserSettings from "../../components/dashboard/UserSettings";
import MyProfile from "../../components/dashboard/MyProfile";
import Activity from "../../components/dashboard/Activity";

import "./UserDashboard.scss";

class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSection: "activity",
      // TODO notifications
      petitionsNotification: false,
      myOffers: false,
      messages: [],
      activeMenuItems: [true, false, false, false, false]
    };
    this.openSection = this.openSection.bind(this);
  }
  openSection(selectedSection) {
    this.setState({ activeSection: selectedSection });
    //This switch case is for selecting the active item in the menu
    switch (selectedSection) {
      case "activity":
        this.setState({ activeMenuItems: [true, false, false, false] });
        break;
      case "messages":
        this.setState({ activeMenuItems: [false, true, false, false] });
        break;
      case "profile":
        this.setState({ activeMenuItems: [false, false, true, false] });
        break;
      case "settings":
        this.setState({ activeMenuItems: [false, false, false, true] });
        break;
      default:
        this.setState({ activeMenuItems: [true, false, false, false] });
    }
  }
  notificationControl = (dataFromRequest, statusControl) => {
    let checkOffers = [];
    switch (statusControl) {
      case "offers":
        for (var i = 0; i < dataFromRequest.length; i++) {
          if (dataFromRequest[i].status === "Pending")
            checkOffers.push("new offer");
        }
        if (checkOffers.length > 0) return this.setState({ myOffers: true });
        else return this.setState({ myOffers: false });
      case "petitions":
        for (var j = 0; j < dataFromRequest.length; j++) {
          if (dataFromRequest[j].status === "Approved")
            checkOffers.push("new offer");
        }
        if (checkOffers.length > 0)
          return this.setState({ petitionsNotification: true });
        else return this.setState({ petitionsNotification: false });
      default:
        return null;
    }
  };

  cleanNotif = sectionNotif => {
    if (sectionNotif === "offers") this.setState({ myOffers: false });
    else if (sectionNotif === "petitions")
      this.setState({ petitionsNotification: false });
  };
  
  render() {
    return (
      <div className="user-dashboard">
        <aside>
          <ul>
            {/* TODO do notifications */}
            <li>
              <a
                className={
                  this.state.activeMenuItems[0] ? "is-active" : "inactive"
                }
                onClick={() => {
                  this.openSection("activity");
                }}
              >
                <span>
                  <i className="fas fa-th-large"></i> Activity
                </span>
              </a>
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
              <a
                className={
                  this.state.activeMenuItems[1] ? "is-active" : "inactive"
                }
                onClick={() => {
                  this.openSection("messages");
                }}
              >
                <span>
                  <i className="fas fa-comments"></i> Chat
                </span>
              </a>
            </li>
            <li>
              <a
                className={
                  this.state.activeMenuItems[2] ? "is-active" : "inactive"
                }
                onClick={() => {
                  this.openSection("profile");
                }}
              >
                <span>
                  <i className="fas fa-user-alt"></i> Profile
                </span>
              </a>
            </li>
            <li>
              <a
                className={
                  this.state.activeMenuItems[3] ? "is-active" : "inactive"
                }
                onClick={() => {
                  this.openSection("settings");
                }}
              >
                <span>
                  <i className="fas fa-sliders-h"></i> Settings
                </span>
              </a>
            </li>
          </ul>
        </aside>
        <div className="dashboard-content">
          {(() => {
            //this switch case is used to open the selected section when you click the menu item
            switch (this.state.activeSection) {
              case "activity":
                return (
                  <Activity
                    cleanNotif={this.cleanNotif}
                  />
                );
              case "messages":
                return <DirectMessages />;
              case "profile":
                return <MyProfile />;
              case "settings":
                return (
                  <UserSettings
                    {...this.props}
                    openSection={this.openSection}
                  />
                );
              default:
                return (
                  <Activity
                    cleanNotif={this.cleanNotif}
                  />
                );
            }
          })()}
        </div>
      </div>
    );
  }
}

export default UserDashboard;
