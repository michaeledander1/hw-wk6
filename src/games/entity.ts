// src/pages/entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString } from 'class-validator'

const colors = ['red','blue','green','yellow', 'magenta']
const colorChooser = () => {
  const randomColorIndex = Math.floor(Math.random() * colors.length); 
  const startingColor = colors[randomColorIndex];
  return startingColor
}


const startingBoard = [
	['o', 'o', 'o'],
	['o', 'o', 'o'],
	['o', 'o', 'o']
]

@Entity()
export default class Games extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text')
  name: string

  @Column('text', {default: colorChooser()}) 
  color: string;

  @Column('json', {default: startingBoard})
  board: string;

}