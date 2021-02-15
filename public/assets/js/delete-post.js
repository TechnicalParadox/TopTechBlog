async function deleteFormHandler(event)
{
  event.preventDefault();
  const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 2];

  const res = await fetch('/api/posts/'+post_id,
  {
    method: 'DELETE'
  });

  if (res.ok) document.location.replace('/user/dashboard/');
  else res.statusText;
}

document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);
