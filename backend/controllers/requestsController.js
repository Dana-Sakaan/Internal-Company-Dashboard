const db = require("../config/db");

//get all the clients requests from newest to oldes and send them as response
const getAllRequests = async (req, res) => {
  try {
    const [requests] = await db.query(
      "SELECT * FROM clients_requests ORDER BY id DESC",
    );
    res.status(200).json({ success: true, requests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch requests" });
  }
};

//get a specific request based on the client name 
const getOneRequest = async (req, res) => {
  try {
    const { clientName } = req.params;

    const [request] = await db.query(
      "SELECT * FROM clients_requests WHERE clientname = ?",
      clientName,
    );

    if (request.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Request not found" });
    }
    res.status(200).json({ success: true, request });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch request" });
  }
};

// creates a client request with a client name and a default status value of New
const createRequest = async (req, res) => {
  try {
    const { clientName } = req.body;

    if (!clientName) {
      return res
        .status(400)
        .json({ success: false, message: "Client name is required" });
    }

    const result = await db.query(
      "INSERT INTO clients_requests(clientName, status) VALUES (? , 'New')",
      [clientName],
    );

    res
      .status(200)
      .json({ success: true, message: "Request created successfully " });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create request" });
  }
};


// update the client request status 
const requestStatus = async (req, res) => {
  try {
    const validStatues = ["New", "In Progress", "Done"];
    const { status } = req.body;
    const { id } = req.params;
    if (!validStatues.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "In valid statuss" });
    }

    const result = await db.query(
      "UPDATE clients_requests SET status = ? WHERE id = ?",
      [status, id],
    );
    res.status(200).json({success: true, message: "Request status updated successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to update request" });
  }
};

module.exports = {getAllRequests, getOneRequest , createRequest, requestStatus}