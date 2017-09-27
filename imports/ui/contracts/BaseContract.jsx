import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { web3 } from '../lib/web3';

export default class SimpleContract extends Component {
    constructor() {
        super();

        this.contractABI = [{
            "constant": false,
            "inputs": [],
            "name": "kill",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "greet",
            "outputs": [{"name": "", "type": "string"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{"name": "_greeting", "type": "string"}],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        }];
    }

    componentWillUnmount() {
    }

    componentWillUpdate() {
    }

    render() {
        return (
            <div className="components_balance">
                <div className="panel-heading">
                    My Balance
                </div>
                <div className="panel-body">
                    Current balance
                    <strong>{" " + this.state.balance.toString() + " "} </strong>
                    coins
                </div>
            </div>
        );
    }

    componentDidUpdate() {
    }
}


BalanceInfo.propTypes = {
};
