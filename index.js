const { App } = require('@slack/bolt');

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN
});

// Responding when someone mentions your bot
app.event('app_mention', async ({ event, say }) => {
  console.log(event);

  // say() is a wrapper around chat.postMessage
  say(`<@${event.user}> :wave:`);
});

// Responding to reactions with the same emoji
app.event('reaction_added', async ({ event, context }) => {
  console.log(event);

    try {
      // Post message to same channel (you could use say() instead)
      const result = await app.client.chat.postMessage({
        // Read the token from the context
        token: context.botToken,
        channel: event.item.channel,
        text: `:${event.reaction}:`,
        // Use the thread_ts argument to create post a message in thread
        thread_ts: event.ts,
      });
      console.log(result)
    } catch (error) {
      console.error(error);
    }
});


// Catch any global errors
app.error((error) => {
	// Check the details of the error to handle cases where you should retry sending a message or stop the app
	console.error(error);
});

// Start your app
(async () => {
  await app.start(3000);
  console.log('⚡️ Bolt app is running!');
})();
