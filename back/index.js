const mongoose = require("mongoose");
const app = require("./app");
const port = 3000;
/* const port2 = 3001; */


mongoose.connect("mongodb://localhost:27017/ProyectoMusic", (err, resp) => {
    if (err) {
        console.log("No se pudo conectar a la base de datos");
    } else {
        console.log("Conexión exitosa");
        app.listen(port, ()=>{
            console.log("Conetados desde el puerto: " + port);
        });
    };
});
