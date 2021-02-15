async function editFormHandler(event)
{
  event.preventDefault();
  const post_id = window.location.toString().split('/')[window.location.toString().split('/').length-2];
  const title = document.querySelector('input[name="post-title"]').value.trim();
  const text = document.querySelector('textarea[name="post-text"]').value.trim();

  const res = await fetch('/api/posts/'+post_id,
  {
    method: 'PUT',
    body: JSON.stringify({ title, text }),
    headers: { 'Content-Type': 'application/json' }
  });

  document.location.replace('/user/dashboard/');
}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);
