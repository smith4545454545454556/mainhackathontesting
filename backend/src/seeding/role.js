import { connectDB } from "../config/database.js"
import { roles } from "../data/role.js"
import RoleModel from "../model/role.js"

export const seeding = async () => {
    try {
        await connectDB()
        console.log("connected to database")

        await RoleModel.deleteMany({})
        const Roles = await Promise.all(
            roles.map((role) => RoleModel.create({ name: role.name }))
        )
        console.log("Roles seeded", Roles)
    }
    catch (error) {
        console.log(error)
    }
}