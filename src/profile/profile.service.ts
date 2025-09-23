import { Injectable } from '@nestjs/common';
import { Profile } from './profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  public async getAllProfiles(): Promise<Profile[]> {
    return this.profileRepository.find({
      relations: {
        user: true, // to fetch the related user entity
      },
    });
  }
}
