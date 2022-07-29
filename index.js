const core = require("@actions/core");
const github = require("@actions/github");
const axios = require("axios");

try {
  const url = core.getInput("url");
  const token = core.getInput("token");
  const body = core.getInput("body");

  axios
    .post(
      url,
      {
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: "New Release :rocket:",
              emoji: true,
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: ":book: <https://google.com|Github Release Code>",
            },
          },
          {
            type: "divider",
          },
          {
            type: "context",
            elements: [
              {
                type: "plain_text",
                text: "Made with 💜 Product Science",
                emoji: true,
              },
            ],
          },
        ],
      },
      { headers: { authorization: `Bearer ${token}` } }
    )
    .then((response) => {
      core.setOutput("response", response.data);
    });

  // // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
