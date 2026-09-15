const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const setupSwagger = (app, port) => {

    // 1. Determine URL based on environment
    const serverUrl = process.env.NODE_ENV === 'production' 
        ? 'https://mern-back-stage-aikido.vercel.app'  // Your Vercel URL
        : `http://localhost:${port}`; // Localhost

    const swaggerOptions = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Stage Manager API',
                version: '1.0.0',
                description: 'API to manage stages',
            },
            servers: [
                { url: serverUrl }
            ],
            components: {
                schemas: {
                    StageEntry: {
                        type: 'object',
                        required: ['address', 'stageName', 'cost', 'dept'],
                        properties: {
                            _id: { 
                                type: 'string', 
                                description: 'Auto-generated MongoDB ID' 
                            },
                            date: { 
                                type: 'string', 
                                format: 'date-time',
                                example: '2026-09-15T14:30:00.000Z'
                            },
                            address: { 
                                type: 'string', 
                                maxLength: 150, 
                                description: 'Full French address (street, postal code, city)',
                                example: '10 Rue de la Paix, 75002 Paris' 
                            },
                            link: { 
                                type: 'string', 
                                description: 'URL link to external stage information',
                                example: 'https://example.com/stage-info' 
                            },
                            stageName: { 
                                type: 'string', 
                                maxLength: 50,
                                example: 'Stage Aikido National' 
                            },
                            cost: { 
                                type: 'number', 
                                minimum: 0,
                                example: 45.50 
                            },
                            dept: { 
                                type: 'string', 
                                minLength: 2, 
                                maxLength: 2, 
                                description: 'Two-character department code',
                                example: '75' 
                            }
                        }
                    }
                }
            }
        },
        apis: ['./routes/*.js'], 
    };

    const swaggerDocs = swaggerJsDoc(swaggerOptions);

    // 2. USE CDNs TO FIX THE "Unexpected token <" ERROR
    const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

    app.use(
        '/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocs, {
            customCssUrl: CSS_URL,
            customJs: [
                "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui-bundle.js",
                "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui-standalone-preset.js",
            ]
        })
    );

    console.log(`📄 Swagger configured for ${serverUrl}`);
};

module.exports = setupSwagger;