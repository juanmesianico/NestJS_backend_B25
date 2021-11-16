import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("students")
export class StudentEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    code: number;

    @Column()
    name: string;

    @Column({ default: 'https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png'})
    photoURL: string;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}