-- Drops the hospital table if it exists
DROP TABLE IF EXISTS hospital;

-- Drops the department table if it exists
DROP TABLE IF EXISTS department;

-- Drops the doctor table if it exists
DROP TABLE IF EXISTS doctor;

-- Drops the users table if it exists
DROP TABLE IF EXISTS users;

-- Drops the loggedin table if it exists
DROP TABLE IF EXISTS loggedin;

-- Creates the hospital table to store hospital-related information
CREATE TABLE hospital (
    hplaceid VARCHAR(50) PRIMARY KEY,
    hname VARCHAR(50),
    haddress VARCHAR(50),
    hpluscode VARCHAR(50),
    hlat NUMERIC(20),
    hlng NUMERIC(20),
    hphone VARCHAR(50),
    hwebsite VARCHAR(50),
    hemail VARCHAR(50),
    hrating VARCHAR(50)
);

-- Creates the department table to store department-related information
CREATE TABLE department (
    did VARCHAR(50) PRIMARY KEY,
    dname VARCHAR(50),
    dphone VARCHAR(50),
    hplaceid VARCHAR(50) NOT NULL,
    FOREIGN KEY (hplaceid) REFERENCES hospital(hplaceid)
);

-- Creates the doctor table to store doctor-related information
CREATE TABLE doctor (
    pid VARCHAR(50) PRIMARY KEY,
    pname VARCHAR(50),
    did VARCHAR(50) NOT NULL,
    hplaceid VARCHAR(50) NOT NULL,
    FOREIGN KEY (hplaceid) REFERENCES hospital(hplaceid),
    FOREIGN KEY (did) REFERENCES department(did)
);

-- Creates the users table to store user information
CREATE TABLE users (
    email VARCHAR(50) PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    phone NUMERIC(50) NOT NULL,
    passwrd VARCHAR(100) NOT NULL
);

-- Creates the loggedin table to store logged-in user information
CREATE TABLE loggedin (
    token VARCHAR(100) PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    FOREIGN KEY (email) REFERENCES users(email)
);
