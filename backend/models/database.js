const OBJECT_KEYS = ['title', 'description'];

const validateObject = (obj) => {
    if (typeof obj !== 'object') return false;
    return OBJECT_KEYS.every(key => obj.hasOwnProperty(key));
};

class DataBase {
    constructor(storage) {
        this.storage = storage;
    }

    async getData() {
        return this.storage.getAll();
    }

    async getItemById(id) {
        return this.storage.getById(id);
    }

    async setData(data) {
        if (!validateObject(data)) return null;
        return this.storage.insert(data);
    }

    async deleteData({ id }) {
        return this.storage.deleteById(id);
    }

    async updateData(id, data) {
        if (!validateObject(data)) return null;
        return this.storage.updateById(id, data);
    }
}

module.exports = { DataBase, validateObject };
