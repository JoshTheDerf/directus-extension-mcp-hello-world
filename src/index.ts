import { defineHook } from "@directus/extensions-sdk";

export default defineHook((_, { logger, emitter }) => {
  // Add the hello_world tool to the MCP tools list
  emitter.onFilter("mcp.tools.list", (tools) => {
    return [
      ...tools,
      {
        name: "hello_world",
        annotations: {
          title: "Directus - Hello World",
        },
        description: "A simple hello world tool that greets a person by name",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "The name of the person to greet",
            },
          },
          required: ["name"],
        },
      },
    ];
  });

  // Handle execution of the hello_world tool
  emitter.onFilter("hello_world.mcp.tools.call", (toolCall) => {
    const { name } = toolCall.arguments;

    return {
      content: [
        {
          type: "text",
          text: `Hello, ${name}! Welcome to the Directus MCP custom tools demo.`,
        },
      ],
    };
  });
});
