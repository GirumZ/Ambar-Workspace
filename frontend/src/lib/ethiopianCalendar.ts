const ET_MONTHS = [
  "Meskerem", "Tikimit", "Hidar", "Tahsas", "Tir",
  "Yekatit", "Megabit", "Miazia", "Ginbot", "Sene",
  "Hamle", "Nehase", "Pagume",
];

export function gregToEthiopian(date: Date) {
  const gYear = date.getFullYear();
  const gMonth = date.getMonth() + 1;
  const gDay = date.getDate();
  const isAfterNewYear = gMonth > 9 || (gMonth === 9 && gDay >= 11);
  const etYear = isAfterNewYear ? gYear - 7 : gYear - 8;
  const etNewYearGreg = new Date(isAfterNewYear ? gYear : gYear - 1, 8, 11);
  const diffDays = Math.floor((date.getTime() - etNewYearGreg.getTime()) / 86400000);
  const etMonthIdx = Math.min(Math.floor(diffDays / 30), 12);
  const etDay = (diffDays % 30) + 1;
  return { etDay, etMonth: etMonthIdx + 1, etYear, etMonthName: ET_MONTHS[etMonthIdx] };
}

export function getEthiopianHeader(gYear: number, gMonth: number) {
  const et = gregToEthiopian(new Date(gYear, gMonth, 15));
  return `${et.etMonthName} ${et.etYear}`;
}

export function gregTimeToEthiopian(hours: number, minutes: number) {
  const etHours = ((hours + 6) % 12) || 12;
  const mins = String(minutes).padStart(2, "0");
  const isDay = hours >= 6 && hours < 18;
  return `${etHours}:${mins} ${isDay ? "ቀን" : "ሌሊት"}`;
}
