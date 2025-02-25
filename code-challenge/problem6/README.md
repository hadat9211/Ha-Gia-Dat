# API Scoreboard Design Document

## **Overview**

This document provides a detailed description of the API module for the scoreboard system in the backend server. The system displays the top 10 players with the highest scores and updates in real-time.

## **Features**

- **Real-time leaderboard updates**
- **Secure score submission** to prevent cheating
- **Support for multiple concurrent users**
- **Optimized performance using Redis cache**
- **Data updates to the database via message queue**
- **Utilization of SSE for real-time score updates**
- **API monitoring with a usage tracking system**

---

## **API Endpoints**

### **1. Submit Score**

- **Endpoint:** `POST /api/action`
- **Description:** Users perform an action (e.g., tap on the screen) to accumulate points.
- **Request:**

```json
{
  "userId": "string",
  "action": "string",
  "authToken": "string"
}
```

- **Response:**

```json
{
  "success": true,
  "message": "Score has been updated",
  "currentScore": "number"
}
```

- **Processing Mechanism:**
  - Validate `authToken`
  - Record the action and add corresponding points
  - **Update Redis first** (`ZINCRBY` in Sorted Set)
  - If the leaderboard changes, send an SSE event to the client (using Redis Pub/Sub)
  - Push data to the **message queue** with the following information:
    ```json
    {
      "userId": "string",
      "score": "number",
      "timestamp": "ISO 8601 string"
    }
    ```
  - A worker retrieves the data from the queue and updates the database.

---

### **2. Get Real-Time Leaderboard**

- **Approach:** Utilizing **Server-Sent Events (SSE)**
- **Endpoint:** `GET /api/scoreboard/stream`
- **Description:**
  - Clients connect to the SSE endpoint to receive real-time score updates.
  - When the leaderboard changes, Redis Cache captures events using Redis Pub/Sub.
  - The server sends updated data to the client to refresh the leaderboard.
- **Example SSE Data Sent to Client:**

```json
{
  "scores": [
    { "userId": "string", "score": "number" },
    { "userId": "string", "score": "number" }
  ]
}
```

---

## **Architecture & Data Flow**

```
[Client] → (POST /api/action) → [Backend API] → [Redis Cache] → [Message Queue] → [Worker] → [Database]
[Client] ← (SSE: /scoreboard/stream) ← [Backend API] ← [Redis Cache (Pub/Sub)]
```

---

## **In-Memory Data Handling**

- **Redis** is used to store the leaderboard to reduce database load.
- When a player performs an action:
  - The score is **updated in Redis first** (`ZINCRBY` in Redis Sorted Set).
  - If the score is within the **top 10**, the leaderboard is updated.
  - If the score changes significantly, an SSE notification is sent to clients.
  - A worker retrieves data from the **message queue** and updates the database.

**Redis Cache Details:**

- Redis uses **Sorted Set** (`ZADD` and `ZRANGE`) to manage the leaderboard.
- TTL (Time-To-Live) is set to prevent outdated data.
- When the cache expires, data is **reloaded from the database**.

---

## **Security Measures & Anti-Cheat Mechanisms**

### **1. Logging & API Monitoring**

- All score updates are logged to detect suspicious activity.
- **Information logged:**
  - `userId`
  - `Previous & new scores`
  - `IP address`
  - `Timestamp`
  - `User-Agent` (detect bots)
- API traffic is monitored using **Prometheus/Grafana**.
- If **abnormal score increases** are detected, actions may include:
  - **Automatically banning accounts**
  - **Sending alerts to admins for manual review**

### **2. Rate Limiting (Suggestion)**

- Limits the number of score update requests to prevent spam.
- Example: **Each user can send a maximum of 5 requests per minute**.
- Possible tools for implementation:
  - **Express Rate Limit** (for Node.js)
  - **Redis + Token Bucket Algorithm** (more scalable solution)
  - **nginx rate limiting** (handled at the proxy level)

---
