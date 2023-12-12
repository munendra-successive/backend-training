<h3>1. What is Middleware**</h3>

Middleware functions in Express.js are functions that have access to the request object (req), the response object (res), and the next function in the application's request-response cycle. These functions can execute code, modify request and response objects, end the request-response cycle, or call the next middleware in the stack.

<h3>2. Usage:</h3>

**a. Basic Middleware:**

const simpleLogger = (req, res, next) => {<br>
console.log(`Request URL: ${req.originalUrl}`);
<br>
next();<br>
};<br>
app.use(simpleLogger);

- The simpleLogger middleware logs the incoming request URL to the console and then calls next() to proceed to the next middleware in the stack.
- app.use(simpleLogger) registers simpleLogger as global middleware, meaning it will be executed for every incoming request.


**b. Route-Specific Middleware:**

const authenticate = (req, res, next) => {<br>
    if (condition) {<br>
        next();<br>
    } else {<br>
        res.status(401).send('Unauthorized');<br>
    }<br>
};

app.get('/secured', authenticate, (req, res) => {<br>
    res.send('You are authenticated');<br>
}<br>);


- The authenticate middleware checks for some authentication condition. If the condition is met, it calls next() to proceed; otherwise, it sends a 401 (Unauthorized) response.

- app.get('/secured', authenticate, ...) registers authenticate as middleware specific to the /secured route. It will be executed only for requests to this route.

**c. Error Handling Middleware:**

const errorHandler = (err, req, res, next) => {<br>
    console.error(err.stack);<br>
    res.status(500).send('Something broke!');<br>
};<br>
app.use(errorHandler);

- The errorHandler middleware catches errors thrown by previous middleware or route handlers.
- When any middleware or route handler calls next(err), Express jumps to the error handling middleware, passing the error to it.
- app.use(errorHandler) registers errorHandler as error handling middleware globally, handling any uncaught errors and sending a 500 (Internal Server Error) response with a custom message.

**Scope of Middleware:** Middleware can be applied globally using app.use() to run on every request, or it can be specified for particular routes or groups of routes.

**Functionality:** Middleware can perform various tasks like logging, authentication, data parsing, error handling, modifying request/response objects, etc.

**next() Function:** It's crucial in middleware; calling next() passes control to the next middleware or route handler. Omitting it might halt the request-response cycle.