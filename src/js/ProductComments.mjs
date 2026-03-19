import { getLocalStorage, setLocalStorage, qs } from './utils.mjs';

export default class ProductComments {
  constructor(productId, elementId) {
    this.productId = productId;
    this.elementId = elementId;
    this.storageKey = `review-${this.productId}`; // Llave única por producto
  }

  init() {
    this.renderComments();
    
    // Escuchar el evento del formulario
    qs('#comment-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.addComment();
    });
  }

  addComment() {
    const commentInput = qs('#comment-text');
    const newComment = {
      text: commentInput.value,
      date: new Date().toLocaleDateString('en-US', { 
        month: 'short', day: 'numeric', year: 'numeric' 
      })
    };

    // Usar tus funciones de utils.mjs
    const currentComments = getLocalStorage(this.storageKey) || [];
    currentComments.push(newComment);
    setLocalStorage(this.storageKey, currentComments);

    commentInput.value = ''; // Limpiar el campo
    this.renderComments();
  }

  renderComments() {
    const listElement = qs(`#${this.elementId}`);
    const comments = getLocalStorage(this.storageKey) || [];

    if (comments.length === 0) {
      listElement.innerHTML = '<p class="no-reviews">No reviews yet. Be the first!</p>';
      return;
    }

    listElement.innerHTML = comments
      .map(comment => `
        <div class="comment-card">
          <p class="comment-text">"${comment.text}"</p>
          <small class="comment-date">${comment.date}</small>
        </div>
      `).join('');
  }
}