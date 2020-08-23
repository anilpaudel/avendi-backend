const { createNamespace } = require('cls-hooked');
const { getTenantDB } = require('./dbConnector');

const namespaceName = 'avendi';
const ns = createNamespace(namespaceName);

exports.bindCurrentNamespace = function (req, res, next) {
  ns.bindEmitter(req);
  ns.bindEmitter(res);

  ns.run(() => {
    next();
  });
};

exports.setCurrentTenant = function (tenant) {
  const dbConnection = getTenantDB(tenant);
  return ns.set('tenant', dbConnection);
};

exports.getCurrentTenant = function () {
  return ns.get('tenant');
};
