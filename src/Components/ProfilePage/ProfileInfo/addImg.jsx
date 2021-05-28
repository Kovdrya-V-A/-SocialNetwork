import React from "react";
import * as axios from "axios";
import {connect} from "react-redux";
import s from "./ProfileInfo.module.css"
import {
    setChangeAvaIsActiveActionCreator,
    setProfileInfoActionCreator
} from "../../../Redux/Reducers/ProfilePageReducer";

let mapStateToProps = (state) => {
    return {
        changeAvaIsActive: state.profilePage.changeAvaIsActive,
        registrationPage: state.registrationPage,
        serverLink: state.authorizationPage.serverLink
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setChangeAvaIsActive: (changeAvaIsActive) => {
            dispatch(setChangeAvaIsActiveActionCreator(changeAvaIsActive))
        },
        setProfileInfo: (profileData) => {
            dispatch(setProfileInfoActionCreator(profileData))
        },
    }
}


class FileUploadService extends React.Component {

    // API Endpoints
    custom_file_upload_url = `http://${this.props.serverLink}/uploadImg`;

    onSetChangeAvaIsActive = (changeAvaIsActive) => {
        this.props.setChangeAvaIsActive(changeAvaIsActive)
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
                    axios.get(`http://${this.props.serverLink}/authProfileInfo?token=${localStorage.getItem("userToken")}`)
                        .then(response => {
                            if (!response.data.error){
                                this.props.setProfileInfo(response.data)
                            }
                        })
                })
        }
    }


    // render from here
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
                    <input className={s.submitInput} type="submit" onClick={this.handleSubmitFile} value="Submit"/>
                </div>
                {/*<div className={s.exit}><p onClick={() => this.onSetChangeAvaIsActive(false)}>×</p></div>*/}
            </div>

        );
    }
}

const FileUploadContainer = connect(mapStateToProps, mapDispatchToProps)(FileUploadService);
export default FileUploadContainer