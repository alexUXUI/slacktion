const core = require("@actions/core");
const github = require("@actions/github");
const axios = require("axios");

try {
  const url = core.getInput("url");
  const token = core.getInput("token");
  const body = core.getInput("body");
  const websiteurl = core.getInput("websiteurl");
  const releaseurl = core.getInput("releaseurl");

  const payload = JSON.stringify(github.context.payload, undefined, 2);

  const commitMessage = github.context.payload?.commits?.[0]?.message;
  const commitUrl = github.context.payload?.commits?.[0]?.url;
  const compareUrl = github.context.payload?.compare;
  const ref = github.context.payload?.ref;

  axios.post(
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
            text: `:computer: <${websiteurl} | Live Site>`,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `:book: <${releaseurl} | Github Release>`,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `${body}`,
          },
        },
        {
          type: "divider",
        },
        {
          type: "section",
          fields: [
            {
              type: "plain_text",
              text: `*Target Branch 🎯* \n ${ref.substring(11)}`,
              type: "mrkdwn",
            },
            {
              type: "plain_text",
              text: `*Commit URL ⛓* \n <${commitUrl} | Merge Commit URL>`,
              type: "mrkdwn",
            },
            {
              type: "plain_text",
              text: `*Compare 🔍* \n <${compareUrl} | Merge Compare URL>`,
              type: "mrkdwn",
            },
          ],
        },
        {
          type: "divider",
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Commit Message 📝* \n ${commitMessage}`,
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
  );

  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
