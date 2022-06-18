class CreateForm {
    constructor(props) {
        this.props = props;
        this.htmlElement = document.createElement('section');
        this.render();
    }
    render() {
        this.htmlElement.className = 'd-flex justify-content-center'
        this.htmlElement.innerHTML = `
      <form class="w-50">
          <h4>Create new record:</h4>
          <div class="form-group col-lg-4">
            <label for="userId">User ID</label>
            <input type="number" class="form-control input-lg" id="userId" placeholder="Enter your User ID">
        </div>
          <div class="form-group mt-3 w-100">
            <label for="title">Title</label>
            <input class="form-control input-lg" id="title" placeholder="Enter title">
        </div>
        <div class="form-group mt-3 w-100">
          <label for="body">Body</label>
          <textarea type="text" class="form-control" rows="10" id="body" placeholder="Enter body text"></textarea>
        </div>
        <button type="submit" class="btn btn-primary mt-3">Submit</button>
      </form>`
    }
}