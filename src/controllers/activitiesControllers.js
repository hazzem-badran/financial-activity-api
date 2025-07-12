import { sql } from "../config/db.js";

export async function getSummaryByUserId(req, res) {
  try {
    const { userId } = req.params;

    const balanceResult = await sql`
    SELECT COALESCE(SUM(amount), 0) as balance FROM activities WHERE user_id = ${userId};`;

    const incomeResult = await sql`
    SELECT COALESCE(SUM(amount), 0) as income FROM activities WHERE user_id = ${userId} AND amount > 0;`;

    const expenseResult = await sql`
    SELECT COALESCE(SUM(amount), 0) as expenses FROM activities WHERE user_id = ${userId} AND amount < 0;`;

    res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expenses: expenseResult[0].expenses,
    });
  } catch (error) {
    console.error("Error fetching transaction summary:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getActivitiesByUserId(req, res) {
  try {
    const { userId } = req.params;
    const activities = await sql`
        SELECT * FROM activities WHERE user_id = ${userId} ORDER BY created_at DESC;
      `;
    res.status(200).json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).send("Internal Server Error");
  }
}

export async function createActivity(req, res) {
  try {
    const { user_id, title, amount, category } = req.body;
    const newActivity = await sql`
      INSERT INTO activities (user_id, title, amount, category)
      VALUES (${user_id}, ${title}, ${amount}, ${category})
      RETURNING *;
    `;
    res.status(201).json(newActivity[0]);
  } catch (error) {
    console.error("Error creating activity:", error);
    res.status(500).send("Internal Server Error");
  }
}

export async function deleteActivity(req, res) {
  try {
    const { id } = req.params;
    const deletedActivity = await sql`
      DELETE FROM activities WHERE id = ${id} RETURNING *;
    `;
    if (deletedActivity.length === 0) {
      return res.status(404).send("Activity not found");
    }
    res.status(200).json(deletedActivity[0]);
  } catch (error) {
    console.error("Error deleting activity:", error);
    res.status(500).send("Internal Server Error");
  }
}
