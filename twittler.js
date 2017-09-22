$(document).ready(function() {
    var $body = $('body');

    var index = streams.home.length - 1;
    while (index >= 0) {
      var $tweetBody = $('<div class="tweet"></div>');
      var $userHist = $('<div class="userHist"></div>');
      var tweet = streams.home[index];
      var user = tweet.user;
      var message = tweet.message;
      var date = tweet.created_at;
      var userHist = streams.users[user];

      // Populate user history
      _.each(userHist, function(histItem) {
          var itemDate = histItem.created_at;
          var itemMsg = histItem.message;
          var $itemHist = $('<p class="hist"></p>');
          $itemHist.text(itemMsg + itemDate);
          $itemHist.appendTo($userHist);
      });

      // Show user names
      var $user = $('<a href="#" class="user"></a>');
      $user.text('@' + user);
      $user.appendTo($tweetBody);

      // Show messages
      var $msg = $('<p class="message"></p>');
      $msg.text(message);
      $msg.appendTo($tweetBody);

      // Show timestamp
      var $date = $('<p class="date"></p>');
      $date.text(date);
      $date.appendTo($tweetBody);

      $userHist.appendTo($tweetBody);
      $userHist.hide();

      $tweetBody.appendTo($body);

      index -= 1;
    }

    // Show user history onclick
    $('.user').on('click', function(event) {
        event.stopPropagation();
        $(this).closest('.tweet').find('.userHist').toggle();
    });

    document.addEventListener('nextTweet', function() {
        // Click button to load new tweets
        var refresh = $(this).find('.tweetRefreshBtn');
        refresh.on('click', function() {
            window.location.reload(false);
        });
    });

    var refresh = $(this).find('.tweetRefreshBtn');
    refresh.on('mouseenter', function() {
        refresh.addClass('highlight');
    });
    refresh.on('mouseleave', function() {
        refresh.removeClass('highlight');
    });

});