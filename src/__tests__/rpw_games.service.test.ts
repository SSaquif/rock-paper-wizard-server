import { db } from "../adapters/db/index.js";
import { Request } from "express";
import {
  loginUserService,
  registerUserService,
} from "../services/users.service.js";

//@NTS: Understand the mock function in detail
jest.mock("../adapters/db/index.js");
