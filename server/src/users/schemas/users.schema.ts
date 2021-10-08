import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema()
export class Users {
  @Prop({ required: true, type: String })
  username: string;

  @Prop()
  thirdPartyId?: string;

  @Prop({ unique: true, type: String })
  email?: string;

  @Prop()
  name?: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
