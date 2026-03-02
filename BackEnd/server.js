require('dotenv').config();

const app = require('./src/app');

const port = 3000;  

console.log("KEY:", process.env.OPENROUTER_API_KEY);


app.listen(port, () => { 
    console.log(`Server is running on http://localhost:${port}`);   
});