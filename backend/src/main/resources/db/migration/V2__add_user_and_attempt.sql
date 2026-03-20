CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE attempts (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    completion_time_ms BIGINT,
    click_count INT,
    frustration_level INT,
    error_count INT,
    submit_attempts INT,
    completed BOOLEAN,
    created_at TIMESTAMP NOT NULL
);
