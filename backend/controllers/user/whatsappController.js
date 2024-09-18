const twilio = require("twilio");

const handler = async (req, res) => {
  console.log('1');
  if (req.method === "POST") {
    console.log('2');
    const { phoneNumber,movie, seatIDs, theatre, showtime, totalPrice } = req.body;
    console.log(req.body);
    console.log(phoneNumber);
    const message = `Booking confirmed.\n
Your show "${movie}" is scheduled.\n
Theatre: ${theatre}\n
Time: ${showtime}\n
Seats: ${seatIDs}\n
Total Amount: Rs${totalPrice}.`;

    try {
      // Twilio credentials
      const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Twilio Account SID from twilio.com/console
      const authToken = process.env.TWILIO_AUTH_TOKEN; // Your Twilio Auth Token from twilio.com/console
      const client = twilio(accountSid, authToken);

      // Twilio WhatsApp number
      const whatsappFrom = "whatsapp:+14155238886"; 

      const whatsappTo = `whatsapp:${phoneNumber}`; 

      // Send WhatsApp message
      const messageResponse = await client.messages.create({
        body: message, 
        from: whatsappFrom, 
        to: whatsappTo, 
      });

      res
        .status(200)
        .json({
          success: true,
          message: "Message sent successfully",
          data: messageResponse,
        });
    } catch (error) {
      res
        .status(500)
        .json({
          success: false,
          error: "Error sending message",
          details: error.message,
        });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

module.exports = { handler };
