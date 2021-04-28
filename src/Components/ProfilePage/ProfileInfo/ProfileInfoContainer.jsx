import React from 'react';
import {connect} from "react-redux";
import ProfileInfo from "./ProfileInfo";
import {setProfileInfoActionCreator} from "../../../Redux/Reducers/ProfilePageReducer";
import * as axios from "axios";


let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage,
        serverLink: state.authorizationPage.serverLink
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setProfileInfo: (profileData) => {
            dispatch(setProfileInfoActionCreator(profileData))
        }
    }
}

class ProfileInfoService extends React.Component {

    componentDidMount() {
        axios.get(`http://${this.props.serverLink}/authProfileInfo?token=${localStorage.getItem("userToken")}`)
            .then(response => {
                this.props.setProfileInfo(response.data)
            })
        // name: "Миша Пилипчук",
        // address: "Под шконкой",
        // date: "06.12.2004",
        // img: "https://sun9-4.userapi.com/impg/ypBX4Cuuay8qJHUiOb_zlSr5EMhD0gvBcg02EA/tVlfxRvap6A.jpg?size=969x1080&quality=96&sign=673421d4f37e4b2bc82f2e6f83e834e1&type=album"
    }

    render() {
        return (
            <ProfileInfo profileData = {this.props.profilePage.profileData}/>
        )
    }
}

const ProfileInfoContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileInfoService)

export default ProfileInfoContainer;