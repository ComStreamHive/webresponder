const express = require('express');
const app = express();
const port = 3021;

app.use(express.urlencoded({ extended: true }));

// Middleware to log all incoming requests
app.all('*', (req, res) => {
    console.log(`[LOG] ${new Date().toISOString()} - ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);

    if (req.method === 'POST' && req.url === '/webresponder') {
        const xmlResponse = `
            <Response>
                <Say>This is a test. Your call is connected to the Web Responder.</Say>
            </Response>
        `;
        res.set('Content-Type', 'application/xml');
        res.send(xmlResponse);
        console.log(`[LOG] Response sent: ${xmlResponse}`);
    } else {
        res.status(404).send('Not Found');
    }
});

app.listen(port, () => {
    console.log(`Web Responder running on http://172.235.9.115:${port}`);
});
