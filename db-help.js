import { testConnection, initializeDatabase, checkUsers } from "./db.js";

const command = process.argv[2];

(async () => {
  await testConnection();
  await initializeDatabase();

  switch (command) {
    case "help":
      console.log(`
DATABASE HELP
===========================================

Commands:

  check
      Show all users in the database

===========================================
`);
      break;

    case "check":
      await checkUsers();
      break;

    default:
      console.log("Unknown command. Use 'help'");
  }

  process.exit();
})();