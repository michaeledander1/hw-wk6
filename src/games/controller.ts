import { JsonController, Get, Param, Put, Body, Post, HttpCode, NotFoundError, MethodNotAllowedError, BadRequestError } from 'routing-controllers'
import Game from './entity'
import {colors} from './entity'

const moves = (board1, board2): number => 
  board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length

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
        return Game.merge(game, update).save()
      }
      if (update.board) {
        //this version at least works for updating the other properties
        const oldBoard = [game.board]
        const updateBoard = [update.board]
        const totalMoves: number = moves([updateBoard] ,[oldBoard])
        console.log(updateBoard)
        console.log(oldBoard)
        console.log(totalMoves)
        if (totalMoves > 1) throw new BadRequestError('Only one move allowed')
      } else {return update.board}

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
