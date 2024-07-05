import { Hono } from 'hono'
import { api } from './Routes/api'
import { cors } from 'hono/cors';

const app = new Hono()

app.use("/*", cors());

app.route("/api/v1", api);



export default app
