import { JsonController, Get, Param, Put, Body, Post, HttpCode, NotFoundError, MethodNotAllowedError } from 'routing-controllers'
import Game from './entity'
import {colors} from './entity'

@JsonController()
export default class GameController {
    @Get('/games/:id')
    getGame(
      @Param('id') id: number
    ) {
      return Game.findOne(id)
    }

    @Get('/games')
    async allGames() {
        const games = await Game.find()
        return { games }
    }
    @Put('/games/:id')
    async updateGame(
      @Param('id') id: number,
      @Body() update: Partial<Game>
    ) {
      const game = await Game.findOne(id)
      if (!game) throw new NotFoundError('Cannot find game')
      if (update.color) {
          const userColor = update.color
        if (!colors.includes(userColor)) throw new MethodNotAllowedError('Invalid Color')
      } else {return update.color}
      return Game.merge(game, update).save()
    }
    @Post('/games')
    @HttpCode(201)
        createGame(
        @Body() game: Game
        ) {
        return game.save()
    } 
    }
