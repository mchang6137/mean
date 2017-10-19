const quilt = require('@quilt/quilt');
const Mean = require('./mean.js');
const utils = require('./utils.js');

// Replication to use for the node application
// and Mongo.
const count = 2;
const infrastructure = quilt.createDeployment(
    {namespace: "mean-ubuntu2"}
);

const machine = new quilt.Machine({
    provider: 'Amazon',
    size: "c4.large",
});

utils.addSshKey(machine)

infrastructure.deploy(machine.asMaster());
infrastructure.deploy(machine.asWorker().replicate(count));

const nodeRepository = 'https://github.com/TsaiAnson/node-todo.git';
const mean = new Mean(count, nodeRepository);
infrastructure.deploy(mean);
