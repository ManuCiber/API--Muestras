import { Router } from "express";
import * as sampleCtrl from "../controllers/samples.controller";
import * as visitorCtrl from "../controllers/visitor.controller";
import * as deliveryCtrl from "../controllers/delivery.controller";
import { validate } from "../middleware/validate.middleware";
import { createSampleSchema, updateSampleSchema } from "../schemas/samples.schema";
import { createVisitorSchema, updateVisitorSchema } from "../schemas/visitors.schema";
import { createDeliverySchema } from "../schemas/deliveries.schema";

const router = Router();

// Samples routes
router.get("/samples", sampleCtrl.getSamples);
router.get("/samples/:id", sampleCtrl.getSample);
router.post("/samples", validate(createSampleSchema), sampleCtrl.createSample);
router.put("/samples/:id", validate(updateSampleSchema), sampleCtrl.updateSample);
router.delete("/samples/:id", sampleCtrl.deleteSample);

// Visitors routes
router.get("/visitors", visitorCtrl.getVisitors);
router.get("/visitors/:id", visitorCtrl.getVisitor);
router.post("/visitors", validate(createVisitorSchema), visitorCtrl.createVisitor);
router.put("/visitors/:id", validate(updateVisitorSchema), visitorCtrl.updateVisitor);
router.delete("/visitors/:id", visitorCtrl.deleteVisitor);

// Deliveries routes
router.get("/deliveries", deliveryCtrl.getDeliveries);
router.get("/deliveries/:id", deliveryCtrl.getDelivery);
router.post("/deliveries", validate(createDeliverySchema), deliveryCtrl.createDelivery);
router.put("/deliveries/:id", deliveryCtrl.updateDelivery);
router.delete("/deliveries/:id", deliveryCtrl.deleteDelivery);

export default router;
