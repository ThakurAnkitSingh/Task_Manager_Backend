/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('tasks', (table) => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.text('description').nullable();
        table.integer('status').defaultTo(0); // 0 for "To Do", 1 for "In Progress", 2 for "Done"
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.timestamps(true, true); // Automatically adds created_at and updated_at
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('tasks');
};
