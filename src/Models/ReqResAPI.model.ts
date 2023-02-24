import * as mongoose from 'mongoose';

export const reqResAPIModel = new mongoose.Schema(
  {
    id: { type: Number, require: true },
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    avatar: { type: String },
  },
  {
    timestamp: true,
    collection: 'users',
  },
);
