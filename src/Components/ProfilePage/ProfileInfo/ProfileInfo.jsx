import s from './ProfileInfo.module.css'
import React from 'react';


class ProfileInfo extends React.Component {

    componentDidMount() {

        this.props.setProfileInfo(
            [{
                name: "Миша Пилипчук",
                address: "Под шконкой",
                date: "06.12.2004",
                imgSrc: "https://sun9-4.userapi.com/impg/ypBX4Cuuay8qJHUiOb_zlSr5EMhD0gvBcg02EA/tVlfxRvap6A.jpg?size=969x1080&quality=96&sign=673421d4f37e4b2bc82f2e6f83e834e1&type=album"
            }])

    }

    render() {


        return (
            <div className={s.profileInfo}>
                <div className={s.ava}>
                    <img alt="ava"
                         src={this.props.profilePage.profileData[0].imgSrc}/>
                </div>
                <div className={s.userData}>
                    <h4>{this.props.profilePage.profileData[0].name}</h4>
                    <p>Day of Birth: {this.props.profilePage.profileData[0].date}</p>
                    <p>Address: {this.props.profilePage.profileData[0].address}</p>
                </div>
            </div>
        )
    }
}

export default ProfileInfo;