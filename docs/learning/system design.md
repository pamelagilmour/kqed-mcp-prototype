# System Design Options

## Architecture Overview of an MCP Server

An MCP (Model Context Protocol) server acts as a bridge between AI agents (like Claude) and external data sources. For instance:

Agent ↔ MCP Server ↔ API

## Considerations and Trade-offs

### Implementing the MCP server

Node.js & Typescript vs Python

### Tool design

A generic tool vs granular tools

### Caching strategy

No caching

In-Memory Caching

Persistnet Caching

### Query Intelligence Layer

Direct Pass-Through vs Query Preprocessing

### Response formatting

Raw response vs Structured summaries

### Error Handling

Consider the following:

+ API rate limits
+ Network timeouts
+ Invalid queries
+ Empty results

### Auth




========================
Homework Questions:

What is caching and why do you add it to an app?