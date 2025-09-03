import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Wedding events table
export const events = pgTable("events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  nameGujarati: text("name_gujarati").notNull(),
  nameEnglish: text("name_english").notNull(),
  timeGujarati: text("time_gujarati").notNull(),
  timeEnglish: text("time_english").notNull(),
  datetime: timestamp("datetime").notNull(),
  icon: varchar("icon").notNull(),
  colorScheme: varchar("color_scheme").notNull().default("primary"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Wedding couples table
export const couples = pgTable("couples", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  groomNameGujarati: text("groom_name_gujarati").notNull(),
  groomNameEnglish: text("groom_name_english").notNull(),
  brideNameGujarati: text("bride_name_gujarati").notNull(),
  brideNameEnglish: text("bride_name_english").notNull(),
  imageUrl: text("image_url"),
  coupleSlug: varchar("couple_slug").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Gifts and donors table
export const gifts = pgTable("gifts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  donorNameGujarati: text("donor_name_gujarati").notNull(),
  donorNameEnglish: text("donor_name_english"),
  organizationGujarati: text("organization_gujarati"),
  organizationEnglish: text("organization_english"),
  giftDescriptionGujarati: text("gift_description_gujarati").notNull(),
  giftDescriptionEnglish: text("gift_description_english"),
  giftIcon: varchar("gift_icon").notNull().default("gift"),
  amount: integer("amount"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Site content table for managing editable content
export const siteContent = pgTable("site_content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: varchar("key").notNull().unique(),
  titleGujarati: text("title_gujarati"),
  titleEnglish: text("title_english"),
  contentGujarati: text("content_gujarati"),
  contentEnglish: text("content_english"),
  imageUrl: text("image_url"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Contact information table
export const contactInfo = pgTable("contact_info", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationGujarati: text("organization_gujarati").notNull(),
  organizationEnglish: text("organization_english").notNull(),
  addressGujarati: text("address_gujarati").notNull(),
  addressEnglish: text("address_english").notNull(),
  phoneNumber: varchar("phone_number").notNull(),
  whatsappNumber: varchar("whatsapp_number"),
  email: varchar("email"),
  isPrimary: boolean("is_primary").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const eventsRelations = relations(events, ({ many }) => ({
  // Add any future relations if needed
}));

export const couplesRelations = relations(couples, ({ many }) => ({
  // Add any future relations if needed
}));

export const giftsRelations = relations(gifts, ({ many }) => ({
  // Add any future relations if needed
}));

// Insert schemas
export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
  createdAt: true,
}).extend({
  datetime: z.string().transform((str) => new Date(str)).or(z.date()),
  nameGujarati: z.string().min(1, "Gujarati name is required"),
  nameEnglish: z.string().min(1, "English name is required"),
  timeGujarati: z.string().min(1, "Gujarati time is required"),
  timeEnglish: z.string().min(1, "English time is required"),
});

export const insertCoupleSchema = createInsertSchema(couples).omit({
  id: true,
  createdAt: true,
});

export const insertGiftSchema = createInsertSchema(gifts).omit({
  id: true,
  createdAt: true,
});

export const insertSiteContentSchema = createInsertSchema(siteContent).omit({
  id: true,
  updatedAt: true,
});

export const insertContactInfoSchema = createInsertSchema(contactInfo).omit({
  id: true,
  createdAt: true,
});

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Couple = typeof couples.$inferSelect;
export type InsertCouple = z.infer<typeof insertCoupleSchema>;
export type Gift = typeof gifts.$inferSelect;
export type InsertGift = z.infer<typeof insertGiftSchema>;
export type SiteContent = typeof siteContent.$inferSelect;
export type InsertSiteContent = z.infer<typeof insertSiteContentSchema>;
export type ContactInfo = typeof contactInfo.$inferSelect;
export type InsertContactInfo = z.infer<typeof insertContactInfoSchema>;
