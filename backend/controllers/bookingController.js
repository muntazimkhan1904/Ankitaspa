const fs = require("fs");
const path = require("path");

exports.submitBooking = (req, res) => {
    const { name, phone, email, service, date, time, message } = req.body;

    if (!name || !phone || !service) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const newBooking = {
        id: Date.now(),
        name,
        phone,
        email,
        service,
        date,
        time,
        message
    };

    // JSON file location
    const filePath = path.join(__dirname, "..", "data", "bookings.json");

    // Read old data or create new array
    let data = [];
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf8");
        data = fileContent ? JSON.parse(fileContent) : [];
    }

    data.push(newBooking);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.json({ message: "Booking submitted successfully", booking: newBooking });
};
