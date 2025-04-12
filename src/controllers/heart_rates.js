const { get_query_database } = require("../config/database_utils")

const get_heart_rates = async(req,res)=>{
    try{
        const {user_id} = req.query;
        const query = `SELECT week_1,week_2,week_3,week_4 FROM heart_rates WHERE user_id = ?`;
        const data = await get_query_database(query,[user_id])
        res.status(200).json(data)
    }
    catch(err){
        console.log("error while fetching sugar levels :",err);
        res.send(500).json({
            err : "error fetching sugar levels"
        })
    }
}

module.exports = {get_heart_rates}