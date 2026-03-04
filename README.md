# KQED MCP Server

A Model Context Protocol (MCP) server that provides AI agents like Claude with access to KQED's media API, enabling natural language queries about KQED's content across news, science, arts, and more.

## About This Project

This is a learning project I built to understand how MCP servers work and to explore building bridges between AI agents and real-world APIs. The goal was to create a tool that lets Claude answer questions like "Who did Mina Kim interview last week?" by querying KQED's public media API.

## Features

- **Two MCP Tools:**
  - `hello_kqed` - Test tool to verify server connectivity
  - `search_kqed_posts` - Query KQED's content with configurable limits
  
- **Security First:**
  - Input validation with type checking
  - Range validation to prevent resource exhaustion
  - Safe default values
  - Clear error messages

- **Clean Data Formatting:**
  - Extracts relevant fields (title, slug, date, site)
  - Converts Unix timestamps to readable ISO dates
  - Returns structured JSON responses

## Tech Stack

- **TypeScript** - Type-safe development
- **Node.js** - Runtime environment
- **MCP SDK** - [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/sdk)
- **KQED Media API** - Public content API

## Project Structure

```
kqed-mcp-prototype/
├── src/
│   └── index.ts          # Main MCP server code
├── dist/                 # Compiled JavaScript
├── docs/
│   └── learning/         # Development notes & learnings
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/kqed-mcp-prototype.git
cd kqed-mcp-prototype
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

## Usage with Claude Desktop

1. Open your Claude Desktop config file:
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`

2. Add the KQED MCP server:
```json
{
  "mcpServers": {
    "kqed": {
      "command": "node",
      "args": ["/path/to/kqed-mcp-prototype/dist/index.js"]
    }
  }
}
```

3. Restart Claude Desktop

4. Try queries like:
   - "Use search_kqed_posts to get 5 recent posts"
   - "Use hello_kqed with my name"

## Example Output

```json
{
  "total": 10000,
  "returned": 5,
  "posts": [
    {
      "title": "Will Tahoe Get Any More Real Snow This Year?",
      "slug": "lake-tahoe-snow-forecast-2026",
      "publishDate": "2026-03-04T12:54:30.000Z",
      "site": "science"
    },
    ...
  ]
}
```

## What I Learned

- **MCP Architecture**: How to build a server that bridges AI agents and APIs
- **TypeScript Development**: Setting up a TypeScript project with proper compilation
- **Application Security**: Implementing input validation and defense-in-depth strategies
- **API Integration**: Working with REST APIs and data transformation
- **Developer Workflow**: The build → test → restart cycle for MCP development

## Future Enhancements

- Add date range filtering
- Implement keyword search
- Add support for `/pages` and `/posts/forum` endpoints
- Query preprocessing to extract entities (dates, names, shows)
- Add caching layer for better performance

## Development

Run in watch mode during development:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Built as a learning project to understand MCP server development
- Uses KQED's public media API
- Inspired by the need to make media content more accessible through AI agents