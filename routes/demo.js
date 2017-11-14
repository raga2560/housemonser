



var SportsDAO = require('../sports').SportsDAO;
var AssetsDAO = require('../assets').AssetsDAO;
// https://stackoverflow.com/questions/37559610/socket-io-emit-on-express-route
  
 /* The SessionHandler must be constructed with a connected db */
function DemoHandler (db, multichain, io) {
    "use strict";

    var sports = new SportsDAO(db);
	var assets = new AssetsDAO(db, multichain);
	
	
  

	
	 
	
    
   
	
	this.getInfo = function(req, res) {
		
		assets.getInfo(function(err, record) {
		
		//console.log(record);
		if(err) {
			
				return res.json(err);
			
		}
		
		return res.json(record);
		});
	}
	
	this.insertplayer = function(req, res) {
        "use strict";
		
		var data = req.body;
		
		var player = {
			name: data.name,
			game: data.game,
			age :data.age
		};
		
		sports.insertplayer(player, function(err, record) {
		
		//console.log(record);
		if(err) {
			
				return res.json(err);
			
		}
		
		return res.json(record);
		});
		

	}
	
	this.getplayer = function(req, res) {
        "use strict";
		
		var data = req.body;
		
		var player = {
			name: data.player
			
		};
		
		sports.getplayer(player, function(err, record) {
		
		//console.log(record);
		if(err) {
			
				return res.json(err);
			
		}
		
		return res.json(record);
		});
		

	}
	
	this.getplayers = function(req, res) {
        "use strict";
		
		
		
		sports.getplayers(function(err, records) {
		
		//console.log(record);
		if(err) {
			
				return res.json(err);
			
		}
		
		return res.json(records);
		});
		

	}
	
	
	
  
	
}



module.exports = DemoHandler;
