# Campus claim - Lost & Found Backend

## Overview
A modular RESTful backend system for managing campus lost and found items.

## Features
- Lost item CRUD
- Found item CRUD
- Claim submission system
- Claim approval with status control
- Filtering by status and source.
- Report endpoint for analytics
- Input validation

## Workflow
1. User posts lost item
2. User posts found item
3. Owner submits claim
4. Finder approves specific claim
5. Item status transitions from open → claimed

## Tech Stack
- Node.js
- Express.js
- File-based JSON storage

## Future Improvements
- MongoDB integration
- Authentication & role-based access
- Dispute resolution system
- Reward mechanism
