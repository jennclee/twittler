$(document).ready(function() {
    var $body = $('body');
    var $tweetBody = $('.tweet-body');
    var $index = 0;


    function showTweet() {
      var $tweet = $('<div class="tweet"></div>');
      var tweet = streams.home[$index];
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

      $tweet.prependTo($tweetBody);

      $index++;

      showHistory();
    }
    
    // Show user history onclick
    function showHistory() {
      var $histDiv = $('.history');
      $('.tweet').click(function() {
          $histDiv.show();
          var name = $(this).find('.user').text();
          var tweetHistArray = streams.users[name];

          var $userHist = $('<div class="userHist ' + name + '"></div>');
          var $name = $('<h3>' + name + '\'s Twittler</h3>');
          $name.appendTo($userHist);
          var $tweetHist = $('<div class="tweetHist"></div>');
          _.each(tweetHistArray, function(histItem) {
            var user = histItem.user;
            var message = histItem.message;
            var date = histItem.created_at;
            var $itemHist = $('<p class="tweet"></p>');

            // Show user names
            var $user = $('<a href="#" class="user"></a>');
            $user.text(user);
            $user.appendTo($itemHist);

            // Show messages
            var $msg = $('<p class="message"></p>');
            $msg.text(message);
            $msg.appendTo($itemHist);

            // Show timestamp
            var $date = $('<p class="date"></p>');
            $date.text(date);
            $date.appendTo($itemHist);

            $itemHist.appendTo($tweetHist);
          });
          $tweetHist.appendTo($userHist);
          $histDiv.html($userHist);
          $('<hr/>').appendTo($histDiv);
          // Create exit history btn
          var exit = $('<button class="exitBtn">x</button>');
          exit.appendTo($histDiv);

        $('.exitBtn').click(function() {
          $(this).closest('.history').hide();
        });
      });
    }

    document.addEventListener('nextTweet', function() {
        // Click button to load new tweets
        var refresh = $(this).find('.tweetRefreshBtn');
        refresh.on('click', function() {
            showTweet();
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