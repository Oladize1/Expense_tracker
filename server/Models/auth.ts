import mongoose, {Schema, Document, Types} from "mongoose";

export interface IUser extends Document {
    email: string,
    password: string,
    expenses: Types.ObjectId[]
}

const userSchema: Schema<IUser> = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    expenses: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Expense'
    }
    ]
})

export const User = mongoose.model<IUser>('User', userSchema)