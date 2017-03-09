## Rotes Description

### api/users 
> Use "x-www-form-urlencoded" or add "content-type": "application-json" header if you are using the request body

GET `returns all registered users`

POST `creates a new user`
```javascript
{
    "username": "lowercase min: 3, max: 24", 
    "password": "anything but whtespace min: 4 max: 24" 
    "firstname": "optional, must start with capital letter, min: 2, max: 20",
    "lastname": "optional, must start with capital letter, min: 2, max: 20"
}
```

### api/authenticate 
POST `reurns an authentication token`
 * request
 * ```javascript
    {
        "username": "lowercase min: 3, max: 24", 
        "password": "anything but whtespace min: 4 max: 24" 
    }
    ```
 * response
 * ```javascript
    {
      "success": true,
      "message": "Here is your token my sir",
      "token": "..."
    }
    ```
### api/messages 
**Requires authentication**: 
> Include "x-access-token" with 'token' contents or add query parameter 'token' with value the 'token' contents or include the token in the body of the request.

> Use "x-www-form-urlencoded" or add "content-type": "application-json" header if you are using the request body

POST `creates a new message from the current user`

 ```javascript
{
  "to": "username",
  "text": "message text"
}
```
GET *api/messages?with=USERNAME&limit=NUMBER* `gets messages between the current user and a given user (sorted by date descending)`

* **with**: required query parameter
* **limit**: optional parameter to get the most recent number of message
    