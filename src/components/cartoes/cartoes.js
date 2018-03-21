import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import createHistory from "history/createBrowserHistory";

import CartaoListItem from './cartao-list-item';

const history = createHistory();

export default class Cartoes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartoes: [],
            url: 'https://best-credit-card.herokuapp.com'
        }
    }

    componentDidMount() {
        this.obterToken();
    }

    renderCartoes() {
        return this.state.cartoes.map((cartao, i) => <CartaoListItem key={i} {...cartao} />);
    }

    obterCartoes() {
        return axios
            .get(`${this.state.url}/v1/cards`, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
            .then(res => {
                this.state.cartoes = res.data;
                this.setState({ cartoes: res.data })
                this.renderCartoes()
            })
            .catch(e => alert(e));
    }

    deslogar(history) {
        localStorage.clear();
        history.push('/login');
    }

    obterToken() {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Você precisa estar autenticado.')
            history.push('/login');
            window.location.href = `http://${window.location.host}/login`;
            return;
        }
        this.token = token;
        return this.obterCartoes();
    }

    render() {
        const Button = withRouter(({ history }) => (
            <button className="btn btn-primary" type='button' onClick={() => { this.deslogar(history) }}>Deslogar</button>
        ))

        return (
            <div className='container'>
                <h1 className='text-center'>Cartões</h1>

                <Button />
                <table className='table is-bordered'>
                    <thead>
                        <tr>
                            <th className='center-align bordas-titulo'>Numero</th>
                            <th className='center-align bordas-titulo'>Data Vencimento</th>
                            <th className='center-align bordas-titulo'>CVV</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderCartoes()}
                    </tbody>
                </table>
            </div>
        );
    }
}