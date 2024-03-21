function Now() {
  const today = new Date();
  const date = today.toLocaleDateString();
  const time = today.toLocaleTimeString("en-US", { hour12: false });
  return { date, time };
}

module.exports = Now;
