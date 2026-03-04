# Testing Your KQED MCP Server with Claude Desktop

## Configuration File Location

On macOS:
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

## Configuration Added

```json
"kqed": {
  "command": "node",
  "args": [
    "/Users/homefolder/Code/github-repos/kqed-mcp-prototype/dist/index.js"
  ]
}
```

This tells Claude Desktop:
- Server name: `kqed`
- How to run it: `node /path/to/your/dist/index.js`

---

## Testing Steps

### 1. Restart Claude Desktop
- Completely quit Claude Desktop (Cmd+Q)
- Reopen it

### 2. Check Connection
- Look for a 🔌 (plug) icon in Claude Desktop
- Click it to see available MCP servers
- You should see "kqed-mcp-server" listed

### 3. Test the Hello World Tool
In Claude Desktop chat, try:
```
Use the hello_kqed tool with my name
```

Expected response:
```
Hello [your name]! Your KQED MCP server is working! 🎉
```

---

## Troubleshooting

### Server not showing up?
- Make sure you quit and reopened Claude Desktop completely
- Check that `dist/index.js` exists by running `npm run build`
- Verify the path in the config file is correct

### Tool not working?
- Check Claude Desktop's logs (if available)
- Make sure the server compiled successfully
- Try running `node dist/index.js` directly to see errors

---

## After Testing

Once the hello world tool works, we can move on to:
- Step 3: Add real KQED API integration
- Step 4: Add query parameters and filtering
- Step 5: Add more tools for pages and forum posts
