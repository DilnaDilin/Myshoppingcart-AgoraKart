var db=require('../config/connection');
var collection=require('../config/collection');
module.exports={
    checkLogin:(details)=>{
        return new Promise(async(resolve,reject)=>{
            response={};
            let user=await db.get().collection(collection.ADMIN_COLLECTION).findOne({username:details.username});
            if(user){  
                user.password=Number(user.password);  
                if(user.password==details.password)
                {   
                    response.user=user; 
                    console.log("verif")
                    response.status=true;
                    resolve(response);
                }else{
                    console.log("verif2")
                    response.status=false;
                    resolve(response);

                }
               
            }else{
                console.log("verif3")
                response.status=false;
                resolve(response);
            }
        })
    },
    addProduct:(details)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).insertOne(details).then((data)=>{
                console.log(data.insertedId)
                resolve(data.insertedId);
            })
        })
    },
    getProducts:()=>{
        return new Promise(async (resolve,reject)=>{
            let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray();
          
            resolve(products);
        })
    }
};