import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertEventSchema, insertCoupleSchema, insertGiftSchema, insertSiteContentSchema, insertContactInfoSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Public routes for website content
  app.get('/api/events', async (req, res) => {
    try {
      const events = await storage.getEvents();
      res.json(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });

  app.get('/api/couples', async (req, res) => {
    try {
      const couples = await storage.getCouples();
      res.json(couples);
    } catch (error) {
      console.error("Error fetching couples:", error);
      res.status(500).json({ message: "Failed to fetch couples" });
    }
  });

  app.get('/api/couples/:slug', async (req, res) => {
    try {
      const couple = await storage.getCoupleBySlug(req.params.slug);
      if (!couple) {
        return res.status(404).json({ message: "Couple not found" });
      }
      res.json(couple);
    } catch (error) {
      console.error("Error fetching couple:", error);
      res.status(500).json({ message: "Failed to fetch couple" });
    }
  });

  app.get('/api/gifts', async (req, res) => {
    try {
      const gifts = await storage.getGifts();
      res.json(gifts);
    } catch (error) {
      console.error("Error fetching gifts:", error);
      res.status(500).json({ message: "Failed to fetch gifts" });
    }
  });

  app.get('/api/site-content', async (req, res) => {
    try {
      const content = await storage.getSiteContent();
      res.json(content);
    } catch (error) {
      console.error("Error fetching site content:", error);
      res.status(500).json({ message: "Failed to fetch site content" });
    }
  });

  app.get('/api/site-content/:key', async (req, res) => {
    try {
      const content = await storage.getSiteContentByKey(req.params.key);
      if (!content) {
        return res.status(404).json({ message: "Content not found" });
      }
      res.json(content);
    } catch (error) {
      console.error("Error fetching site content:", error);
      res.status(500).json({ message: "Failed to fetch site content" });
    }
  });

  app.get('/api/contact-info', async (req, res) => {
    try {
      const contacts = await storage.getContactInfo();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contact info:", error);
      res.status(500).json({ message: "Failed to fetch contact info" });
    }
  });

  // Admin routes (protected by client-side auth)
  app.post('/api/admin/events', async (req, res) => {
    try {
      const validatedData = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(validatedData);
      res.json(event);
    } catch (error) {
      console.error("Error creating event:", error);
      res.status(400).json({ message: error instanceof Error ? error.message : "Failed to create event" });
    }
  });

  app.patch('/api/admin/events/:id', async (req, res) => {
    try {
      const updateData = insertEventSchema.partial().parse(req.body);
      const event = await storage.updateEvent(req.params.id, updateData);
      res.json(event);
    } catch (error) {
      console.error("Error updating event:", error);
      res.status(400).json({ message: error instanceof Error ? error.message : "Failed to update event" });
    }
  });

  app.delete('/api/admin/events/:id', async (req, res) => {
    try {
      await storage.deleteEvent(req.params.id);
      res.json({ message: "Event deleted successfully" });
    } catch (error) {
      console.error("Error deleting event:", error);
      res.status(500).json({ message: "Failed to delete event" });
    }
  });

  app.post('/api/admin/couples', async (req, res) => {
    try {
      const validatedData = insertCoupleSchema.parse(req.body);
      const couple = await storage.createCouple(validatedData);
      res.json(couple);
    } catch (error) {
      console.error("Error creating couple:", error);
      res.status(400).json({ message: error instanceof Error ? error.message : "Failed to create couple" });
    }
  });

  app.patch('/api/admin/couples/:id', async (req, res) => {
    try {
      const updateData = insertCoupleSchema.partial().parse(req.body);
      const couple = await storage.updateCouple(req.params.id, updateData);
      res.json(couple);
    } catch (error) {
      console.error("Error updating couple:", error);
      res.status(400).json({ message: error instanceof Error ? error.message : "Failed to update couple" });
    }
  });

  app.delete('/api/admin/couples/:id', async (req, res) => {
    try {
      await storage.deleteCouple(req.params.id);
      res.json({ message: "Couple deleted successfully" });
    } catch (error) {
      console.error("Error deleting couple:", error);
      res.status(500).json({ message: "Failed to delete couple" });
    }
  });

  app.post('/api/admin/gifts', async (req, res) => {
    try {
      const validatedData = insertGiftSchema.parse(req.body);
      const gift = await storage.createGift(validatedData);
      res.json(gift);
    } catch (error) {
      console.error("Error creating gift:", error);
      res.status(400).json({ message: error instanceof Error ? error.message : "Failed to create gift" });
    }
  });

  app.patch('/api/admin/gifts/:id', async (req, res) => {
    try {
      const updateData = insertGiftSchema.partial().parse(req.body);
      const gift = await storage.updateGift(req.params.id, updateData);
      res.json(gift);
    } catch (error) {
      console.error("Error updating gift:", error);
      res.status(400).json({ message: error instanceof Error ? error.message : "Failed to update gift" });
    }
  });

  app.delete('/api/admin/gifts/:id', async (req, res) => {
    try {
      await storage.deleteGift(req.params.id);
      res.json({ message: "Gift deleted successfully" });
    } catch (error) {
      console.error("Error deleting gift:", error);
      res.status(500).json({ message: "Failed to delete gift" });
    }
  });

  app.post('/api/admin/site-content', async (req, res) => {
    try {
      const validatedData = insertSiteContentSchema.parse(req.body);
      const content = await storage.upsertSiteContent(validatedData);
      res.json(content);
    } catch (error) {
      console.error("Error upserting site content:", error);
      res.status(400).json({ message: error instanceof Error ? error.message : "Failed to upsert site content" });
    }
  });

  app.post('/api/admin/contact-info', async (req, res) => {
    try {
      const validatedData = insertContactInfoSchema.parse(req.body);
      const contact = await storage.createContactInfo(validatedData);
      res.json(contact);
    } catch (error) {
      console.error("Error creating contact info:", error);
      res.status(400).json({ message: error instanceof Error ? error.message : "Failed to create contact info" });
    }
  });

  app.patch('/api/admin/contact-info/:id', async (req, res) => {
    try {
      const updateData = insertContactInfoSchema.partial().parse(req.body);
      const contact = await storage.updateContactInfo(req.params.id, updateData);
      res.json(contact);
    } catch (error) {
      console.error("Error updating contact info:", error);
      res.status(400).json({ message: error instanceof Error ? error.message : "Failed to update contact info" });
    }
  });

  app.delete('/api/admin/contact-info/:id', async (req, res) => {
    try {
      await storage.deleteContactInfo(req.params.id);
      res.json({ message: "Contact info deleted successfully" });
    } catch (error) {
      console.error("Error deleting contact info:", error);
      res.status(500).json({ message: "Failed to delete contact info" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
