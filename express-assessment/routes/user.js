import express from "express";
import prisma from "../db/index.js";


const router = express.Router();

// - [ ] Able to Get all Active Users
router.get("/", async (req, res) => {
    const getUsers = await prisma.user.findMany({
        where: {
            isActive: true,
        }
    })

    res.status(200).json({
        success: true,
        users: getUsers,
    })
});


// - [ ] Able to Create a User
router.post("/", async (req, res) => {
    const newUser = await prisma.user.create({
        data: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        }
    });
    res.status(201).json({
        success: true,
        message: "A user is created"
    })
});


// - [ ] Able to Edit a User
router.put("/:id", async (req, res) => {
    const updateUser = await prisma.user.updateMany({
        where: {
            id: Number(req.params.id),
        },
        data: {
            ...req.body,
        }
    });
    res.status(200).json({
        success: true,
        //message: "A user was updated"
    })
});


// - [ ] Able to Delete a User
router.delete("/:id", async (req, res) => {
    const removeUser = await prisma.user.deleteMany({
        where: {
            id: Number(req.params.id),
        }
    });
    res.status(200).json({
        success: true,
        message: "A user was deleted",
    })
});


// - [ ] Able to Get all Admin Users
router.get("/admins", async (req, res) => {
    const getAdmin = await prisma.user.findMany({
        where: {
            isAdmin: true,
        }
    })
    res.status(200).json({
        success: true,
        users: getAdmin,
    })
});

export default router;