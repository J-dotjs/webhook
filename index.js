const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require("child_process");

const app = express();

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    console.log('Received Webhook:', req.body.repository.name);

    if (req.body.repository.name) {
        exec(`cd ../${req.body.repository.name} && git pull`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });        
    }

    res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Webhook receiver listening on port ${PORT}`);
});
