# Directus MCP Hello World Extension

A demonstration extension that adds a custom `hello_world` MCP tool to Directus.

## Prerequisites

This extension requires the [`directus-extension-mcp-customization`](https://github.com/JoshTheDerf/directus-extension-mcp-customization) extension to be installed and enabled first.

## What This Extension Does

This extension demonstrates how to add custom MCP tools to Directus by:

1. Adding a `hello_world` tool to the MCP tools list
2. Handling execution of the tool when called

The `hello_world` tool accepts a `name` parameter and returns a personalized greeting.

## Installation

Install via npm:

```bash
npm install directus-extension-mcp-hello-world
```

Or manually:

```bash
npm install
npm run build
```

Then restart your Directus instance.

## Usage

Once installed and your Directus instance is restarted, the `hello_world` tool will be available through the MCP endpoint at `/mcp`.

Example MCP request:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "hello_world",
    "arguments": {
      "name": "Alice"
    }
  }
}
```

Response:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "Hello, Alice! Welcome to the Directus MCP custom tools demo."
      }
    ]
  }
}
```

## How It Works

This extension uses Directus's isolated event emitter system to hook into the MCP customization extension:

- **`mcp.tools.list` filter**: Adds the tool definition to the available tools
- **`hello_world.mcp.tools.call` filter**: Handles the actual execution when the tool is called

### Important: Isolated Event Emitter

For security reasons, the MCP feature uses an isolated event emitter, separate from the core Directus event system. This means you **must** use `emitter.onFilter()` directly instead of the `filter()` callback:

```typescript
import { defineHook } from "@directus/extensions-sdk";

export default defineHook((_, { emitter }) => {
  // ✅ Correct: Use emitter.onFilter()
  emitter.onFilter("mcp.tools.list", (tools) => {
    return [...tools, myTool];
  });

  // ❌ Wrong: Don't use filter() callback
  // filter("mcp.tools.list", (tools) => { ... });
});
```

See the [`directus-extension-mcp-customization`](https://github.com/JoshTheDerf/directus-extension-mcp-customization) README for more details on how the integration works.

## Related Extensions

- [`directus-extension-mcp-customization`](https://github.com/JoshTheDerf/directus-extension-mcp-customization) - Core framework for custom MCP tools (required)
- [`directus-extension-mcp-comments`](https://github.com/JoshTheDerf/directus-extension-mcp-comments) - Adds a tool for managing comments to Directus MCP
- [`directus-extension-mcp-presets`](https://github.com/JoshTheDerf/directus-extension-mcp-presets) - Adds a tool for managing presets/bookmarks to Directus MCP
