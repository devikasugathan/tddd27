from flask import Flask, current_app, g
import sqlite3

DATABASE = 'database.db'

# Establishes a connection to the SQLite database
def get_db():
    db = getattr(g, 'db', None)
    if db is None:
        db = g.db = sqlite3.connect(DATABASE)
    return db

# Closes the database connection
def disconnect_db():
    db = getattr(g, 'db', None)
    if db is not None:
        g.db.close()
        g.db = None

# Retrieves hospital data based on the given place ID
def get_hospdata(hplaceid):
    cursor = get_db().execute("select hplaceid, hname, haddress, hpluscode, hlat, hlng, hphone, hwebsite, hrating from hospital where hplaceid = ?;", [hplaceid])
    result = cursor.fetchone()
    cursor.close()
    return result

# Retrieves user data based on the given email
def get_userdata(email):
    cursor = get_db().execute("select email, username, phone, passwrd from users where email = ?;", [email])
    result = cursor.fetchone()
    cursor.close()
    return result

# Stores user data into the database
def store_userdata(email, username, phone, passwrd):
    try:
        get_db().execute("insert into users(email, username, phone, passwrd) values (?,?,?,?);", [email, username, phone, passwrd])
        get_db().commit()
        return True
    except sqlite3.Error as er:
        print(er)
        return False

# Retrieves all hospital data
def get_allhospdata():
    cursor = get_db().execute("select * from hospital;")
    result = cursor.fetchall()
    cursor.close()
    return result

# Retrieves all department data
def get_alldeptdata():
    cursor = get_db().execute("select * from department;")
    result = cursor.fetchall()
    cursor.close()
    return result

# Retrieves all doctor data
def get_alldoctdata():
    cursor = get_db().execute("select * from doctor;")
    result = cursor.fetchall()
    cursor.close()
    return result

# Checks if a hospital exists in the database based on place ID
def hospital_exist(hplaceid):
    cursor = get_db().execute("select hplaceid from hospital where hplaceid = ?", [hplaceid])
    result = cursor.fetchone()
    cursor.close()
    if result is None:
        return False
    else:
        return True

# Stores hospital data into the database
def store_hospdata(hplaceid, hname, haddress, hpluscode, hlat, hlng, hphone, hwebsite, hrating):
    try:
        get_db().execute("insert into hospital(hplaceid, hname, haddress, hpluscode, hlat, hlng, hphone, hwebsite, hrating) values (?,?,?,?,?,?,?,?,?);", [hplaceid, hname, haddress, hpluscode, hlat, hlng, hphone, hwebsite, hrating])
        get_db().commit()
        return True
    except sqlite3.Error as er:
        print(er)
        return False

# Checks if a user is logged in based on the given token
def check_loginfromtoken(token):
    cursor = get_db().execute("select email from loggedin where token = ?", [token])
    result = cursor.fetchone()
    cursor.close()
    return result

# Stores login data (token and email) into the database
def store_login(token, email):
    try:
        get_db().execute("insert into loggedin values (?,?);", [token, email])
        get_db().commit()
        return True
    except:
        return False

# Removes login data based on the given token
def remove_login(token):
    cursor = get_db().execute("select email from loggedin where token = ?", [token])
    result = cursor.fetchone()
    cursor.close()
    if result is None:
        return False
    else:
        try:
            res = get_db().execute("delete from loggedin where token = ?", [token])
            get_db().commit()
            return True
        except:
            return False

# Changes the password for a user based on the email
def change_pass(email, passwrd):
    try:
        get_db().execute("update users set passwrd = ? where email = ?", [passwrd, email])
        get_db().commit()
        return True
    except:
        return False
