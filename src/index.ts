#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js"; // The core MCP server class
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"; // Communication method (stdin/stdout, like a command-line program)
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// KQED API base URL
const KQED_API_BASE = "https://media-api.kqed.org";

// Function to fetch posts from KQED API
async function fetchKQEDPosts(limit: number = 10): Promise<any> {
  const url = `${KQED_API_BASE}/posts?limit=${limit}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`KQED API error: ${response.status} ${response.statusText}`);
  }
  
  return await response.json();
}

// Create the MCP server
const server = new Server(
  {
    name: "kqed-media-api-mcp-server",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {}, // Declares it has "tools" capability
    },
  }
);

// This handler lists the tools available
server.setRequestHandler(ListToolsRequestSchema, async () => {
  // When Claude asks "what tools do you have?", this responds
  // Returns one test tool: hello_kqed

  return {
    tools: [
      {
        name: "hello_kqed",
        description: "A simple test tool that says hello",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Your name",
            },
          },
        },
      },
      {
        name: "search_kqed_posts",
        description: "Search and retrieve posts from KQED (news, articles, stories)",
        inputSchema: {
          type: "object",
          properties: {
            limit: {
              type: "number",
              description: "Number of posts to return (default: 10)",
              default: 10,
            },
          },
        },
      },
    ],
  };
});

// This handler handles tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  // When Claude calls a tool, this executes it
  // Our test tool just returns a greeting
  if (request.params.name === "hello_kqed") {
    const name = (request.params.arguments as { name?: string })?.name || "World";
    return {
      content: [
        {
          type: "text",
          text: `Hello ${name}! Your KQED MCP server is working! 🎉`,
        },
      ],
    };
  }

  if (request.params.name === "search_kqed_posts") {
    // Extract and validate the limit parameter
    const rawLimit = (request.params.arguments as { limit?: number })?.limit;
    
    // Input Validation: Set safe default if not provided
    // Never operate without a value
    // If something goes wrong, fall back to a safe, reasonable default
    let limit = rawLimit !== undefined ? rawLimit : 10;
    
    // Input Validation: Type check - ensure it's a number
    // Prevents injection attacks, reject anything that's not a valid number.
    if (typeof limit !== "number" || isNaN(limit)) {
      return {
        content: [{
          type: "text",
          text: "Error: limit must be a valid number"
        }],
        isError: true,
      };
    }
    
    // Input Validation: Range check - prevent abuse
    // Too small: pointless query
    // Too large: could overwhelm API or cause performance issues
    // Prevents resource exhaustion attacks
    if (limit < 1 || limit > 100) {
      return {
        content: [{
          type: "text",
          text: "Error: limit must be between 1 and 100"
        }],
        isError: true,
      };
    }
    
    // Input Validation: Ensure integer (no decimals)
    // Ensures clean, predictable values go to the API
    limit = Math.floor(limit);
    
    try {
      const data = await fetchKQEDPosts(limit);
      
      // Format the response
      const posts = data.data.map((post: any) => ({
        title: post.attributes.title,
        slug: post.attributes.slug,
        publishDate: new Date(post.attributes.publishDate * 1000).toISOString(),
        site: post.meta.site,
      }));
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              total: data.meta.total.value,
              returned: posts.length,
              posts: posts,
            }, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error fetching KQED posts: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
        isError: true,
      };
    }
  }

  throw new Error(`Unknown tool: ${request.params.name}`);
});

// Start the server
async function main() {
  // Connects to Claude via stdio (standard input/output)
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("KQED MCP server running on stdio");
}

// Error handling
main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
