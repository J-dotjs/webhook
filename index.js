const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    console.log('Received Webhook:', req.body.repository.name);

    if (req.body.repository.name === 'poppy') {
        child_process.exec('ls', {cwd: './'}, function(err, stdout, stderr) {});
        
    }

    res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Webhook receiver listening on port ${PORT}`);
});
