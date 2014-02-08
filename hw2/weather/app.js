"use strict";
var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
    if(err) throw err;

    var coll = 'data';
    var query = {};
    
     
    var cursor = db.collection(coll).find(query);
    cursor.sort({"Temperature": -1});
    
    
        
    var done = [];
        cursor.each(function(err, doc){
            if(err) throw err;
            if(doc == null) {
                console.log(done) 
                return db.close();
                //db.collection(coll).find({"month_high": true});
            }
            if (done == []) {
                db.collection(coll).update({"_id": doc["_id"]}, {$set: {"month_high": true}}, function(err, updated){
                         console.log(done, doc.State, doc.Temperature, doc._id)
                });
                done.push(doc.State)
               
                }
            else if (done.indexOf(doc.State) == -1) {
               db.collection(coll).update({"_id": doc["_id"]}, {$set: {"month_high": true}}, function(err, updated){
                console.log(done, doc.State, doc.Temperature, doc._id)
               });
               done.push(doc.State)
               }
        });     
     
      
   
    
/*db.collection(coll).update({"_id": doc._id}, {$set: {"month_high": true}}, function(err, updated) {
                        if(err) throw err;
                        console.dir("Successfully updated " + updated + " document!");
                        });*/
   
});
