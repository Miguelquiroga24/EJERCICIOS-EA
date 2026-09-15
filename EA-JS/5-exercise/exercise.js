
// En este ejercicio practicamos filter, map, reduce y desestructuración con los datos de una API.
// Hay que quedarse con los usuarios que tengan un id par.
// Después se crea otro array que solo tenga id, name y city.
// También hay que añadir un "Guest User" al principio sin cambiar el array anterior.
// Al final se suman los caracteres de todos los nombres usando reduce.

fetch('https://jsonplaceholder.typicode.com/users/')
  .then(response => response.json())
  .then(users => {
    // CÓDIGO:
    console.log("--- Processed Users ---");
    //Me quedo con los usuarios que tienen un id par
    const filteredUsers = users.filter(user => user.id % 2 === 0);
    //De cada usuario saco solo los datos que necesito
    const cleanUsers = filteredUsers.map(({ id, name, address: { city } }) => ({ id, name, city }));
    // Añado el invitado al principio copiando el array con spread
    const processedUsers = [{ id: 0, name: 'Guest User', city: 'Unknown' }, ...cleanUsers];
    console.log(processedUsers);

    console.log("--- Statistics ---");
    // Sumo la longitud de todos los nombres, incluido el invitado
    const totalCharacters = processedUsers.reduce((total, user) => total + user.name.length, 0);
    console.log('Total de caracteres:', totalCharacters);
  })
  .catch(error => console.error('No se pudieron cargar los usuarios:', error));


  //SALIDA DE CONSOLA:
  // --- Processed Users ---
  // [
  //   { id: 0, name: 'Guest User', city: 'Unknown' },
  //   { id: 2, name: 'Ervin Howell', city: 'Wisokyburgh' },
  //   { id: 4, name: 'Patricia Lebsack', city: 'Romaguera' },
  //   { id: 6, name: 'Mrs. Dennis Schulist', city: 'South Christy' },
  //   { id: 8, name: 'Nicholas Runolfsdottir V', city: 'Aliyaview' },
  //   { id: 10, name: 'Clementina DuBuque', city: 'Lebsackbury' }
  // ]
  // --- Statistics ---
  // Total de caracteres: 92  