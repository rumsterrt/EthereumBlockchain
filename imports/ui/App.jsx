import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { web3 } from '../lib/web3';
import NetworkParams from './NetworkParams'
import BalanceInfo from './BalanceInfo';
import AccountsTable from './AccountsTable';
import CreateContract from './CreateContract';

// my RPC settings are:
// geth --rpc --rpcaddr="0.0.0.0" --rpccorsdomain="*" --mine --unlock=YOUR_ACCOUNT --verbosity=5 --maxpeers=0 --minerthreads="3"
class App extends Component {
    constructor(props){
        super(props);

        this.isRendered = false;
        this.currentTab = 'NetworkParams';

        web3.eth.defaultAccount = web3.eth.accounts[0];
    }

    componentDidMount() {
        this.isRendered = true;
        this.refs[this.currentTab + 'Link'].className += " active";
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Ethereum blockchain</h1>
                </header>
                <ul>
                    <div className="tab">
                        <button ref="NetworkParamsLink" className="tablinks" onClick={this.openTab.bind(this, 'NetworkParams')}>Network</button>
                        <button ref="AccountsTableLink" className="tablinks" onClick={this.openTab.bind(this, 'AccountsTable')}>Accounts
                        </button>
                        <button ref="CreateContractLink" className="tablinks" onClick={this.openTab.bind(this, 'CreateContract')}>Contract
                        </button>
                        <button ref="BalanceInfoLink" className="tablinks" onClick={this.openTab.bind(this, 'BalanceInfo')}>Balance info
                        </button>
                    </div>

                    <NetworkParams ref="NetworkParams" className="tabcontent"
                                   hide={this.currentTab != 'NetworkParams'}/>

                    <AccountsTable ref="AccountsTable" className="tabcontent"
                                   hide={this.currentTab != 'AccountsTable'}/>
                    <CreateContract ref="CreateContract" className="tabcontent"
                                    hide={this.currentTab != 'CreateContract'}/>
                    <BalanceInfo ref="BalanceInfo" className="tabcontent"
                                    hide={this.currentTab != 'BalanceInfo'}/>
                </ul>
            </div>
        );
    }

    openTab( tabId) {
        if(!this.isRendered || this.currentTab == tabId){
            return;
        }
        this.refs[tabId].show();
        this.refs[tabId + 'Link'].className += " active";
        this.refs[this.currentTab].hide();
        this.refs[this.currentTab + 'Link'].className = this.refs[this.currentTab + 'Link'].className.replace(" active", "");
        this.currentTab = tabId;
    }
}

App.propTypes = {
};

export default createContainer(() => {
    return {
    };
}, App);