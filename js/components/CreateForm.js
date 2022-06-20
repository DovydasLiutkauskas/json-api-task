class CreateForm {
  constructor(addRecordFunction) {
    this.addRecordFunction = addRecordFunction;
    this.htmlElement = document.createElement('section');
    this.render();
  }

  formSubmit() {
    this.htmlElement.className = 'd-flex flex-column align-items-center';
    this.htmlElement.innerHTML = `
    <i class="bi bi-check2-circle"></i>
    <h4 class="success-message">Your record was succesfully submited!</h4>
    <span class="mt-3">Loading data...</span>
    <div class="spinner-border" role="status">
      <span class="sr-only"></span>
    </div>`;
  }

  sendNewData(e) {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;
    const userId = document.querySelector('#userId').value;
    this.addRecordFunction(title, body, userId);
    this.formSubmit();
  }

  render() {
    this.htmlElement.id = 'form';
    this.htmlElement.className = 'd-flex justify-content-center';
    this.htmlElement.innerHTML = `
      <form class="w-75 mb-3">
          <h4>Create new record:</h4>
          <div class="form-group col-lg-4">
            <label for="userId">User ID</label>
            <input type="number" class="form-control input-lg" id="userId" placeholder="Enter your User ID" required>
        </div>
          <div class="form-group mt-3 w-100">
            <label for="title">Title</label>
            <input class="form-control input-lg" id="title" placeholder="Enter title" required>
        </div>
        <div class="form-group mt-3 w-100">
          <label for="body">Body</label>
          <textarea type="text" class="form-control" rows="10" id="body" placeholder="Enter body text" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary mt-3">Submit</button>
      </form>`;
    this.htmlElement.querySelector('form').addEventListener('submit', (e) => this.sendNewData(e));
  }
}
