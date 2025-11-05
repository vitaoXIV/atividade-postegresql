const db = require('../db');

module.exports = {
    getAll,
    getById,
    createItem,
    updateItem,
    deleteItem
};

async function getAll(req, res) {
    try {
        const result = await db.query('SELECT * FROM items ORDER BY id ASC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Erro ao buscar items' });
    }
}

async function getById(req, res) {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM items WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Item não encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching item by ID:', error);
        res.status(500).json({ error: 'Erro ao buscar item' });
    }
}



async function createItem(req, res) {
    const { name, description, price } = req.body;
    if (!name || price == null) {
        return res.status(400).json({ error: 'Nome e preço são obrigatórios' });
    }
    try {
        const result = await db.query(
            'INSERT INTO items (name, description, price) VALUES ($1, $2, $3) RETURNING *',
            [name, description, price]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating item:', error);
        res.status(500).json({ error: 'Erro ao criar item' });
    }
}
async function updateItem(req, res) {
    const { id } = req.params;
    const { name, description, price } = req.body;
    try {
        const result = await db.query(
            'UPDATE items SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *',
            [name, description, price, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Item não encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ error: 'Erro ao atualizar item' });
    }
}
    

async function deleteItem(req, res) {
    const { id } = req.params;
    try {
        // Verifica se o item existe
        const checkItem = await db.query('SELECT * FROM items WHERE id = $1', [id]);
        if (checkItem.rows.length === 0) {
            return res.status(404).json({ error: 'Item não encontrado' });
        }

        // Deleta o item
        await db.query('DELETE FROM items WHERE id = $1', [id]);
        res.status(200).json({ message: 'Item deletado com sucesso' });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ error: 'Erro ao deletar item' });
    }
}

module.exports = {
    getAll,
    getById,
    createItem,
    updateItem,
    deleteItem,
};