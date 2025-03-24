const Gadget = require("../models/gadgetModel");
const nanoid = require("nanoid");

// creating a Map for storing confirmation codes
const confirmationCodes = new Map();

// generating confirmation code for destroying gadgets for object with id
exports.generateConfirmationCode = async (req, res) => {
    try {
        // taking id from params
        const { id } = req.params;

        // getting gadget using primary key - id
        const gadget = await Gadget.findByPk(id);

        // checking if gadget exists or not
        if (!gadget) {
            return res.status(404).json({
                success: false,
                message: "Gadget not found"
            });
        }

        // generating random number of 6 digits(generating the confirmation code)
        const getRandomNumber = nanoid.customAlphabet("0123456789", 6);
        const generatedCode = getRandomNumber();

        // storing generated confirmation code in Map with a key of id
        confirmationCodes.set(id, generatedCode);
        console.log(`Confirmation code for destroying Gadget: ${generatedCode}`);

        // sending response and confirmation code for that object id which is stored as key
        return res.status(200).json({
            success: true,
            data: generatedCode,
            message: `Confirmation code generated, please enter this code while destroying the gadget with id ${id}`
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}

// destroying gadget(soft delete, just changing the status of the gadget to Destroyed if confirmation code is matched)
exports.destroyGadget = async (req, res) => {
    try {
        // taking id from params
        const { id } = req.params;

        // taking confirm code from body of json
        const { confirmCode } = req.body;

        // checking if the given id is contained inside the Map with the value(confirmation code)
        if (!confirmationCodes.has(id)) {
            return res.status(404).json({
                success: false,
                message: "No confirmation code generated for destroying this gadget"
            });
        }

        const generatedCodeForObjectDestruction = confirmationCodes.get(id);

        const gadget = await Gadget.findByPk(id);

        // checking if gadget exists or not
        if (!gadget) {
            return res.status(404).json({
                success: false,
                message: "Gadget not found"
            });
        }

        // checking if code is stored in map or not
        if (!generatedCodeForObjectDestruction) {
            return res.status(404).json({
                success: false,
                message: "No confirmation code generated, please try again to generate code"
            })
        }

        // checking for conditions where confirmCode from user is taken or not and they both match(generated and sent code)
        if (!confirmCode || confirmCode !== generatedCodeForObjectDestruction) {
            return res.status(400).json({
                success: false,
                message: "Invalid confimation code"
            });
        }

        // checking if gadget is already decommissioned, then we should remove the timestamp and just destroy
        if (gadget.status === "Decommissioned") {
            gadget.decommissionedAt = null;
        }

        // changing the status of gadget object to "Destroyed"
        gadget.status = "Destroyed";
        await gadget.save();

        // deleting the confirmationCode related to that id
        confirmationCodes.delete(id);  // deletes confirmationCode 

        // sending a response
        return res.status(200).json({
            success: true,
            message: "Destroyed gadget from inventory and marked as Destroyed",
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