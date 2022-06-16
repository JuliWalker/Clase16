import {Router} from 'express'
import { options } from '../dataBase/configDB';
import Api from '../apiClassProducts'
const api = new Api(options.mariaDB,'products')
const router = Router()


const admin = true;

function access(req,res,next){
    if(!admin){
        res.send("El acceso a esta ruta no esta permitida para tu tipo de usuario")
    } else {
        next()
    }
}

router.get('/', async (req,res)=>{
    const products = await api.getAll()
    res.json(products)
})

router.get('/:id', async (req,res)=>{
    const {id} = req.params
    const product = await api.getById(id)
    if (product == null ) {
        res.json("el ID buscado no existe")
    }
    res.json(product)
})

router.post('/', access, async (req,res)=>{
    const obj = req.body
    const date = Date.now()
    const dateNow = new Date(date)
    const dateString = dateNow.toUTCString()
    obj.timestamps = dateString
    await api.saveNew(obj)
    res.json("elemento cargado con exito")
})

router.put('/:id', access, async (req,res)=>{
    const {id} = req.params
    const obj = req.body
    const date = Date.now()
    const dateNow = new Date(date)
    const dateString = dateNow.toUTCString()
    obj.timestamps = dateString
    const exito = await api.replaceById(id, obj)
    if (exito) {
        res.json("producto reemplazado con exito")
    } else {
        res.json("el producto no fue encontrado y por lo tanto no pudimos reemplazarlo")
    }
})

router.delete('/:id', access, async (req,res)=>{
    const {id} = req.params
    const exito = await api.deleteById(id)
    if (exito) {
        res.json("producto eliminado con exito")
    } else {
        res.json("el producto no fue encontrado y por lo tanto no pudimos borrarlo")
    }
})

export default router