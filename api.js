const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const app = express()

// Подключение к базе данных MongoDB
async function main() {
  await mongoose
    .connect("mongodb://192.168.31.129:27017/beauty-salon")
    .then(() => {
      console.log("Connected to MongoDB")
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB", error)
    })
}

main()

const priceListSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
})
const PriceList = mongoose.model("PriceList", priceListSchema, "priceList")

// Использование пакета cors для разрешения запросов с других доменов
app.use(cors())

// Определение маршрутов для вашего API
// Например:
app.get("/api/data", async (req, res) => {
  // Здесь можно получить данные из базы данных и отправить их клиенту
  try {
    const prices = await PriceList.find()
    res.json(prices)
  } catch (error) {
    console.error("error fetching data from mongodb", error)
  }
})

app.listen(5000, () => {
  console.log("Server is running on port 5000")
})
