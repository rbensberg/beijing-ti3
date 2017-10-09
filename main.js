const airtableApiKey = "keyiaxDtyOpwMFXyF";

new Vue({
  el: '#standings',

  data: {
    standing: {
      show: false,
      players: []
    }
  },

  created: function () {
    this.getMatchesFromAirtable(this);
  },

  methods: {
    getMatchesFromAirtable: function(th) {
      var _this = th;

      $.ajax({
          url: "https://api.airtable.com/v0/appAbzOBI0MLX1xzn/Players?view=Grid%20view",
          headers: {"Authorization": "Bearer " + airtableApiKey}
      }).done(function(data) {
          console.log('Got matches from airtable...')

          data.records.forEach(function(player) {
            if (player.fields['Matches Count'] < 1) return;

            _this.standing.players.push(player.fields)
            console.log(player.fields)
          })
          _this.standing.show = true

      }).fail(function(data){
          alert('‼️ Failure connecting to airtable!')
          console.log('‼️ Failure connecting to airtable!', data)
      })
    }
  }
})


$("#add-entry").on("click", function(){
  $("#airtable-form").show();
})

$("#back-form").on('click', function() {
  $("#airtable-form").hide();
})
