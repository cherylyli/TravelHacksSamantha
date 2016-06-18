var configValues = require('./config.json');

module.exports = {
	//when using, must use get request to go retrieve info
    getMicrosftConnection: function(){
        return configValues.microsoftUrl;
    },
    getDBConnectionString: function(){
        return "mongodb://" + configValues.dbusername + ":" + configValues.dbpassword + "@ds051595.mlab.com:51595/travelhacks2016";
    }
};

