import {
  users,
  events,
  couples,
  gifts,
  siteContent,
  contactInfo,
  type User,
  type UpsertUser,
  type Event,
  type InsertEvent,
  type Couple,
  type InsertCouple,
  type Gift,
  type InsertGift,
  type SiteContent,
  type InsertSiteContent,
  type ContactInfo,
  type InsertContactInfo,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, asc } from "drizzle-orm";

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Event operations
  getEvents(): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event>;
  deleteEvent(id: string): Promise<void>;
  
  // Couple operations
  getCouples(): Promise<Couple[]>;
  getCouple(id: string): Promise<Couple | undefined>;
  getCoupleBySlug(slug: string): Promise<Couple | undefined>;
  createCouple(couple: InsertCouple): Promise<Couple>;
  updateCouple(id: string, couple: Partial<InsertCouple>): Promise<Couple>;
  deleteCouple(id: string): Promise<void>;
  
  // Gift operations
  getGifts(): Promise<Gift[]>;
  createGift(gift: InsertGift): Promise<Gift>;
  updateGift(id: string, gift: Partial<InsertGift>): Promise<Gift>;
  deleteGift(id: string): Promise<void>;
  
  // Site content operations
  getSiteContent(): Promise<SiteContent[]>;
  getSiteContentByKey(key: string): Promise<SiteContent | undefined>;
  upsertSiteContent(content: InsertSiteContent): Promise<SiteContent>;
  
  // Contact info operations
  getContactInfo(): Promise<ContactInfo[]>;
  getPrimaryContact(): Promise<ContactInfo | undefined>;
  createContactInfo(contact: InsertContactInfo): Promise<ContactInfo>;
  updateContactInfo(id: string, contact: Partial<InsertContactInfo>): Promise<ContactInfo>;
  deleteContactInfo(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations (required for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }
  
  // Event operations
  async getEvents(): Promise<Event[]> {
    return await db.select().from(events).orderBy(asc(events.sortOrder), asc(events.datetime));
  }
  
  async createEvent(event: InsertEvent): Promise<Event> {
    const [newEvent] = await db.insert(events).values(event).returning();
    return newEvent;
  }
  
  async updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event> {
    const [updatedEvent] = await db
      .update(events)
      .set(event)
      .where(eq(events.id, id))
      .returning();
    return updatedEvent;
  }
  
  async deleteEvent(id: string): Promise<void> {
    await db.delete(events).where(eq(events.id, id));
  }
  
  // Couple operations
  async getCouples(): Promise<Couple[]> {
    return await db.select().from(couples).orderBy(desc(couples.createdAt));
  }
  
  async getCouple(id: string): Promise<Couple | undefined> {
    const [couple] = await db.select().from(couples).where(eq(couples.id, id));
    return couple;
  }
  
  async getCoupleBySlug(slug: string): Promise<Couple | undefined> {
    const [couple] = await db.select().from(couples).where(eq(couples.coupleSlug, slug));
    return couple;
  }
  
  async createCouple(couple: InsertCouple): Promise<Couple> {
    const [newCouple] = await db.insert(couples).values(couple).returning();
    return newCouple;
  }
  
  async updateCouple(id: string, couple: Partial<InsertCouple>): Promise<Couple> {
    const [updatedCouple] = await db
      .update(couples)
      .set(couple)
      .where(eq(couples.id, id))
      .returning();
    return updatedCouple;
  }
  
  async deleteCouple(id: string): Promise<void> {
    await db.delete(couples).where(eq(couples.id, id));
  }
  
  // Gift operations
  async getGifts(): Promise<Gift[]> {
    return await db.select().from(gifts).orderBy(desc(gifts.createdAt));
  }
  
  async createGift(gift: InsertGift): Promise<Gift> {
    const [newGift] = await db.insert(gifts).values(gift).returning();
    return newGift;
  }
  
  async updateGift(id: string, gift: Partial<InsertGift>): Promise<Gift> {
    const [updatedGift] = await db
      .update(gifts)
      .set(gift)
      .where(eq(gifts.id, id))
      .returning();
    return updatedGift;
  }
  
  async deleteGift(id: string): Promise<void> {
    await db.delete(gifts).where(eq(gifts.id, id));
  }
  
  // Site content operations
  async getSiteContent(): Promise<SiteContent[]> {
    return await db.select().from(siteContent);
  }
  
  async getSiteContentByKey(key: string): Promise<SiteContent | undefined> {
    const [content] = await db.select().from(siteContent).where(eq(siteContent.key, key));
    return content;
  }
  
  async upsertSiteContent(content: InsertSiteContent): Promise<SiteContent> {
    const [upsertedContent] = await db
      .insert(siteContent)
      .values(content)
      .onConflictDoUpdate({
        target: siteContent.key,
        set: {
          ...content,
          updatedAt: new Date(),
        },
      })
      .returning();
    return upsertedContent;
  }
  
  // Contact info operations
  async getContactInfo(): Promise<ContactInfo[]> {
    return await db.select().from(contactInfo).orderBy(desc(contactInfo.isPrimary), desc(contactInfo.createdAt));
  }
  
  async getPrimaryContact(): Promise<ContactInfo | undefined> {
    const [contact] = await db.select().from(contactInfo).where(eq(contactInfo.isPrimary, true));
    return contact;
  }
  
  async createContactInfo(contact: InsertContactInfo): Promise<ContactInfo> {
    const [newContact] = await db.insert(contactInfo).values(contact).returning();
    return newContact;
  }
  
  async updateContactInfo(id: string, contact: Partial<InsertContactInfo>): Promise<ContactInfo> {
    const [updatedContact] = await db
      .update(contactInfo)
      .set(contact)
      .where(eq(contactInfo.id, id))
      .returning();
    return updatedContact;
  }
  
  async deleteContactInfo(id: string): Promise<void> {
    await db.delete(contactInfo).where(eq(contactInfo.id, id));
  }
}

export const storage = new DatabaseStorage();
