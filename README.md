<h1>Fun Facts Math API Documentation</h1>
### Introduction
The Fun Facts Math API is a RESTful service that takes an integer as input and returns interesting mathematical properties about it, along with a fun fact.

Endpoint
1. Get Mathematical Properties
- URL: /api/classify-number
- Method: GET
- Query Parameters:
    - number: the input number (integer)
- Response:
    - 200 OK: mathematical properties and fun fact
    - 400 Bad Request: invalid request

Making the Query
To make a query, simply append the num parameter to the URL. For example:

- To get the mathematical properties of the number 371, make a GET request to: https://hngstage1fun-fact-api.vercel.app/api/classify-number?number=371

Response Object
The API returns a JSON object with the following properties:

1. number
- Type: integer
- Description: The input number.

2. is_prime
- Type: boolean
- Description: Whether the number is prime.

3. is_perfect
- Type: boolean
- Description: Whether the number is perfect.

4. properties
- Type: array<string>
- Description: An array of properties that the number possesses, such as "armstrong", "odd", etc.

5. digit_sum
- Type: integer
- Description: The sum of the digits of the number.

6. fun_fact
- Type: string
- Description: A fun fact about the number.

Example Response

{
  "number": 371,
  "is_prime": false,
  "is_perfect": false,
  "properties": ["armstrong", "odd"],
  "digit_sum": 11,
  "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}


Error Handling
- All error responses will have a JSON body with the following structure:

{
  "error": true,
  "message": "Error message"
}
