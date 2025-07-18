CREATE TABLE IF NOT EXISTS clientesReparto (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reparto_id INTEGER NOT NULL,
  cliente_id INTEGER NOT NULL,
  FOREIGN KEY(reparto_id) REFERENCES repartos(id),
  FOREIGN KEY(cliente_id) REFERENCES clientes(id)
);
