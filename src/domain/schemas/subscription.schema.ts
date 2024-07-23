import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Plan } from './plan.schema';

export type SubscriptionDocument = HydratedDocument<Subscription>;

@Schema()
export class Subscription {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'plans', required: true })
  plan: Plan;

  @Prop({ required: true })
  users: number[];
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
