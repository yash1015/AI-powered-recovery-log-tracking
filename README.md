# Self-Healing Log Monitoring System on AWS

## Overview

This project demonstrates a **DevOps-style automated log monitoring and recovery system** built on AWS.

The system monitors application logs, detects critical errors, and automatically performs recovery actions to restore the service.

It simulates a real-world DevOps monitoring workflow used in production systems.

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
Python Log Analyzer
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
* SQLite (optional incident storage)

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

• Node.js application deployed on AWS EC2
• Log generation and storage
• Log upload to Amazon S3
• Python-based log analyzer for error detection
• Automated service recovery using PM2
• Basic incident detection workflow

---

## How It Works

1. The Node.js application runs on an EC2 instance.
2. Application logs are written to `logs/app.log`.
3. Logs are uploaded to an S3 bucket.
4. The analyzer service reads the logs from S3.
5. If a critical error is detected, the system automatically restarts the application using PM2.

---

## Running the Application

Start the application using PM2:

```
pm2 start server.js --name quiz-app
```

Trigger a test error:

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

## Learning Outcomes

This project demonstrates practical DevOps concepts including:

• Cloud deployment using AWS
• Log monitoring
• Automation and recovery mechanisms
• Service management using PM2

---

## Author

Yash Kangude

