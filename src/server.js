console.log('Hello');

// Create array for note object contains:
// -- id: string, title: string, createAt: string, updateAt: string,
// -- tags: array of string, body: string
//
// on /notes POST, note is sent from client to server
// --generate id, createAt, updateAt
// --parsing JSON from request body
// --- title, tags [], body,
// --compile all info and push into array
// --respone status code 201
// --return message create function with param noteID)
// --else disable return fail message code 500
//
// on /notes GET, client asking ALL of note in notes Object
// --create transport object
// --push ALL note into transport (on data)
// --if note is empty return empty transport code 200
//
// on /notes/{id} GET
// --use ID to find a note
// --return note
// --else return status fail code 404
//
// on /notes/{id} PUT
// --parsing body to note
// --push notes into notes object
// --code 200
//
// on /notes/{id} DELETE
// --use ID to drop data from notes Array
// --code 200
// --if ID not exist code 404 return message fail

const Hapi = require('@hapi/hapi');

const routes = require('./routes');

const init = async () => {
  const server = Hapi.Server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
