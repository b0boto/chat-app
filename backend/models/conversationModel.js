import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    messages:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
            default: [],
        },
    ],
    conversationName:
        {
            type: String,
            default: '',
        },
    adminUser:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false,
            default: null,
        },
    img:
        {
            type: String,
        },
    type:
        {
            type: String,
            required: true,
            enum: ['GROUP', 'CHAT', 'CHANNEL'],
        },
    keyword:
        {
            type: String,
        }
    },{timestamps: true}
);

const Conversation = mongoose.model('Conversation', conversationSchema);
export default Conversation;