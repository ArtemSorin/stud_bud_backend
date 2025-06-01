const http = require('http');
const app = require('./src/app');
const { initSocket } = require('./src/socket');
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
initSocket(server);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
