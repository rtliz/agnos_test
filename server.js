import next from 'next';
import { createServer } from "node:http";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = process.env.PORT || 3001;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => { 
  const httpServer = createServer(handler);

  const io = new Server(httpServer, {
    cors: {
      origin: process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000", 
      methods: ["GET", "POST"]
    }
  });
 
  // Store latest form data by formId
  const formDataStore = {};

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on('JOIN_FORM_ROOM', (data) => {
      const formId = data.formId;
      socket.join(formId);
      console.log(`Socket ${socket.id} has joined the room for Form ${formId}`);
      // Send latest data to the client that just joined
      if (formDataStore[formId]) {
        socket.emit('PATIENT_FORM_UPDATE', formDataStore[formId]);
      }
    });

    socket.on('PATIENT_FORM_UPDATE', (res) => {
      const { formId,  data} = res;
      // Update latest data in store
      formDataStore[formId] = data;
      console.log(`Broadcasting update for form ${formId} from ${socket.id}`);
      socket.broadcast.to(formId).emit('PATIENT_FORM_UPDATE', data);
    });

    socket.on('CLEAR_FORM_DATA', (formId) => {
      // Remove data for this formId
      delete formDataStore[formId];
      console.log(`Form data for ${formId} cleared.`);
    });

    socket.on('MANAGE_FORMS', (_) => {
      socket.join("MANAGE_FORMS");
      console.log(`Socket ${socket.id} has joined the room for Form MANAGE_FORMS`);
    });

    socket.on('TRIGGER_FORM_UPDATE', (data) => {
      console.log(`Socket ${socket.id} MANAGE_FORMS  > TRIGGER_FORM_UPDATE: `, data);
      socket.broadcast.to("MANAGE_FORMS").emit('TRIGGER_FORM_UPDATE', data);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});