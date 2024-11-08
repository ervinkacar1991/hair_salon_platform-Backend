import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import User from './userModel';

interface SalonAttributes {
    id: number;
    name: string;
    address: string;
    description: string;
    ownerId: number;
}

interface SalonCreationAttributes extends Optional<SalonAttributes, 'id'> { }

class Salon extends Model<SalonAttributes, SalonCreationAttributes> implements SalonAttributes {
    public id!: number;
    public name!: string;
    public address!: string;
    public description!: string;
    public ownerId!: number;
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
            type: DataTypes.TEXT,
            allowNull: true,
        },
        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,  // Connection to User model
                key: 'id',
            },
            onDelete: 'CASCADE',  // If owner is deleted, all salons are deleted
        },
    },
    {
        sequelize,
        modelName: 'Salon',
        tableName: 'salons',
        timestamps: true,
    }
);

// Deffine relationships between Salon and User
User.hasMany(Salon, { foreignKey: 'ownerId', as: 'salons' });
Salon.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

export default Salon;
