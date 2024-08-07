const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://famida_12ac:heather12ac@cluster0.xgkqmzu.mongodb.net/Elearnlab?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
console.log('DB is connected')
}).catch((error)=>{
    console.log('Error is connection')
})