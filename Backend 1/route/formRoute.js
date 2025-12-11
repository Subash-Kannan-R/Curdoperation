import express from 'express'
import { getDetails, getEdit, insertDetails , update , deletedetails,  } from "../controller/formController.js";


const formRoute = express.Router();

formRoute.post("/details",insertDetails);
formRoute.get("/getdetails",getDetails);
formRoute.get("/editdetails/:id",getEdit);
formRoute.put("/updatedetails/:id",update);
formRoute.put("/deldetails/:id",deletedetails);


export default formRoute;


//http://localhost:3000/api/form/details
//http://localhost:3000/api/form/getdetails
//http://localhost:3000/api/form/editdetails/:id
//http://localhost:3000/api/form/updatedetails/:id
//http://localhost:3000/api/form/deldetails/:id

