import { Router } from "express";
import { createSampleSchema, updateSampleSchema, idParamSchema as sampleIdSchema } from "../schemas/samples.schema";
import { createVisitorSchema, updateVisitorSchema, idParamSchema as visitorIdSchema } from "../schemas/visitors.schema";
import { createDeliverySchema, idParamSchema as deliveryIdSchema } from "../schemas/deliveries.schema";
import { validate } from "../middleware/validate.middleware";
import { createSample, deleteSample, getSample, getSamples, updateSample } from "../controllers/samples.controller";
import { createVisitor, deleteVisitor, getVisitor, getVisitors, updateVisitor } from "../controllers/visitor.controller";
import { createDelivery, deleteDelivery, getDeliveries, getDelivery, updateDelivery } from "../controllers/delivery.controller";

const router = Router();

// Samples routes
router.get("/samples", getSamples);
router.get("/samples/:id", validate(sampleIdSchema, 'params'), getSample);
router.post("/samples", validate(createSampleSchema), createSample);
router.put("/samples/:id", validate(sampleIdSchema, 'params'), validate(updateSampleSchema), updateSample);
router.patch("/samples/:id", validate(sampleIdSchema, 'params'), validate(updateSampleSchema), updateSample);
router.delete("/samples/:id", validate(sampleIdSchema, 'params'), deleteSample);

// Visitors routes
router.get("/visitors", getVisitors);
router.get("/visitors/:id", validate(visitorIdSchema, 'params'), getVisitor);
router.post("/visitors", validate(createVisitorSchema), createVisitor);
router.put("/visitors/:id", validate(visitorIdSchema, 'params'), validate(updateVisitorSchema), updateVisitor);
router.delete("/visitors/:id", validate(visitorIdSchema, 'params'), deleteVisitor);

// Deliveries routes
router.get("/deliveries", getDeliveries);
router.get("/deliveries/:id", validate(deliveryIdSchema, 'params'), getDelivery);
router.post("/deliveries", validate(createDeliverySchema), createDelivery);
router.put("/deliveries/:id", validate(deliveryIdSchema, 'params'), updateDelivery);
router.delete("/deliveries/:id", validate(deliveryIdSchema, 'params'), deleteDelivery);

export default router;
