const messageModel = require("../model/messageModel");

module.exports.addMessage=async(req,res,next)=>{
    try{
        const {from,to,message}=req.body;
        const data=await messageModel.create({
            message:{text:message},
            users:[from,to],
            sender:from,
        })
        if (data)  return res.json({msg:"Message added successfully."}); 
        return res.json({ msg: "Failed to add message to the database." })
  
    }catch(e){
        next(e)
    }
}
module.exports.getMessages = async (req, res, next) => {
    try {
        const { from, to } = req.body;

        const messages = await messageModel.find({
            users: {
                $all: [from, to],
            },
        }).sort({ updatedAt: 1 });

        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            };
        });
         return res.json(projectedMessages);
    } catch (ex) {
        next(ex);
    }
};

// async function myfunc(){
//     const from = '65d2369e4194ca70b080c6fc';
//     const to = '65d32dc2b7a784e3b7e87c5e';
    
//     const messages1 = await messageModel.find({
//         users: {
//             $all: [from, to],
//         },
//     }).sort({ updatedAt: 1 });

//     const projectedMessages = messages1.map((msg) => {
//         return {
//             fromSelf: msg.sender.toString() === from,
//             message: msg.message.text,
//         };})
    
//     console.log(projectedMessages);

// }
// myfunc()