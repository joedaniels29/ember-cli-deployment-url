/* jshint node: true */
'use strict';

var merge = require('lodash-node/compat/objects/merge');
var deploymentURLConfigDefaults = {
  developmentURLPrefix: '',
  testURLPrefix: '',
  productionURLPrefix: ''
};


function contentString(jsPrefix, cssPrefix) {
  return "<link rel='stylesheet' href='" + jsPrefix + "assets/vendor.css'>" +
    "<link rel='stylesheet' href='" + jsPrefix + "assets/dummy.css'>" +
    "<script src='" + cssPrefix + "assets/vendor.js'></script>" +
    "<script src='" + cssPrefix + "assets/dummy.js'></script>";


}
module.exports = {
  name: 'ember-cli-deployment-url',


  contentFor: function (type, config) {

    if (type === 'head') {
      var deploymentURLConfig = merge({},
        deploymentURLConfigDefaults,
        config.deploymentURLConfig);
      var env = config.environment;
      var includeStatements;
      switch (env) {
        case "development":
          includeStatements = contentString(deploymentURLConfig.developmentURLPrefix, deploymentURLConfig.developmentURLPrefix);

          break;
        case "test":
          includeStatements = contentString(deploymentURLConfig.testURLPrefix, deploymentURLConfig.testURLPrefix);

          break;
        case "production":
          includeStatements = contentString(deploymentURLConfig.productionURLPrefix, deploymentURLConfig.productionURLPrefix);

          break;
        default:
          break;
      }

      return includeStatements;


    }
  }
};
