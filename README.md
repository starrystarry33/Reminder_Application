# Reminder_Application

- NAME: Xinyue Zhang
- EMAIL:zhang.xinyue12@Northeastern.edu


## JS Reminder app

- Create a simple Reminders application using JavaScript,NodeJS,Express,MongoDB and REST API

## User Requirements

As a developer, I should be able to fetch all existing reminders using Reminder Resource.
As a developer, I should be able to add a Reminder using Reminder Resource.
As a developer, I should be able to update a Reminder using Reminder Resource.
As a developer, I should be able to delete a Reminder using Reminder Resource.

## Technical Requirement
The goal of this assignment is to learn about Nodejs and REST API.
Use the express framework for developing the endpoints.
Use MongoDB for the persistence layer.
A todo object has id, title, description, createdDate, & lastModifiedDate properties.

## Enviroment Setting and run

1. Set up MongoDB Database

Using Compass as MongoDB Management Tool:

* In localhost:27017
* Create Database:reminders_db
* Create Collection:reminders

2. Move to project root folder and excute

```
npm init -v

npm install express mongoose body-parser dotenv cors

node app.js
```

3. Open browser
Got to the local server address: http://localhost:3000/

4. Use Postman to test REST API Request
Set up a new request
* Get Request:
Here is an example:
```

[
    {
        "_id": "64247b83ad0f1a8b649650a8",
        "title": "Shopping",
        "description": "Buy some essential oil in Whole Food",
        "createdDate": "2023-02-21T05:00:00.000Z",
        "dueDate": "2023-03-20T04:00:00.000Z",
        "lastModifiedDate": "2023-03-29T17:55:32.440Z"
    },
    {
        "_id": "64247b83ad0f1a8b649650a9",
        "title": "Calling",
        "description": "Chatting with my friend Charlie",
        "createdDate": "2023-02-22T05:00:00.000Z",
        "dueDate": "2023-03-21T04:00:00.000Z",
        "lastModifiedDate": "2023-03-29T17:55:32.440Z"
    },
    {
        "_id": "64247b83ad0f1a8b649650aa",
        "title": "Laundry",
        "description": "Do the laundry",
        "createdDate": "2023-02-24T05:00:00.000Z",
        "dueDate": "2023-03-23T04:00:00.000Z",
        "lastModifiedDate": "2023-03-29T17:55:32.441Z"
    },
    {
        "_id": "64247b83ad0f1a8b649650ab",
        "title": "Buy some cakes",
        "description": "Buy some cakes in LadyM",
        "createdDate": "2023-02-25T05:00:00.000Z",
        "dueDate": "2023-03-24T04:00:00.000Z",
        "lastModifiedDate": "2023-03-29T17:55:32.441Z"
    },
    {
        "_id": "64247b83ad0f1a8b649650ac",
        "title": "Return the Ipad",
        "description": "Return the ipad in Apple Boylston St",
        "createdDate": "2023-02-26T05:00:00.000Z",
        "dueDate": "2023-03-25T04:00:00.000Z",
        "lastModifiedDate": "2023-03-29T17:55:32.441Z"
    },
    {
        "_id": "64247b83ad0f1a8b649650ad",
        "title": "Painting",
        "description": "Do some painting with Oil canvas",
        "createdDate": "2023-02-27T05:00:00.000Z",
        "dueDate": "2023-03-26T04:00:00.000Z",
        "lastModifiedDate": "2023-03-29T17:55:32.442Z"
    }
]

```
2.Post Request:

* Enter URL in the text field:http://localhost:3000/reminders

* Enter the following JSON raw Text in the Body:
```

{
  "title": "Buy groceries",
  "description": "Purchase groceries for the week",
  "dueDate": "2023-04-10T00:00:00.000Z"
}

```

3.PUT request:
* URL: http://localhost:3000/reminders/64247bcde089a4563104892e

Then do the moficaiton in the Raw JSON Text Field:
```
{
  "title": "Buy groceries",
  "description": "Purchase groceries for next week",
  "dueDate": "2023-04-17T00:00:00.000Z"
}
```

4. Delete request:
* URL: http://localhost:3000/reminders/64247bcde089a4563104892e
