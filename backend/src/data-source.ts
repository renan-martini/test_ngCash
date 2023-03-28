import { DataSource } from "typeorm";
import "dotenv/config";

const AppDataSource = new DataSource(
  process.env.NODE_ENV === "test"
    ? {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: ["src/entities/**/*.ts"],
      }
    : {
        type: "postgres",
        host: "db",
        port: 5432,
        username: "postgres",
        password: "1234",
        database: "defaultdb",
        logging: true,
        synchronize: true,
        entities: ["src/entities/*.ts"],
        migrations: ["src/migrations/*.ts"],
      }
);

export default AppDataSource;
