async function commentFormHandler(event)
{
  event.preventDefault();

  const text = document.querySelector('textarea[name="comment-body"]').value.trim();

  const post = window.location.toString().split('/')
  [
    window.location.toString().split('/').length - 1
  ];

  console.log(post,text);

  if (text)
  {
    const response = await fetch('/api/comments',
    {
      method: 'POST',
      body: JSON.stringify({ post, text }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) document.location.reload();
    else alert(response.statusText);
  }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
