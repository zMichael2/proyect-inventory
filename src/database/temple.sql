-- drop DATABASE if exists backend_proyect;
CREATE DATABASE backend_proyect;

USE backend_proyect;

CREATE TABLE users(
user_id INT NOT NULL auto_increment unique ,
name_user varchar(40) NOT NULL,
email_user varchar(30) NOT NULL unique,
password_user varchar(20) NOT NULL unique,
verification INT NOT NULL,
rol INT NOT NULL,
val_chan_pass INT NOT NULL,
created_at TIMESTAMP NOT NULL DEFAULT (NOW()),
primary key(user_id),
foreign key(verification) references verification(verification_id),
foreign key(rol) references rol(rol_id)
);


-- drop table if exists verification;
create table verification (
verification_id INT NOT NULL auto_increment unique,
verification_code varchar(20) null default null,
isactivate boolean default false,
primary key(verification_id));

-- INSERT INTO verification (verification_code, isactivate)
-- VALUES("JHTYG", TRUE);

-- ALTER TABLE verification AUTO_INCREMENT = 1;

create table rol (
rol_id INT NOT NULL auto_increment unique,
roles varchar(20) unique not null,
primary key(rol_id));

-- INSERT INTO rol (roles)
-- VALUES("admin");

create table val_chan_pass (
changepass_id INT NOT NULL auto_increment unique,
cod_changepass varchar(20) null default null,
isactivate boolean default false,
primary key(changepass_id));

-- INSERT INTO val_chan_pass (cod_changepass, isactivate )
-- VALUES("GLKFE", true);





-- CONSULTAS DE COMO SABER LA INFORMACION DE TAL COSA
SELECT users.*, verification.*
FROM users
JOIN verification ON users.verification = verification.verification_id;


-- EJEMPLO DE INSERTAR COSAS EN LAS TABLAS

-- Insertar datos en la tabla 'verification'
INSERT INTO verification (verification_code, isactivate) VALUES ('JHTYG', TRUE);

-- Insertar datos en la tabla 'rol'
INSERT INTO rol (roles) VALUES ('admin');

-- Insertar datos en la tabla 'val_chan_pass'
INSERT INTO val_chan_pass (cod_changepass, isactivate) VALUES ('GLKFE', TRUE);

-- Insertar datos en la tabla 'users' considerando las relaciones
INSERT INTO users (name_user, email_user, password_user, verification, rol, val_chan_pass)
VALUES ('Usuario1', 'usuario1@example.com', 'contraseña1', 1, 1, 1);

-- Aquí, 'verification' y 'rol' se relacionan con sus respectivas tablas usando las claves foráneas
-- y 'val_chan_pass' se relaciona con su tabla también.

-- Puedes continuar insertando más datos según sea necesario, siguiendo un enfoque similar.

-- -------------------------------------
use backend_proyect;

SELECT u.name_user
FROM users u
INNER JOIN verification v ON u.verification = v.verification_id
WHERE u.email_user = 'maikoldesigner@gmail.com' AND v.verification_code = 'Aq38iXe';

SELECT v.isactivate
FROM users u
INNER JOIN verification v ON u.verification = v.verification_id
WHERE u.email_user = 'maikoldesigner@gmail.com' AND v.verification_code = 'Aq38iXe';

-- ESTA ME SIRVE
SELECT u.name_user, v.isactivate
FROM users AS u
INNER JOIN verification AS v ON u.verification = v.verification_id
WHERE u.email_user = 'maikoldesigner@gmail.com'
  AND v.verification_code = 'Aq38iXe';


-- OTRRA CONSULTA
UPDATE verification
SET isactivate = true
WHERE verification_id = (
  SELECT verification_id
  FROM users
  WHERE email_user = 'correo_ejemplo@gmail.com'
);


------------------------------------------
create table verification (
verification_id INT NOT NULL auto_increment unique,
verification_code varchar(20) null default null,
isactivate boolean default false,
isactivatechange boolean default false,
primary key(verification_id));

create table rol (
rol_id INT NOT NULL auto_increment unique,
roles varchar(20) unique not null,
primary key(rol_id));

CREATE TABLE users(
user_id INT NOT NULL auto_increment unique ,
name_user varchar(40) NOT NULL,
email_user varchar(30) NOT NULL unique,
password_user varchar(90) NOT NULL unique,
verification INT NOT NULL,
rol INT NOT NULL,
created_at TIMESTAMP NOT NULL DEFAULT (NOW()),
primary key(user_id),
foreign key(verification) references verification(verification_id),
foreign key(rol) references rol(rol_id)
);

----------------INVENTORY-----------------
-- PODER ELIMINAR ---
use backend_proyect;
drop table if exists cumulativeprice;
drop table if exists inventory;

CREATE TABLE inventory (
  id VARCHAR(50) NOT NULL UNIQUE,
  user_id INT NOT NULL,
  description VARCHAR(100) NULL,
  total_price DECIMAL(10, 0) NOT NULL,
  price_paid DECIMAL(10, 0) NULL,
  neighborhood VARCHAR(20) NULL,
  date VARCHAR(30) NULL,
  payment_end_day VARCHAR(10) NOT NULL,
  pending_debt BOOLEAN DEFAULT FALSE,
  iscompleted BOOLEAN DEFAULT FALSE,
  isactive BOOLEAN DEFAULT TRUE,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE cumulativeprice (
id varchar(50) NOT NULL UNIQUE,
fee DECIMAL NOT NULL, 
date VARCHAR(30) NOT NULL DEFAULT (NOW()),
user_id INT NOT NULL,
inventory_id varchar(30) NOT NULL,
primary key(id),
foreign key(user_id)references users(user_id),
foreign key(inventory_id)references inventory(id)
);


-- PODER ELIMINAR ---
use backend_proyect;
drop table if exists cumulativeprice;
drop table if exists inventory;


--- BUSCAR INVENTARIO Y USUARIO---
SELECT i.user_id
FROM inventory AS i
JOIN users AS u ON i.user_id = u.user_id
WHERE i.id = 'tu_id_de_inventario' AND u.email = 'tu_email_de_usuario';

-- SUMAR LOS FEE QUE TENGA LA USER_ID + INVENTARIO en parametros --
SELECT user_id, inventory_id, SUM(fee) AS total_fee
FROM cumulativeprice
WHERE user_id = 'tu_user_id' AND inventory_id = 'tu_inventory_id'
GROUP BY user_id, inventory_id;

-- SUMA DE TOTAL PRINCE DE LOS QUE NO HAN PAGADO --
SELECT SUM(total_price) AS total_debt
FROM inventory
WHERE pending_debt = true;