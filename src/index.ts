// src/index.ts
import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import GamesController from "./games/controller"
import setupDb from './db'

const app = createKoaServer({
   controllers: [GamesController]
})

setupDb()
  .then(_ =>
    app.listen(4000, () => console.log('Listening on port 4000'))
  )
  .catch(err => console.error(err))