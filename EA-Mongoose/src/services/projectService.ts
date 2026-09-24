import { Types } from 'mongoose';
import { ProjectModel, IProject } from '../models/project.js';
import { OrganizationModel, IOrganization } from '../models/organization.model.js';

// Service de Project: el CRUD hecho con funciones sueltas (sin clases).
// Cada función recibe lo que necesita por parámetro y devuelve una Promise,
// así luego se podrán llamar desde un controller de Express sin cambiar nada.

// Datos para crear un proyecto (sin _id, eso lo pone Mongo)
export type ProjectData = Omit<IProject, '_id'>;

// Un proyecto con la organización ya cargada (después del populate)
export type ProjectWithOrganization = Omit<IProject, 'organization'> & {
  organization: IOrganization;
};

// Guarda un proyecto nuevo
export const createProject = async (data: ProjectData): Promise<IProject> =>
  ProjectModel.create(data);

// Busca por id y con populate cambia el id de la organización por la organización entera.
// Le paso el model a mano porque si no, cuando este archivo se usa solo, Mongoose no
// conoce "Organization" y da error (me pasó probándolo)
export const getProjectById = async (
  id: Types.ObjectId | string
): Promise<ProjectWithOrganization | null> =>
  ProjectModel.findById(id)
    .populate<{ organization: IOrganization }>({ path: 'organization', model: OrganizationModel })
    .lean();

// Modifica solo los campos que le pasamos. Con new: true devuelve el proyecto ya
// modificado y con runValidators comprueba que el status siga siendo válido
export const updateProject = async (
  id: Types.ObjectId | string,
  data: Partial<ProjectData>
): Promise<IProject | null> =>
  ProjectModel.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();

// Elimina el proyecto y devuelve el que se ha borrado (o null si no existía)
export const deleteProject = async (
  id: Types.ObjectId | string
): Promise<IProject | null> => ProjectModel.findByIdAndDelete(id).lean();

// Lista todos los proyectos. Uso lean() porque solo voy a leer los datos
export const listAllProjects = async (): Promise<IProject[]> => ProjectModel.find().lean();
