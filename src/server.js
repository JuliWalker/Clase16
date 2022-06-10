import knex from 'knex';
import { options } from './dataBase/configDB';
const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 8080
/* import routesProducts from './routes/products'
import routesCart from './routes/cart' */


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* app.use('/api/productos',routesProducts)
app.use('/api/carrito',routesCart) */

/** queries */
knex(options.mariaDB).schema.createTableIfNotExists('prueba', (table) => {
    table.increments('id').primary();
    table.string('nombre');
    table.string('descripcion');
    table.integer('precio');
    table.integer('cantidad');
}).then(() => {
    console.log('Tabla creada');
}
).catch((err) => {
    console.log(err);
}
);


try {
    app.listen(PORT);
    console.log(`Server on port ${PORT}...`)
} catch (error) {
    console.log('Error de conexión con el servidor...', error)
}