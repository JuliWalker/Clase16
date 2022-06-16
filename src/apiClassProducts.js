import knex from 'knex';

export default class Contenedor {
    constructor(options, table) {
        this.knex = knex(options)
        this.table = table
    }

    async saveNew(product) {
        try {
            console.log(product)
            await this.knex.from(this.table).insert(product)
        }
        catch (err) {
            console.log('Error al guardar un objeto');
            throw new Error(`Error: ${err}`)
        }
    }

    async getById(id) {
        try {
            // tengo que revisar que pasa si el where no encuentra nada
            let product = await this.knex.from(this.table).select("*").where('id', id)
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
            let delProduct = await this.knex.from(this.table).where('id', id).del()
            return delProduct
        } catch (err) {
            throw new Error(`Error: ${err}`)
        }
    }

    async replaceById(id, product) {
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
    }
    async replaceById(id, product) {
        const check = await this.knex.from(this.table).select("*").where('id', id)
        if (check.length == 0) {
            return false
        } else {
            try {
                const nombre = product.nombre
                const descripcion = product.descripcion
                const codigo = product.codigo
                const URLfoto = product.URLfoto
                const precio = product.precio
                const stock = product.stock
                const timestamps = product.timestamps
                await this.knex.from(this.table).where('id', id).update({
                    nombre,
                    descripcion,
                    codigo,
                    URLfoto,
                    precio,
                    stock,
                    timestamps
                });
                return true
            }
            catch (err) {
                throw new Error(`Error: ${err}`)
            }
        }
    }

    async deleteAll() {
        try {
            let delProduct = await this.knex.from(this.table).del()
        } catch (err) {
            throw new Error(`Error: ${err}`)
        }
    }
}