import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { web3 } from '../lib/web3';
import { Meteor } from 'meteor/meteor';

export default class Transaction extends Component {
    constructor() {
        super();

        this.state = {
            inputFormat: "byte",
        }
    }

    render() {
        let transaction = this.props.transactionData;
        let block = this.props.blockData;
        if (!transaction || !block) {
            return (<div/>);
        }
        return (
            <div className="panel-body">
                <table className="table">
                    <tr>
                        <td className="heading">
                            Hash
                        </td>
                        <td>{transaction.hash}</td>
                    </tr>
                    <tr>
                        <td className="heading">
                            Nonce
                        </td>
                        <td>{transaction.nonce}</td>
                    </tr>
                    <tr>
                        <td className="heading">
                            Index
                        </td>
                        <td>{transaction.transactionIndex}</td>
                    </tr>
                    <tr>
                        <td className="heading">
                            From
                        </td>
                        <td>{transaction.from}</td>
                    </tr>
                    <tr>
                        <td className="heading">
                            To
                        </td>
                        <td>{transaction.to}</td>
                    </tr>
                    <tr>
                        <td className="heading">
                            Time
                        </td>
                        <td>{block.timestamp + " " + new Date(block.timestamp * 1000).toGMTString() + "\n"}</td>
                    </tr>
                    <tr>
                        <td className="heading">
                            Gas
                        </td>
                        <td>{transaction.gas}</td>
                    </tr>
                    <tr>
                        <td className="heading">
                            Input
                        </td>
                        <td>
                    <textarea
                        className="solTextArea"
                        type="text"
                        readOnly
                        ref="textInput"
                        value={this.formateInput()}
                    />
                            <select ref="formatSelect" onChange={this.handleUpdateInputData.bind(this)}>
                                <option value="byte">Byte code</option>
                                <option value="ascii">Ascii</option>
                                <option value="hex">Ascii</option>
                                <option value="ascii3">Ascii</option>
                            </select>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }

    handleUpdateInputData() {
        this.refs.textInput.value = this.formateInput();
        if(!this.refs.formatSelect||this.state.inputFormat==this.refs.formatSelect.value){
            return;
        }
        this.setState({
            inputFormat: this.refs.formatSelect.value,
        });
    }

    formateInput(){
        let data = this.props.transactionData.input;
        switch (this.state.inputFormat) {
            case "ascii":
                data = web3.toAscii(data);
                break;
            case "ascii1":
                data = web3.fromDecimal(data);
                break;  q
            case "ascii3":
                data = web3.toAscii(web3.fromAscii(data));
                break;
        }
        return data;
    }
}


Transaction.propTypes = {
    transactionData: PropTypes.object,
    blockData:PropTypes.object,
};
