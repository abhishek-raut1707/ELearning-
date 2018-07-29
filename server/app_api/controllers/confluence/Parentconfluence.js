var ctrlExpression = require('../expression');
var contentIDModule = require('./contentID');
var contentDataModule = require('./contentData');

module.exports.ParseConfluence = function(req, res) {

	if(req === true) {
		console.log('Req success');
		
	}else {
		console.log('Req fail');
		
	}
	
    getParentID();


    function getParentID() {
        // Parent
    var url = 'https://englishlogica.atlassian.net/wiki/rest/api/content/32960/descendant/page?limit=1&start=0';
    axios({
        method: 'get',
        url,
        auth: {
            username: "amogh.bhatnagar@sagacitysoftware.co.in",
            password: "Amo@saga@123"
        }
    })
    .then(response => {
        
        var parentJSON = response.data.results;
        parentJSON.forEach((element) => {
        	contentIDModule.ContentID(element);
		});
    })
    .catch(error => {
        console.log(error);
    });
}


}