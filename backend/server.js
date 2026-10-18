import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({host:process.env.DB_HOST||'127.0.0.1',port:Number(process.env.DB_PORT||3306),user:process.env.DB_USER||'test2yc',password:process.env.DB_PASSWORD||'',database:process.env.DB_NAME||'test2yc',waitForConnections:true,connectionLimit:10});

app.get('/api/health', async (_req,res) => {
  try { await pool.query('SELECT 1'); res.json({ok:true,database:'online'}); }
  catch { res.status(503).json({ok:false,database:'offline'}); }
});

app.get('/api/records', async (_req,res) => {
  try { const [records] = await pool.query('SELECT id,name,value,created_at FROM records ORDER BY id DESC LIMIT 100'); res.json({records}); }
  catch (error) { console.error(error); res.status(500).json({error:'Database query failed'}); }
});

app.post('/api/records', async (req,res) => {
  const {name,value} = req.body || {};
  if (!name || typeof name !== 'string') return res.status(400).json({error:'name is required'});
  try { const [result] = await pool.execute('INSERT INTO records (name,value) VALUES (?,?)',[name,String(value ?? '')]); res.status(201).json({id:result.insertId,name,value:value??''}); }
  catch { res.status(500).json({error:'Insert failed'}); }
});

const port=Number(process.env.PORT||5000);
app.listen(port,()=>console.log(`Test2yc API listening on ${port}`));
