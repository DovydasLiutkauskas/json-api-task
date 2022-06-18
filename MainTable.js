class Table {
  constructor() {
    this.htmlElement = document.createElement('div');
    this.table = document.createElement('table');
    this.tableHeader = document.createElement('thead');
    this.tableBody = document.createElement('tbody');
    this.backButton = document.createElement('button');
    this.createButton = document.createElement('button');
    this.data = [];
    this.init();
  };

  fetchData = () => API.getServerData(this.saveData, this.showError);

  getRecord = (id) => API.getOneData(this.saveData, this.showError, id);

  saveData = (data) => {
    this.data = data;
    this.render();
  }

  showError = (error) => console.error(error);

  init = () => {
    this.table.className = 'table table-striped table-dark table-hover position-relative'
    this.fetchData();
    this.backButtonSwitch();
    this.createButtonSwitch();
    // this.render();
  }

  tableHeaderRender() {
    this.tableHeader.innerHTML = `
    <tr>
    <th scope="col">UserID</th>
    <th scope="col">ID</th>
    <th scope="col">Title</th>
    <th scope="col">Body</th>
    </tr>`;
    this.tableHeader.className = 'text-center'
  }

  backButtonSwitch() {
    this.backButton.className = 'btn btn-outline-dark d-none back-button';
    this.backButton.innerHTML = '<i class="bi bi-arrow-left-circle"></i> Go Back';
    this.table.append(this.backButton);
    this.backButton.addEventListener('click', this.fetchData);
  }

  createButtonSwitch() {
    this.createButton.className = 'btn btn-outline-success create-button';
    this.createButton.innerHTML = `<i class="bi bi-plus-circle"></i> Create New Record`
    this.table.append(this.createButton);
    this.createButton.addEventListener('click', this.addRecordRender)
  }

  addRecordRender = () => {
    const form = new CreateForm();
    console.log(form.htmlElement)
    this.htmlElement.innerHTML = '';
    this.htmlElement.append(form.htmlElement);
  }

  render() {
    this.tableHeaderRender();
    this.tableBody.innerHTML = '';
    if (Array.isArray(this.data)) {
      const tableLines = this.data.map(({ id, ...data }) => new TableLine({
        id,
        ...data,
        getRecord: () => this.getRecord(id)
      }));
      tableLines.forEach(el => this.tableBody.append(el.htmlElement));
      this.table.append(this.tableHeader, this.tableBody);
      this.htmlElement.append(this.table);
      this.backButton.classList.add('d-none');
    }
    else {
      const tableLine = new TableLine(this.data);
      this.tableBody.append(tableLine.htmlElement);
      this.table.append(this.tableHeader, this.tableBody);
      this.htmlElement.append(this.table);
      this.backButton.classList.remove('d-none');
    }
  }
}
