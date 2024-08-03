# Ecommerce


User Related API :-

Create user :-

get :- http://localhost:3000/usersRegister

post :- http://localhost:3000/usersRegister
   
   body:
        {
        "firstName": "John",
        "lastName": "Do",
        "email": "sathyacret@example.com",
        "password": "yourpassword123",
        "status": true,
        "createdAt": "2024-08-02T00:00:00Z"
        }
delete ;- http://localhost:3000/usersRegister/1

update :- http://localhost:3000/usersRegister/1
    body:-
       {
        "firstName": "John",
        "lastName": "Do",
        "email": "sathyacret@example.com",
        "password": "yourpassword123",
        "status": true,
        "createdAt": "2024-08-02T00:00:00Z"
        }



Create Client :-

get :- http://localhost:3000/clients

post :- http://localhost:3000/clients
   
   body:
        {
            "client_code": "C123",
            "client_name": "Client Name",
            "status": true,
            "createdAt": "2024-08-02T12:00:00Z", // ISO 8601 date format
            "updatedAt": "2024-08-02T12:00:00Z"  // ISO 8601 date format
        }

delete ;- http://localhost:3000/clients/1

update :- http://localhost:3000/clients/2
    body:-
       {
            "client_code": "C123",
            "client_name": "Client Name",
            "status": true,
            "createdAt": "2024-08-02T12:00:00Z", // ISO 8601 date format
            "updatedAt": "2024-08-02T12:00:00Z"  // ISO 8601 date format
        }



Create clientaddress :-

get :- http://localhost:3000/clientaddress

post :- http://localhost:3000/clientaddress
   
   body:
        {
            "client_id": 3,
            "email": "example@example.com",
            "contact": "1234567890",
            "address": "123 Example St",
            "area": "Downtown",
            "city": "Metropolis",
            "pincode": "123456",
            "contact_person_name": "John Doe",
            "contact_person_mobile": "0987654321",
            "contact_person_email": "contact@example.com",
            "description": "Primary address for billing",
            "status": true
            }

delete ;- http://localhost:3000/clientaddress/1

update :- http://localhost:3000/clientaddress/2
    body:-
       {
            "client_id": 3,
            "email": "example@example.com",
            "contact": "1234567890",
            "address": "123 Example St",
            "area": "Downtown",
            "city": "Metropolis",
            "pincode": "123456",
            "contact_person_name": "John Doe",
            "contact_person_mobile": "0987654321",
            "contact_person_email": "contact@example.com",
            "description": "Primary address for billing",
            "status": true
            }



Create materialunit :-

get :- http://localhost:3000/material-units

post :- http://localhost:3000/material-units
   
   body:
        {
        "unit": "Kilogram",
        "status": true
        }

delete ;- http://localhost:3000/material-units/1

update :- http://localhost:3000/material-units/1
    body:-
       {
        "unit": "Kilogram",
        "status": true
        }






Create materialinward :-

get :- http://localhost:3000/materialinward

post :- http://localhost:3000/materialinward
   
   body:
        {
            "client_id": 3,
            "quantity": 100,
            "dc_image": "https://example.com/image.jpg",
            "received_date": "2024-08-02",
            "estimated_dispatch_date": "2024-08-10",
            "material_numbers": 12345,
            "is_quantity_approved": true,
            "rejection_reason": "N/A",
            "job_id": "JOB123",
            "job_type": "TypeA",
            "material_status": 1,
            "status": true
            }

delete ;- http://localhost:3000/materialinward/1

update :- http://localhost:3000/materialinward/2
    body:-
       {
            "client_id": 3,
            "quantity": 100,
            "dc_image": "https://example.com/image.jpg",
            "received_date": "2024-08-02",
            "estimated_dispatch_date": "2024-08-10",
            "material_numbers": 12345,
            "is_quantity_approved": true,
            "rejection_reason": "N/A",
            "job_id": "JOB123",
            "job_type": "TypeA",
            "material_status": 1,
            "status": true
            }
