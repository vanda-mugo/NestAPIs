import {} from '@nestjs/common';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
    length: 25,
    unique: true, // to enforce unique constraint at the database level
  })
  username: string;

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // when we are going to soft delete a user
  @DeleteDateColumn()
  deletedAt: Date;
}

/**
 * Yes, exactly! The nullable: true option in the
 * @Column({ nullable: true }) decorator means that the
 * gender column in the database can accept NULL values.
 */

/**
 * // When you create a user:
const user = await this.userRepository.save(newUser);
// createdAt is automatically set to current timestamp
// updatedAt is automatically set to current timestamp

// When you update a user:
await this.userRepository.save(existingUser);
// updatedAt is automatically updated to current timestamp
// createdAt remains unchanged

// When you soft delete:
await this.userRepository.softDelete(userId);
// deletedAt is set to current timestamp
// Record stays in database but is considered "deleted"

The @CreateDateColumn(), @UpdateDateColumn(), and @DeleteDateColumn() are special TypeORM decorators that automatically manage timestamp columns in your database:

@CreateDateColumn()
Purpose: Automatically sets the timestamp when a record is first created.
Behavior: TypeORM automatically inserts the current date/time when you save a new entity.
Database: Creates a column that stores when the record was created.
@UpdateDateColumn()
Purpose: Automatically updates the timestamp whenever a record is modified.
Behavior: TypeORM automatically updates this field every time you save changes to an existing entity.
Database: Tracks the last modification time.
@DeleteDateColumn()
Purpose: Used for soft deletes - marks when a record was "deleted" without actually removing it.
Behavior: When you soft delete (not hard delete), TypeORM sets this timestamp instead of removing the record.
Database: NULL means not deleted, timestamp means soft deleted.

 */
