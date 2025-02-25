import "reflect-metadata";
import { dataSource } from "../infrastructure/datasource/datasource";
import { seedBooksAndGenres } from "./data-seed";

dataSource
  .initialize()
  .then(async (dataSource) => {
    console.log("📦 Database connected!");
    await seedBooksAndGenres(dataSource);
    console.log("🎉 Seeding completed!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Error during seeding:", error);
    process.exit(1);
  });
