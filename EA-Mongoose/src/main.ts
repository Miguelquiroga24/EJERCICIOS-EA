import { connectDatabase, disconnectDatabase } from './config/db.js';
import { deleteAllOrganizations, seedOrganizations } from './services/organization.service.js';
import {
  createProject,
  deleteProject,
  getProjectById,
  listAllProjects,
  updateProject
} from './services/projectService.js';

// Script para probar que todo el CRUD de Project funciona.
// Ejecutar con: npm start (necesita MongoDB en marcha)

const main = async (): Promise<void> => {
  try {
    await connectDatabase();
    console.log('Conectado a MongoDB');

    // Limpio lo que haya de otras ejecuciones para empezar desde cero
    const oldProjects = await listAllProjects();
    await Promise.all(oldProjects.map((project) => deleteProject(project._id)));
    await deleteAllOrganizations();

    // Los proyectos necesitan una organización, así que creo dos
    const [initech, umbrella] = await seedOrganizations([
      { name: 'Initech', country: 'USA' },
      { name: 'Umbrella Corp', country: 'UK' }
    ]);

    console.log('\n--- create ---');
    const web = await createProject({
      name: 'Nueva web corporativa',
      description: 'Rediseño de la página web de la empresa',
      status: 'PLANNED',
      organization: initech._id
    });
    const vacuna = await createProject({
      name: 'Investigación de la vacuna',
      status: 'ACTIVE',
      organization: umbrella._id
    });
    console.log('Proyecto creado:', web);

    console.log('\n--- getById (con populate) ---');
    const webConOrg = await getProjectById(web._id);
    console.log(webConOrg);
    console.log('Organización del proyecto:', webConOrg?.organization.name);

    console.log('\n--- update ---');
    const webActualizado = await updateProject(web._id, { status: 'ACTIVE' });
    console.log('Estado antes: PLANNED, ahora:', webActualizado?.status);

    console.log('\n--- listAll ---');
    const todos = await listAllProjects();
    console.log(`Hay ${todos.length} proyectos`);
    console.table(todos.map(({ name, status }) => ({ name, status })));

    console.log('\n--- delete ---');
    const borrado = await deleteProject(vacuna._id);
    console.log('Proyecto borrado:', borrado?.name);
    console.log('Lo busco otra vez:', await getProjectById(vacuna._id));
    console.log(`Quedan ${(await listAllProjects()).length} proyectos`);
  } catch (error) {
    console.error('Ha habido un error:', error);
  } finally {
    await disconnectDatabase();
    console.log('\nDesconectado de MongoDB');
  }
};

main();
