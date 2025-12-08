const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Function to setup Swagger
const setupSwagger = (app, port) => {
    
    // Swagger Configuration
    const swaggerOptions = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Stage Manager API',
                version: '1.0.0',
                description: 'API to manage stages (Date, Place, Name, Cost, Dept)',
            },
            servers: [
                {
                    url: `http://localhost:${port}`,
                },
            ],
            // Schema Definition (kept here to avoid resolver errors)
            components: {
                schemas: {
                    StageEntry: {
                        type: 'object',
                        required: ['place', 'stageName', 'cost', 'dept'],
                        properties: {
                            id: { type: 'string', description: 'Auto-generated ID' },
                            date: { type: 'string', format: 'date-time', description: 'Date of stage' },
                            place: { type: 'string', maxLength: 50, description: 'Location' },
                            stageName: { type: 'string', maxLength: 50, description: 'Name of stage' },
                            cost: { type: 'number', description: 'Cost in Euro' },
                            dept: { type: 'string', minLength: 2, maxLength: 2, description: 'Dept Code' }
                        },
                        example: {
                            date: "2023-10-27T10:00:00.000Z",
                            place: "Paris Center",
                            stageName: "Node JS Training",
                            cost: 150.50,
                            dept: "75"
                        }
                    }
                }
            }
        },
        // Location of files containing endpoints
        apis: ['./routes/*.js'], 
    };

    // Initialize Swagger
    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    
    // Create the route
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    
    console.log(`📄 Swagger UI available at http://localhost:${port}/api-docs`);
};

module.exports = setupSwagger;