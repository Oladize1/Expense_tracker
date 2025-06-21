import mongoose, {Schema, Types, Document} from "mongoose";

interface IExpense extends Document {
    _id: Types.ObjectId,
    title: string,
    amount: number,
    category: string,
    user: Types.ObjectId,
    createdAt: Date,
    updatedAt: Date
}

const expenseSchema = new Schema<IExpense>({
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type:String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})

export const Expense = mongoose.model<IExpense>('Expense', expenseSchema)