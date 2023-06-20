const corsOptions = {
    credentials: true,
    origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:5173',
        'https://everymanjacked.com',
        'https://www.everymanjacked.com',
        'https://admin.everymanjacked.com',
    ],
};

export default corsOptions;
