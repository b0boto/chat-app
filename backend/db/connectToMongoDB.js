import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log('Подключение к БД Успешно!')
    } catch (error) {
        console.log('Ошибка подключения к базе данных')
    }
}

export default  connectToMongoDB;