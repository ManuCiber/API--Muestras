import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app';
import { prisma } from '../lib/prisma';

// Mock prisma
vi.mock('../lib/prisma', () => ({
  prisma: {
    muestras: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

describe('Samples API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/samples', () => {
    it('should return a list of samples', async () => {
      const mockSamples = [
        { id: 1, nombre: 'Sample 1', descripcion: 'Desc 1', existencias: 10 },
      ];
      (prisma.muestras.findMany as any).mockResolvedValue(mockSamples);

      const response = await request(app).get('/api/samples');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockSamples);
    });
  });

  describe('POST /api/samples', () => {
    it('should create a new sample with valid data', async () => {
      const newSample = { nombre: 'New Sample', descripcion: 'New Desc', existencias: 5 };
      const mockCreatedSample = { id: 2, ...newSample };
      (prisma.muestras.create as any).mockResolvedValue(mockCreatedSample);

      const response = await request(app)
        .post('/api/samples')
        .send(newSample);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockCreatedSample);
    });

    it('should return 400 for invalid data', async () => {
      const invalidSample = { nombre: '', descripcion: 'Desc', existencias: -1 };

      const response = await request(app)
        .post('/api/samples')
        .send(invalidSample);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Validation failed');
    });
  });
});
