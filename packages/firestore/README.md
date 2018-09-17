# Firestore

Simple wrapper that configured Firebase / Firestore

## Setup

Requires a service account in Google Cloud. Save the service account json to `secret-firestore01.json`

## Database Layout

```
/databases/{database}/documents/ {
  // Stores the workspaces, workspaceDocs, and messages for a tenant
  /workspaces/{workspace}/docs/{workspaceDocs}/messages/{message}

  // Stores the social media accounts (users do not have access)
  /workspaces/{workspace}/docs/{connector}/accounts/{account}

  // Stores the users accounts
  /users/{user}
}
```

## Authentication Layout

```JavaScript
const user = {
  workspaces:[]
}
```
