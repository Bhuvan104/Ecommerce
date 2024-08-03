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


Create expected-material-expenses :- 


get :- http://localhost:3000/expected-material-expenses/

post :- http://localhost:3000/expected-material-expenses/
   
   body:
        {
            "material_inward_id": 3,
            "material": 1,
            "qty": 150
            }

delete ;- http://localhost:3000/expected-material-expenses/1

update :- http://localhost:3000/expected-material-expenses/2
    body:-
       {
            "material_inward_id": 3,
            "material": 1,
            "qty": 150
            }



Create material-process :- 


get :- http://localhost:3000/material-process

post :- http://localhost:3000/material-process
   
   body:
        {
            "received_qty": "120",
            "assigned_type": "Type B",
            "balance_qty": "40",
            "completed_qty": "80",
            "assigned_floor": "Floor 2",
            "assigned_shift": "Shift 2",
            "manager": "Manager B",
            "material_inward_id":3
            }


delete ;- http://localhost:3000/material-process/1

update :- http://localhost:3000/material-process/1
    body:-
       {
            "received_qty": "120",
            "assigned_type": "Type B",
            "balance_qty": "40",
            "completed_qty": "80",
            "assigned_floor": "Floor 2",
            "assigned_shift": "Shift 2",
            "manager": "Manager B",
            "material_inward_id":3
            }






Create material-process :- 


get :- http://localhost:3000/material-processdetails

post :- http://localhost:3000/material-processdetails/
   
   body:
        {
            "material_process_id": 1,
            "material_id": 1,
            "used": "50 units"
            }


delete ;- http://localhost:3000/material-processdetails/1

update :- http://localhost:3000/material-processdetails/1
    body:-
       {
            "material_process_id": 1,
            "material_id": 1,
            "used": "50 units"
            }




Create inventory-details :- 


get :- http://localhost:3000/inventory-details

post :- http://localhost:3000/inventory-details/
   
   body:
        {
            "material_id": 1,
            "qty": "150",
            "used": "50"
            }


delete ;- http://localhost:3000/inventory-details/1

update :- http://localhost:3000/inventory-details/1
    body:-
       {
            "material_id": 1,
            "qty": "150",
            "used": "50"
            }



Create purchase-details :- 


get :- http://localhost:3000/purchase-details/

post :- http://localhost:3000/purchase-details/
   
   body:
        {
            "material_id": 1,
            "client_id": 3,
            "qty": "60",
            "used": "25",
            "order_date": "2024-08-01",
            "received_date": "2024-08-06"
            }



delete ;- http://localhost:3000/purchase-details/1

update :- http://localhost:3000/purchase-details/1
    body:-
       {
            "material_id": 1,
            "client_id": 3,
            "qty": "60",
            "used": "25",
            "order_date": "2024-08-01",
            "received_date": "2024-08-06"
            }



Create material-filings :- 


get :- http://localhost:3000/material-filings

post :- http://localhost:3000/material-filings/
   
   body:
        {
            "material_inward_id": 3,
            "received_qty": "100",
            "assigned_type": "Type A",
            "balance_qty": "50",
            "completed_qty": "50",
            "assigned_floor": "Floor 1",
            "assigned_shift": "Shift 1",
            "manager": "John Doe"
            }




delete ;- http://localhost:3000/material-filings/1

update :- http://localhost:3000/material-filings/1
    body:-
       {
            "material_inward_id": 3,
            "received_qty": "100",
            "assigned_type": "Type A",
            "balance_qty": "50",
            "completed_qty": "50",
            "assigned_floor": "Floor 1",
            "assigned_shift": "Shift 1",
            "manager": "John Doe"
            }



Create material-filings :- 


get :- http://localhost:3000/material-dispatches

post :- http://localhost:3000/material-dispatches/
   
   body:
        {
            "material_inward_id": 3,
            "received_qty": "100",
            "assigned_type": "Type A",
            "balance_qty": "50",
            "completed_qty": "50",
            "assigned_floor": "Floor 1",
            "assigned_shift": "Shift 1",
            "manager": "John Doe"
            }

delete ;- http://localhost:3000/material-dispatches/1

update :- http://localhost:3000/material-dispatches/1
    body:-
       {
            "material_inward_id": 3,
            "received_qty": "100",
            "assigned_type": "Type A",
            "balance_qty": "50",
            "completed_qty": "50",
            "assigned_floor": "Floor 1",
            "assigned_shift": "Shift 1",
            "manager": "John Doe"
            }


        
