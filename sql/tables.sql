-- Table for towns
CREATE TABLE towns (
    town_id SERIAL PRIMARY KEY,
    town_name TEXT NOT NULL,
    town_code VARCHAR(2) NOT NULL
);

-- Table for registrations
CREATE TABLE reg_numbers (
    registration_id SERIAL PRIMARY KEY,
    reg_number VARCHAR(20) NOT NULL,
    town_id INT NOT NULL,
    CONSTRAINT fk_town
        FOREIGN KEY (town_id)
        REFERENCES towns (town_id)
);
