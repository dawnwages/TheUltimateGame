//Character model for the RPG
module.exports = function (sequelize, DataTypes) {
    var Character = sequelize.define("Character", {

        char_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 255]
            }
        },
        hp: {
            type: DataTypes.INTEGER,
            defaultValue: 100,
            allowNull: false
        },
        attack: {
            type: DataTypes.INTEGER,
            defaultValue: 100,
            allowNull: false
        },
        coins: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        lvl_comp: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        sprite: {
            type: DataTypes.STRING,
            defaultValue: "warrior",
            allowNull: false
        }
    });

    Character.associate = function (models) {
        Character.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    Character.associate = function (models) {
        Character.hasMany(models.Pet, {
            foreignKey: {
                allowNull: true
            }
        });
    };

    return Character;
};
