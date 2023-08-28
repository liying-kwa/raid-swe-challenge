import { Entity, ObjectId, ObjectIdColumn, Column } from "typeorm"

@Entity("fruits")
export class Fruit {
    @ObjectIdColumn()
    id: ObjectId

    @Column()
    name: string

    @Column()
    price: number
}