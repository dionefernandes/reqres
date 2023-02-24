import { Document } from 'mongoose';

export interface ReqResAPIInterface extends Document {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}
