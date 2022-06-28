const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
} = require('./handler');

const routes = [
  // posting notes
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },

  // GET ALL notes
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },

  // GET specific notes
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },

  // Edit Specific notes PUT
  {
    method: 'PUT',
    path: '/notes/{id}',
    // handler: () => {},
    handler: editNoteByIdHandler,
  },

  // Delete specific notes DELETE
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
  },

];

module.exports = routes;
