// server.js
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());


const TEQUILA_KEY = process.env.TEQUILA_API_KEY;
const TEQUILA_BASE = 'https://api.tequila.kiwi.com';
const PORT = process.env.PORT || 5174;


if (!TEQUILA_KEY) {
console.error('Faltou TEQUILA_API_KEY no .env');
process.exit(1);
}


// Autocomplete de aeroportos/cidades
app.get('/api/locations', async (req, res) => {
try {
const term = req.query.term?.toString() || '';
const locType = req.query.type?.toString() || 'city'; // city, airport
const url = new URL(`${TEQUILA_BASE}/locations/query`);
url.searchParams.set('term', term);
url.searchParams.set('location_types', locType);
url.searchParams.set('limit', '8');


const r = await fetch(url, { headers: { apikey: TEQUILA_KEY } });
const data = await r.json();
res.json(data);
} catch (e) {
console.error(e);
res.status(500).json({ error: 'Falha ao buscar locations' });
}
});


// Busca de voos
app.get('/api/search', async (req, res) => {
try {
const {
fly_from, // IATA de origem (ex: CWB, SAO, BSB) ou códigos: city:SAO
fly_to, // IATA de destino
date_from, // dd/mm/yyyy
date_to, // dd/mm/yyyy
adults = '1',
curr = 'BRL',
max_stopovers = '2',
sort = 'price', // price | duration | date
cabin = 'M', // M=Econ, W=Premium, C=Business, F=First
} = req.query;


const url = new URL(`${TEQUILA_BASE}/v2/search`);
url.searchParams.set('fly_from', fly_from);
url.searchParams.set('fly_to', fly_to);
url.searchParams.set('date_from', date_from);
url.searchParams.set('date_to', date_to);
});
