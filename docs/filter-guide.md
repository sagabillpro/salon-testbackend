# Filter Query Parameters Guide

## Overview

This guide explains how to use filter query parameters in GET API endpoints. The filtering system allows you to narrow down results based on specific criteria.

## Basic Usage

### Simple Filters

```http
GET /api/v1/purchases?filter[status]=pending
GET /api/v1/sales?filter[date]=2024-03-20
GET /api/v1/inventory?filter[quantity_lt]=100
```

### Multiple Filters

```http
GET /api/v1/purchases?filter[status]=pending&filter[supplierId]=123
GET /api/v1/sales?filter[date]=2024-03-20&filter[customerId]=456
```

## Operators

The following operators are supported in filter queries:

| Operator | Description | Example |
|----------|-------------|---------|
| eq | Equals | `filter[status_eq]=pending` |
| ne | Not equals | `filter[status_ne]=completed` |
| gt | Greater than | `filter[amount_gt]=1000` |
| gte | Greater than or equal | `filter[quantity_gte]=50` |
| lt | Less than | `filter[stock_lt]=20` |
| lte | Less than or equal | `filter[price_lte]=100` |
| like | Contains | `filter[code_like]=INV` |
| in | In array | `filter[status_in]=pending,processing` |
| between | Between range | `filter[date_between]=2024-01-01,2024-12-31` |

## Examples

### 1. Purchase Filters

```http
# Filter by status
GET /api/v1/purchases?filter[status]=pending

# Filter by date range
GET /api/v1/purchases?filter[txnDate_between]=2024-01-01,2024-01-31

# Filter by amount
GET /api/v1/purchases?filter[grandTotal_gt]=1000

# Filter by supplier
GET /api/v1/purchases?filter[supplierId]=123

# Multiple filters
GET /api/v1/purchases?filter[status]=pending&filter[grandTotal_gt]=1000
```

### 2. Sales Filters

```http
# Filter by customer
GET /api/v1/sales?filter[customerId]=456

# Filter by amount range
GET /api/v1/sales?filter[grandTotal_between]=1000,5000

# Filter by date
GET /api/v1/sales?filter[txnDate]=2024-03-20

# Filter by status and amount
GET /api/v1/sales?filter[status]=completed&filter[grandTotal_gt]=1000
```

### 3. Inventory Filters

```http
# Filter by low stock
GET /api/v1/inventory?filter[quantity_lt]=20

# Filter by service
GET /api/v1/inventory?filter[serviceId]=789

# Filter by stock status
GET /api/v1/inventory?filter[status]=available
```

## Date Formats

When filtering by dates, use the following formats:

```http
# Full date
filter[date]=2024-03-20

# Date range
filter[date_between]=2024-01-01,2024-12-31

# Relative dates
filter[date]=today
filter[date]=yesterday
filter[date]=last7days
filter[date]=thisMonth
filter[date]=lastMonth
```

## Combining with Other Query Parameters

Filters can be combined with other query parameters:

```http
# Filtering with pagination
GET /api/v1/purchases?filter[status]=pending&page=1&limit=10

# Filtering with sorting
GET /api/v1/sales?filter[customerId]=456&sort=txnDate:desc

# Filtering with search
GET /api/v1/inventory?filter[status]=available&search=product123
```

## Response Format

When using filters, the response will include the applied filters in the metadata:

```json
{
  "data": [...],
  "metadata": {
    "filters": {
      "status": "pending",
      "grandTotal_gt": 1000
    },
    "total": 50,
    "page": 1,
    "limit": 10
  }
}
```

## Error Handling

Common filter-related errors:

```json
// Invalid operator
{
  "statusCode": 400,
  "message": "Invalid filter operator 'invalid_op' for field 'status'"
}

// Invalid field
{
  "statusCode": 400,
  "message": "Unknown filter field 'unknown_field'"
}

// Invalid value type
{
  "statusCode": 400,
  "message": "Invalid value type for filter 'quantity_gt'. Expected number"
}
```

## Best Practices

1. Always validate filter values on the client side before sending requests
2. Use appropriate operators for different data types
3. Combine filters with pagination for large datasets
4. Consider performance impact when using multiple filters
5. Use specific fields instead of wildcard searches when possible 