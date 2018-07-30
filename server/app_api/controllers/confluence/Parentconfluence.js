var ctrlExpression = require('../expression');
var contentIDModule = require('./contentID');
var axios = require('axios');


exports.ParseConfluence = function(req, res) {

	if(req.body.name === 'confluence') {
			// Parent
		var url = 'https://englishlogica.atlassian.net/wiki/rest/api/content/32960/descendant/page?limit=10&start=0';
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
				// console.log('element.title', element.title);
				var title = element.title;
				contentIDModule.ContentID(element, title)
				
				// console.log('parentConfluence', element);
				
			});
		})
		.catch(error => {
			console.log(error);
		});
	}else {
		console.log('Req Fail');
		
	}
}