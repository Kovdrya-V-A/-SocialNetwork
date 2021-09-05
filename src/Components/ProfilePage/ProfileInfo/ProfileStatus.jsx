import React from "react"
import s from "./ProfileInfo.module.css"

class ProfileStatus extends React.PureComponent {

    state = {
        status: this.props.status,
        editMode: false,
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    onStatusTextChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })

    }

    activateEditMode = () => {
        this.setState({
            editMode:true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
    }

    onSetNewStatus = () => {
        this.deactivateEditMode()
        this.props.onSetNewStatus(this.state.status)

    }

    render() {
        return <div className={s.ProfileStatus}>
            {!this.state.editMode ? <div>
                <span className={s.statusValue} onDoubleClick={this.activateEditMode}>
                    {this.props.status}
                </span>
            </div> : <div className={s.inputStatusArea}>
                <input onChange={this.onStatusTextChange} autoFocus={true} onBlur={this.onSetNewStatus} className={s.inputStatus} value={this.state.status}></input>
            </div>}


        </div>
    }
}

export default ProfileStatus