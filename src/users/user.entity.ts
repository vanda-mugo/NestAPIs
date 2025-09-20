import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * note by that the user and the create user dto have to be in sync
 * this is to ensure we do not include unecessary properties in the user entity
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  //so note that string type in typescript maps to varchar in the database
  // number type in typescript maps to int in the database
  // boolean type in typescript maps to boolean in the database
  // you can also specify other column types like text, date, float, double, etc
  // you can see the list of available column types here
  // https://typeorm.io/#/entities/column-types-for-postgres--cockroachdb
  // https://typeorm.io/#/entities/column-types-for-mysql--mariadb
  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    // default: 'John', // you can also set a default value for the column
  })
  firstname: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    // default: 'John', // you can also set a default value for the column
  })
  lastname: string;

  @Column({
    type: 'int',
    nullable: false,
    // default: 18, // you can also set a default value for the column
  })
  age: number;

  @Column({
    type: 'boolean',
    nullable: false,
    // default: false, // you can also set a default value for the column
  })
  isMarried: boolean;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 20,
    // default: 'password', // you can also set a default value for the column
  })
  password: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50,
    unique: true, // to enforce unique constraint at the database level
    // default: 'email@example.com', // you can also set a default value for the column
  })
  email: string;

  @Column({ nullable: true })
  gender?: string;
}

/**
 * Yes, exactly! The nullable: true option in the
 * @Column({ nullable: true }) decorator means that the
 * gender column in the database can accept NULL values.
 */
