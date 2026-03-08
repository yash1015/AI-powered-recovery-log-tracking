
# AI-Powered Recovery Log Tracking System

## Overview

This project demonstrates a **self-healing DevOps monitoring system** that detects application errors from logs, performs automated recovery, and stores logs in the cloud.

The system simulates a real-world DevOps monitoring pipeline where application logs are analyzed to detect failures and trigger recovery actions automatically.

---

## Architecture

User Request
↓
Node.js Application (AWS EC2)
↓
Application Logs Generated
↓
Logs Uploaded to Amazon S3
↓
Python Analyzer Reads Logs
↓
Error Detection
↓
Automatic Recovery (PM2 restart)

---

## Tech Stack

* Node.js
* Python
* AWS EC2
* AWS S3
* PM2 Process Manager
* AWS CLI
* SQLite (for incident tracking)

---

## Project Structure

```
AI-powered-recovery-log-tracking
│
├── public/
│   ├── index.html
│   ├── quiz.js
│   └── style.css
│
├── logs/
│   └── app.log
│
├── server.js
│
├── analyzer/
│   └── analyzer.py
│
└── upload_logs.sh
```

---

## Features

* Node.js application deployed on AWS EC2
* Log generation and storage
* Log upload to Amazon S3
* Python-based log analyzer
* Error detection from logs
* Automated service recovery using PM2
* Basic incident logging

---

## How It Works

1. The Node.js application runs on an EC2 instance.
2. Application logs are written to `logs/app.log`.
3. Logs are uploaded to an S3 bucket.
4. The analyzer service reads the logs from S3.
5. If a critical error is detected, the service automatically restarts the application using PM2.

---

## Running the Application

Start the Node.js application:

```
pm2 start server.js --name quiz-app
```

Generate a test error:

```
http://EC2_PUBLIC_IP:3000/simulate-error
```

Run the analyzer:

```
python analyzer.py
```

---

## Example Recovery Flow

```
Error detected: Database connection refused
Running recovery action...
Restarting quiz-app
```

---

## Future Improvements

* AI-based Root Cause Analysis (RCA)
* Incident dashboard for monitoring
* Event-driven triggers using AWS S3 notifications
* Integration with monitoring tools

---

## Author

Yash
Aspiring DevOps Engineer
