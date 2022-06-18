class TableLine {
    constructor(props) {
        this.props = props;
        this.htmlElement = document.createElement('tr');
        this.render();
    }

    render = () => {
        const { id, title, body, userId } = this.props;
        this.htmlElement.innerHTML = `
        <th scope="row text-center">${userId}</th>
        <td>${id}</td>
        <td>${title}</td>
        <td>${body}</td>`
    }
}