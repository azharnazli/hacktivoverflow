## Usage
```javascript
$ npm install
$ node app.js
```
Access server via `http://localhost:3000`<br>
Access client via `http://localhost:8080`
##  User Routes
|Routes|HTTP|Header(s)|Body|Response|Description|
|:--:|:--:|:--:|:--:|:--:|:--:|
|/users/  |POST  |none|username: String (**required**),email: String (**required**),  password: String (**required**)|**Success**: Register a user, **Error**: Internal server error (Validation)|Register a user|
|/users/login  |POST  |none|email: String (**required**), password: String (**required**) |**Success**: Login as a user, **Error**: Internal server error (Validation)|Login as a user|
|/verify  |POST  | none | token: String (**required**) |**Success**: Verified User, **Error**: Internal server error (Validation)|Verified User|
## Question Routes

|Routes|HTTP|Header(s)|Body|Response|Description|
|:--:|:--:|:--:|:--:|:--:|:--:|
|/questions  |GET  |token|none|**Success**: Get all questions, **Error**: Internal server error (Validation)|Get all questions|
|/question  | POST | token | title : String(**required**), question : String(**required**) | Success: Create New question, Error: Internal server error (Validation) | Create new logged user question |
|/questions/:id  |GET  |token|none|**Success**: Get a logged in user's question, **Error**: Internal server error (Validation)|  Get logged in user's question 
|/questions/up/:id  |PATCH  |token|none|**Success**: Upvote a question, **Error**: Internal server error (Validation)|Upvote a question|
|/questions/down/:id  |PATCH  |token|none|**Success**: Downvote a question, **Error**: Internal server error (Validation)|Downvote a question|
|/questions/:id  |PUT  |token|none|**Success**: Update logged in user's question, **Error**: Internal server error (Validation)|Update logged in user's question|
## Answer Routes
|Routes|HTTP|Header(s)|Body|Response|Description|
|:--:|:--:|:--:|:--:|:--:|:--:|
|/answers/:answerId  |GET  |token|none|**Success**: Get logged in user's questions, **Error**: Internal server error (Validation)|Get logged in user's questions|
|/answers:id  |POST  |token|answer: String (**required**), QuestionId: String (**required**)|**Success**: Create an answer to a question, **Error**: Internal server error (Validation)|Create an answer to a question|
|/answers/up/:answerId  |PATCH  |token|none|**Success**: Upvote an answer, **Error**: Internal server error (Validation)|Upvote an answer|
|/answers/down/:answerId  |PATCH  |token|none|**Success**: Downvote an answer, **Error**: Internal server error (Validation)|Downvote an answer|
|/answers/:AnswerId  | PUT  |token|none|**Success**: Update logged in user's answer, **Error**: Internal server error (Validation)|Update logged in user's answer|
