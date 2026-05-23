"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const propertiesController_1 = require("../controllers/propertiesController");
const router = (0, express_1.Router)();
router.get("/", propertiesController_1.getProperties);
router.get("/:id", propertiesController_1.getPropertyById);
exports.default = router;
