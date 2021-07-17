import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"
import { v4 as uuid } from "uuid";
import { Expose } from 'class-transformer'

@Entity('tags')
class Tag {
  
  @PrimaryColumn ()
  readonly id: string

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @Expose({ name:'name_custom' })
  nameCustom(): string {
    return `#${this.name}`
  }

  constructor() {
    if(!this.id){
      this.id=uuid()
    }
  }
  
}
export { Tag }