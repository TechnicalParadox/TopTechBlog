module.exports =
{
  format_date: date =>
  {
    date = new Date(date);
    mins = ('0'+date.getMinutes()).slice(-2);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} at ${date.getHours()}:${mins}`;
  },
  format_plural: (str, int) =>
  {
    return parseInt(int) === 1 ? str : str+"s";
  },
  is_empty: (arr) =>
  {
    return arr.length < 1;
  },
  preview: (str) =>
  {
    if (str.length > 50)
    {
      return str.substring(0,30)+"...";
    }
    return str;
  }
}
