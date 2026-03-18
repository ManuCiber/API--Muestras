import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function checkTables() {
    let output = "";
    try {
        const res = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        output += `Tables in database: ${JSON.stringify(res.rows.map(r => r.table_name))}\n`;
        
        for (const row of res.rows) {
            const table = row.table_name;
            const columns = await pool.query(`
                SELECT column_name, data_type 
                FROM information_schema.columns 
                WHERE table_name = $1
            `, [table]);
            output += `Columns in ${table}: ${JSON.stringify(columns.rows)}\n`;
        }
        
        fs.writeFileSync('db-schema-output.txt', output);
        console.log("Output written to db-schema-output.txt");
    } catch (err) {
        console.error("Error checking tables:", err);
    } finally {
        await pool.end();
    }
}

checkTables();
