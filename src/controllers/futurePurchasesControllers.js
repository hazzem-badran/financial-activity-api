import { sql } from "../config/db.js";

export async function getFuterePurchasesByUserId(req, res) {
  try {
    const { userId } = req.params;
    const futurePurchases = await sql`
      SELECT * FROM future_purchases WHERE user_id = ${userId} ORDER BY created_at DESC;
    `;
    res.status(200).json(futurePurchases);
  } catch (error) {
    console.error("Error fetching future purchases:", error);
    res.status(500).send("Internal Server Error");
  }
}
export async function createFuturePurchase(req, res) {
  try {
    const { user_id, title, category } = req.body;
    const newFuturePurchase = await sql`
      INSERT INTO future_purchases (user_id, title, category)
      VALUES (${user_id}, ${title}, ${category})
      RETURNING *;
    `;
    res.status(201).json(newFuturePurchase[0]);
  } catch (error) {
    console.error("Error creating future purchase:", error);
    res.status(500).send("Internal Server Error");
  }
}

export async function deleteFuturePurchase(req, res) {
  try {
    const { id } = req.params;
    const deletedFuturePurchase = await sql`
      DELETE FROM future_purchases WHERE id = ${id} RETURNING *;
    `;
    if (deletedFuturePurchase.length === 0) {
      return res.status(404).send("Future purchase not found");
    }
    res.status(200).json(deletedFuturePurchase[0]);
  } catch (error) {
    console.error("Error deleting future purchase:", error);
    res.status(500).send("Internal Server Error");
  }
}
