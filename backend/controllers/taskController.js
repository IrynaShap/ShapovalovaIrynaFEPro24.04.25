const { DataBase } = require('../models/database');
const { MongoStorage } = require('../models/mongoStorage');

class TaskController {
    constructor() {
        this.db = new DataBase(new MongoStorage());
    }

    async getAllTasks(req, res) {
        try {
            const items = await this.db.getData();
            res.json(items);
        } catch (err) {
            console.error('Error fetching tasks:', err);
            res.status(500).json({ error: 'Failed to fetch items' });
        }
    }

    async createTask(req, res) {
        try {
            const item = await this.db.setData(req.body);
            if (!item) {
                return res.status(400).json({ error: 'Invalid data' });
            }
            res.status(201).json(item);
        } catch (err) {
            console.error('Error creating task:', err);
            res.status(500).json({ error: 'Failed to create item' });
        }
    }

    async updateTask(req, res) {
        try {
            const updated = await this.db.updateData(req.params.id, req.body);
            if (!updated) {
                return res.status(400).json({ error: 'Invalid data or item not found' });
            }
            res.json(updated);
        } catch (err) {
            console.error('Error updating task:', err);
            res.status(500).json({ error: 'Failed to update item' });
        }
    }

    async deleteTask(req, res) {
        try {

            console.log(`Deleting task with ID: ${req.params.id}`);
            const deleted = await this.db.deleteData({ id: req.params.id });
            if (!deleted) {
                return res.status(404).json({ error: 'Item not found' });
            }
            res.json(deleted);
        } catch (err) {
            console.error('Error deleting task:', err);
            res.status(500).json({ error: 'Failed to delete item' });
        }
    }
}

module.exports = TaskController;
