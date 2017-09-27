import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ContractFunc from "./ContractFunc";

export default class ContractRealization extends Component {
    constructor() {
        super();
    }

    componentWillUnmount() {
    }

    componentWillUpdate() {
    }
    render() {
        if(!this.props.contractRealization){
            return;
        }
        return (
            <div className="panel">
                <div className="contractRealization-heading">
                    {this.props.name}
                    {this.props.contractRealization.address}
                </div>
                <div className="contractRealization-body">
                    {this.renderAbi()}
                </div>
            </div>
        );
    }

    renderAbi(){
        if(this.props.contractRealization.abi.length==0){
            return;
        }
        let funcAbi = this.props.contractRealization.abi.filter((elem)=>{return elem.type=='function'}).sort((x,y)=>{
            return !(x.constant||(!x.constant&&!y.constant));
        });
        let result = new Array();
        for(let i = 0;i<funcAbi.length;i++){
            result.push((
                <ContractFunc contractRealization={this.props.contractRealization} abielem={funcAbi[i]}/>
            ));
        }
        return result;
    }
}


ContractRealization.propTypes = {
    contractRealization: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
};
