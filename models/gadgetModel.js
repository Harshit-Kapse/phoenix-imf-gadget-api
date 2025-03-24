const { DataTypes } = require("sequelize");
const { sqlize } = require("../config/database");

const Gadget = sqlize.define("Gadget", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("Available", "Deployed", "Destroyed", "Decommissioned"),
        allowNull: false,
        defaultValue: "Available"
    },
    decommissionedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    }
}, {
    tableName: "gadgets",
    timestamps: true
});

module.exports = Gadget;