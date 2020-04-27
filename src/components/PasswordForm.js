import React from 'react'

export default class PasswordForm extends React.Component {
    constructor(props) {
        super(props);
        this.PWD = React.createRef();
        this.inputBtn = React.createRef();
        this.levelColors = ['darkred', 'red', 'orange', 'yellow', 'cyan', 'yellowgreen', 'green'];
        this.level = 0;
        this.passing = [];
        this.state = {
            passInput: '',
            finalScore: '',
            pwdColor: this.levelColors[0],
            testOutput: ''
        };
    }

    scorePasswordLogic = (pwd) => {
        let score = 0;
        this.passing = [];
        if (pwd.length >= 12) {
            score++;
            this.passing[0] = true;
        }
        if (/[a-z]/.test(pwd)) {
            score++;
            this.passing[1] = true;
        }
        if (/[A-Z]/.test(pwd)) {
            score++;
            this.passing[2] = true;
        }
        if (/[0-9]/.test(pwd)) {
            score++;
            this.passing[3] = true;
        }
        if (/[\[!#$()*+<=>?_{}\]~\-]/.test(pwd)) {
            score++;
            this.passing[4] = true;
        }
        this.level = score;
        if (score >= 5) {
            return score;
        } else {
            this.setState({
                finalScore: '',
                pwdColor: this.levelColors[this.level]
            });
            return false;
        }
    }

    freeOfErrors = (pwd) => {
        if (pwd.includes(' ')) {
            this.setState({
                finalScore: 'No spaces allowed',
                pwdColor: this.levelColors[1]
            });
            return false;
        } else if (pwd[0] === '!') {
            this.setState({
                finalScore: 'Cannot start with !',
                pwdColor: this.levelColors[1]
            });
            return false;
        } else if (pwd[0] === '?') {
            this.setState({
                finalScore: 'Cannot start with ?',
                pwdColor: this.levelColors[1]
            });
            return false;
        } else if (!/^[a-zA-Z0-9\[!#$()*+<=>?_{}\]~\-]*$/.test(pwd)) {
            this.setState({
                finalScore: 'Only letters, numbers, and these special characters: [ ] { } ( ) < > ! # $ * + – = ? _ ~',
                pwdColor: this.levelColors[1]
            });
            return false;
        }
        return true;
    }

    testOutput = () => {
        this.setState({
            testOutput: 'Length: ' + this.PWD.current.value.trim().length
        });
    }

    keyPressed = () => {
        this.testOutput()
        const passInput = this.PWD.current.value.trim();
        if (this.freeOfErrors(passInput)) {
            const score = this.scorePasswordLogic(passInput);
            if (score) {
                this.setState({
                    finalScore: 'Your password strength is sufficient ' + score,
                    pwdColor: this.levelColors[this.level]
                });
            }
        }
    }

    buttonClicked = () => {
        this.PWD.current.select();
        document.execCommand('copy');
    }

    checklist = () => (
        <ul style={{ textAlign: 'left' }}>
            <li style={{ color: this.passing[0] ? 'yellowgreen' : 'red' }}>at least 12 chracters</li>
            <li style={{ color: this.passing[1] ? 'yellowgreen' : 'red' }}>at least one lowercase letter</li>
            <li style={{ color: this.passing[2] ? 'yellowgreen' : 'red' }}>at least one uppercase letter</li>
            <li style={{ color: this.passing[3] ? 'yellowgreen' : 'red' }}>at least one number</li>
            <li style={{ color: this.passing[4] ? 'yellowgreen' : 'red' }}>at least one special character </li>
        </ul>
    )

    render() {
        return (
            <div class="wrapper">
                <h1>Test Password</h1>
                <p>To ensure your password meets minimum strength requirements,
                it should contain a random mix of letters, numbers and allowed special characters.
                This can be a word or brief phrase interrupted by special characters and numbers,
                or a completely random mix of values that meets the length requirement of 12.</p>
                <div class="form" >
                    <input ref={this.PWD} type="text" class="name" style={{ color: this.state.pwdColor }} placeholder="password" onKeyUp={this.keyPressed} />
                    <input ref={this.inputBtn} type="submit" class="submit" value="Copy" onClick={this.buttonClicked} />
                </div>
                <div style={{ paddingTop: "20px", color: this.state.pwdColor }} >{this.state.finalScore}</div>
                <div style={{ color: this.state.pwdColor }} >{this.checklist()}</div>
                <div style={{ color: "gray" }}>{this.state.testOutput}</div>
            </div>
        )
    }
}


/*
NEW: To ensure your password meets minimum strength requirements,
it should contain a random mix of letters, numbers and allowed special characters.
This can be a word or brief phrase interrupted by special characters and numbers,
or a completely random mix of values that meets the length requirement:

Examples:

Aspir!nW0rksB3st
R1!S#3T*8L9(

Your password must:

Be a minimum of 12 characters
Contain at least 1 character from each of these categories:
Uppercase letter (A-Z)
Lowercase letter (a-z)
Digit (0-9)
Special character  [ ! # $ ( ) * + – < = > ? _ { } ] ~
Your password must not:

Start with an ! or ? as the first character
Contain @ & % . , or any other special character not listed above
Contain your first, middle or last name, or user ID
Have been used as one of your last 10 passwords
Passwords must be changed every 49 days.
*/