import express from "express";
import { createUser, deleteUser, getUsers, updateUser } from "../controllers/userController.js";
import { admin, protect } from "../Middlewares/authMiddleware.js";


const router = express.Router();

router.use(protect, admin);


router.get("/all-users", getUsers);
router.post("/add", createUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

export default router;
