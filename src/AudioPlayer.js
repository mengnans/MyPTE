import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import './AudioPlayer.css';


export default class AudioPlayer extends Component {


    render() {
        let url = 'http://localhost:8080/%E7%BE%8A%E9%A9%BCPTE%E9%9F%B3%E9%A2%91WFD%20('
            + this.props.count + ').mp3';
        let width = window.innerWidth;
        width -= 40;

        return (
            <ReactPlayer
                className='react-player'
                controls
                playing
                volume = {1.0}
                width={width}
                height={35}
                url={url}
            />
        );
    }
}


