var confluence = require('confluence-api');
var striptags = require('striptags');
var mongoose = require('mongoose');


var ctrlExpressions = require('../expression');
var Expression_Context = mongoose.model('Expression_Context');
var Expression = mongoose.model('Expression');
var contextData = [];


module.exports.ContentData = function(value, title) {

	// console.log('getData', value.title);
	
    var configAmogh = {
        username: "amogh.bhatnagar@sagacitysoftware.co.in",
        password: "Amo@saga@123",
        baseUrl: "http://englishlogica.atlassian.net/wiki"
    };
    var Conf = new confluence(configAmogh);
	// Content ID
    
	Conf.getContentById(value.id, async function(err, data) {
		if(err) {
			console.log(err);
			// res.json({status: false});
		}
		if(data) {
			// console.log("Data === ", data);
			
			//console.log(data.body.storage.value);
			var temp = data.body.storage.value;
			//  console.log('temp ===', temp);
			
			// Remove the HTML tags from the content;
            var dataContent = striptags(temp, [], ' ');
            // console.log('dataContent', dataContent);
            
			//console.log(StripedContent);

			var CheckMeaningTabs = /Meaning ID:\s*[A-Za-z0-9]/g;
			
            var matches = dataContent.match(CheckMeaningTabs);
            // console.log('matches', matches)

			for(var i = 0; i < matches.length; i++) {
				var block0 = matches[0];
				var block1 = matches[1];
				var block2 = matches[2];
			}

			// console.log('block0 ', block0);
			// console.log('block1 ', block1);
			// console.log('block2 ', block2);
			
			
			
			if(block0) {
				if(block1 === undefined && block2 === undefined) {
					var tab1 = dataContent;
					//console.log('block1 && block2 === undefined ', tab1);
					
				} else if(block1 && block2 === undefined) {
					const indexFrom = dataContent.indexOf(block0);
					const indexTo = dataContent.indexOf(block1);
					var tab1 = dataContent.substring(indexFrom, indexTo);
					//console.log('Block 1 present ===', tab1);
					
				} else if(block2) {
					//console.log('Block2 is present');
				}
                
                // //Level of 1
				const Levelregex = /(L|l)evel\s*:\s*(.*)(M|m)eaning ID\s*:/gm;
                const Level = Levelregex.exec(tab1);


				if(Level === null) {
                    var LevelTab1 = '';
                } else {
                    var LevelTab1 = Level[2];
                }


				// //Meaning ID of 1
				const MeaningIDregex = /(M|m)eaning ID\s*:\s*(.*)\s*(S|s)tatus\s*:/gm;
				const MeaningId = MeaningIDregex.exec(tab1);
				//console.log('MeaningId[2] ===', MeaningId[2]);
				// var MeaningIDTab1 = MeaningId[2];
				if(MeaningId === null) {
                    var MeaningIDTab1 = '';
                } else {
                    var MeaningIDTab1 = MeaningId[2];
                }

				//Status of 1
				const Statusregex = /Status\s*:\s*(.*)\s*Meaning\s*:/gm;
				const Status = Statusregex.exec(tab1);
				//console.log('Status[1] ===', Status[1]);
				// var StatusTab1 = Status[1];
                if(Status === null) {
                    var StatusTab1 = '';
                } else {
                    var StatusTab1 = Status[1];
                }

				// Meanings of 1
				const Meaningregex = /(M|m)eaning\s*:\s*(.*)\s*((N|n)otes\s*:|(P|p)art\s*(O|o)f\s*(S|s)peech\s*:)/gm;
				const Meaning = Meaningregex.exec(tab1);
				//console.log('Meaning[2] ===', Meaning[2]);
                // var MeaningTab1 = Meaning[2];
                if(Meaning === null) {
                    var MeaningTab1 = '';
                } else {
                    var MeaningTab1 = Meaning[2];
                }

				// Notes of 1 
				const Notesregex = /((N|n)otes\s*:|(P|p)art\s*(O|o)f\s*(S|s)peech\s*:)\s*(.*)\s*(P|p)opularity:/gm;
				const Notes = Notesregex.exec(tab1);
				//console.log('Notes[6] ===', Notes[6]);
				// var NotesTab1 = NotesTab1[6];
                if(Notes === null) {
                    var NotesTab1 = '';
                } else {
                    var NotesTab1 = Notes[6];
                }
				// Popularity of 1
				const Popularityregex = /(P|p)opularity\s*:\s*(.*)\s*(B|b)est\s*(W|w)ay\s*(t|T)o\s*(M|m)emorize\s*:/gm;
				const Popularity = Popularityregex.exec(tab1);
				//console.log('Popularity[2] ===', Popularity[2]);
				var PopularityTab1 = Popularity[2];
				
				// Best way to memorize
				const BWTMregex = /(B|b)est\s*(W|w)ay\s*(T|t)o\s*(M|m)emorize\s*:\s*(.*)\s*(C|c)ategories\s*:/gm;
				const BWTM = BWTMregex.exec(tab1);
				//console.log('BWTM[5] ===', BWTM[5]);
				// var BWTMTab1 = BWTM[5];
                if(BWTM === null) {
                    var BWTMTab1 = '';
                } else {
                    var BWTMTab1 =  BWTM[5];
                }
				// Example(s) to 1 
				const Exampleregex = /(E|e)xample\Ss\S\s*:\s*(.*)\s*(F|f)urther\s*(S|s)uggestions\s*:/gm;
				const Example = Exampleregex.exec(tab1);
				//console.log('Example[2] ===', Example[2]);
				var ExampleTab1 = Example[2];

				// Further Sugg of 1
				const FurtherSuggregex = /(F|f)urther\s*(S|s)uggestions\s*:\s*(.*)/gm;
				const FurtherSugg = FurtherSuggregex.exec(tab1);
				//console.log('FurtherSugg[3] ===', FurtherSugg[3]);
				var FurtherSuggTab1 = FurtherSugg[3];
				

                var Tab1 = new Expression_Context();
                Tab1.HTM = BWTMTab1.toString();
                Tab1.examples = ExampleTab1.toString();
                Tab1.popularity = PopularityTab1.toString();
                Tab1.notes = NotesTab1.toString();
                Tab1.Meaning_ID = MeaningIDTab1.toString();
                Tab1.meaning = MeaningTab1.toString();
                Tab1.level = LevelTab1.toString();
                Tab1.active_flag = StatusTab1.toString();
                Tab1.further_suggestion = FurtherSuggTab1.toString();
                // console.log('Tab1', Tab1);
                


				// console.log('Tab-1 Object  =====', Tab1Obj);

                contextData.push(Tab1);

			}
			if(block1 && block2 === undefined) {
				
				var splitFromIndex = dataContent.indexOf(matches[1]);
				var tab2 = dataContent.substring(splitFromIndex);
				//console.log(tab2);
                
                 // //Level of 2
				const Levelregex = /(L|l)evel\s*:\s*(.*)(M|m)eaning ID\s*:/gm;
                const Level = Levelregex.exec(tab1);


				if(Level === null) {
                    var LevelTab2 = '';
                } else {
                    var LevelTab2 = Level[2];
                }


				// //Meaning ID of 1
				const MeaningIDregex = /(M|m)eaning ID\s*:\s*(.*)\s*(S|s)tatus\s*:/gm;
				const MeaningId = MeaningIDregex.exec(tab2);
				//console.log('MeaningId[2] ===', MeaningId[2]);
				var MeaningIDTab2 = MeaningId[2];
				

				//Status of 1
				const Statusregex = /Status\s*:\s*(.*)\s*Meaning\s*:/gm;
				const Status = Statusregex.exec(tab2);
				//console.log('Status[1] ===', Status[1]);
				var StatusTab2 = Status[1];

				// Meanings of 1
				const Meaningregex = /(M|m)eaning\s*:\s*(.*)\s*((N|n)otes\s*:|(P|p)art\s*(O|o)f\s*(S|s)peech\s*:)/gm;
				const Meaning = Meaningregex.exec(tab2);
				//console.log('Meaning[2] ===', Meaning[2]);
				var MeaningTab2 = Meaning[2];

				// Notes of 1 
				const Notesregex = /((N|n)otes\s*:|(P|p)art\s*(O|o)f\s*(S|s)peech\s*:)\s*(.*)\s*(P|p)opularity:/gm;
				const Notes = Notesregex.exec(tab2);
				//console.log('Notes[6] ===', Notes[6]);
				var NotesTab2 = Notes[6];

				// Popularity of 1
				const Popularityregex = /(P|p)opularity\s*:\s*(.*)\s*(B|b)est\s*(W|w)ay\s*(t|T)o\s*(M|m)emorize\s*:/gm;
				const Popularity = Popularityregex.exec(tab2);
				//console.log('Popularity[2] ===', Popularity[2]);
				var PopularityTab2 = Popularity[2];
				
				// Best way to memorize
				const BWTMregex = /(B|b)est\s*(W|w)ay\s*(T|t)o\s*(M|m)emorize\s*:\s*(.*)\s*(C|c)ategories\s*:/gm;
				const BWTM = BWTMregex.exec(tab2);
				//console.log('BWTM[5] ===', BWTM[5]);
				var BWTMTab2 = BWTM[5];

				// Example(s) to 1 
				const Exampleregex = /(E|e)xample\Ss\S\s*:\s*(.*)\s*(F|f)urther\s*(S|s)uggestions\s*:/gm;
				const Example = Exampleregex.exec(tab2);
				//console.log('Example[2] ===', Example[2]);
				var ExampleTab2 = Example[2];

				// Further Sugg of 1
				const FurtherSuggregex = /(F|f)urther\s*(S|s)uggestions\s*:\s*(.*)/gm;
				const FurtherSugg = FurtherSuggregex.exec(tab2);
				//console.log('FurtherSugg[3] ===', FurtherSugg[3]);
				var FurtherSuggTab2 = FurtherSugg[3];
                

                var Tab2 = new Expression_Context();
                Tab2.HTM = BWTMTab2.toString();
                Tab2.examples = ExampleTab2.toString();
                Tab2.popularity = PopularityTab2.toString();
                Tab2.notes = NotesTab2.toString();
                Tab2.Meaning_ID = MeaningIDTab2.toString();
                Tab2.meaning = MeaningTab2.toString();
                Tab2.level = LevelTab2.toString();
                Tab2.active_flag = StatusTab2.toString();
                Tab2.further_suggestion = FurtherSuggTab2.toString();
				// console.log('Tab-2 Object ====', Tab2Obj);
				
                contextData.push(Tab2);
				
			}

			ctrlExpressions.addExpressionFroMConfluence(contextData, title)
			contextData = [];
			
		}
	
	
	// 	var title = value.title;

	// 	Expression.find({name: title}, function(err, data) {
	// 		if(err) {
	// 			console.log(err);
				
	// 		} else if(data.length < 0) {

	// 			var exp= new Expression();
	// 			exp.name = title;


	// 			exp.save(function(err, docID) {
	// 				if(err) {
	// 					console.log(err);
						
	// 				}else if(!err) 
	// 				{
	// 					for(var i = 0; i < contextData.length; i++) {
	// 						var data = contextData[i];

	// 						save_context(data, docID);
	// 					}
	// 				}
	// 			});
	// 		}
	// 	});
	// 	function save_context(data, ExpID) {
	// 		var expC = new Expression_Context();
	// 		expC.ExpID = ExpID;
	// 		expc.examples = data.examples;
	// 		expc.level = data.level;
	// 		expc.further_suggestion = data.further_suggestion;
	// 		expc.popularity = data.popularity;
	// 		expc.notes = data.notes;
	// 		expc.meaning = data.meaning;
	// 		expc.active_flag = data.active_flag;
	// 		expc.HTM = data.HTM;
	// 		expc.Meaning_ID = data.Meaning_ID;

	// 		console.log('expC', expC);
			
	// 		expC.save(function(err, docID) {
	// 			if(err) {
	// 				console.log(err);
	// 			} else if(docID) {
	// 				console.log('Successfully saved data ', docID);
	// 			}
		
	// });
	// }
	});
}



































































	// subAry.title = title;
		// 		subAry.data.push(Tab1Obj);
		// 		console.log('subAry SSSSSSSSSSSSSSS ', subAry);
				

		// // 	//subAry.title = title;
		// // 	console.log('last blo333333333333333333$$$$titleAry##################3ssck'+ JSON.stringify(titleAry));
		// // 	titleAry.map(tdata  =>{
		// // 		console.log('title ttttttttttttttttttttttttttt', title);
			

		// // 			if(tdata!=title){
		// // 			titleAry.push({title})					
		// // 			subAry.push({title:title,data:Tab1Obj});
		// // 			} else {
		// // 				subAry.data.push(Tab1Obj);
		// // 			}
		// // 	})

		// // 	subAry.map(tdata => {

		// // 	})


		// // 	subAry.push({title:title,data:Tab1Obj});


		// // main.push(subAry);
		// // console.log('last blo##########################3ssck'+ JSON.stringify(subAry));
		// // return Full_data;
