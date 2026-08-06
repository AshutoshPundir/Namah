import './config/env.js'

import express from "express"
import { connectDB } from './config/db.js';
await connectDB();

const port = process.env.PORT || 3000;

import app from "./app.js"


app.listen(port, ()=> (
    console.log(`server running on port ${port}`)
))
