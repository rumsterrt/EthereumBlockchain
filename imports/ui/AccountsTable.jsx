import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { web3,currentAccoutIndex } from '../lib/web3';

export default class AccountsTable extends Component {
    renderAccounts(){
        let accounts = web3.eth.accounts;
        let counter = 1;

        return accounts.map((account) => (
            <tr>
                <td>{counter++}</td>
                <td>
                    <input type="text" value={account} className="form-control"/>
                </td>
                <td >{web3.eth.getBalance(account).toString() + " coins"}</td>
                {this.renderAccountInfo(account)}
            </tr>
        ));
    }

    renderAccountInfo(account) {
        if (web3.eth.defaultAccount == account) {
            return (
                <td>{"Current account"}</td>
            );
        } else {
            return (
                <td>
                    <button onClick={function(){web3.eth.defaultAccount = account;this.forceUpdate();}.bind(this)}>
                        Set current
                    </button>
                </td>
            );
        }
    }

    render() {
        return (
            <div className="panel" ref="panel">
                <div className="panel-heading">
                    My Accounts
                </div>
                <div className="panel-body">
                    <p>List of your Ethereum accounts</p>
                </div>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                        <tr>
                            <td>#</td>
                            <td>Address</td>
                            <td>Balance</td>
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderAccounts()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    componentDidMount() {
        if(!this.props.hide){
            this.show();
        }else{
            this.hide();
        }
    }

    show(){
        this.refs.panel.style.display = 'block';
        this.props.hide = false;
    }

    hide(){
        this.refs.panel.style.display = 'none';
        this.props.hide = true;
    }
}

AccountsTable.propTypes = {
    hide:PropTypes.bool.isRequired,
};
