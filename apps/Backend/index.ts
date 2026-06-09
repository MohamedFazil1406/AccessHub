import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import {
  SignUpSchema,
  SignInSchema,
  ResourceSchema,
  UpdateResourceSchema,
} from "common/types";
import { ResourceModel, UserModel } from "db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDb } from "./db";
import { authMiddleware } from "./middleware";
const app = express();

app.use(express.json());
app.use(cors());
connectDb();

app.post("/signup", async (req, res) => {
  const { success, data } = SignUpSchema.safeParse(req.body);

  if (!success) {
    res.status(400).json({
      msg: "Incorret Inputs",
    });
    return;
  }
  const hashPassword = await bcrypt.hash(data.password, 10);

  try {
    const user = await UserModel.create({
      username: data.username,
      password: hashPassword,
      role: data.role,
    });

    res.status(201).json({
      id: user.id,
    });
    return;
  } catch (err) {
    res.status(409).json({
      msg: "User Already exist",
      err,
    });
  }
});

app.post("/signin", async (req, res) => {
  const { success, data } = SignInSchema.safeParse(req.body);
  if (!success) {
    res.status(400).json({
      msg: "Incorrect Inputs",
    });
    return;
  }

  try {
    const user = await UserModel.findOne({ username: data.username });
    if (!user) {
      res.status(400).json({
        msg: "User Not Exist",
      });
      return;
    }
    const MatchPassword = await bcrypt.compare(data.password, user.password);
    if (!MatchPassword) {
      return res.status(401).json({
        msg: "Unauthorized",
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY!,
    );

    res.status(200).json({
      token,
    });
  } catch (err) {
    res.status(411).json({
      msg: "Error During Sign in",
    });
  }
});

app.post("/resources", authMiddleware, async (req, res) => {
  const userId = req.userId;
  console.log(userId);
  const parsed = ResourceSchema.safeParse(req.body);
  if (!parsed.success) {
    console.log(parsed.error);
    res.status(400).json({
      msg: "Incorret Inputs",
    });
    return;
  }
  try {
    const resource = await ResourceModel.create({
      title: parsed.data.title,
      description: parsed.data.description,
      category: parsed.data.category,
      ownerId: userId,
    });
    res.json(resource);
  } catch (err) {
    res.status(500).json({
      msg: "Error while creating the resources",
    });
  }
});

app.get("/resources", authMiddleware, async (req, res) => {
  const userId = req.userId;

  if (req.role === "ADMIN") {
    const resources = await ResourceModel.find().populate(
      "ownerId",
      "username",
    );

    return res.json(resources);
  }
  const resource = await ResourceModel.find({
    ownerId: userId,
  });
  console.log(resource);

  res.json(resource);
});

app.put("/resource/:resourceId", authMiddleware, async (req, res) => {
  const resourceId = req.params.resourceId;
  const userId = req.userId;

  const { success, data } = UpdateResourceSchema.safeParse(req.body);
  if (!success) {
    res.status(400).json({
      msg: "Incorrect Inputs",
    });
    return;
  }
  try {
    const resource =
      req.role === "ADMIN"
        ? await ResourceModel.findByIdAndUpdate(resourceId, req.body, {
            new: true,
          })
        : await ResourceModel.findOneAndUpdate(
            {
              _id: resourceId,
              ownerId: req.userId,
            },
            req.body,
            { new: true },
          );

    if (!resource) {
      res.status(404).json({
        msg: "Resource Not Found",
      });
      return;
    }

    res.status(200).json({
      msg: "Resource is updated successFully",
      resource,
    });
    return;
  } catch (err) {
    res.status(500).json({
      msg: "Error while updating the resource",
    });
  }
});

app.delete("/resource/:resourceId", authMiddleware, async (req, res) => {
  const resourceId = req.params.resourceId;
  const userId = req.userId;

  const resource =
    req.role === "ADMIN"
      ? await ResourceModel.findByIdAndDelete(resourceId)
      : await ResourceModel.findOneAndDelete({
          _id: resourceId,
          ownerId: req.userId,
        });

  if (!resource) {
    res.status(404).json({
      msg: "Resource Not found",
    });
    return;
  }

  res.status(200).json({
    msg: "Resource is Successfully deleted",
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is successfully running ${process.env.PORT || 3000}`);
});
