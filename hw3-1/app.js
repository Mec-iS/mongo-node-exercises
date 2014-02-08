var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/school', function(err, db) {
    if(err) throw err;

    var students = db.collection("students");
    
    var cursor = students.find({});
    
    cursor.each(function(err, doc) {
        if(err) throw err;
        if(doc == null) {
            return db.close();
        }
        
        var scores = doc["scores"];
        
        scores.sort(function(a, b){
               return a.score-b.score
            })
        
        var hw_index = []
        for (i in scores){
            if (scores[i].type == 'homework') {
                hw_index.push(i)
            }
        }
        console.log(hw_index)
        
        if (hw_index.length > 1) scores.splice(hw_index[0], 1);
            
        console.log(scores)
          //sort scores -1
          //splice index 0
          //doc update
        var myquery = {};
        myquery['_id'] = doc['_id'];
        
        var myupdate = {$set: {"scores": scores}}; 
        
        students.findAndModify(myquery, {}, myupdate, function(err, updated){
             if (err) throw err;
             console.log(updated)
        });
        
      
    });  

       

});
