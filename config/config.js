const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "God_Has_My_Back",
    mongoUri: process.env.MONGODB_URI || process.env.MONGO_HOST || 'mongodb+srv://newUser:Vantol@cluster0.sosjs.mongodb.net/god?retryWrites=true&w=majority'
}


export default config