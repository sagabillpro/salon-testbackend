var z = {};
// Define a simple schema for a customer
var customerSchema = z.object({
    id: z.number().int().positive(),
    name: z.string().min(1, "Name is required").max(100, "Name is too long"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
    registeredAt: z.date(),
});
// Define a schema for a menu item (service)
var menuSchema = z.object({
    id: z.number().int().positive(),
    serviceName: z.string().min(1, "Service name is required"),
    price: z.number().positive("Price must be a positive number"),
});
// Define a schema for an appointment
var appointmentSchema = z.object({
    appointmentId: z.number().int().positive(),
    customerId: z.number().int().positive(),
    barberId: z.number().int().positive(),
    date: z.string().datetime(), // ISO 8601 date string (e.g., "2024-11-12T04:48:03Z")
    status: z.enum(["scheduled", "in-progress", "completed"]),
    services: z.array(menuSchema), // An array of services for the appointment
    totalPrice: z.number().positive(),
});
// Example of combining customer and appointment data in one schema
var fullAppointmentSchema = z.object({
    customer: customerSchema,
    appointment: appointmentSchema,
});
// Example usage and validation
try {
    var appointmentData = {
        customer: {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "1234567890",
            registeredAt: new Date(),
        },
        appointment: {
            appointmentId: 1001,
            customerId: 1,
            barberId: 10,
            date: "2024-11-12T04:48:03Z",
            status: "scheduled",
            services: [
                { id: 101, serviceName: "Haircut", price: 20 },
                { id: 102, serviceName: "Beard Trim", price: 10 },
            ],
            totalPrice: 30,
        },
    };
    // Validate the data using the full appointment schema
    fullAppointmentSchema.parse(appointmentData);
    console.log("Validation successful!");
}
catch (error) {
    console.error("Validation failed:", error.errors);
}
var sampleSchema = {
    menuId: 14,
    postUrl: "/sample",
    fields: [
        {
            label: "Name",
            name: "name",
            type: "text",
            required: true,
            error: "this field is required",
            validations: [
                {
                    min: 10,
                    message: "min 10 characters",
                },
                {
                    max: 100,
                    message: "max 100 characters",
                },
            ],
        },
    ],
};
//# sourceMappingURL=map.js.map