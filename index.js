const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

try {
  const url = core.getInput('url');
  const token = core.getInput('token');

  axios.post(url, {
    text: 'Hello, World!'
  }, { headers: { authorization: `Bearer ${token}` } }).then((response) => {
    core.setOutput("response", response.data);
  })
  
  // // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}