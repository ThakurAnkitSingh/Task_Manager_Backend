const db = require('../config/db');

const Task = {
  findAllByUser: (userId) => db('tasks').where({ user_id: userId }).orderBy('id', 'desc'),
  findById: (id) => db('tasks').where({ id }).first(),
  create: (task) => db('tasks').insert(task),
  update: (id, task) => db('tasks').where({ id }).update(task),
  delete: (id) => db('tasks').where({ id }).del(),
};

module.exports = Task;