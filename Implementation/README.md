
# GDM (Game Devlompment Manager)

This is a sample implementation of our team's project for the Software Engineering I course at IUT.
## Team Members
+ [Arian Hadi](https://github.com/arianpotter)

+ [Mohammad Ghazanfari](https://github.com/mgh5225)

+ [Nami Naziri](https://github.com/NamiNaziri)

+ [Mohammad Kasaei](https://github.com/MKasaei00)

## Installation

First, you need to have python (for backend server) and node.js (for frontend server)

then install requirements for pip and npm :

run this line in BackEnd folder:
```bash
pip install -r requirements.txt
```
run this line in FrontEnd/gdm_ui folder:
```bash
npm i
```
then you need to make a new database in PostgreSQL with the name **'gdm_db'** and change the password for postgres user to **'1234'**
you can do these by running these two query:
```
ALTER USER postgres PASSWORD '1234'
CREATE DATABASE gdm_db
```

## Run
First, run this code on BackEnd/GDM_API to migrate to database and run server:
```bash
python manage.py migrate
python manage.py runserver
```
then we need to run server for frontend, for this purpose run this line in FronEnd/gdm_ui:
```bash
npm start
```
now everything is up and running, you can use site at **'http://localhost:3000'**

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
