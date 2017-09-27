import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { web3 } from '../lib/web3';
import ContractRealization from "./ContractRealization";

export default class AbstractContract extends Component {
    constructor() {
        super();
        this.realizations = new Array();
        this.realizationsCost = new Array();
        this.state = {
            isCreateNewOne: false,
        }
    }

    componentWillUnmount() {
    }

    componentWillUpdate() {
    }

    renderCreateNewOne() {
        if (!this.state.isCreateNewOne) {
            return;
        }
        return (
            <div>
                Your contract is being mined...
                <div className="loader"/>
            </div>
        );
    }

    renderContractRealization() {
        if (!this.realizations || this.realizations.length == 0) {
            return;
        }
        return this.realizations.map((elem) => (
            <ContractRealization contractRealization={elem} name={this.props.name}/>
        ));
    }

    renderCreatingCosts() {
        return this.realizationsCost.map((elem) => (
            <p>
                Transaction Cost: {elem.transactionCost}
            </p>
        ));
    }

    render() {
        return (
            <div className="panel">
                <div className="abstractcontract-panel-heading">
                    {this.props.name}
                </div>
                <div className="abstractcontract-panel-body">
                    <button onClick={this.onCreateNewRealisation.bind(this)}>
                        Create
                    </button>
                    <button onClick={this.onAtAddress.bind(this)}>
                        AtAddress
                    </button>
                    {this.renderCreatingCosts()}
                    {this.renderContractRealization()}
                    {this.renderCreateNewOne()}
                </div>
            </div>
        );
    }

    onCreateNewRealisation() {
        this.setState(
            {
                isCreateNewOne: true,
            }
        );
        let abiDefinition = JSON.parse(this.props.contract.interface);
        let contract = web3.eth.contract(abiDefinition);

        let data = this.props.contract.bytecode;

        contract.new(
            {
                from: web3.eth.defaultAccount,
                data: this.props.contract.bytecode,
                gas: '4300000'
            }, function (e, contract) {
                if (e) {

                }

                if (typeof contract.address !== 'undefined') {
                    this.realizations.push(contract);

                    let contractData = {
                        from: web3.eth.defaultAccount,
                        data: data,
                        gas: '4300000',
                        value: 0,
                    };

                    this.realizationsCost.push({
                        transactionCost: web3.eth.estimateGas(contractData),
                    });

                    this.setState({isCreateNewOne: false});
                }
            }.bind(this)
        );
    }

    onAtAddress(){
        let address = prompt('What Address is this contract at in the Blockchain? ie: 0xdeadbeaf...');
        let abiDefinition = JSON.parse(this.props.contract.interface);
        let contract = web3.eth.contract(abiDefinition);
        let data = this.props.contract.bytecode;

        let result = contract.at(address);
        if(result.address){
            this.realizations.push(result);

            let contractData = {
                from: web3.eth.defaultAccount,
                data: data,
                gas: '4300000',
                value: 0,
            };

            this.realizationsCost.push({
                transactionCost: web3.eth.estimateGas(contractData),
            });

            this.setState({isCreateNewOne: false});
        }
    }
}


AbstractContract.propTypes = {
    // This component gets the task to display through a React prop.
    // We can use propTypes to indicate it is required
    contract: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
};
