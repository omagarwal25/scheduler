import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Users } from 'src/users/schemas/users.schema';
import { Course } from 'src/courses/schemas/courses.schema';

export type SchedulerDocument = Scheduler & Document;

@Schema()
export class Scheduler {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  user: Users;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    required: true,
  })
  gradeNine: Course[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    required: true,
  })
  gradeTen: Course[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    required: true,
  })
  gradeEleven: Course[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    required: true,
  })
  gradeTwelve: Course[];

  @Prop([String])
  input: string[];

  @Prop({ required: true, type: Date, default: Date.now })
  createdAt: Date;
}

export const SchedulerSchema = SchemaFactory.createForClass(Scheduler);
