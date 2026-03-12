import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app';
import { prisma } from '../lib/prisma';

// Mock prisma
vi.mock('../lib/prisma', () => ({
  prisma: {
    visitadores: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

describe('Visitors API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/visitors', () => {
    it('should return a list of visitors', async () => {
      const mockVisitors = [
        { id: 1, nombre: 'John', apellido: 'Doe', zona: 'North', muestras_asignadas: 5 },
      ];
      (prisma.visitadores.findMany as any).mockResolvedValue(mockVisitors);

      const response = await request(app).get('/api/visitors');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockVisitors);
    });
  });

  describe('POST /api/visitors', () => {
    it('should create a new visitor with valid data', async () => {
      const newVisitor = { nombre: 'Jane', apellido: 'Smith', zona: 'South', muestras_asignadas: 10 };
      const mockCreatedVisitor = { id: 2, ...newVisitor };
      (prisma.visitadores.create as any).mockResolvedValue(mockCreatedVisitor);

      const response = await request(app)
        .post('/api/visitors')
        .send(newVisitor);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockCreatedVisitor);
    });

    it('should return 400 for invalid data', async () => {
      const invalidVisitor = { nombre: '', apellido: 'Smith', zona: 'South' }; // missing muestras_asignadas or empty name

      const response = await request(app)
        .post('/api/visitors')
        .send(invalidVisitor);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Validation failed');
    });
  });
});
