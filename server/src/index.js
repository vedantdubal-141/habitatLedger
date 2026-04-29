import 'dotenv/config'
import app from './app.js'
import connectDB from './config/db.js'

const PORT = process.env.PORT || 5000

const start = async () => {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`🚀 RentTrack API running → http://localhost:${PORT}`)
    console.log(`   Health: http://localhost:${PORT}/api/health`)
    console.log(`   Issues: http://localhost:${PORT}/api/issues`)
  })
}

start()
