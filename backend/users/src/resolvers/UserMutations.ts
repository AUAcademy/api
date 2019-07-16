import { Args, Mutation } from '@nestjs/graphql'
import { RegisterUserDto, UpdateProfileDto } from '../dto'
import { CommandBus } from '@nestjs/cqrs'
import { RegisterUserCommand } from '../commands/impl'
import { Injectable } from '@nestjs/common'
import { AuthAccess } from '@aunited/common'

@Injectable()
export class UserMutations {
  constructor(
    private readonly commandBus: CommandBus,
  ) {}

  @Mutation('register')
  async register(@Args('input') input: RegisterUserDto) {
    await this.commandBus.execute(
      new RegisterUserCommand(
        input.email,
        input.password,
      ),
    )

    return {}
  }

  @AuthAccess()
  @Mutation('updateProfile')
  async updateProfile(@Args('input') input: UpdateProfileDto) {
    throw new Error('To be implemented UserMutations.updateProfile (ノಥ,_｣ಥ)ノ彡┻━┻')
  }
}
