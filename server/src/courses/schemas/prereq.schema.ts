import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class preReq {
  @Prop()
  name: string;

  @Prop()
  concurrent: boolean;
}

export const preReqSchema = SchemaFactory.createForClass(preReq);
