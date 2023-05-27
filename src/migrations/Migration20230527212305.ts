import { Migration } from '@mikro-orm/migrations';

export class Migration20230527212305 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "post" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
    this.addSql('alter table "post" alter column "title" type text using ("title"::text);');
  }

  async down(): Promise<void> {
    this.addSql('alter table "post" alter column "created_at" type varchar(255) using ("created_at"::varchar(255));');
    this.addSql('alter table "post" alter column "updated_at" type varchar(255) using ("updated_at"::varchar(255));');
    this.addSql('alter table "post" alter column "title" type varchar(255) using ("title"::varchar(255));');
  }

}
