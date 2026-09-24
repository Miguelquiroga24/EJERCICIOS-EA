import { Schema, model, Types } from 'mongoose';

// Modelo de Project. Cada proyecto pertenece a una organización,
// así que guardo su _id y luego con populate saco los datos completos.

// Los estados que puede tener un proyecto
export type ProjectStatus = 'PLANNED' | 'ACTIVE' | 'DONE';

// Interface con la forma del documento (igual que hace el profe en Organization)
export interface IProject {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  status: ProjectStatus;
  organization: Types.ObjectId;
}

const projectSchema = new Schema<IProject>({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  status: { type: String, enum: ['PLANNED', 'ACTIVE', 'DONE'], default: 'PLANNED' },
  // ref: 'Organization' es lo que permite hacer el populate después
  organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true }
});

export const ProjectModel = model<IProject>('Project', projectSchema);
