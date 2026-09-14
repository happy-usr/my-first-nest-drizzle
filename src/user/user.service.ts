import { Injectable, NotFoundException } from '@nestjs/common';
import { make_db_default } from '../db/db_comon';
import { DbService } from '../db/db.service'

export interface User {
	name: string
	surname: string
	id: number
	deleted: boolean
}

@Injectable()
export class UserService {
	private db;
	constructor(private db_service: DbService) {
		this.db = make_db_default()
	}

	async get_user_by_id(id: number): Promise<Partial<User>> {
		try {
			const u = await this.db_service.get_user_by_id(this.db, id)
			return u
		} catch(err) {
			throw err
		}
	}

	async update_username_by_id(id: number, new_name: string) {
		try {
			await this.db_service.update_username_by_id(this.db, id, new_name)
		} catch(err) {
			throw err
		}
	}

	async delete_user_by_id(id: number) {
		try {
			await this.db_service.delete_user_by_id(this.db, id)
		} catch(err) {
			throw err
		}
	}

	async create_user(_name: string, _sname: string) {
		try {
			await this.db_service.create_user(this.db, _name, _sname)
		} catch(err) {
			throw err
		}
	}

	async get_users_count(): Promise<number> {
		try {
			const count = await this.db_service.get_users_count(this.db)
			return count
		} catch(err) {
			throw err
		}
	}
}

