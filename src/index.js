import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import state, {bonkRerender} from './Redux/State';
import ReactDOM from "react-dom";
import App from "./App";
import {addPost, massageTextChange, postTextChange, sendMassage} from "./Redux/State";
export let rerender = (props) => {
    ReactDOM.render(
        <React.StrictMode>
            <App state = {state}
                 sendMassage = {sendMassage}
                 addPost = {addPost}
                 postTextChange = {postTextChange}
                 massageTextChange = {massageTextChange}/>
            {/*<AutoReg/>*/}

        </React.StrictMode>,
        document.getElementById('root')
    );
}
rerender (state)

bonkRerender(rerender)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();