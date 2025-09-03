import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ImageUpload } from "@/components/ui/image-upload";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertEventSchema, insertCoupleSchema, insertGiftSchema, insertContactInfoSchema, type Event, type Couple, type Gift, type ContactInfo } from "@shared/schema";
import { LoadingSkeleton } from "@/components/ui/loading";

export function AdminPanel() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [editingCouple, setEditingCouple] = useState<Couple | null>(null);
  const [editingGift, setEditingGift] = useState<Gift | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("admin-authenticated");
    localStorage.removeItem("admin-session");
    toast({
      title: "Success",
      description: "Logged out successfully",
    });
    setLocation("/admin-login");
  };

  const { data: events, isLoading: eventsLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const { data: couples, isLoading: couplesLoading } = useQuery<Couple[]>({
    queryKey: ["/api/couples"],
  });

  const { data: gifts, isLoading: giftsLoading } = useQuery<Gift[]>({
    queryKey: ["/api/gifts"],
  });

  const { data: contacts, isLoading: contactsLoading } = useQuery<ContactInfo[]>({
    queryKey: ["/api/contact-info"],
  });

  // Event form
  const eventForm = useForm({
    resolver: zodResolver(insertEventSchema),
    defaultValues: {
      nameGujarati: "",
      nameEnglish: "",
      timeGujarati: "",
      timeEnglish: "",
      datetime: new Date(),
      icon: "om",
      colorScheme: "primary",
      sortOrder: 0,
    },
  });

  const createEventMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/admin/events", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      eventForm.reset();
      toast({
        title: "Success",
        description: "Event created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create event",
        variant: "destructive",
      });
    },
  });

  // Update form when editing event changes
  React.useEffect(() => {
    if (editingEvent) {
      eventForm.reset({
        nameGujarati: editingEvent.nameGujarati,
        nameEnglish: editingEvent.nameEnglish || "",
        timeGujarati: editingEvent.timeGujarati,
        timeEnglish: editingEvent.timeEnglish || "",
        datetime: new Date(editingEvent.datetime),
        icon: editingEvent.icon,
        colorScheme: editingEvent.colorScheme,
        sortOrder: editingEvent.sortOrder,
      });
    } else {
      eventForm.reset({
        nameGujarati: "",
        nameEnglish: "",
        timeGujarati: "",
        timeEnglish: "",
        datetime: new Date(),
        icon: "om",
        colorScheme: "primary",
        sortOrder: 0,
      });
    }
  }, [editingEvent, eventForm]);

  const updateEventMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await apiRequest("PATCH", `/api/admin/events/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      eventForm.reset();
      setEditingEvent(null);
      toast({
        title: "Success",
        description: "Event updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update event",
        variant: "destructive",
      });
    },
  });

  const deleteEventMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest("DELETE", `/api/admin/events/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      toast({
        title: "Success",
        description: "Event deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      });
    },
  });

  const handleEventSubmit = (data: any) => {
    if (editingEvent) {
      updateEventMutation.mutate({ id: editingEvent.id, data });
    } else {
      createEventMutation.mutate(data);
    }
  };

  // Couple form
  const coupleForm = useForm({
    resolver: zodResolver(insertCoupleSchema),
    defaultValues: {
      groomNameGujarati: "",
      groomNameEnglish: "",
      brideNameGujarati: "",
      brideNameEnglish: "",
      imageUrl: "",
      coupleSlug: "",
    },
  });

  // Update form when editing couple changes
  React.useEffect(() => {
    if (editingCouple) {
      coupleForm.reset({
        groomNameGujarati: editingCouple.groomNameGujarati,
        groomNameEnglish: editingCouple.groomNameEnglish,
        brideNameGujarati: editingCouple.brideNameGujarati,
        brideNameEnglish: editingCouple.brideNameEnglish,
        imageUrl: editingCouple.imageUrl || "",
        coupleSlug: editingCouple.coupleSlug,
      });
    } else {
      coupleForm.reset({
        groomNameGujarati: "",
        groomNameEnglish: "",
        brideNameGujarati: "",
        brideNameEnglish: "",
        imageUrl: "",
        coupleSlug: "",
      });
    }
  }, [editingCouple, coupleForm]);

  const createCoupleMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/admin/couples", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/couples"] });
      coupleForm.reset();
      toast({
        title: "Success",
        description: "Couple created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create couple",
        variant: "destructive",
      });
    },
  });

  const updateCoupleMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await apiRequest("PATCH", `/api/admin/couples/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/couples"] });
      setEditingCouple(null);
      coupleForm.reset();
      toast({
        title: "Success",
        description: "Couple updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update couple",
        variant: "destructive",
      });
    },
  });

  const deleteCoupleMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest("DELETE", `/api/admin/couples/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/couples"] });
      toast({
        title: "Success",
        description: "Couple deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete couple",
        variant: "destructive",
      });
    },
  });

  // Gift form
  const giftForm = useForm({
    resolver: zodResolver(insertGiftSchema),
    defaultValues: {
      donorNameGujarati: "",
      donorNameEnglish: "",
      organizationGujarati: "",
      organizationEnglish: "",
      giftDescriptionGujarati: "",
      giftDescriptionEnglish: "",
      giftIcon: "gift",
      amount: 0,
    },
  });

  // Update form when editing gift changes
  React.useEffect(() => {
    if (editingGift) {
      giftForm.reset({
        donorNameGujarati: editingGift.donorNameGujarati,
        donorNameEnglish: editingGift.donorNameEnglish || "",
        organizationGujarati: editingGift.organizationGujarati || "",
        organizationEnglish: editingGift.organizationEnglish || "",
        giftDescriptionGujarati: editingGift.giftDescriptionGujarati,
        giftDescriptionEnglish: editingGift.giftDescriptionEnglish || "",
        giftIcon: editingGift.giftIcon,
        amount: editingGift.amount ?? 0,
      });
    } else {
      giftForm.reset({
        donorNameGujarati: "",
        donorNameEnglish: "",
        organizationGujarati: "",
        organizationEnglish: "",
        giftDescriptionGujarati: "",
        giftDescriptionEnglish: "",
        giftIcon: "gift",
        amount: 0,
      });
    }
  }, [editingGift, giftForm]);

  const createGiftMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/admin/gifts", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gifts"] });
      giftForm.reset();
      setEditingGift(null);
      toast({
        title: "Success",
        description: "Gift created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create gift",
        variant: "destructive",
      });
    },
  });

  const updateGiftMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await apiRequest("PATCH", `/api/admin/gifts/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gifts"] });
      setEditingGift(null);
      giftForm.reset();
      toast({
        title: "Success",
        description: "Gift updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update gift",
        variant: "destructive",
      });
    },
  });

  const deleteGiftMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest("DELETE", `/api/admin/gifts/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gifts"] });
      toast({
        title: "Success",
        description: "Gift deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete gift",
        variant: "destructive",
      });
    },
  });

  const handleGiftSubmit = (data: any) => {
    if (editingGift) {
      updateGiftMutation.mutate({ id: editingGift.id, data });
    } else {
      createGiftMutation.mutate(data);
    }
  };


  return (
    <div className="min-h-screen bg-admin-panel">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-700">Wedding Admin Panel</h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            data-testid="button-logout"
          >
            <i className="fas fa-sign-out-alt mr-2"></i>Logout
          </Button>
        </div>

        <Tabs defaultValue="events" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="events" data-testid="tab-events">Events</TabsTrigger>
            <TabsTrigger value="couples" data-testid="tab-couples">Couples</TabsTrigger>
            <TabsTrigger value="gifts" data-testid="tab-gifts">Gifts</TabsTrigger>
            <TabsTrigger value="contacts" data-testid="tab-contacts">Contacts</TabsTrigger>
          </TabsList>

          {/* Events Management */}
          <TabsContent value="events" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>{editingEvent ? "Edit Event" : "Add New Event"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...eventForm}>
                    <form
                      onSubmit={eventForm.handleSubmit(handleEventSubmit)}
                      className="space-y-4"
                      data-testid="form-create-event"
                    >
                      <FormField
                        control={eventForm.control}
                        name="nameGujarati"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Event Name (Gujarati)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="ગણેશ સ્થાપના" className="gujarati-text" data-testid="input-event-name-gujarati" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={eventForm.control}
                        name="nameEnglish"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Event Name (English)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Ganesh Sthapana" data-testid="input-event-name-english" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={eventForm.control}
                        name="timeGujarati"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Time Description (Gujarati)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="સવારે 8:00 વાગ્યે" className="gujarati-text" data-testid="input-event-time-gujarati" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={eventForm.control}
                        name="timeEnglish"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Time Description (English)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="8:00 AM onwards" data-testid="input-event-time-english" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={eventForm.control}
                        name="datetime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date & Time</FormLabel>
                            <FormControl>
                              <Input
                                type="datetime-local"
                                {...field}
                                value={field.value instanceof Date ? field.value.toISOString().slice(0, 16) : field.value}
                                onChange={(e) => field.onChange(new Date(e.target.value))}
                                data-testid="input-event-datetime"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={eventForm.control}
                        name="icon"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Icon (FontAwesome class without fa-)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="om" data-testid="input-event-icon" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex gap-2">
                        <Button
                          type="submit"
                          disabled={createEventMutation.isPending || updateEventMutation.isPending}
                          className="flex-1"
                          data-testid="button-submit-event"
                        >
                          {editingEvent 
                            ? (updateEventMutation.isPending ? "Updating..." : "Update Event")
                            : (createEventMutation.isPending ? "Creating..." : "Create Event")
                          }
                        </Button>
                        {editingEvent && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setEditingEvent(null);
                              eventForm.reset();
                            }}
                            data-testid="button-cancel-edit-event"
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Events</CardTitle>
                </CardHeader>
                <CardContent>
                  {eventsLoading ? (
                    <div className="space-y-4">
                      {[...Array(4)].map((_, i) => (
                        <LoadingSkeleton key={i} className="h-16 w-full" />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {events?.filter(event => event.nameGujarati && event.nameEnglish).length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <i className="fas fa-calendar-alt text-4xl mb-4 opacity-50"></i>
                          <p>No events added yet</p>
                          <p className="text-sm">Add your first event using the form on the left</p>
                        </div>
                      ) : (
                        events?.filter(event => event.nameGujarati && event.nameEnglish).map((event) => (
                          <div key={event.id} className="p-4 border border-border rounded-lg" data-testid={`admin-event-${event.id}`}>
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className="font-semibold gujarati-text">{event.nameGujarati}</h4>
                                <p className="text-sm text-muted-foreground">{event.nameEnglish}</p>
                                <p className="text-xs text-muted-foreground gujarati-text">{event.timeGujarati}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="text-right mr-2">
                                  <i className={`fas fa-${event.icon} text-primary`}></i>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setEditingEvent(event)}
                                  data-testid={`button-edit-event-${event.id}`}
                                >
                                  <i className="fas fa-edit mr-1"></i>
                                  Edit
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => {
                                    if (confirm("Are you sure you want to delete this event?")) {
                                      deleteEventMutation.mutate(event.id);
                                    }
                                  }}
                                  disabled={deleteEventMutation.isPending}
                                  data-testid={`button-delete-event-${event.id}`}
                                >
                                  <i className="fas fa-trash mr-1"></i>
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Couples Management */}
          <TabsContent value="couples" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>{editingCouple ? "Edit Couple" : "Add New Couple"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...coupleForm}>
                    <form
                      onSubmit={coupleForm.handleSubmit((data) => {
                        if (editingCouple) {
                          updateCoupleMutation.mutate({ id: editingCouple.id, data });
                        } else {
                          createCoupleMutation.mutate(data);
                        }
                      })}
                      className="space-y-4"
                      data-testid="form-create-couple"
                    >
                      <FormField
                        control={coupleForm.control}
                        name="groomNameGujarati"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Groom Name (Gujarati)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="વિહંગ" className="gujarati-text" data-testid="input-groom-name-gujarati" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={coupleForm.control}
                        name="groomNameEnglish"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Groom Name (English)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Vihang" data-testid="input-groom-name-english" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={coupleForm.control}
                        name="brideNameGujarati"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bride Name (Gujarati)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="બાનસરી" className="gujarati-text" data-testid="input-bride-name-gujarati" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={coupleForm.control}
                        name="brideNameEnglish"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bride Name (English)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Bansari" data-testid="input-bride-name-english" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={coupleForm.control}
                        name="coupleSlug"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Couple Slug (URL-friendly)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="vihang-bansari" data-testid="input-couple-slug" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={coupleForm.control}
                        name="imageUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Couple Image</FormLabel>
                            <FormControl>
                              <ImageUpload
                                value={field.value}
                                onChange={field.onChange}
                                disabled={createCoupleMutation.isPending}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex gap-2">
                        <Button
                          type="submit"
                          disabled={createCoupleMutation.isPending || updateCoupleMutation.isPending}
                          className="flex-1"
                          data-testid="button-submit-couple"
                        >
                          {editingCouple 
                            ? (updateCoupleMutation.isPending ? "Updating..." : "Update Couple")
                            : (createCoupleMutation.isPending ? "Creating..." : "Create Couple")
                          }
                        </Button>
                        {editingCouple && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setEditingCouple(null)}
                            data-testid="button-cancel-edit"
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Couples</CardTitle>
                </CardHeader>
                <CardContent>
                  {couplesLoading ? (
                    <div className="space-y-4">
                      {[...Array(4)].map((_, i) => (
                        <LoadingSkeleton key={i} className="h-20 w-full" />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {couples?.map((couple) => (
                        <div key={couple.id} className="p-4 border border-border rounded-lg" data-testid={`admin-couple-${couple.id}`}>
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-semibold gujarati-text">
                                {couple.groomNameGujarati} & {couple.brideNameGujarati}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {couple.groomNameEnglish} & {couple.brideNameEnglish}
                              </p>
                              <p className="text-xs text-muted-foreground">Slug: {couple.coupleSlug}</p>
                              {couple.imageUrl && (
                                <img 
                                  src={couple.imageUrl} 
                                  alt="Couple" 
                                  className="mt-2 w-16 h-16 object-cover rounded border"
                                />
                              )}
                            </div>
                            <div className="flex gap-2 ml-4">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditingCouple(couple)}
                                data-testid={`button-edit-couple-${couple.id}`}
                              >
                                <i className="fas fa-edit mr-1"></i>
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete ${couple.groomNameEnglish} & ${couple.brideNameEnglish}?`)) {
                                    deleteCoupleMutation.mutate(couple.id);
                                  }
                                }}
                                disabled={deleteCoupleMutation.isPending}
                                data-testid={`button-delete-couple-${couple.id}`}
                              >
                                <i className="fas fa-trash mr-1"></i>
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Gifts Management */}
          <TabsContent value="gifts" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>{editingGift ? "Edit Gift" : "Add New Gift"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...giftForm}>
                    <form
                      onSubmit={giftForm.handleSubmit(handleGiftSubmit)}
                      className="space-y-4"
                      data-testid="form-create-gift"
                    >
                      <FormField
                        control={giftForm.control}
                        name="donorNameGujarati"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Donor Name (Gujarati)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="ગોપાલભાઈ ભુરાભાઈ મારાજ" className="gujarati-text" data-testid="input-donor-name-gujarati" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={giftForm.control}
                        name="donorNameEnglish"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Donor Name (English)</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Gopalbhai Bhurabhai Maraj" data-testid="input-donor-name-english" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={giftForm.control}
                        name="giftDescriptionGujarati"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gift Description (Gujarati)</FormLabel>
                            <FormControl>
                              <Textarea {...field} placeholder="લેંઝર પ્રિંટ સ્ટીલ નો ડબો" className="gujarati-text" data-testid="textarea-gift-description-gujarati" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={giftForm.control}
                        name="giftDescriptionEnglish"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gift Description (English)</FormLabel>
                            <FormControl>
                              <Textarea {...field} placeholder="Laser Print Steel Box" data-testid="textarea-gift-description-english" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={giftForm.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Amount (₹)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                value={field.value || ""}
                                onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                                placeholder="501"
                                data-testid="input-gift-amount"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex gap-2">
                        <Button
                          type="submit"
                          disabled={createGiftMutation.isPending || updateGiftMutation.isPending}
                          className="flex-1"
                          data-testid="button-submit-gift"
                        >
                          {editingGift 
                            ? (updateGiftMutation.isPending ? "Updating..." : "Update Gift")
                            : (createGiftMutation.isPending ? "Creating..." : "Create Gift")
                          }
                        </Button>
                        {editingGift && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setEditingGift(null);
                              giftForm.reset();
                            }}
                            data-testid="button-cancel-edit-gift"
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Gifts ({gifts?.length || 0})</CardTitle>
                </CardHeader>
                <CardContent>
                  {giftsLoading ? (
                    <div className="space-y-4">
                      {[...Array(6)].map((_, i) => (
                        <LoadingSkeleton key={i} className="h-16 w-full" />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {gifts?.map((gift) => (
                        <div key={gift.id} className="p-4 border border-border rounded-lg" data-testid={`admin-gift-${gift.id}`}>
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-semibold gujarati-text">{gift.donorNameGujarati}</h4>
                              <p className="text-sm text-muted-foreground gujarati-text">{gift.giftDescriptionGujarati}</p>
                              {gift.amount && (
                                <p className="text-sm font-bold text-primary">₹{gift.amount}</p>
                              )}
                            </div>
                            <div className="flex gap-2 ml-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingGift(gift)}
                                data-testid={`button-edit-gift-${gift.id}`}
                              >
                                <i className="fas fa-edit mr-1"></i>
                                Edit
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                  if (confirm("Are you sure you want to delete this gift?")) {
                                    deleteGiftMutation.mutate(gift.id);
                                  }
                                }}
                                disabled={deleteGiftMutation.isPending}
                                data-testid={`button-delete-gift-${gift.id}`}
                              >
                                <i className="fas fa-trash mr-1"></i>
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Contacts Management */}
          <TabsContent value="contacts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                {contactsLoading ? (
                  <div className="space-y-4">
                    {[...Array(2)].map((_, i) => (
                      <LoadingSkeleton key={i} className="h-24 w-full" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {contacts?.map((contact) => (
                      <div key={contact.id} className="p-4 border border-border rounded-lg" data-testid={`admin-contact-${contact.id}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold gujarati-text">{contact.organizationGujarati}</h4>
                            <p className="text-sm text-muted-foreground">{contact.organizationEnglish}</p>
                            <p className="text-sm text-muted-foreground gujarati-text">{contact.addressGujarati}</p>
                            <p className="text-sm text-primary font-medium">{contact.phoneNumber}</p>
                          </div>
                          {contact.isPrimary && (
                            <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded">Primary</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
