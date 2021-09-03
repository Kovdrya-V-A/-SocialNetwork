import React from 'react';
import s from './Settings.module.css'
import {CheckAuthRedirect} from "../../HOC/CheckAuth";
import {connect} from "react-redux";
import {compose} from "redux";


let mapStateToProps = (state) => {
    return {
    }
}

class SettingsContainer extends  React.Component {
    render() {
        return <Settings/>
    }
}


const Settings = () => {
    return (
        <div className={s.settings}>
            <h1>СТРАНИЦА НАСТРОЕК (В РАЗРАБОТКЕ)</h1>
        </div>
    )
}

export default compose(
    connect(mapStateToProps, {}),
    CheckAuthRedirect
)(SettingsContainer)
