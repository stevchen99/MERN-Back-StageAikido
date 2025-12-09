const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const setupSwagger = (app, port) => {
    
    // 1. Define the correct server URL
    // If running on Vercel, use the production URL. If local, use localhost.
    // We use a relative path "/" so it adapts to whatever domain you are on.
    const serverUrl = process.env.NODE_ENV === 'production' 
        ? 'https://mern-back-stage-aikido.vercel.app' 
        : `http://localhost:${port}`;

    const swaggerOptions = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Stage Manager API',
                version: '1.0.0',
                description: 'API to manage stages',
            },
            servers: [
                { url: serverUrl } // ✅ Dynamic URL
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
        // ⚠️ NOTE: On Vercel, reading './routes/*.js' can sometimes fail 
        // because the file structure changes. If your docs are empty, 
        // this is the next thing to fix.
        apis: ['./routes/*.js'], 
    };

    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    
    // 2. CSS & JS CDN Fix for Vercel
    const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

    app.use(
        '/api-docs', 
        swaggerUi.serve, 
        swaggerUi.setup(swaggerDocs, {
            customCssUrl: CSS_URL,
            customSiteTitle: "Stage Manager API Docs",
            customJs: [
                "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui-bundle.js",
                "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui-standalone-preset.js",
            ]
        })
    );
    
    console.log(`📄 Swagger configured for ${serverUrl}`);
};

module.exports = setupSwagger;
