const mongodb = require('../config/database');

/**
 * Creating New MongoDb Connection obect by Switching DB
 */
const getTenantDB = (tenantName) => {
  const dbName = `avendi_${tenantName}`;
  if (!tenantName) {
    return mongodb;
  }
  if (mongodb) {
    // useDb will return new connection
    const db = mongodb.useDb(dbName);
    return db;
  }
};

module.exports = { getTenantDB };
