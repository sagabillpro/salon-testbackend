# Services Documentation

## Overview

This document details the core services that power the JH Studio Backend application. Each service is responsible for specific business logic and data operations.

## Service Architecture

The application follows a layered architecture:
1. Controllers (API Layer)
2. Services (Business Logic)
3. Repositories (Data Access)
4. Models/Entities (Data Structure)

## Core Services

### 1. Purchase Service

```typescript
class PurchaseService {
  // Create new purchase
  async createPurchase(data: CreatePurchaseDto): Promise<Purchase>
  
  // Get purchase by ID
  async getPurchaseById(id: number): Promise<Purchase>
  
  // List purchases with filters
  async listPurchases(filters: PurchaseFilters): Promise<PaginatedResponse<Purchase>>
  
  // Update purchase
  async updatePurchase(id: number, data: UpdatePurchaseDto): Promise<Purchase>
  
  // Delete purchase
  async deletePurchase(id: number): Promise<void>
  
  // Generate purchase invoice
  async generateInvoice(id: number): Promise<Buffer>
}
```

Key Features:
- CRUD operations for purchases
- Purchase invoice generation
- Purchase history tracking
- Supplier management
- Stock updates on purchase

### 2. Sales Service

```typescript
class SalesService {
  // Create new sale
  async createSale(data: CreateSaleDto): Promise<Sale>
  
  // Get sale by ID
  async getSaleById(id: number): Promise<Sale>
  
  // List sales with filters
  async listSales(filters: SaleFilters): Promise<PaginatedResponse<Sale>>
  
  // Update sale
  async updateSale(id: number, data: UpdateSaleDto): Promise<Sale>
  
  // Delete sale
  async deleteSale(id: number): Promise<void>
  
  // Generate sale invoice
  async generateInvoice(id: number): Promise<Buffer>
}
```

Key Features:
- CRUD operations for sales
- Sales invoice generation
- Customer management
- Stock updates on sale
- Sales analytics

### 3. Inventory Service

```typescript
class InventoryService {
  // Add stock
  async addStock(data: AddStockDto): Promise<Stock>
  
  // Update stock
  async updateStock(id: number, data: UpdateStockDto): Promise<Stock>
  
  // Get stock by ID
  async getStockById(id: number): Promise<Stock>
  
  // List stock with filters
  async listStock(filters: StockFilters): Promise<PaginatedResponse<Stock>>
  
  // Track stock movement
  async trackStockMovement(data: StockMovementDto): Promise<StockMovement>
  
  // Get stock alerts
  async getStockAlerts(): Promise<StockAlert[]>
}
```

Key Features:
- Stock management
- Inventory tracking
- Stock alerts
- Stock movement history
- Stock reports

### 4. User Service

```typescript
class UserService {
  // Create user
  async createUser(data: CreateUserDto): Promise<User>
  
  // Get user by ID
  async getUserById(id: number): Promise<User>
  
  // Update user
  async updateUser(id: number, data: UpdateUserDto): Promise<User>
  
  // Delete user
  async deleteUser(id: number): Promise<void>
  
  // Change password
  async changePassword(id: number, data: ChangePasswordDto): Promise<void>
  
  // Reset password
  async resetPassword(email: string): Promise<void>
}
```

Key Features:
- User management
- Role-based access control
- Password management
- User preferences
- Activity logging

### 5. Authentication Service

```typescript
class AuthService {
  // Login
  async login(credentials: LoginDto): Promise<AuthResponse>
  
  // Refresh token
  async refreshToken(token: string): Promise<AuthResponse>
  
  // Logout
  async logout(token: string): Promise<void>
  
  // Verify token
  async verifyToken(token: string): Promise<TokenPayload>
  
  // Generate reset password token
  async generateResetToken(email: string): Promise<string>
}
```

Key Features:
- JWT authentication
- Token management
- Session handling
- Security features
- Password reset flow

### 6. Email Service

```typescript
class EmailService {
  // Send email
  async sendEmail(data: SendEmailDto): Promise<void>
  
  // Send password reset email
  async sendPasswordResetEmail(email: string, token: string): Promise<void>
  
  // Send welcome email
  async sendWelcomeEmail(user: User): Promise<void>
  
  // Send invoice email
  async sendInvoiceEmail(invoice: Invoice): Promise<void>
}
```

Key Features:
- Email templates
- Attachment handling
- Queue management
- Retry mechanism
- Email tracking

## Service Utilities

### 1. PDF Generator

```typescript
class PdfGenerator {
  // Generate PDF from template
  async generatePdf(template: string, data: any): Promise<Buffer>
  
  // Generate invoice PDF
  async generateInvoicePdf(invoice: Invoice): Promise<Buffer>
  
  // Generate report PDF
  async generateReportPdf(report: Report): Promise<Buffer>
}
```

### 2. File Upload Service

```typescript
class FileUploadService {
  // Upload file
  async uploadFile(file: File): Promise<string>
  
  // Delete file
  async deleteFile(fileUrl: string): Promise<void>
  
  // Get file
  async getFile(fileUrl: string): Promise<Buffer>
}
```

## Error Handling

All services implement consistent error handling:

```typescript
class ServiceError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number,
    public details?: any
  ) {
    super(message);
  }
}
```

Common error types:
- ValidationError
- NotFoundError
- AuthenticationError
- AuthorizationError
- DatabaseError

## Service Dependencies

Services may depend on other services:

```typescript
class PurchaseService {
  constructor(
    private readonly purchaseRepository: PurchaseRepository,
    private readonly inventoryService: InventoryService,
    private readonly emailService: EmailService,
    private readonly pdfGenerator: PdfGenerator
  ) {}
}
```

## Service Configuration

Services are configured via environment variables and configuration files:

```typescript
interface ServiceConfig {
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
  email: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
  upload: {
    provider: string;
    bucket: string;
    region: string;
  };
}
```

## Service Events

Services emit and listen to events:

```typescript
// Event types
enum ServiceEvent {
  PURCHASE_CREATED = 'purchase.created',
  SALE_CREATED = 'sale.created',
  STOCK_LOW = 'stock.low',
  USER_CREATED = 'user.created'
}

// Event handling
class EventHandler {
  @OnEvent(ServiceEvent.PURCHASE_CREATED)
  async handlePurchaseCreated(purchase: Purchase) {
    // Handle purchase created event
  }
}
```

## Service Logging

Services implement structured logging:

```typescript
class Logger {
  // Log levels
  debug(message: string, context?: any): void
  info(message: string, context?: any): void
  warn(message: string, context?: any): void
  error(message: string, context?: any): void
  
  // Log with correlation ID
  withCorrelationId(correlationId: string): Logger
}
```

## Service Metrics

Services expose metrics for monitoring:

```typescript
class MetricsCollector {
  // Counter metrics
  incrementCounter(name: string, labels?: Record<string, string>): void
  
  // Gauge metrics
  setGauge(name: string, value: number, labels?: Record<string, string>): void
  
  // Histogram metrics
  observeHistogram(name: string, value: number, labels?: Record<string, string>): void
}
```

## Service Testing

Services include unit and integration tests:

```typescript
describe('PurchaseService', () => {
  let service: PurchaseService;
  
  beforeEach(() => {
    // Setup service with mocked dependencies
  });
  
  it('should create purchase', async () => {
    // Test purchase creation
  });
  
  it('should handle purchase not found', async () => {
    // Test error handling
  });
});
```

## Best Practices

1. **Dependency Injection**
   - Use constructor injection
   - Avoid service locator pattern
   - Use interfaces for dependencies

2. **Error Handling**
   - Use custom error classes
   - Include error codes
   - Provide detailed error messages
   - Handle async errors properly

3. **Validation**
   - Validate input data
   - Use DTOs for data transfer
   - Implement strong typing
   - Handle edge cases

4. **Testing**
   - Write unit tests
   - Include integration tests
   - Mock external dependencies
   - Test error scenarios

5. **Documentation**
   - Document public methods
   - Include usage examples
   - Document error cases
   - Keep documentation updated

6. **Performance**
   - Implement caching
   - Use database indexes
   - Optimize queries
   - Handle concurrency

7. **Security**
   - Validate user input
   - Implement access control
   - Handle sensitive data
   - Use secure communication 