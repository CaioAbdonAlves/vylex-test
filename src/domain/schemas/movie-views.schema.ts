import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MovieViewsDocument = HydratedDocument<MovieViews>;

@Schema()
export class MovieViews {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  title: string;

  @Prop({
    type: [{ id: { type: Number }, name: { type: String } }],
  })
  themes: { id: number; name: string }[];

  @Prop({ required: true })
  userId: number;
}

export const MovieViewsSchema = SchemaFactory.createForClass(MovieViews);
