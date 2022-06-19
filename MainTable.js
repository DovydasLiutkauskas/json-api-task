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

  addRecord = (title, body, userId) => API.addData(this.saveCreatedData,
    this.showError, title, body, userId);

  saveCreatedData = (data) => {
    this.data = data;
    const form = document.querySelector('#form');
    form.remove();
    this.render();
  }

  saveData = (data) => {
    this.data = data;
    this.render();
  }

  showError = (error) => console.error(error);

  init = () => {
    this.table.className = 'table table-striped table-dark table-hover'
    this.htmlElement.className = 'position-relative';
    this.fetchData();
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
    this.htmlElement.append(this.backButton);
    this.backButton.addEventListener('click', this.fetchData);
  }

  createButtonSwitch() {
    this.createButton.className = 'btn btn-outline-success create-button';
    this.createButton.innerHTML = `<i class="bi bi-plus-circle"></i> Create New Record`
    this.htmlElement.append(this.createButton);
    this.createButton.addEventListener('click', this.addRecordRender)
  }

  addRecordRender = () => {
    const form = new CreateForm(this.addRecord)
    this.htmlElement.innerHTML = '';
    this.htmlElement.append(form.htmlElement);
    this.backButtonSwitch();
    this.backButton.classList.remove('d-none');
    document.querySelector('.filter').classList.add('d-none');
  }

  filterData() {
    const filterInput = document.querySelector('#filter-input').value;
    const filterSelection = document.querySelector('#filter-selection').value;
    const tableBodyElements = document.querySelector('tbody');
    const elementValue = tableBodyElements.querySelectorAll(`.${filterSelection}`);
    elementValue.forEach(el => {
      if (filterInput === "") {
        el.parentElement.style.display = "";
      } else if (filterSelection === 'userId' || filterSelection === 'id') {
        if (el.innerText == filterInput) {
          el.parentElement.style.display = "";
        } else {
          el.parentElement.style.display = "none";
        }
      } else {
        if (el.innerText.indexOf(filterInput) !== -1) {
          el.parentElement.style.display = "";
        } else {
          el.parentElement.style.display = "none";
        }
      }
    });
  }

  render() {
    this.htmlElement.innerHTML = '';
    this.backButtonSwitch();
    this.createButtonSwitch();
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
      document.querySelector('.filter').classList.remove('d-none');
    }
    else {
      const tableLine = new TableLine(this.data);
      this.tableBody.append(tableLine.htmlElement);
      this.table.append(this.tableHeader, this.tableBody);
      this.htmlElement.append(this.table);
      this.backButton.classList.remove('d-none');
      document.querySelector('.filter').classList.add('d-none');
    }
    document.querySelector('#filter-input').addEventListener('keyup', () => this.filterData());
  }
}
