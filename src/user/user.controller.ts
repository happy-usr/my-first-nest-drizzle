import { Controller, Put, Get, Param, 
	Delete, Body, Post, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service'
import type { User } from './user.service'
import { Title } from '../roles/roles.service';

@Controller('user')
export class UserController {
	constructor(private readonly users: UserService) {}

	@Get('count')
	async count_users(): Promise<Object> {
		try {
			const count = await this.users.get_users_count()
			return {count: count}
		} catch(err) {
			throw err
		}
	}

	@Get(':id')
	async get_user_by_id(@Param('id', ParseIntPipe) id: number): Promise<Partial<User>> {
		try {
			const u = await this.users.get_user_by_id(id)
			return u
		} catch(err) {
			throw err
		}
	}

	@Put(':id')
	async update_username_by_id(@Param('id', ParseIntPipe) id: number, @Body('new_name') new_name: string) {
		try {
			await this.users.update_username_by_id(id, new_name)
		} catch(err) {
			throw err
		}
	}

	@Delete(':id')
	async delete_user_by_id(@Param('id', ParseIntPipe) id: number) {
		try {
			await this.users.delete_user_by_id(id)
		} catch(err) {
			throw err
		}
	}

	@Post()
	async create_user(@Body('name') name: string,
		@Body('surname') sname: string, @Body('title') title: Title) {
		try {
			await this.users.create_user(name, sname, title) // check if title is a valid value of Title type
		} catch(err) {
			throw err
		}
	}
}
