class Table {
  constructor() {
    this.htmlElement = document.createElement('table');
    this.data = [];
    this.tableHeader = document.createElement('thead');
    this.tableBody = document.createElement('tbody');
    this.init();
  };

  fetchData = () => API.getServerData(this.saveData, this.showError);

  saveData = (data) => {
    this.data = data;

    this.render();
  }

  showError = (error) => console.error(error);

  init = () => {
    this.htmlElement.className = 'table table-striped table-dark table-hover'
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

  getRecord = (id) => {
    API.getOneData(this.saveData, this.showError, id);
  }

  render = () => {
    this.tableHeaderRender();
    console.log(Array.isArray(this.data))
    const tableLines = this.data.map(data => new TableLine(data));
    tableLines.forEach(el => this.tableBody.append(el.htmlElement));
    this.htmlElement.append(this.tableHeader, this.tableBody);
    // this.htmlElement.addEventListener('click', () => this.getRecord(1))
  }
}