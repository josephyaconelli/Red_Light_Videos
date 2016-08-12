import { Template } from 'meteor/templating';

Template.searchResults.helpers({
  getPackages: function() {
    return VideoSearch.getData({
      transform: function(matchText, regExp) {
        return matchText.replace(regExp, "<b>$&</b>")
      },
      sort: {isoScore: -1}
    });
  },
  
  isLoading: function() {
    return VideoSearch.getStatus().loading;
  }
});
