import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
  user: String,
  added: Date,
  text: String,
});

const Message = model('Message', messageSchema);

export default Message;
