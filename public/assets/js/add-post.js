async function newFormHandler(event)
{
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value.trim();
  const text = document.querySelector('textarea[name="post-text"]').value.trim();

  const res = await fetch('/api/posts',
  {
    method: 'POST',
    body: JSON.stringify({ title, text }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (res.ok) document.location.replace('/user/dashboard');
  else alert(response.statusText);
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
