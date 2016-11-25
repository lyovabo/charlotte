module
  .controller('HistoryCtrl',historyCtrl);
function historyCtrl() {
  $('.kwicks').kwicks( {
          maxSize : 250,
          spacing : 5,
          behavior: 'menu'
        })
}