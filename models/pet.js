//Character model for the RPG
module.exports = function (sequelize, DataTypes) {
    var Pet = sequelize.define("Pet", {

        pet_name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Jimbo", //this needs to be removed in the real version; just for proof of concept
            validate: {
                len: [1, 255]
            }
        }
    });

    Pet.associate = function (models) {
        Pet.belongsTo(models.Character, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Pet;
};