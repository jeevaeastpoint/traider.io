var mongoHandler = require("./db.client.js");
var mongoclient = mongoHandler.getDbClient();
var collectionName = "products";


exports.getById = function(id, callback){
    
    // Open the connection to the server
    mongoclient.open(function(err, mongoclient) {  
        var dbName = mongoHandler.dbName();
        var db = mongoclient.db(dbName); 
        
        db.collection(collectionName).findOne({"_id": mongoHandler.makeObjectID(id)}, function(err, result) {
            mongoclient.close(); 
            if (err){
                mongoclient.close(); 
                throw err.Message;
                return;
            }
            else
            { 
                // Close the connection
                callback(result);
                return;
            }
        });
    });
};

exports.getAll = function(callback)
{
    if(callback === null || typeof(callback) !== "function"){throw "Call to db method must include callback function"} 
    mongoclient.open(function(err, mongoclient) {
        
        if (err){
            mongoclient.close(); 
            throw err.Message;
            return;
        }
        
        var dbName = mongoHandler.dbName();
        var db = mongoclient.db(dbName); 
        console.log(dbName+"."+collectionName);
        
        db.collection(collectionName).find({}, function(err, result) {
            if (err){
                mongoclient.close(); 
                throw err.Message;
                return;
            }
            else
            { 
                result.toArray(function(err, resultArray)
                {
                   // Close the connection
                    mongoclient.close(); 
                    
                    console.log("Got data: " + resultArray.length + " records.");
                    callback(resultArray);
                    return;
                });
            }
        }); 
    }); 
};