import { EntitySchema } from "typeorm";

export const User = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    email: {
      type: "varchar",
      unique: true,
    },
    password: {
      type: "varchar",
    },
    sendNotification: {
      type: "boolean",

      default: false,
    },

    notificationChannel: {
      type: "varchar",

      default: "log",
    },
  },
  relations: {
    newsposts: {
      type: "one-to-many",
      target: "Newspost",
      inverseSide: "author",
    },
  },
});
