# API Documentation

## Authentication

All API endpoints require authentication unless specified otherwise. Use the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Error Handling

All endpoints follow a standard error response format:

```json
{
  "statusCode": 400,
  "message": "Error description"
}
```

## Endpoints

### Purchase Module

#### 1. Get All Purchases
```
GET /purchase-headers
```
Query Parameters:
- `page`: number (optional)
- `limit`: number (optional)
- `sort`: string (optional)
- `filter`: object (optional)

Response:
```json
{
  "data": [
    {
      "id": number,
      "code": string,
      "txnDate": string,
      "subTotal": number,
      "totalTax": number,
      "totalDiscount": number,
      "grandTotal": number,
      "supplier": object,
      "purchaseLines": array
    }
  ],
  "total": number,
  "page": number,
  "limit": number
}
```

#### 2. Create Purchase
```
POST /purchase-headers/bulk
```
Request Body:
```json
{
  "txnDate": string,
  "supplierId": number,
  "subTotal": number,
  "totalTax": number,
  "totalDiscount": number,
  "grandTotal": number,
  "purchaseLines": [
    {
      "serviceId": number,
      "quantity": number,
      "unitPrice": number,
      "taxId": number,
      "amount": number
    }
  ]
}
```

#### 3. Get Purchase Invoice
```
GET /purchase-headers/:id/invoice
```
Response: HTML document

### Sales Module

#### 1. Get All Sales
```
GET /sale-headers
```
Query Parameters: (same as purchase)

#### 2. Create Sale
```
POST /sale-headers/bulk
```
Request Body: (similar to purchase with customer instead of supplier)

#### 3. Get Sale Invoice
```
GET /sale-headers/:id/invoice
```
Response: HTML document

### Inventory Management

#### 1. Get Stock Status
```
GET /item-stocks
```

#### 2. Adjust Stock
```
POST /stock-adjustment
```

### User Management

#### 1. Login
```
POST /auth/login
```
Request Body:
```json
{
  "email": string,
  "password": string
}
```
Response:
```json
{
  "token": string,
  "user": object
}
```

#### 2. Get User Profile
```
GET /users/profile
```

## Rate Limiting

API requests are limited to:
- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated endpoints

## Pagination

All list endpoints support pagination with the following parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)

## Filtering

Use the `filter` parameter to filter results:
```
GET /purchase-headers?filter[status]=pending
```

## Sorting

Use the `sort` parameter to sort results:
```
GET /purchase-headers?sort=txnDate:desc
```

## Response Codes

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 422: Validation Error
- 500: Server Error 