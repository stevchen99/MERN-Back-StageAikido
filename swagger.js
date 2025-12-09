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
                        required: ['place', 'stageName', 'cost', 'dept'],
                        properties: {
                            id: { type: 'string' },
                            date: { type: 'string', format: 'date-time' },
                            place: { type: 'string' },
                            stageName: { type: 'string' },
                            cost: { type: 'number' },
                            dept: { type: 'string' }
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
