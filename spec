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
  /get:
    get:
      description: Gets the list of employees.
      operationId: getEmployees
      produces:
        - application/json
      responses:
        200:
          description: An array of employees
          schema:
            type: array
            items:
              $ref: '#/definitions/Employee'
        default:
          description: Unexpected error
          schema:
            $ref: '#/definitions/ErrorModel'
  /create:
    post:
      description: Creates a new emploeey in the hospital.
      operationId: createEmployee
      produces:
        - application/json
      parameters:
        - name: employee
          in: body
          required: true
          description: Employee to add to the stuff
          schema:
            $ref: '#/definitions/Employee'
      responses:
        '200':
          description: employee has been created
        default:
          description: unexpected error
          schema:
            $ref: '#/definitions/ErrorModel'
  /update/{id}:
    put:
      description: Update an existing employee
      operationId: updateEmployee
      produces:
        - application/json
      parameters:
        - name: id
          in: path
          description: Emploee object that needs to be updated
          required: true
          type: string
      responses:
        '200':
          description: employee has been updated
        default:
          description: unexpected error
          schema:
            $ref: '#/definitions/ErrorModel'
  /delete/{id}:
    delete:
      description: Delete an existing employee
      operationId: deleteEmployee
      produces:
        - application/json
      parameters:
        - name: id
          in: path
          description: ID of the employee to delete
          required: true
          type: string
      responses:
        '200':
          description: employee has been deleted
        default:
          description: unexpected error
          schema:
            $ref: '#/definitions/ErrorModel'
definitions:
  Employee:
    properties:
      id:
        type: string
        description: employee's unique id.
      firstName:
        type: string
        description: employee's first name.
      lastName:
        type: string
        description: employee's last name.
      position:
        type: string
        description: employee's position.
  ErrorModel:
    required:
      - code
      - message
    properties:
      code:
        type: integer
        format: int32
      message:
        type: string
