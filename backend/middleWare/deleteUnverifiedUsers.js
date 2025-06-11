
const cron = require("node-cron");
const UserModel = require("../models/userModel");

cron.schedule("0 * * * *", async () => {
    try {
        const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const result = await UserModel.deleteMany({
            isVerified: false,
            createdAt: { $lt: cutoff }
        });

        if (result.deletedCount > 0) {
        console.log(`[CRON] Deleted ${result.deletedCount} unverified users.`);
        }
    } catch (error) {
        console.error(`[CRON ERROR] Failed to delete unverified users:`, error.message);
    }
});
