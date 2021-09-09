import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SchedulerDocument = Scheduler & Document;

@Schema()
export class Scheduler {
  @Prop({ required: true })
  user: string;

  @Prop({ requied: true, type: [String] })
  gradeNine: string[];

  @Prop({ requied: true, type: [String] })
  gradeTen: string[];

  @Prop({ requied: true, type: [String] })
  gradeEleven: string[];

  @Prop({ requied: true, type: [String] })
  gradeTwelve: string[];

  @Prop({ required: true, type: Date, default: Date.now })
  createdAt: Date;
}

export const SchedulerSchema = SchemaFactory.createForClass(Scheduler);
