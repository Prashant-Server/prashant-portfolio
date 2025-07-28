export default async function handler(req, res) {
    if (req.method === "POST") {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Optional: Save or send to email provider
        console.log("📨 Contact Form Submission:", { name, email, message });

        return res.status(200).json({ success: true, message: "Form submitted successfully!" });
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
