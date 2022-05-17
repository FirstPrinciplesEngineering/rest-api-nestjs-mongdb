import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TodoDocument = Todo & Document;

@Schema({ timestamps: true })
export class Todo {
  @Prop()
  title: string;

  @Prop()
  description: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
