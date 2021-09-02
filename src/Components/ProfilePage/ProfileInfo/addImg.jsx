import React from "react";
import * as axios from "axios";
import {connect} from "react-redux";
import s from "./ProfileInfo.module.css"

import {serverLink} from "../../../DAL/ApiRequests";
import {setChangeAvaIsActive, setChangeAvaStatus} from "../../../Redux/Reducers/ProfilePageReducer";

let mapStateToProps = (state) => {
    return {
        changeAvaIsActive: state.profilePage.changeAvaIsActive,
        changeAvaStatus: state.profilePage.changeAvaStatus,
        registrationPage: state.registrationPage,
        serverLink: state.authorizationPage.serverLink,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setChangeAvaIsActive: (changeAvaIsActive) => {
            dispatch(setChangeAvaIsActive(changeAvaIsActive))
        },
        setChangeAvaStatus: (status) => {
            dispatch(setChangeAvaStatus(status))
        },
    }
}


class FileUploadService extends React.Component {

    custom_file_upload_url = `${serverLink}/uploadImg`;

    onSetChangeAvaIsActive = (changeAvaIsActive) => {
        this.props.setChangeAvaIsActive(changeAvaIsActive)
        if (!changeAvaIsActive && this.props.changeAvaStatus) {
            window.location.reload()
        }
    }

    onSetChangeAvaStatus = (status) => {
        this.props.setChangeAvaStatus(status)
    }

    constructor(props) {
        super(props);
        this.state = {
            image_file: null,
            image_preview: '',
        }
    }

    // Image Preview Handler
    handleImagePreview = (e) => {
        let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image_as_files = e.target.files[0];

        this.setState({
            image_preview: image_as_base64,
            image_file: image_as_files,
        })
    }

    // Image/File Submit Handler
    handleSubmitFile = () => {

        if (this.state.image_file !== null) {
            let formData = new FormData();
            formData.append('file', this.state.image_file,);
            formData.append('token', localStorage.getItem("userToken"))
            // the image field name should be similar to your api endpoint field name
            // in my case here the field name is customFile


            axios.post(
                this.custom_file_upload_url,
                formData,
                {
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "multipart/form-data",
                    },
                }
            )
                .then(response => {
                    this.onSetChangeAvaStatus(response.data.message || response.data.error)
                })
        }
    }


    render() {
        return (
            <div className={s.modal} onClick={() => this.onSetChangeAvaIsActive(false)}>
                <div className={s.modalContent} onClick={e => e.stopPropagation()}>
                    <div className={s.modalName}><p>Загрузка нового фото</p></div>
                    <input
                        className={s.addImgInput}
                        type="file"
                        onChange={this.handleImagePreview}/>
                    <img className={s.loadedImg} src={this.state.image_preview}/>
                    <div className={s.changeAvaStatus}><p>{this.props.changeAvaStatus}</p></div>
                    <input className={s.submitInput} type="submit" onClick={this.handleSubmitFile} value="Загрузить"/>
                </div>
            </div>

        );
    }
}

const FileUploadContainer = connect(mapStateToProps, mapDispatchToProps)(FileUploadService);
export default FileUploadContainer