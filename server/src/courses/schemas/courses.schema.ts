import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { preReq, preReqSchema } from './prereq.schema';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [preReqSchema] })
  preReqsCatogoryA: preReq[];

  @Prop({ type: [preReqSchema] })
  preReqsCatogoryB: preReq[];

  @Prop({ type: [String], required: true })
  credits: string[];

  @Prop({ required: true })
  gradeReq: number;

  @Prop({ required: true })
  prestige: number;

  @Prop({
    required: true,
    enum: ['SEMESTER_ONE', 'SEMESTER_TWO', 'WHOLE_YEAR', 'HALF_YEAR'],
  })
  semester: string;

  @Prop()
  courseTier: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
