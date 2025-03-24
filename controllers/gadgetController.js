const Gadget = require("../models/gadgetModel");
const { codenames, getRandomCodename } = require("../utility/codenames");

// getting all the list of gadgets with success probability(from 30% to 100%)
exports.getGadgets = async (req, res) => {
    try {
        // taking status, if provided, from query string
        const { status } = req.query;

        if (!status) {
            // taking all the gadget list from model
            const allGadgets = await Gadget.findAll();

            // mapping every gadget object, so that we can show the mission success probability(randomly generated) in the final data
            allGadgetsWithSuccessProbability = allGadgets.map(obj => {
                return {
                    ...obj.toJSON(),
                    missionSuccessProbability: `${Math.floor(Math.random() * 31) + 70} success probability`
                };
            })

            // sending response with data
            return res.status(200).json({
                success: true,
                message: "Gadgets received successfully",
                data: allGadgetsWithSuccessProbability
            });
        }

        if (status) {
            // taking all the gadget with specified status
            const allGadgets = await Gadget.findAll({ where: { status } });

            // sending response with data
            return res.status(200).json({
                success: true,
                message: "Gadgets received successfully",
                data: allGadgets
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}

// adding a gadget with a random codename
exports.addGadget = async (req, res) => {
    try {
        // taking a random name from the function getRandomCodename()
        const name = getRandomCodename();

        // checking if name is empty or not
        if (!name) {
            res.status(400).json({
                error: "Name not provided"
            })
        }

        // creating a new Gadget row and putting in details
        const newGadget = await Gadget.create({
            name
        });

        // sending response
        return res.status(201).json({
            success: true,
            message: "Gadget added successfully",
            data: newGadget
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}

// updating gadget details(updating only name of gadget using random codename)
exports.updateGadget = async (req, res) => {
    try {
        // taking id from params
        const { id } = req.params;
        //generating random code names from getRandomCodename()
        const name = getRandomCodename();

        const gadget = await Gadget.findByPk(id);

        // checking if gadget exist or not
        if (!gadget) {
            return res.status(404).json({
                success: false,
                message: "Gadget not found"
            });
        }

        // checking if gadget is destroyed or not, if destroyed, we will not update it
        if (gadget.status === "Destroyed") {
            return res.status(400).json({
                success: false,
                message: "Gadget already destroyed"
            })
        }

        // updating name if name is provided
        if (name) gadget.name = name;

        // saving details
        await gadget.save();

        // sending response with gadget details
        return res.status(200).json({
            success: true,
            message: "Gadget name updated successfully",
            data: gadget
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}

// delete a gadget(soft delete, marking it as decommissioned)
exports.deleteGadget = async (req, res) => {
    try {
        // taking id from params
        const { id } = req.params;

        const gadget = await Gadget.findByPk(id);

        // checking if gadget exist or not
        if (!gadget) {
            return res.status(404).json({
                success: false,
                message: "Gadget not found"
            });
        }

        // changing the status of gadget to "Decommissioned" and assigning 
        // the date for when gadget was decommissioned
        gadget.status = "Decommissioned";
        gadget.decommissionedAt = new Date();

        // saving details
        await gadget.save();

        // sending reponse
        return res.status(200).json({
            success: true,
            message: "Deleted gadget from inventory and marked as Decommissioned",
            data: gadget
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}

// filter to find gadgets using specific status
exports.filterGadgetByStatus = async (req, res) => {
    try {
        const { status } = req.query;

        if (!status) {

        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}
