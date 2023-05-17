const Creatie = require('./../models/Creatie');

// index
const index = async (req, res) => {
    const creaties = await Creatie.find();

    let response = {
        status: "success",
        data: creaties,
    }
    res.json(response);
};