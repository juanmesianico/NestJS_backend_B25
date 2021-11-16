import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";


@Entity("users")
export class UserEntity {

    @PrimaryGeneratedColumn('uuid') //esto es para que me genera la columna como un Unique User ID
    id: string;
    
    @Column({unique: true, nullable: false})
    username: string;

    @Column({nullable: false})
    password: string;

    @Column({nullable: false})
    email: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({ nullable: false, default: true })
    active: boolean;

    @BeforeInsert() async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10 );
    }
}
