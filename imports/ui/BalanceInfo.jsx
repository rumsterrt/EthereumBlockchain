import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { web3 } from '../lib/web3';
import Transaction from "./Transaction";

export default class BalanceInfo extends Component {
    constructor() {
        super();

        this.state = {
            balance: web3.eth.getBalance(web3.eth.defaultAccount),
            block: null,
            transaction: null,
            inputFormat:'bignumber',
        };
        this.updateBalance = setInterval(function () {
            let newBalance = web3.eth.getBalance(web3.eth.defaultAccount);
            if (this.state.balance.equals(newBalance)) {
                return;
            }
            this.setState({
                balance: newBalance,
            });
        }.bind(this), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.updateBalance);
    }

    render() {
        return (
            <div className="panel" ref="panel">
                <div className="panel-heading">
                    My Balance
                </div>
                <div className="panel-body">
                    Current balance
                    <strong>{" " + this.state.balance.toString() + " "} </strong>
                    ether
                </div>
                <div>
                    Enter block number:
                    <input
                        className="form-control"
                        type="number"
                        ref="numInput"
                        placeholder="number"
                        style={{width: 60 + '%'}}
                    />
                    <button onClick={this.updateBlockNum.bind(this)}>Find</button>
                    <hr/>
                    {this.getBlockInfo()}
                    <hr/>
                    <Transaction transactionData={this.state.transaction} blockData={this.state.block}/>
                </div>
            </div>
        );
    }

    updateBlockNum() {
        if (this.refs.numInput) {
            this.setState({
                block: web3.eth.getBlock(this.refs.numInput.value, true),
                transaction: null,
            });
        }
    }

    componentDidMount() {
        if (!this.props.hide) {
            this.show();
        } else {
            this.hide();
        }
    }

    show() {
        this.refs.panel.style.display = 'block';
        this.props.hide = false;
    }

    hide() {
        this.refs.panel.style.display = 'none';
        this.props.hide = true;
    }

    getBlockInfo() {
        let block = this.state.block;
        if (!block) {
            return;
        }
        let transArray = block.transactions;
        if (!transArray || transArray.length == 0) {
            return;
        }
        let transSelector = transArray.map((trans) => (
            <option value={trans}>{trans.hash}</option>
        ));
        this.handleTransactionUpdate(transArray[0])
        return (
            <div>
                Choose transaction hash:
                <select onChange={this.handleTransactionUpdate.bind(this, this.value)}>
                    {transSelector}
                </select>
            </div>
        );
    }

    handleTransactionUpdate(newTransaction) {
        if (this.state.transaction == newTransaction) {
            return;
        }
        this.setState({
            transaction: newTransaction,
        })
    }

}


BalanceInfo.propTypes = {
    hide:PropTypes.bool.isRequired,
};
