const { get_query_database,post_query_database } = require("../config/database_utils")

const get_dietary_choices = async(req, res) =>{
    try {
        const query = `SELECT id, food_name, image, preparation, nutrient, disease 
        FROM dietary_choices
        WHERE status = 1`
        const data = await get_query_database(query)
        res.status(200).json(data)
    } catch (err) {
        console.error("Error fetching available:",err)
        res.status(500).json({
            error: "Error fetching available"
        })
    }
}
module.exports = { get_dietary_choices };