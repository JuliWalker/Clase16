/* import knex from 'knex';

export default class Contenedor {
    constructor(options, table) {
        this.knex = knex(options)
        this.table = table
    }

    async saveNew(product) {
        try {
            let newProduct = await this.knex.from(this.table).insert(product)
            return newProduct
        }
        catch {
            console.log('Error al guardar un objeto', err);
        }
    }

    async getById(id) {
        try {
            // tengo que revisar que pasa si el where no encuentra nada
            let product = await this.knex.from(this.table).select("*").where('id',id)
            console.log(product)
            // product ? console.log("busqueda por ID exitosa") : console.log("el producto con el ID buscado no fue encontrado")
            return product 
            // ? product : null;
        }
        catch (err) {
            console.log('Error en la busquedo por ID', err);
        }
    }

    async getAll() {
        try {
            let allProductsArray = await this.knex.from(this.table).select("*")
            return allProductsArray;
        } catch (err) {
            throw new Error(`Error: ${err}`)
        }

    }

    async deleteById(id) {
        try {
            let delProduct = await this.knex.from(this.table).where('id',id).del()
            return delProduct
        } catch(err) {
            throw new Error(`Error: ${err}`)
        }
    } */

    /* async replaceById(id, product) {
        let allProductsArray = await this.read();
        let index = allProductsArray.findIndex(product => product.id == id);
        product.id = Number(id);
        if (index >= 0) {
            allProductsArray.splice(index, 1, product);
            this.write(allProductsArray);
            return true
        } else {
            return false
        }
    } */

/*     async deleteAll() {
        try {
            let delProduct = await this.knex.from(this.table).del()
        } catch (err) {
            throw new Error(`Error: ${err}`)
        }
    }
} */