"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStore } from "@/store/useFormStore";
import { requirementFormSchema, RequirementFormValues } from "@/lib/schemas/requirementSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Create a partial schema for Step 1 validation only
const step1Schema = requirementFormSchema.pick({
  eventName: true,
  eventType: true,
  eventDate: true,
  location: true,
  venue: true,
  hiringCategory: true,
});

export default function Step1BasicInfo() {
  const { formData, setFormData, nextStep } = useFormStore();

  const form = useForm<RequirementFormValues>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      eventName: formData.eventName || "",
      eventType: formData.eventType || "",
      location: formData.location || "",
      venue: formData.venue || "",
      hiringCategory: formData.hiringCategory || "Planner",
      // Date handling requires attention if reloading form
      eventDate: formData.eventDate ? new Date(formData.eventDate) : undefined, 
    },
  });

  const onSubmit = (data: any) => {
    setFormData(data);
    nextStep();
  };

  return (
    <Card className="w-full max-w-lg mx-auto animate-slide-up shadow-lg border-t-4 border-t-primary">
      <CardHeader>
        <CardTitle>Basic Event Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Event Name */}
            <FormField control={form.control} name="eventName" render={({ field }) => (
              <FormItem>
                <FormLabel>Event Name</FormLabel>
                <FormControl><Input placeholder="e.g. Summer Music Fest" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Event Type & Hiring Category (Row) */}
            <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="eventType" render={({ field }) => (
                <FormItem>
                    <FormLabel>Event Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger></FormControl>
                    <SelectContent>
                        <SelectItem value="Wedding">Wedding</SelectItem>
                        <SelectItem value="Corporate">Corporate</SelectItem>
                        <SelectItem value="Concert">Concert</SelectItem>
                        <SelectItem value="Private Party">Private Party</SelectItem>
                    </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
                )} />

                <FormField control={form.control} name="hiringCategory" render={({ field }) => (
                <FormItem>
                    <FormLabel>Looking For</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger></FormControl>
                    <SelectContent>
                        <SelectItem value="Planner">Planner</SelectItem>
                        <SelectItem value="Performer">Performer</SelectItem>
                        <SelectItem value="Crew">Crew</SelectItem>
                    </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
                )} />
            </div>

            {/* Date Picker */}
            <FormField control={form.control} name="eventDate" render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date()} initialFocus />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )} />

            {/* Location */}
            <FormField control={form.control} name="location" render={({ field }) => (
              <FormItem>
                <FormLabel>Location (City/Area)</FormLabel>
                <FormControl><Input placeholder="e.g. New York, NY" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Venue (Optional) */}
            <FormField control={form.control} name="venue" render={({ field }) => (
              <FormItem>
                <FormLabel>Venue (Optional)</FormLabel>
                <FormControl><Input placeholder="e.g. The Grand Hall" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <Button type="submit" className="w-full">Next Step</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}