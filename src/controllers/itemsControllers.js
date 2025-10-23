const db = require('../db');

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

}