import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { web3 } from '../lib/web3';
import { Meteor } from 'meteor/meteor';
import AbstractContract from "./AbstractContract";

export default class CreateContract extends Component {
    constructor() {
        super();

        this.state = {
            isError: false,
            error: '',
            contracts: null,
            isCompile:false,
        }
    }

    handleSubmit() {
        let contractText = this.refs.contractText.value.trim();
        this.setState({isCompile: true});

        Meteor.call('getContracts', contractText, function (err, res) {
            if (err) {
                this.setState({isCompile:false,isError: true, error: String(e)});
            } else {
                let contracts = new Array();
                for (let elem in res.contracts) {
                    contracts.push([res.contracts[elem],elem]);
                }
                this.setState({
                    isError: false,
                    contracts: contracts,
                    isCompile:false,
                });
            }
        }.bind(this));
    }

    renderError() {
        if (!this.state.isError) {
            return;
        }
        return (
            <div className="alert alert-warning">
                There was an error deploying your contract.
                The error was: "{this.state.error}".
            </div>
        )
    }

    render() {
        return (
            <div className="panel" ref="panel">
                <div className="panel-heading">
                    Create contract
                </div>
                <div className="panel-body">
                    <p className="well well-info">
                        Create a new contract and interact with it
                    </p>
                    <textarea
                        className="solTextArea"
                        type="text"
                        ref="contractText"
                        placeholder=""
                    />
                    <button onClick ={this.handleSubmit.bind(this)}>Compile</button>
                    {this.renderContracts()}
                    {this.renderLoad()}
                    {this.renderError()}
                </div>
            </div>
        );
    }

    renderLoad() {
        if (!this.state.isCompile) {
            return;
        }

        return (
            <div>
                <div className="loader"/>
            </div>
        );
    }

    renderContracts() {
        if (!this.state.contracts) {
            return;
        }

        return this.state.contracts.map(function(elem){
            return(
            <AbstractContract contract={elem[0]} name={elem[1]}/>
        )}.bind(this));
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


CreateContract.propTypes = {
    hide:PropTypes.bool.isRequired,
};
