import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { web3 } from '../lib/web3';

export default class NetworkParams extends Component {
    constructor() {
        super();

        this.state = {
            coinbase: web3.eth.coinbase,
        }
        this.updateCoinbase = setInterval(function () {
            this.setState({
                coinbase: web3.eth.coinbase,
            })
        }.bind(this), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.updateCoinbase);
    }

    render() {
        return (
            <div className="panel" ref="panel">
                <div className="panel-heading">
                    Network params
                </div>
                <div className="panel-body">
                    <table className="table">
                        <tr>
                            <td className="heading">
                                RPC Provider
                            </td>
                            <td>http://localhost:8545</td>
                        </tr>
                        <tr>
                            <td className="heading">
                                Web3 Obj
                            </td>
                            <td>{_.isObject(web3) ? 'true' : false}</td>
                        </tr>
                        <tr>
                            <td className="heading">
                                Coinbase
                            </td>
                            <td>
                                <input type="text"
                                       value={web3.eth.coinbase}
                                       className="form-control"/>
                            </td>
                        </tr>
                        <tr>
                            <td className="heading">
                                Listening
                            </td>
                            <td>{_.isUndefined(web3.net) ? '--' : web3.net.listening.toString()}</td>
                        </tr>
                        <tr>
                            <td className="heading">
                                Peer count
                            </td>
                            <td>{_.isUndefined(web3.net) ? '--' : web3.net.peerCount}</td>
                        </tr>
                        <tr>
                            <td className="heading">
                                Gas Price
                            </td>
                            <td>{web3.eth.gasPrice.toString()}</td>
                        </tr>
                        <tr>
                            <td className="heading">
                                Block number
                            </td>
                            <td>{web3.eth.blockNumber}</td>
                        </tr>
                        <tr>
                            <td className="heading">
                                Default block
                            </td>
                            <td>{web3.eth.defaultBlock}</td>
                        </tr>
                        <tr>
                            <td className="heading">
                                Mining
                            </td>
                            <td>{web3.eth.mining.toString()}</td>
                        </tr>
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


NetworkParams.propTypes = {
    hide:PropTypes.bool.isRequired,
};
