import React from "react";
import * as axios from "axios";
import {connect} from "react-redux";
import s from "../AuthoReg.module.css";
let mapStateToProps = (state) => {
    return {
        registrationPage: state.registrationPage,
        serverLink: state.authorizationPage.serverLink
    }
}

let mapDispatchToProps = (dispatch) => {
    return {}
}


class FileUpload extends React.Component {

    // API Endpoints
    custom_file_upload_url = `http://${this.props.serverLink}/img`;


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
            formData.append('img', this.state.image_file);
            // the image field name should be similar to your api endpoint field name
            // in my case here the field name is customFile

            console.log( this.state.image_file)

            axios.post(
                this.custom_file_upload_url,
                formData,
                {
                    headers: {
                        "Authorization": "YOUR_API_AUTHORIZATION_KEY_SHOULD_GOES_HERE_IF_HAVE",
                        "Content-type": "multipart/form-data",
                    },
                }
            )
                .then(response => {
                    console.log(`Success` + response.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }


    // render from here
    render() {
        return (
            <div>
                {/* image preview */}
                <img className={s.loadedImg} src={this.state.image_preview} alt="image preview"/>

                {/* image input field */}
                <input
                    type="file"
                    onChange={this.handleImagePreview}
                />
                <label>Upload file</label>
                <input type="submit" onClick={this.handleSubmitFile} value="Submit"/>
            </div>
        );
    }
}

const FileUploadService = connect(mapStateToProps, mapDispatchToProps)(FileUpload);
export default FileUploadService