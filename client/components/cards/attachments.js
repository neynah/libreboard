Template.attachmentsGalery.events({
  'click .js-add-attachment': Popup.open('cardAttachments'),
  'click .js-confirm-delete': Popup.afterConfirm('attachmentDelete',
    function() {
      Attachments.remove(this._id);
      Popup.close();
    }
  ),
  // If we let this event bubble, Iron-Router will handle it and empty the
  // page content, see #101.
  'click .js-open-viewer, click .js-download': function(event) {
    event.stopPropagation();
  },
  'click .js-add-cover': function() {
    Cards.update(this.cardId, { $set: { coverId: this._id } });
  },
  'click .js-remove-cover': function() {
    Cards.update(this.cardId, { $unset: { coverId: '' } });
  }
});

Template.cardAttachmentsPopup.events({
  'change .js-attach-file': function(evt) {
    var card = this;
    FS.Utility.eachFile(evt, function(f) {
      var file = new FS.File(f);
      file.boardId = card.boardId;
      file.cardId  = card._id;

      Attachments.insert(file);
      Popup.close();
    });
  },
  'click .js-computer-upload': function(evt, tpl) {
    tpl.find('.js-attach-file').click();
    evt.preventDefault();
  }
});
