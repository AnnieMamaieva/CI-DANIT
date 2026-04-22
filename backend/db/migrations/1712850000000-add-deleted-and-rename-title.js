export class AddDeletedAndRenameTitle1712850000000 {
  async up(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE newsposts RENAME COLUMN title TO header`,
    );
    await queryRunner.query(
      `ALTER TABLE newsposts ADD COLUMN deleted BOOLEAN DEFAULT false`,
    );

    await queryRunner.query(
      `ALTER TABLE users ADD COLUMN deleted BOOLEAN DEFAULT false`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE users DROP COLUMN deleted`);

    await queryRunner.query(`ALTER TABLE newsposts DROP COLUMN deleted`);

    await queryRunner.query(
      `ALTER TABLE newsposts RENAME COLUMN header TO title`,
    );
  }
}
