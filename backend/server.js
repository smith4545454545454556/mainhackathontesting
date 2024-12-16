import app from "./app.js";
import { PORT } from "./src/config/server.js";
import { seeding } from "./src/seeding/role.js";
app.listen(PORT, async () => {
    await seeding()
    console.log(`the server is running at ${PORT}`)
})