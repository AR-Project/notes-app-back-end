/* eslint-disable no-shadow */
const { request } = require('http');
const { nanoid } = require('nanoid');
const notes = require('./notes');

// Add Note Handler Function
const addNoteHandler = (request, h) => {
  // Fetch data dari payload, dan parsing ke tiga variable
  const { title, tags, body } = request.payload;

  // Generate metadata
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  // Compile all information above inside newNote Object
  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  // PUSH newNote into array notes
  notes.push(newNote);

  // check apakah notes sudah masuk, dengan cara ngecheck apakah
  // method filter bisa return value ketika parameter yang dipakai note.id
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  // if statement success
  if (isSuccess) {
    console.log(`ADDED: Note [${newNote.title}], id [${newNote.id}].`);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  // in case id tidak ditemukan
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// Get ALL notes Handler
const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
}
);

// Get Specific notes by ID Handler
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    console.log(`FOUND: Note [${note.title}], id [${note.id}].`);
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

// EDIT note by ID Handler
const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;

  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbaharui',
    });
    response.code(200);
    console.log(`EDITED: Note [${notes[index].title}], id [${notes[index].id}].`);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. ID tidak ditemukan.',
  });
  response.code(404);
  return response;
};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    console.log(`DELETED: Note [${notes[index].title}], id [${notes[index].id}].`);
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);

    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. ID tidak ditemukan.',
  });
  response.code(404);
  return response;
};

// Module yang diexport, pakai object literal
module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
