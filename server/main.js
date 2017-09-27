import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    Meteor.methods({
        getContracts: function (input) {
            let solc = require('solc');
            let result = solc.compile(input, 1);
            return result; // 1 activates the optimiser;
        },
    });
});
