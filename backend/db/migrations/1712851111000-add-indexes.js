export class AddIndexes1712851111000 {
  async up(queryRunner) {
    await queryRunner.query(`CREATE INDEX "IDX_USERS_EMAIL" ON users (email)`);

    await queryRunner.query(
      `CREATE INDEX "IDX_NEWSPOSTS_AUTHOR_ID" ON newsposts ("authorId")`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP INDEX "public"."IDX_NEWSPOSTS_AUTHOR_ID"`);

    await queryRunner.query(`DROP INDEX "public"."IDX_USERS_EMAIL"`);
  }
}
