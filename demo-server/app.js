var Pusher = require('pusher');
var messages = [
  { text: 'Osei' },
  { text: 'Sean' },
  { text: 'Brad' },
  { text: 'John' },
  { text: 'Jen' },
  { text: 'Nathan' }
];
var pusher = new Pusher({
  appId: '232833',
  key: '08e36d57b01061a58520',
  secret: '9c79a614c08a715f6015',
  encrypted: true
});

pusher.trigger('android', 'test-android', {
  messages: messages
});

pusher.trigger('ios', 'test-ios', {
  messages: messages
});
