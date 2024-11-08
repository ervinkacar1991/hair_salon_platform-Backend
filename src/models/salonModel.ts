import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";


class Salon extends Model {
    public id!: number;
    public name!: string;
    public address!: string;
    public description!: string;
}

Salon.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Salon',
        tableName: 'salons',
    }
)
