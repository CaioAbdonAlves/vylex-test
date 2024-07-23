import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Theme } from './theme.schema';

export type PlanDocument = HydratedDocument<Plan>;

@Schema()
export class Plan {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'themes' }],
    required: true,
  })
  themes: Theme[];

  @Prop({ required: true })
  version: number;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
