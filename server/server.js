// Load express
const express = require('express');
// Load cors
const cors = require('cors');
const path = require('path');
// create express server

const app = express();
const sql = require('mssql/msnodesqlv8');

require('dotenv').config({path: path.resolve(__dirname, '../.env')});

const port = process.env.PORT;


app.use(cors({origin: process.env.CLIENT_ORIGIN}));
app.use(express.json());

const trustCert = process.env.SQL_TRUST_CERT === 'true';
const odbcDriver = process.env.SQL_ODBC_DRIVER || 'OBDC Driver 18 for SQL SERVER'


const sqlConfig = {
    connectionString: `Driver={${odbcDriver}}; Server=${process.env.SQL_SERVER}; Database=${process.env.SQL_DATABASE}; Trusted_Connection=Yes; TrustServerCertificate=${trustCert ? 'Yes' : 'No'}; `,
    options: {
        trustedConnection: true,
        trustServerCertificate: trustCert
    }
};

let poolPromise = sql.connect(sqlConfig)
.then(pool =>{console.log('Connect SQL Server'); return pool; })
.catch(err =>{
    console.error('Database not connected', err);
    return null;
});
// in storage memory
let recordStore = [];
let nextRecordId = 1;

async function getPoolOrFail() {
  return poolPromise;
}
 

app.post('/api/records', async (req, res) =>{
    try{
        const{name, notes} = req.body;
        if (!name) return res.status(400).json({error: 'name is required'});
        const pool = await getPoolOrFail();
        if(!pool){
            const record = {id: String(nextRecordId++), name, notes: notes || null};
            recordstore.unshift(record);
            return res.status(201).json(record);
        }
        const result = await pool.request()
        .input('Name', sql.NVarChar(100), name)
        .input('Notes', sql.NVarChar(sql.MAX), notes || null)
        .query(`INSERT INTO dbo.records (Name, Notes)
            VALUES (@Name, @Notes)
            SELECT SCOPE_IDENTITY() AS ID;`);
            const id = result.recordset[0].id;
            res.status(201).json({ id: String(id), name, notes: notes || null });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});


app.get('/api/records', async (req, res) => {
  try {
    const pool = await getPoolOrFail();
    if (!pool) return res.json(recordStore);
    const result = await pool.request()
      .query('SELECT Id, Name, Notes FROM dbo.Records ORDER BY Id DESC');
    const rows = result.recordset.map(r => ({ id: String(r.Id), name: r.Name, notes: r.Notes }));
    res.json(rows);
  } catch (err) { console.error(err); res.status(500).json({ error: 'Server error' }); }
});
// read one
app.get("/api/records/:id", (req,res)=> {
    const oneRecord = recordStore.find(r => r.id === req.params.id);
    if(!oneRecord) return res.status(404).json({error: "Not Found"});
    res.json(oneRecord);
});
// update
app.put("/api/records/id", (req,res)=> {
    const recordIndex = recordStore.findIndex(r => r.id === params.id);
    if(recordIndex === -1) return res.status(404).json({error: "Not Found"});
    const currentRecordIndex = recordStore[recordIndex];
    const updatedRecord = {
        id:currentRecordIndex.id, // keeping the same id
        name: req.body.name,
        notes: req.body.notes
    };
    recordStore[recordIndex] = updatedRecord;
    res.json(updatedRecord);
});
// delete
app.delete("/api/records/:id" , (req,res)=>{
    const currentRecordIndex = recordStore.findIndex(r => r.id === req.params.id);
    if (currentRecordIndex === -1) return res.status(404).json({error: "Not Found"});
    const deleted = recordStore.splice(currentRecordIndex,1)[0];
    res.json(deleted);
});
 
app.listen(process.env.PORT || 3000, () => console.log(`API running on http://localhost:${port}`));
 
 
 