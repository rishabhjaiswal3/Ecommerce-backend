const { connectDb } = require('./config/db');
const app = require('./index')

const PORT = 5454;

app.listen(PORT, async ()=>{
    await connectDb();
    console.log(`Server is running on port ${PORT}`)
})