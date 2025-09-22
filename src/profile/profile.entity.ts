import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    nullable: true,
    // default: 18, // you can also set a default value for the column
  })
  age?: number;

  @Column({
    type: 'boolean',
    nullable: true,
    // default: false, // you can also set a default value for the column
  })
  isMarried?: boolean;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 100,
    // default: 'John', // you can also set a default value for the column
  })
  firstname?: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 100,
    // default: 'John', // you can also set a default value for the column
  })
  lastname?: string;

  @Column({ nullable: true })
  gender?: string;

  @Column({ type: 'timestamp', nullable: true })
  dateOfBirth?: Date;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Column({ type: 'text', nullable: true })
  profileImageUrl?: string;
}
