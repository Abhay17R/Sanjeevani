import {app} from "./app.js";
app.listen(process.env.PORT,()=>{
    console.log(`SERVER LISTENING ON PORT ${process.env.PORT}`);

})