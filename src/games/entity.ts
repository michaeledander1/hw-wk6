// src/pages/entity.ts
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString } from 'class-validator'

export const colors = ['red','blue','green','yellow', 'magenta']
const colorChooser = () => {
  const randomColorIndex = Math.floor(Math.random() * colors.length); 
  const startingColor = colors[randomColorIndex];
  return startingColor
}

// const colorValidation = (color) => {
//   if(!colors.includes(color)) console.log('Error, you can not choose this color') 
// }


const startingBoard = [
    ['o', 'o', 'o'],['o', 'o', 'o'],['o', 'o', 'o']]

@Entity()
export default class Games extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text')
  name: string

  @Column('text',) 
  color: string;

  @Column('json', {default: startingBoard})
  board: JSON;

  @BeforeInsert()
    setColor() {
      this.color = colorChooser();
    }
  
  @BeforeUpdate()
    updateColor() {
    //   colorValidation(this.color)
    console.log(this.color)
    }
  

}