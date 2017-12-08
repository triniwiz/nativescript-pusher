var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '232833',
  key: '08e36d57b01061a58520',
  secret: '9c79a614c08a715f6015',
  encrypted: true
});

pusher.trigger('android', 'test-android', {
  message: 'hello android world'
});

pusher.trigger('ios', 'test-ios', {
  message: 'hello ios world'
});
