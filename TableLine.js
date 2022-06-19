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
        <th scope="row text-center" class="userId">${userId}</th>
        <td class="id">${this.id}</td>
        <td class="title"><strong>${title}</strong></td>
        <td class="body"><span class="low-opacity">${body}</span></td>`
        this.htmlElement.addEventListener('click', getRecord);
    }
}
