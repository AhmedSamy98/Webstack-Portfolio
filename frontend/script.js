document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('notification').style.display = 'block';
    setTimeout(function() {
        document.getElementById('notification').style.display = 'none';
        location.href = 'index.html';
    }, 2000);
});
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    location.href = 'notes.html';
});
document.getElementById('createNoteForm').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('notification').style.display = 'block';
    setTimeout(function() {
        document.getElementById('notification').style.display = 'none';
        location.href = 'notes.html';
    }, 2000);
});
document.getElementById('editNoteForm').addEventListener('submit', function(event) {
    event.preventDefault();
    location.href = 'notes.html';
});
