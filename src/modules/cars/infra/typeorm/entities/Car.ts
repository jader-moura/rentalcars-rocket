import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid"
import { Category } from "./Category";
import { Specifications } from "./Specifications";

@Entity("cars")
class Car {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    daily_rate: number;

    @Column()
    license_plate: string;

    @Column()
    fine_amount: number;

    @Column()
    brand: string;

    @Column()
    available: boolean;

    @ManyToOne(() => Category)
    @JoinColumn({ name: "category_id" })
    category: Category;

    @Column()
    category_id: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToMany(() => Specifications)
    @JoinTable({
        name: "specifications_cars",
        joinColumns: [{ name: "car_id" }],
        inverseJoinColumns: [{ name: "specification_id" }]
    })
    specifications: Specifications[]

    constructor() {
        if(!this.id){
            this.id = uuidv4();
            this.available = true;
        }
    }
}

export { Car }