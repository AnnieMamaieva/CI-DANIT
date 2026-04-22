import { EntitySchema } from "typeorm";

export const Newspost = new EntitySchema({
  name: "Newspost",
  tableName: "newsposts",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    header: {
      type: "varchar",
    },
    text: {
      type: "text",
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
    },
  },
  relations: {
    author: {
      type: "many-to-one",
      target: "User",
      inverseSide: "newsposts",
      eager: true,
      joinColumn: true,
    },
  },
});
