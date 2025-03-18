# Database Schema Documentation

## Overview

The system uses MySQL as the primary database with TypeORM as the ORM layer. The schema is designed to support inventory management, sales, and purchase operations.

## Core Entities

### 1. Purchase Headers
```typescript
{
  id: number (PK)
  code: string (unique)
  txnDate: Date
  subTotal: number
  totalTax: number
  totalDiscount: number
  grandTotal: number
  supplierId: number (FK)
  companyId: number (FK)
  isInactive: boolean
  createdDate: Date
  modifiedDate: Date
}
```

### 2. Purchase Lines
```typescript
{
  id: number (PK)
  txnHeaderId: number (FK)
  serviceId: number (FK)
  quantity: number
  unitPrice: number
  taxId: number (FK)
  amount: number
  isInactive: boolean
  createdDate: Date
  modifiedDate: Date
}
```

### 3. Sale Headers
```typescript
{
  id: number (PK)
  code: string (unique)
  txnDate: Date
  subTotal: number
  totalTax: number
  totalDiscount: number
  grandTotal: number
  customerId: number (FK)
  companyId: number (FK)
  isInactive: boolean
  createdDate: Date
  modifiedDate: Date
}
```

### 4. Sale Lines
```typescript
{
  id: number (PK)
  txnHeaderId: number (FK)
  serviceId: number (FK)
  quantity: number
  rate: number
  taxId: number (FK)
  amount: number
  isInactive: boolean
  createdDate: Date
  modifiedDate: Date
}
```

### 5. Inventory Lines
```typescript
{
  id: number (PK)
  serviceId: number (FK)
  quantity: number
  stockId: number (FK)
  purchaseId: number (FK)
  saleId: number (FK)
  isInactive: boolean
  createdDate: Date
  modifiedDate: Date
}
```

### 6. Item Stocks
```typescript
{
  id: number (PK)
  serviceId: number (FK)
  quantity: number
  isInactive: boolean
  createdDate: Date
  modifiedDate: Date
}
```

### 7. Items Stock Track
```typescript
{
  id: number (PK)
  serviceId: number (FK)
  quantityAdded: number
  quantityUvailable: number
  unitPrice: number
  stockNumber: string
  txnHeaderId: number (FK)
  companyId: number (FK)
  isInactive: boolean
  createdDate: Date
  modifiedDate: Date
}
```

## Relationships

### Purchase Flow
```
PurchaseHeaders (1) --- (*) PurchaseLines
PurchaseHeaders (1) --- (*) InventoryLines
PurchaseHeaders (1) --- (1) Supplier
PurchaseLines (1) --- (1) Service
PurchaseLines (1) --- (1) Tax
```

### Sales Flow
```
SaleHeaders (1) --- (*) SaleLines
SaleHeaders (1) --- (*) InventoryLines
SaleHeaders (1) --- (1) Customer
SaleLines (1) --- (1) Service
SaleLines (1) --- (1) Tax
```

### Inventory Flow
```
InventoryLines (*) --- (1) ItemsStockTrack
InventoryLines (*) --- (1) Service
ItemsStockTrack (*) --- (1) Service
```

## Indexes

### Primary Indexes
- All `id` fields are primary keys with auto-increment

### Foreign Key Indexes
- All foreign key fields (`*Id`)
- Composite indexes on frequently joined fields

### Performance Indexes
- `code` fields for quick lookup
- `txnDate` for date-based queries
- `isInactive` for active record filtering

## Soft Delete

All entities implement soft delete using the `isInactive` flag:
- 0 = Active record
- 1 = Inactive/deleted record

## Audit Fields

All entities include:
- `createdDate`: Timestamp of record creation
- `modifiedDate`: Timestamp of last modification
- `companyId`: Multi-tenant support

## Data Types

- Monetary values: `decimal(10,2)`
- Quantities: `decimal(10,2)`
- Dates: `datetime`
- Text: `varchar(255)` or `text`
- Boolean: `tinyint(1)`

## Constraints

- Foreign key constraints with CASCADE on update
- Unique constraints on business keys
- NOT NULL constraints on required fields
- CHECK constraints on numerical fields (>= 0)

## Migration Strategy

- Migrations are version controlled
- Forward-only migrations
- Rollback scripts for each migration
- Data preservation during schema changes 