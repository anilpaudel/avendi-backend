/**
 * @overview
 * Socket Chat.
 *
 */
const fetchUserByToken = require('../middleware/authenticate').fetchUserByToken;
const messageService = require('../services/message');

exports.configure = function configure(io) {

  io.of("/").on("connection", async socket => {
    console.log("socket connected");

    try{
      try{
        var user = await fetchUserByToken(socket.handshake.query.token)
      }catch(err){
        console.log("socket auth failed")
      }finally{
        var messages = await messageService.fetchAll(user._id, socket.handshake.query.guest_id);
        io.emit("init", { messages:messages  });


         socket.on("input", async data =>{
            console.log(data);
            data.from = user._id;
            await messageService.createMessage(data);
            io.emit("status", { message: "Message Sent", clear: true });
        });

      }
     
    }catch(err){
      console.log(err);
    }

    socket.on("disconnect", () => {
      console.log("Disconnected.")
    })



  });


};
