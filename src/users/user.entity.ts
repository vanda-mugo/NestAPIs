import {} from '@nestjs/common';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from 'src/profile/profile.entity';

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

  // WE WANT to create a one to one from user table to profile table
  // this will create a profileId column in the user table
  // and establish a foreign key relationship with the profile table
  // so note that the profile is optional when creating a user
  // you can create a user without a profile
  // but you cannot create a profile without a user
  // this is because the user is the owner of the relationship
  // if this one-to-one relationship was used in profile entity that would mean that
  // this would mean that the profile is the owner of the relationship
  // and that would create a userId column in the profile table
  // and establish a foreign key relationship with the user table
  // in this case the user is the owner of the relationsip
  @OneToOne(() => Profile)
  @JoinColumn()
  profile?: Profile;

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
