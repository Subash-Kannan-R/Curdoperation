import formDetails from "../model/formDetails.js"

export const insertDetails = async (req, res) => {
  try {
    const { Firstname, Lastname } = req.body;
    console.log(req.body);
    const insertdata = await formDetails.create({
      Firstname,
      Lastname
    });

    res.status(201).json({
      message: "Form submitted",
      data: insertdata
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

export const getDetails = async (req,res) =>{

  try{
        
 const getdatay = await formDetails.find();
    res.status(200).json({getdatay})

  }
  catch(error){
 res.status(500).json({
      error: error.message
    });
  }
}


export const getEdit = async (req,res) =>{
   
    const {id} = req.params;

    const temp= await formDetails.findById(id);

      res.status(200).json({temp});

}


export const update=async(req,res)=>{

    const { Firstname,Lastname }=req.body;
       const {id}=req.params;


       const temp = await formDetails.findByIdAndUpdate( id , req.body , {new:true}  );


       res.status(201).json({msg:"updated" , datas:temp});




};
export const deletedetails=async(req,res)=>{

       const {id}=req.params;

       const temp = await formDetails.findByIdAndDelete(id,{new:true});

       res.status(200).json( {  msg:"deleted" , datazz:temp  }  );

};



