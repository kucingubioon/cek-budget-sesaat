// One Household, One Month — the single source of truth.
// Every page reads from this one object, so a number changed in the
// planner is the same number the dashboard, bills and goals pages use.
//
// Dataset: the dashboard scene itself (Lisa's final decision, 27 Nov 2026).
// The scene is the original October 2024 mockup, used untouched, so the
// site's data follows the picture: income $4,850 (two paychecks), the ten
// printed expense categories totalling $3,940, $910 saved (18.8%), and
// the three printed goal notes. The earlier November 2026 brief dataset
// is retired — do not restore it.
window.HOUSEHOLD = {
  monthLabel: 'October 2024',
  income: 4850,
  incomeLines: [
    { name: 'Paycheck (Oct 15)', amount: 3250 },
    { name: 'Paycheck (Oct 30)', amount: 1600 }
  ],
  // bucket: 'needs' or 'wants'. Savings is what is left over.
  categories: [
    { name: 'Housing / Rent',      amount: 1600, bucket: 'needs', color: '#b4552d' },
    { name: 'Groceries',           amount: 680,  bucket: 'needs', color: '#7d8c5c' },
    { name: 'Utilities',           amount: 240,  bucket: 'needs', color: '#5c7d8c' },
    { name: 'Transportation / Fuel', amount: 320, bucket: 'needs', color: '#c98f2e' },
    { name: 'Dining Out',          amount: 280,  bucket: 'wants', color: '#d2691e' },
    { name: 'Health & Pharmacy',   amount: 150,  bucket: 'needs', color: '#8c5c7d' },
    { name: 'Kids & School',       amount: 420,  bucket: 'needs', color: '#4f7a5a' },
    { name: 'Subscriptions',       amount: 95,   bucket: 'wants', color: '#a06a8c' },
    { name: 'Pet Care',            amount: 85,   bucket: 'wants', color: '#c2a13a' },
    { name: 'Home & Household',    amount: 70,   bucket: 'wants', color: '#7a9e7e' }
  ],
  // Fixed bills, derived from the printed categories above.
  bills: [
    { name: 'Housing / Rent',    amount: 1600, due: 1 },
    { name: 'Kids & School',     amount: 420,  due: 5 },
    { name: 'Health & Pharmacy', amount: 150,  due: 8 },
    { name: 'Utilities',         amount: 240,  due: 12 },
    { name: 'Subscriptions',     amount: 95,   due: 18 }
  ],
  goals: [
    { name: 'Emergency Fund',   target: 2000, saved: 1340, note: 'A starter cushion for surprises, kept in a separate savings account.' },
    { name: 'New Fridge',       target: 900,  saved: 350,  note: 'The current fridge is loud and leaks — this is its replacement fund.' },
    { name: 'Dec Holiday Fund', target: 500,  saved: 120,  note: 'A small December holiday fund: gifts, food, and the trip to family.' }
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
