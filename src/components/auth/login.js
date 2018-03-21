import React from 'react';
import axios from 'axios';
import createHistory from "history/createBrowserHistory"

const history = createHistory()

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.autenticar = this.autenticar.bind(this);
    }

    componentWillMount(){
        if(this.obterToken()){
            window.location.href = `http://${window.location.host}/cartoes`;
        }
    }

    autenticar(event) {
        event.preventDefault();
        const url = 'https://best-credit-card.herokuapp.com';
        axios
            .post(`${url}/v1/login`, {
                username: this.state.username,
                password: this.state.password
            })
            .then(res => {
                this.salvarToken(res.data.token);
                history.push('/cartoes');
                window.location.href = `http://${window.location.host}/cartoes`;
            })
            .catch(e => alert(e.response.data.message))
    }

    salvarToken(token) {
        localStorage.setItem('token', token);
    }

    obterToken() {
        return localStorage.getItem('token');
    }

    handleChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.autenticar} className='container text-center'>
                    <div>
                        <img alt="Segurança" src='https://privacy.google.com/images/animations/your-security/last-frame-1.svg' />
                    </div>
                    <input className='input email-input' type='text' placeholder='Login' value={this.state.username} onChange={this.handleChangeUsername.bind(this)} required />
                    <input className='input password-input' type='text' placeholder='Senha' value={this.state.password} onChange={this.handleChangePassword.bind(this)} required />
                    <button className='btn btn-primary'>Entrar</button>
                </form>
            </div>
        );
    }
}