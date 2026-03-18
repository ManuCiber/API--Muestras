import { describe, it, expect, vi, beforeEach } from "vitest";
import request from 'supertest';
import app from '../app';
import { prisma } from '../lib/prisma';

// Mock prisma
vi.mock('../lib/prisma', () => ({
  prisma: {
    entregas: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    muestras: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    $transaction: vi.fn((callback: (arg0: any) => any) => callback(prisma)),
  },
}));

describe('Deliveries API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/deliveries', () => {
    it('should return a list of deliveries', async () => {
      const mockDeliveries = [
        { id: '550e8400-e29b-41d4-a716-446655440004', muestra_id: '550e8400-e29b-41d4-a716-446655440000', visitador_id: '550e8400-e29b-41d4-a716-446655440002', cantidad: 2 },
      ];
      (prisma.entregas.findMany as any).mockResolvedValue(mockDeliveries);

      const response = await request(app).get('/api/deliveries');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockDeliveries);
    });
  });

  describe('POST /api/deliveries', () => {
    it('should create a new delivery and update stock', async () => {
      const newDelivery = { 
        muestra_id: '550e8400-e29b-41d4-a716-446655440000', 
        visitador_id: '550e8400-e29b-41d4-a716-446655440002', 
        cantidad: 5 
      };
      const mockSample = { id: '550e8400-e29b-41d4-a716-446655440000', existencias: 10 };
      const mockCreatedDelivery = { id: '550e8400-e29b-41d4-a716-446655440005', ...newDelivery };

      (prisma.muestras.findUnique as any).mockResolvedValue(mockSample);
      (prisma.entregas.create as any).mockResolvedValue(mockCreatedDelivery);

      const response = await request(app)
        .post('/api/deliveries')
        .send(newDelivery);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockCreatedDelivery);
      expect(prisma.muestras.update).toHaveBeenCalled();
    });

    it('should return 400 if stock is insufficient', async () => {
      const newDelivery = { 
        muestra_id: '550e8400-e29b-41d4-a716-446655440000', 
        visitador_id: '550e8400-e29b-41d4-a716-446655440002', 
        cantidad: 15 
      };
      const mockSample = { id: '550e8400-e29b-41d4-a716-446655440000', existencias: 10 };

      (prisma.muestras.findUnique as any).mockResolvedValue(mockSample);

      const response = await request(app)
        .post('/api/deliveries')
        .send(newDelivery);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Insufficient stock or sample not found');
    });

    it('should return 400 for invalid data (zod validation)', async () => {
        const invalidDelivery = { muestra_id: 'invalid-uuid', cantidad: -1 };
  
        const response = await request(app)
          .post('/api/deliveries')
          .send(invalidDelivery);
  
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Validation failed in body');
      });
  });
});
