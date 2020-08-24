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
        
        socket.on("send_message", async data =>{
          console.log("Received send_message", data);
          data.from = user._id;
          await messageService.createMessage(data);
          io.emit("got_message", { message: data });
        });

        socket.on("request_message", async data =>{
          console.log("Received request_message", data);
          var messages = await messageService.fetchAll(user._id, data.to);
          //console.log(messages)
          io.emit("got_messages", {messages:messages});
        });

      }
     
    }catch(err){
      console.log(err);
    }

    socket.on("disconnect", () => {
      console.log("socket disconnected.")
    })



  });


};
