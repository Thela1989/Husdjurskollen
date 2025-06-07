-- Skapa databasstruktur för husdjursappen
-- Innehåller tabeller, relationer och exempeldata

-- TABELLER

CREATE TABLE public.users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE public.pets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50),
    birth_date DATE,
    owner_id INTEGER REFERENCES public.users(id),
    breed VARCHAR(100),
    gender VARCHAR(10),
    color VARCHAR(50)
);

CREATE TABLE public.health (
    id SERIAL PRIMARY KEY,
    pet_id INTEGER NOT NULL REFERENCES public.pets(id) ON DELETE CASCADE,
    type VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    vet VARCHAR(100),
    notes TEXT,
    health_date DATE
);

CREATE TABLE public.petcare (
    id SERIAL PRIMARY KEY,
    pet_id INTEGER REFERENCES public.pets(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    done BOOLEAN DEFAULT FALSE
);


-- EXEMPELDATA

INSERT INTO public.users (id, name, email, password) VALUES
(1, 'Kalle Karlsson', 'kalle@djurmail.se', 'kallepass'),
(2, 'Anna Andersson', 'Anna.Andersson@hotmail.com', 'lisa123'),
(3, 'Max Mattsson', 'max@fluffpost.se', 'maximal123'),
(4, 'Nisse Nyfiken', 'nisse@example.com', 'hemligt123'),
(7, 'John Johansson', 'johnJ@example.com', 'hello123');

INSERT INTO public.pets (id, name, type, birth_date, owner_id, breed, gender, color) VALUES
(5, 'Bella', 'Hund', '2020-05-01', 1, 'Pudel', 'Hona', 'Vit'),
(7, 'Zelda', 'Kanin', '2021-03-12', 3, 'Dvärgvädur', 'Hona', 'Vit'),
(22, 'Leo', 'Katt', '2018-05-04', 2, 'Norsk skogskatt', 'Hane', 'Grå');

INSERT INTO public.health (id, pet_id, type, description, vet, notes, health_date) VALUES
(10, 5, 'Vaccination', 'Rabiesvaccin', 'Djurdoktorn AB', 'Årlig spruta', '2023-06-01');

INSERT INTO public.petcare (id, pet_id, title, done) VALUES
(43, 5, 'Borsta pälsen', false),
(44, 7, 'Rengöra bur', true);


-- ÅTERSTÄLL SEKVENSSVÄRDEN 

SELECT setval('users_id_seq', 7, true);
SELECT setval('pets_id_seq', 22, true);
SELECT setval('health_id_seq', 10, true);
SELECT setval('petcare_id_seq', 44, true);
