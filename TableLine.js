class TableLine {
    constructor({ id, ...props }) {
        this.id = id;
        this.props = props;
        this.htmlElement = document.createElement('tr');
        this.render();
    }

    render = () => {
        const { title, body, userId, getRecord } = this.props;
        this.htmlElement.innerHTML = `
        <th scope="row text-center">${userId}</th>
        <td>${this.id}</td>
        <td>${title}</td>
        <td>${body}</td>`
        this.htmlElement.addEventListener('click', getRecord);
    }
}

// createButtonSwitch() {
  //   this.createButton.className = 'btn btn-outline-success create-button';
  //   this.createButton.innerHTML = `<i class="bi bi-plus-circle"></i>Create New Record`
  //   this.htmlElement.append(this.createButton);
  // }