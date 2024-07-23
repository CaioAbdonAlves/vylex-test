import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ThemeDocument = HydratedDocument<Theme>;

@Schema()
export class Theme {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  id: number;
}

export const ThemeSchema = SchemaFactory.createForClass(Theme);
