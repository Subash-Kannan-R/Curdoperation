import mongoose from 'mongoose';

const formSchema =  mongoose.Schema({
  Firstname: String,
  Lastname: String
});

const formDetails = mongoose.model("formDetails", formSchema);

export default formDetails;
