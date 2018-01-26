import React, {Component} from 'react';
import './App.css';
import AudioPlayer from './AudioPlayer';
import {Button} from 'reactstrap';
import {InputGroup, Input, Badge} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import answers from './Answers';


export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            MAX_COUNT: 236,
            inputValue: '',
            correctedAnswer: '',
            newCountValue: 1,
        }
    }

    handleNextButtonClicked = () => {
        let newCount = this.state.count;
        newCount++;
        if (newCount > this.state.MAX_COUNT) {
            newCount = 1;
        }
        this.setState({count: newCount, correctedAnswer: '', inputValue: '',});
    };

    handlePreviousButtonClicked = () => {
        let newCount = this.state.count;
        newCount--;
        if (newCount < 1) {
            newCount = this.state.MAX_COUNT;
        }
        this.setState({count: newCount, correctedAnswer: '', inputValue: '',});
    };

    handleSubmitButtonClicked = () => {
        let correctAnswer = answers[this.state.count];
        let myAnswer = this.state.inputValue;
        correctAnswer = correctAnswer.replace(',','');
        myAnswer = myAnswer.replace(',','');
        let correctTokens = correctAnswer.split(' ');
        let correctLength = correctTokens.length;
        let myTokens = myAnswer.split(' ');
        let index = 0;
        let searchNumber = 3;
        let boolArray = new Array(correctLength);
        for(let i = 0; i < correctLength; i ++){
            boolArray[i] = false;
        }

        let correctedAnswer = <span></span>;

        for(let i = 0; i < correctTokens.length; i++){
            let correctToken = correctTokens[i];

            for(let j = index; j < myTokens.length && j < index + searchNumber; j++){
                let myToken = myTokens[j];
                if(myToken === correctToken){
                    boolArray[i] = true;
                    index = j;
                    break;
                }
            }

            if(boolArray[i]){
                correctedAnswer += <span className={'correct-answer'}>{correctToken}</span>
            }
            else{
                correctedAnswer += <span className={'false-answer'}>{correctToken}</span>
            }
        }

        correctedAnswer = <span></span>;


        this.setState({
            correctedAnswer: correctedAnswer,
        });

    };


    handleJumpButtonClicked = () => {
        let newCount = this.state.newCountValue;
        if(newCount > this.state.MAX_COUNT || newCount < 1){
            newCount  = 0;
        }
        this.setState({count: newCount, correctedAnswer: '', inputValue: '',});

    };

    updateInputValue = (evt) => {
        this.setState({
            inputValue: evt.target.value,
        });

    };

    updateCountValue = (evt) => {
        this.setState({
            newCountValue: evt.target.value,
        });

    };

    render() {

        return (
            <div className="App">
                <AudioPlayer count={this.state.count}/>

                <Button  className={'my-button'} color="primary" onClick={this.handlePreviousButtonClicked}>Previous</Button>
                <Button color="primary" onClick={this.handleNextButtonClicked}>Next</Button>

                <h5>{'' + this.state.count + '/' + this.state.MAX_COUNT}
                </h5>
                <InputGroup>
                    <Input  value={this.state.newCountValue} onChange={this.updateCountValue}
                           placeholder="new count"/>
                </InputGroup>
                <Button className={'my-button'} color="primary" onClick={this.handleJumpButtonClicked}>Jump</Button>
                <Button color="primary" onClick={this.handleSubmitButtonClicked}>Submit</Button>
                <InputGroup className={'input-group'}>
                    <Input autoFocus className={'input'} value={this.state.inputValue} onChange={this.updateInputValue}
                           placeholder="your answer"/>
                </InputGroup>


                <h4>
                    <div className="answer">{this.state.inputValue}</div>
                    <Badge color="secondary"></Badge></h4>
                <h4>
                    <div className="correct-answer">{this.state.correctedAnswer}</div>
                    <Badge color="secondary"></Badge></h4>

            </div>
        );
    }
}

