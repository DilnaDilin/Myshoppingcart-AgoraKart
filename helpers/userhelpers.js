var db=require('../config/connection');
var collection=require('../config/collection')
var bcrypt=require('bcrypt');
module.exports={

    doSignup:(details)=>{
        return new Promise(async(resolve,reject)=>{
            details.password=await bcrypt.hash(details.password, 10);
            details.reppassword=await bcrypt.hash(details.reppassword, 10);
            await db.get().collection(collection.USER_COLLECTION).insertOne(details).then((data)=>{
                console.log("datta",data);
                resolve();
            })
        })
    },
    checkuserlogin:(details)=>{
        return new Promise(async (resolve,reject)=>{
            let user=await db.get().collection(collection.USER_COLLECTION).findOne({email:details.email});
            if(user){
                console.log("user",user);
                bcrypt.compare(details.password, user.password, (err, res) => {
                    if(!err){
                        resolve(true)
                    }
                    else{

                        resolve(false);
                    }
                })
            }else{
                resolve(false)
            }
            
        })
    }
};
