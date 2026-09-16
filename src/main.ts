import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { all_roles, RolesService } from './roles/roles.service';
import { make_db_default } from './db/db_comon';

async function create_roles() {
  const roles_service = new RolesService()
  const db = make_db_default()
  try {
    for(const role of all_roles) {
      await roles_service.create_role_no_conflict(db, role)
    }
  } catch(err) {
    throw err
  }
}

async function bootstrap() {
  await create_roles()
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
