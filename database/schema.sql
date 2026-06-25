CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    fullName TEXT,
    bio TEXT,
    profilePicture TEXT DEFAULT 'default-profile.png',
    isBlocked BOOLEAN DEFAULT 0,
    isAdmin BOOLEAN DEFAULT 0,
    -- Ajuste aqui: adicionado valor padrão caso insira dados via script
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);