import { describe, it, expect, vi, beforeEach } from "vitest";
import request from 'supertest';
import app from '../app';
import { prisma } from '../lib/prisma';

// Mock prisma
vi.mock('../lib/prisma', () => ({
  prisma: {
    entregas: {
      create: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
    muestras: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    $transaction: vi.fn((callback: (arg0: any) => any) => callback(prisma)),
  },
}));

describe('Deliveries API Debug', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return 500 if date/time parsing fails or some other internal error occurs', async () => {
    const newDelivery = { 
      muestra_id: '550e8400-e29b-41d4-a716-446655440000', 
      visitador_id: '550e8400-e29b-41d4-a716-446655440002', 
      cantidad: 5,
      fecha: '2026-03-18',
      hora: '15:30'
    };
    
    const mockSample = { id: '550e8400-e29b-41d4-a716-446655440000', existencias: 10 };

    (prisma.muestras.findUnique as any).mockResolvedValue(mockSample);
    
    // Simulate an error that is not an AppError or ZodError
    (prisma.entregas.create as any).mockRejectedValue(new Error('Internal database error'));

    const response = await request(app)
      .post('/api/deliveries')
      .send(newDelivery);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Something went wrong internally');
  });
});
