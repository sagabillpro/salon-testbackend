export default function generateUniqueNumber(): string {
  const date = new Date();
  const datePart = `${date.getFullYear()}${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;
  const timePart = `${date.getHours().toString().padStart(2, "0")}${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}${date.getSeconds().toString().padStart(2, "0")}${date
    .getMilliseconds()
    .toString()
    .padStart(3, "0")}`;
  const randomPart = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0"); // 3-digit random number
  return `${datePart}${timePart}${randomPart}`;
}
