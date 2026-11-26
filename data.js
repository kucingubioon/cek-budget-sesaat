// One Household, One Month — the single source of truth.
// Every page reads from this one object, so a number changed in the
// planner is the same number the dashboard, bills and goals pages use.
window.HOUSEHOLD = {
  monthLabel: 'November 2026',
  income: 4850,
  // bucket: 'needs' or 'wants'. Savings is what is left over.
  categories: [
    { name: 'Housing',       amount: 1450, bucket: 'needs', color: '#b4552d' },
    { name: 'Groceries',     amount: 620,  bucket: 'needs', color: '#7d8c5c' },
    { name: 'Transport',     amount: 310,  bucket: 'needs', color: '#c98f2e' },
    { name: 'Utilities',     amount: 240,  bucket: 'needs', color: '#5c7d8c' },
    { name: 'Insurance',     amount: 285,  bucket: 'needs', color: '#8c5c7d' },
    { name: 'Kids & School', amount: 390,  bucket: 'needs', color: '#4f7a5a' },
    { name: 'Dining Out',    amount: 260,  bucket: 'wants', color: '#d2691e' },
    { name: 'Subscriptions', amount: 85,   bucket: 'wants', color: '#a06a8c' },
    { name: 'Fun',           amount: 180,  bucket: 'wants', color: '#c2a13a' },
    { name: 'Personal Care', amount: 120,  bucket: 'wants', color: '#7a9e7e' }
  ],
  bills: [
    { name: 'Rent',        amount: 1450, due: 1 },
    { name: 'Insurance',   amount: 285,  due: 5 },
    { name: 'Internet',    amount: 60,   due: 8 },
    { name: 'Electricity', amount: 130,  due: 12 },
    { name: 'Water',       amount: 45,   due: 15 },
    { name: 'Streaming',   amount: 25,   due: 18 },
    { name: 'Phone',       amount: 55,   due: 20 }
  ],
  goals: [
    { name: 'Emergency Fund', target: 10000, saved: 6200, note: 'Six months of essentials, kept in a separate savings account.' },
    { name: 'Family Holiday', target: 2400,  saved: 900,  note: 'A week away next summer — flights, a small house, and slow mornings.' },
    { name: 'Next Car',       target: 6500,  saved: 1300, note: 'A reliable used car when the current one gives up.' }
  ]
};

window.BudgetMath = {
  money(n) {
    return '$' + Math.round(n).toLocaleString('en-US');
  },
  totalOut(data) {
    return data.categories.reduce((s, c) => s + c.amount, 0);
  },
  bucketTotal(data, bucket) {
    return data.categories
      .filter(c => c.bucket === bucket)
      .reduce((s, c) => s + c.amount, 0);
  },
  leftover(data) {
    return data.income - this.totalOut(data);
  },
  pct(part, whole) {
    return whole > 0 ? (part / whole) * 100 : 0;
  }
};
