import React from 'react';

export default class CartaoListItem extends React.Component {
    render() {
        if(!this.props)
            return <div>Carregando</div>
        return (
            <tr>
                <td className='center-align'>
                    {this.props.number}
                </td>
                <td className='center-align'>
                    {this.props.expiration_month}/{this.props.expiration_year}
                </td>
                <td className='center-align'>
                    {this.props.cvv}
                </td>
            </tr>
        );
    }
}