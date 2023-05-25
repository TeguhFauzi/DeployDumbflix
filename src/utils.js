export function ConvertFormatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
    style: "currency",
    currency: "IDR",
  }).format(number);
}

export function ConvertFormatDate(date) {
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  date = new Date();
  return date.toLocaleString("en-US", options);
}
