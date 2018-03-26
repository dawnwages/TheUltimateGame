//Character model for the RPG
module.exports = function (sequelize, DataTypes) {
    var Character = sequelize.define("Character", {

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Jimbo", //this needs to be removed in the real version; just for proof of concept
            validate: {
                len: [1, 255]
            }
        }
    });

    Character.associate = function (models) {
        Character.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Character;
};
