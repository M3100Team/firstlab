const titleEnding = " • Geolin";

const month_converter = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сенятбря", "октября", "ноября", "декабря"];

function addLeadingZero(number) {
  const string_number = number.toString();
  if (string_number.length < 2) {
    return "0" + string_number;
  } else {
    return string_number;
  }
}

function dueToTimeConverter(timestamp) {
  const date = new Date(timestamp);
  return `До ${date.getDate()} ${month_converter[date.getMonth()]} ${date.getFullYear()}, ${addLeadingZero(date.getHours())}:${addLeadingZero(date.getMinutes())}`;
}

export { titleEnding, dueToTimeConverter };
