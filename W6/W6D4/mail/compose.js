
let MessageStore = require('./message_store');

module.exports = {
  renderForm(){
    let currentMessage = MessageStore.getMessageDraft();
    let content = `<p class="new-message-header">New Message</p>
    <form class="compose-form">
    <input
      placeholder='Recipient'
      name='to'
      type="text"
      value='${currentMessage.to}'>
    <input
      placeholder='Subject'
      name='subject'
      type="text"
      value='${currentMessage.subject}'>
    <textarea
      name='body'
      rows='20'>${currentMessage.body}</textarea>
    <button type="submit" class="btn btn-primary submit-message">Send</button>
    </form>`
    return content;
  },

  render() {
    let div = document.createElement('div');
    div.className = "new-message";
    div.innerHTML = this.renderForm();
    div.addEventListener("change", e => {
      let target = e.target;
      MessageStore.updateDraftField(target.name, target.value);
    });

    div.addEventListener("submit", e => {
      e.preventDefault();
      MessageStore.sendDraft();
      location.hash = "inbox";
    });

    return div;
  }
}
