# API Reference (v1)

Base URL: `http://localhost:3000/api/v1`

> All payloads are JSON. Set `Content-Type: application/json` on POSTs.

## Health (non-versioned)

- `GET /health` → `{ status, uptimeSec, time }`

---

## Classes

### Create

`POST /classes`

```json
{ "name": "Grade 10A" }
```

**201 →**

```json
{ "id": 1, "name": "Grade 10A" }
```

### List

`GET /classes` → `[{ "id": 1, "name": "Grade 10A" }, ...]`

---

## Students

### Create

`POST /students`

```json
{ "fullName": "Alex Silva", "classId": 1 }
```

**201 →**

```json
{ "id": 7, "fullName": "Alex Silva", "classId": 1 }
```

### List (optional filter)

`GET /students?classId=1` → `[{ "id": 7, "fullName": "Alex Silva", "classId": 1 }]`

---

## Periods

### Create

`POST /periods`

```json
{ "classId": 1, "name": "P1", "startTime": "08:00:00", "endTime": "08:45:00" }
```

**201 →**

```json
{
  "id": 3,
  "classId": 1,
  "name": "P1",
  "startTime": "08:00:00",
  "endTime": "08:45:00"
}
```

### List (optional filter)

`GET /periods?classId=1` → `[{ "id": 3, "classId": 1, "name": "P1", ... }]`

---

## Attendance

### Mark / Upsert

`POST /attendance`

```json
{ "studentId": 7, "periodId": 3, "date": "2025-08-14", "status": "PRESENT" }
```

**200 →**

```json
{
  "id": 12,
  "studentId": 7,
  "periodId": 3,
  "classId": 1,
  "date": "2025-08-14",
  "status": "PRESENT"
}
```

> Unique key `(student_id, period_id, date)` ensures no duplicates; subsequent POSTs update `status`.

### List (filters optional)

`GET /attendance?classId=1&date=2025-08-14`  
`GET /attendance?periodId=3`

**200 →**

```json
[
  {
    "id": 12,
    "studentId": 7,
    "periodId": 3,
    "classId": 1,
    "date": "2025-08-14",
    "status": "PRESENT"
  }
]
```

---

## Realtime Events (Socket.IO)

- Server path: `/socket.io` (default)
- **Join a class room** to receive updates for that class:

  ```js
  const s = io("http://localhost:3000");
  s.emit("join_class", { classId: 1 }, (ack) => console.log(ack));
  s.on("attendance:update", (payload) => console.log("live", payload));
  ```

- **Optional global room**: receive **all** class updates:

  ```js
  s.emit("join_all", null, (ack) => console.log(ack));
  ```

- **Server emissions** (after successful upsert):
  ```ts
  io.to(`class:${record.classId}`).emit("attendance:update", record);
  // optionally:
  io.to("class:all").emit("attendance:update", record);
  ```

### Test client (HTML)

**[client/clientTest.html](client/clientTest.html)**

## Sample Postman flow

1. `POST /api/v1/classes` → store `classId`
2. `POST /api/v1/students` with that `classId` → store student IDs
3. `POST /api/v1/periods` with that `classId` → store period IDs
4. `POST /api/v1/attendance` for those students/periods and a fixed date (e.g., `2025-08-14`)
5. `GET /api/v1/attendance?classId=<id>&date=2025-08-14`
