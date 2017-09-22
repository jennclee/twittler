$(document).ready(function() {
    var $body = $('body');
    var $tweetBody = $('.tweet-body');

    var index = streams.home.length - 1;
    while (index >= 0) {
      var $tweet = $('<div class="tweet"></div>');
      var tweet = streams.home[index];
      var user = tweet.user;
      var message = tweet.message;
      var date = tweet.created_at;

      // Show user names
      var $user = $('<a href="#" class="user"></a>');
      $user.text(user);
      $user.appendTo($tweet);

      // Show messages
      var $msg = $('<p class="message"></p>');
      $msg.text(message);
      $msg.appendTo($tweet);

      // Show timestamp
      var $date = $('<p class="date"></p>');
      $date.text(date);
      $date.appendTo($tweet);

      $tweet.appendTo($tweetBody);

      index -= 1;
    }

    // Create history for all users
    for (user in streams.users) {
      var $userHist = $('<div class="userHist ' + user + '"></div>');
      var tweetHistArray = streams.users[user];
      var $name = $('<h4>' + user + '</h4>');
      $name.appendTo($userHist);
      _.each(tweetHistArray, function(histItem) {
          var itemDate = histItem.created_at;
          var itemMsg = histItem.message;
          var $itemHist = $('<p class="hist"></p>');
          $itemHist.text(itemMsg + ' ' + itemDate);
          $itemHist.appendTo($userHist);
      });
      // Exit history btn
      var exit = $('<button class="exitBtn">x</button>');
      exit.appendTo($userHist).hide();
      $userHist.appendTo($body);
    }

    var $history = $('.history');
    $('.userHist').appendTo($history).hide();

    // Show user history onclick
    $('.tweet').click(function(event) {
        event.stopPropagation();
        var $group = $(this).parents('.group');
        $group.find('.userHist').hide();
        var name = $(this).find('.user').text();
        $group.find('.' + name).toggle();
        $group.find('.exitBtn').show();
    });

    $('.exitBtn').click(function() {
      $(this).closest('.userHist').hide();
      $(this).hide();
    })

    document.addEventListener('nextTweet', function() {
        // Click button to load new tweets
        var refresh = $(this).find('.tweetRefreshBtn');
        refresh.on('click', function() {
            window.location.reload(false);
        });
    });

    // Styling for new Tweets btn
    var refresh = $(this).find('.tweetRefreshBtn');
    refresh.on('mouseenter', function() {
        refresh.addClass('highlight');
    });
    refresh.on('mouseleave', function() {
        refresh.removeClass('highlight');
    });

});