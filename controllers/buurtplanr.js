const Buurtplanr = require('../models/Buurtplanr');

const getBuurtplanr = async (req, res) => {
    try {
        const buurtplanr = await Buurtplanr.findOne();
        let response = {
            status: "success",
            data: buurtplanr,
        }
        res.json(response);
    } catch (error) {
        let response = {
            status: "error",
            message: error,
        }
        res.json(response);
    }
};

const updateBuurtplanr = async (req, res) => {
    try {
        const buurtplanr = await Buurtplanr.findOne()

        if (!buurtplanr) {
            const newBuurtplanr = await Buurtplanr.create(req.body);
            let response = {
                status: "success",
                data: newBuurtplanr,
            }
            res.json(response);
        }

        await buurtplanr.updateOne(req.body)

        let response = {
            status: "success",
            data: buurtplanr,
        }
        res.json(response);
    } catch (error) {
        let response = {
            status: "error",
            message: error,
        }
        res.json(response);
    }
};

module.exports.getBuurtplanr = getBuurtplanr;
module.exports.updateBuurtplanr = updateBuurtplanr;