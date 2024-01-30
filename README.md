# CRUD Customer App

## Backend 

### Menjalan Local Server
Cara menjalankan server local di backend
1. Masuk ke folder `/backend`, 
2. Lalu ketikan perintah `python app.py` atau jika menggunakan python versi 3 maka ketikan `python3 app.py`.

### Endpoint API

List endpoint API Customer 

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `/api/customers`                         | Get all data customers posts.            |
| `GET`    | `/api/customer/{id}`                     | Get customer by id                       |
| `POST`   | `/api/customer/create`                   | Create new customer                      |
| `PUT`    | `/api/customer/update/{id}`              | Update data customer by id.              |
| `DELETE` | `/api/customer/delete/{id}`              | Delete data customer by id               |

### Response Json

**Response get all customer**
```json
{
   "status": 200,
   "message": "Success",
   "data": [
      {
         "id": 1,
         "name": "Muhammad Yusof",
         "instagram": "@mhdusop",
         "fav_color": "Green",
      },
      {
         "id": 2,
         "name": "John Doe",
         "instagram": "@Johndoe",
         "fav_color": "Red",
      },
   ],
}
```

**Response get customer by id**
```json
{
   "status": 200,
   "message": "Success",
   "data": [
      {
         "id": 1,
         "name": "Muhammad Yusof",
         "instagram": "@mhdusop",
         "fav_color": "Green",
      },
   ],
}
```

**Response create customer**
```json
{
   "status": 201,
   "message": "Success",
   "data": [
      {
         "id": 1,
         "name": "Muhammad Yusof",
         "instagram": "@mhdusop",
         "fav_color": "Green",
      },
   ],
}
```

**Response update customer**
```json
{
   "status": 200,
   "message": "Success",
   "data": [
      {
         "id": 1,
         "name": "Muhammad Yusof Gtg",
         "instagram": "@mhdusopgtg",
         "fav_color": "Blue",
      },
   ],
}
```

**Response delete customer**
```json
{
   "status": 200,
   "message": "Success",
   "data": "Customer with ID 1 deleted successfully"
}
```

## Frontend

### Menjalan Local Server
Cara menjalankan server local di frontend
1. Masuk ke folder `/frontend`, 
2. Lalu ketikan perintah `npm install` atau jika menggunakan yarn maka ketikan perintah`yarn install`. 
3. Setelah itu jalan kan server dengan mengetikan `npm run dev`



