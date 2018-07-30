var axios = require('axios');

var contentDataModule = require('./contentData');


module.exports.ContentID = function(value, title) {
    // console.log('value getContentID', value);

    var url = 'https://englishlogica.atlassian.net/wiki/rest/api/content/search?cql=parent=' + value.id;
        axios({
            method: 'get',
            url,
            auth: {
                username: "amogh.bhatnagar@sagacitysoftware.co.in",
                password: "Amo@saga@123"
            }
        })
        .then(function(response) {
			var contentJSON = response.data.results;
       		contentJSON.forEach((element) => {
				// console.log('contentIDConfluence', element);
                contentDataModule.ContentData(element, title);
            });


        })
        .catch(error => {
            console.log(error);
        });
}

