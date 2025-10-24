import { Schema,model, models, Document } from "mongoose";

export interface IContact extends Document{
    fullName: string,
    email: string,
    message: string,
    createdAt: Date,
}

const ContactSchema = new Schema <IContact>({
    fullName: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    message: {type:String, required: true},
    createdAt: { type: Date, default: Date.now}
})

const Contact = models.Contact || model<IContact>("Contact", ContactSchema, "Contacts" );
export default Contact;