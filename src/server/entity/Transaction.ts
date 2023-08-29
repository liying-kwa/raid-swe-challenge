import { Entity, ObjectId, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"

export class TransactionItem {
    @Column()
    fruit: string

    @Column()
    quantity: number

    @Column()
    price: number
}

@Entity("transactions")
export class Transaction {
    @ObjectIdColumn()
    id: ObjectId

    @Column()
    totalPrice: number

    @Column((type) => TransactionItem)
    items: TransactionItem[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}