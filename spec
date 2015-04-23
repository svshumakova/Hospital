swagger: '2.0'
info:
  version: "0.0.1"
  title: Hospital
host: localhost:8080
basePath: /index.html#/employees
schemes:
- http
consumes:
  - application/json
produces:
  - application/json
paths:
  /:
    get:
      description: |
        Gets `Employees` objects which contains the id, first name, last name and
        position of each employee.
      # Expected responses for this operation:
      responses:
        # Response code
        200:
          description: Successful response
          # A schema describing your response object.
          # Use JSON Schema format
          schema:
            title: ArrayOfEmployees
            type: array
            items:
              title: Employee
              type: object
              properties:
                id:
                  type: string
                firstName:
                  type: string
                lastName:
                  type:string
                position:
                  type:string