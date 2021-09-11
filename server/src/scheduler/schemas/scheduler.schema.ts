import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Users } from 'src/users/schemas/users.schema';

export type SchedulerDocument = Scheduler & Document;

@Schema()
export class Scheduler {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  user: Users;

  @Prop({ required: true, type: [String] })
  gradeNine: string[];

  @Prop({ required: true, type: [String] })
  gradeTen: string[];

  @Prop({ required: true, type: [String] })
  gradeEleven: string[];

  @Prop({ required: true, type: [String] })
  gradeTwelve: string[];

  @Prop([String])
  input: string[];

  @Prop({ required: true, type: Date, default: Date.now })
  createdAt: Date;
}

export const SchedulerSchema = SchemaFactory.createForClass(Scheduler);
