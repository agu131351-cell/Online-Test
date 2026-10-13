/**
 * StartUp 1 · Unit 6 Grammar Quiz — Google Apps Script web app
 * Paste this into Code.gs of a script bound to a Google Sheet, then deploy it as a web app.
 * The quiz page itself is hosted on GitHub Pages (index.html).
 * Every submission is added as a row on the "Results" sheet;
 * the "Summary" sheet shows class averages and item analysis (first attempts).
 */

const ORDER = ["1A2","1A3","1A4","1A5","1A6","1B1","1B2","1B3","1B4","1B5","1B6","1C2","1C3","1C4","1C5","1C6","1C7","2A1b","2A2a","2A2b","2A3a","2A3b","2A4a","2A4b","2A5a","2A5b","2A6a","2A6b","2B2a","2B2b","2B2c","2B3a","2B3b","2B3c","2B3d","2B4a","2B4b","2B4c","2B5a","2B5b","2B5c","2B5d","3A2","3A3","3A4","3A5","3A6","3B2a","3B2b","3B2c","3B3a","3B3b","3B3c","3B4a","3B4b","3B5a","3B5b","3B6a","3B6b","3C2","3C3","3C4","3C5"];
const KEY = { "1A2": { "accept": [ "eats" ], "display": "eats" }, "1A3": { "accept": [ "play" ], "display": "play" }, "1A4": { "accept": [ "works" ], "display": "works" }, "1A5": { "accept": [ "go" ], "display": "go" }, "1A6": { "accept": [ "stays up" ], "display": "stays up" }, "1B1": { "accept": [ "doesn't drink" ], "display": "doesn't drink" }, "1B2": { "accept": [ "don't stay up" ], "display": "don't stay up" }, "1B3": { "accept": [ "don't work" ], "display": "don't work" }, "1B4": { "accept": [ "don't watch" ], "display": "don't watch" }, "1B5": { "accept": [ "doesn't have" ], "display": "doesn't have" }, "1B6": { "accept": [ "don't play" ], "display": "don't play" }, "1C2": { "accept": [ "don't study" ], "display": "don't study" }, "1C3": { "accept": [ "doesn't play" ], "display": "doesn't play" }, "1C4": { "accept": [ "doesn't watch" ], "display": "doesn't watch" }, "1C5": { "accept": [ "don't eat" ], "display": "don't eat" }, "1C6": { "accept": [ "doesn't cook" ], "display": "doesn't cook" }, "1C7": { "accept": [ "doesn't stay up" ], "display": "doesn't stay up" }, "2A1b": { "accept": [ "don't" ], "display": "don't" }, "2A2a": { "accept": [ "Does" ], "display": "Does" }, "2A2b": { "accept": [ "doesn't" ], "display": "doesn't" }, "2A3a": { "accept": [ "Do" ], "display": "Do" }, "2A3b": { "accept": [ "don't" ], "display": "don't" }, "2A4a": { "accept": [ "Does" ], "display": "Does" }, "2A4b": { "accept": [ "does" ], "display": "does" }, "2A5a": { "accept": [ "Do" ], "display": "Do" }, "2A5b": { "accept": [ "do" ], "display": "do" }, "2A6a": { "accept": [ "Does" ], "display": "Does" }, "2A6b": { "accept": [ "does" ], "display": "does" }, "2B2a": { "accept": [ "Do" ], "display": "Do" }, "2B2b": { "accept": [ "have" ], "display": "have" }, "2B2c": { "accept": [ "Yes, they do" ], "display": "Yes, they do" }, "2B3a": { "accept": [ "Does" ], "display": "Does" }, "2B3b": { "accept": [ "have" ], "display": "have" }, "2B3c": { "accept": [ "No, he doesn't" ], "display": "No, he doesn't" }, "2B3d": { "accept": [ "feels" ], "display": "feels" }, "2B4a": { "accept": [ "Do" ], "display": "Do" }, "2B4b": { "accept": [ "have" ], "display": "have" }, "2B4c": { "accept": [ "Yes, they do" ], "display": "Yes, they do" }, "2B5a": { "accept": [ "Does" ], "display": "Does" }, "2B5b": { "accept": [ "have" ], "display": "have" }, "2B5c": { "accept": [ "No, he doesn't" ], "display": "No, he doesn't" }, "2B5d": { "accept": [ "has" ], "display": "has" }, "3A2": { "accept": [ "Where does" ], "display": "Where does" }, "3A3": { "accept": [ "Where do" ], "display": "Where do" }, "3A4": { "accept": [ "Where do" ], "display": "Where do" }, "3A5": { "accept": [ "Where do" ], "display": "Where do" }, "3A6": { "accept": [ "Where do" ], "display": "Where do" }, "3B2a": { "accept": [ "does" ], "display": "does" }, "3B2b": { "accept": [ "in" ], "display": "in" }, "3B2c": { "accept": [ "on" ], "display": "on" }, "3B3a": { "accept": [ "do" ], "display": "do" }, "3B3b": { "accept": [ "in" ], "display": "in" }, "3B3c": { "accept": [ "on" ], "display": "on" }, "3B4a": { "accept": [ "does" ], "display": "does" }, "3B4b": { "accept": [ "at", "in" ], "display": "at" }, "3B5a": { "accept": [ "do" ], "display": "do" }, "3B5b": { "accept": [ "at", "in", "near" ], "display": "at" }, "3B6a": { "accept": [ "do" ], "display": "do" }, "3B6b": { "accept": [ "at" ], "display": "at" }, "3C2": { "accept": [ "do you get up" ], "display": "do you get up" }, "3C3": { "accept": [ "do your parents come home" ], "display": "do your parents come home" }, "3C4": { "accept": [ "does your husband make dinner", "does he make dinner" ], "display": "does your husband make dinner" }, "3C5": { "accept": [ "do Jeb and Lisa study", "do they study" ], "display": "do Jeb and Lisa study" } };
const SECS = {"1A":"L1 A","1B":"L1 B","1C":"L1 C","2A":"L2 A","2B":"L2 B","3A":"L3 A","3B":"L3 B","3C":"L3 C"};
const FIXED = ["Timestamp","Student No","Name","Attempt","Score","Total","Percent"];
// Email is kept in the last column (after the answers) so sheets made before it was added keep working
const EMAIL_COL = FIXED.length + Object.keys(SECS).length + ORDER.length * 2 + 1;
const EMAIL_RE = /^[^\s@]+@([a-z0-9-]+\.)*reitaku-u\.ac\.jp$/i; // Reitaku University addresses only
// Columns after the answers, starting at EMAIL_COL
const TAIL = ["Email", "Started", "Minutes", "Leaves", "Away (s)", "Pastes"];
// Time limit in minutes: change it in Project Settings → Script properties → TIME_LIMIT_MIN (default 45)
const DEFAULT_LIMIT_MIN = 45;
const GRACE_MS = 90 * 1000; // extra time for slow connections after the limit

// The quiz page (index.html) sends answers here; the teacher page (teacher.html) asks for results here.
function doPost(e) {
  let out;
  try {
    const payload = JSON.parse(e.postData.contents);
    const action = payload && payload.action;
    out = action === "results" ? getResults(payload) : action === "start" ? startQuiz(payload) : submitQuiz(payload);
  } catch (err) {
    out = { error: "Your answers were not sent: " + (err && err.message ? err.message : err) };
  }
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}

// Opening the web app URL in a browser just confirms it is running.
function doGet() {
  setup();
  return ContentService.createTextOutput("Unit 6 Grammar Quiz score sheet is ready.");
}

function norm_(s) {
  return String(s || "").toLowerCase()
    .replace(/[’‘`´]/g, "'")
    .replace(/\bdoes not\b/g, "doesn't").replace(/\bdo not\b/g, "don't")
    .replace(/[.,?!;:"]/g, " ").replace(/\s+/g, " ").trim();
}

function safe_(v) {
  v = String(v || "");
  return /^[=+\-@]/.test(v) ? "'" + v : v; // stop typed text from running as a formula
}

function colLetter_(n) {
  let s = "";
  while (n > 0) { const m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); }
  return s;
}

/** Creates the Results and Summary sheets if they don't exist yet. Safe to run more than once. */
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let res = ss.getSheetByName("Results");
  if (!res) {
    res = ss.insertSheet("Results");
    const head = FIXED.concat(Object.keys(SECS).map(k => SECS[k]))
      .concat(ORDER.map(id => "✓ " + id))
      .concat(ORDER.map(id => "ans " + id));
    res.getRange(1, 1, 1, head.length).setValues([head]).setFontWeight("bold");
    res.setFrozenRows(1);
    res.setFrozenColumns(3);
  }
  const lastCol = EMAIL_COL + TAIL.length - 1;
  if (res.getMaxColumns() < lastCol) res.insertColumnsAfter(res.getMaxColumns(), lastCol - res.getMaxColumns());
  const tailHead = res.getRange(1, EMAIL_COL, 1, TAIL.length);
  if (tailHead.getValues()[0].join("|") !== TAIL.join("|")) tailHead.setValues([TAIL]).setFontWeight("bold");
  if (!ss.getSheetByName("Summary")) {
    const sum = ss.insertSheet("Summary");
    const attemptCol = "Results!$D$2:$D";
    const scoreCol = "Results!$E$2:$E";
    sum.getRange("A1:B4").setValues([
      ["Unit 6 Grammar Quiz", ""],
      ["Students (first attempts)", "=COUNTIF(" + attemptCol + ",1)"],
      ["Average first score", "=IFERROR(AVERAGEIF(" + attemptCol + ",1," + scoreCol + "),\"\")"],
      ["Out of", ORDER.length]
    ]);
    sum.getRange("A1").setFontWeight("bold").setFontSize(14);
    sum.getRange("A6:D6").setValues([["Item", "Section", "Answer", "% correct (first attempt)"]]).setFontWeight("bold");
    const firstItemCol = FIXED.length + Object.keys(SECS).length + 1;
    const rows = ORDER.map((id, i) => {
      const c = colLetter_(firstItemCol + i);
      return [id, SECS[id.slice(0, 2)], KEY[id].display,
        "=IFERROR(AVERAGEIF(" + attemptCol + ",1,Results!" + c + "$2:" + c + "),\"\")"];
    });
    sum.getRange(7, 1, rows.length, 4).setValues(rows);
    sum.getRange(7, 4, rows.length, 1).setNumberFormat("0%");
    sum.autoResizeColumns(1, 4);
  }
  return res;
}

function limitMin_() {
  const v = Number(PropertiesService.getScriptProperties().getProperty("TIME_LIMIT_MIN"));
  return v > 0 ? v : DEFAULT_LIMIT_MIN;
}

/** "Starts" sheet: one row per student who pressed Start (the timer starts on the server). */
function startsSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let st = ss.getSheetByName("Starts");
  if (!st) {
    st = ss.insertSheet("Starts");
    st.getRange(1, 1, 1, 5).setValues([["Started", "Student No", "Name", "Email", "Token"]]).setFontWeight("bold");
    st.setFrozenRows(1);
  }
  return st;
}

function readIdentity_(payload) {
  const name = String(payload && payload.name || "").trim().slice(0, 100);
  const studentNo = String(payload && payload.studentNo || "").trim().slice(0, 40);
  const email = String(payload && payload.email || "").trim().toLowerCase().slice(0, 120);
  if (!name || !studentNo) throw new Error("Name and student number are required.");
  if (!EMAIL_RE.test(email)) throw new Error("Please use your Reitaku University email (…@reitaku-u.ac.jp).");
  return { name: name, studentNo: studentNo, email: email };
}

const doneMsg_ = f => ({ done: true, error: "終了済みです。この" + f[0] + "では既に提出されています。 / Already submitted (same " + f[1] + ")." });
const lateMsg_ = () => ({ expired: true, error: "時間切れです。提出を受け付けられません。先生に連絡してください。 / Time is up; your answers could not be accepted. Please tell your teacher." });

/**
 * Called when the student presses Start. Records the start time on the server so the limit can't be
 * reset by reloading the page: starting again with the same student number keeps the first start time.
 * To let a student start over, delete their row on the "Starts" sheet.
 */
function startQuiz(payload) {
  const id = readIdentity_(payload);
  const limit = limitMin_();
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const done = findSubmitted_(setup(), id.name, id.studentNo, id.email);
    if (done) return doneMsg_(done);
    const st = startsSheet_();
    const last = st.getLastRow();
    const rows = last > 1 ? st.getRange(2, 1, last - 1, 5).getValues() : [];
    let row = rows.find(r => key_(r[1]) === key_(id.studentNo));
    if (!row) {
      row = [new Date(), safe_(id.studentNo), safe_(id.name), id.email, Utilities.getUuid()];
      st.appendRow(row);
      st.getRange(st.getLastRow(), 2).setNumberFormat("@").setValue(safe_(id.studentNo));
    }
    const started = new Date(row[0]).getTime(), deadline = started + limit * 60000;
    if (Date.now() > deadline + GRACE_MS) return lateMsg_();
    return { token: row[4], startedAt: started, deadline: deadline, now: Date.now(), limitMin: limit };
  } finally {
    lock.releaseLock();
  }
}

/** Called from the page. Grades on the server so the answer key never reaches students. */
function submitQuiz(payload) {
  const token = String(payload && payload.token || "");
  const answers = (payload && payload.answers) || {};
  const integ = (payload && payload.integrity) || {};
  const num = v => Math.max(0, Math.min(100000, Math.round(Number(v) || 0)));
  if (!token) throw new Error("Please press Start first. / 先に Start を押してください。");

  const sections = {}, results = {};
  let score = 0;
  ORDER.forEach(id => {
    const given = String(answers[id] || "").slice(0, 200);
    const ok = KEY[id].accept.some(a => norm_(a) === norm_(given));
    results[id] = ok;
    if (ok) score++;
    const sec = id.slice(0, 2);
    sections[sec] = sections[sec] || [0, 0];
    sections[sec][1]++; if (ok) sections[sec][0]++;
  });

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const st = startsSheet_();
    const last = st.getLastRow();
    const start = (last > 1 ? st.getRange(2, 1, last - 1, 5).getValues() : []).find(r => String(r[4]) === token);
    if (!start) throw new Error("This test session was not found. Please reload the page and press Start again.");
    // Identity comes from the Start record, not from the submitted form
    const studentNo = String(start[1]).replace(/^'/, ""), name = String(start[2]).replace(/^'/, ""), email = String(start[3]);
    const res = setup();
    // One submission per student: refuse if the name, student number OR email was already used.
    // To let a student retake, delete their row on the Results sheet (and on the Starts sheet).
    const done = findSubmitted_(res, name, studentNo, email);
    if (done) return doneMsg_(done);
    const started = new Date(start[0]).getTime(), now = Date.now();
    if (now > started + limitMin_() * 60000 + GRACE_MS) return lateMsg_();

    const row = [new Date(), safe_(studentNo), safe_(name), 1, score, ORDER.length, score / ORDER.length]
      .concat(Object.keys(SECS).map(k => sections[k] ? sections[k][0] : ""))
      .concat(ORDER.map(id => results[id] ? 1 : 0))
      .concat(ORDER.map(id => safe_(String(answers[id] || "").slice(0, 200))))
      .concat([email, new Date(started), Math.round((now - started) / 6000) / 10, num(integ.leaves), num(integ.awaySec), num(integ.pastes)]);
    // Student number stays text (keeps leading zeros) and percent shows as %
    res.appendRow(row);
    const r = res.getLastRow();
    res.getRange(r, 2).setNumberFormat("@").setValue(safe_(studentNo));
    res.getRange(r, 7).setNumberFormat("0%");
  } finally {
    lock.releaseLock();
  }
  // Only the score goes back: correct answers are shown on the teacher page, not to students
  return { score: score, total: ORDER.length, sections: sections };
}

const key_ = v => String(v || "").replace(/^'/, "").toLowerCase().replace(/\s+/g, " ").trim();

/** Returns [Japanese, English] name of the field that matched an earlier submission, or null if none. */
function findSubmitted_(res, name, studentNo, email) {
  const last = res.getLastRow();
  if (last < 2) return null;
  const nos = res.getRange(2, 2, last - 1, 2).getValues();        // Student No, Name
  const mails = res.getRange(2, EMAIL_COL, last - 1, 1).getValues();
  const n = key_(name), no = key_(studentNo), em = key_(email);
  if (nos.some(r => key_(r[0]) === no)) return ["学生番号", "student number"];
  if (mails.some(r => key_(r[0]) === em)) return ["メールアドレス", "email"];
  if (nos.some(r => key_(r[1]) === n)) return ["名前", "name"];
  return null;
}

/**
 * Called from teacher.html. Returns every submission with each student's answers.
 * The password is NOT in this file: set it in Project Settings → Script properties
 * as TEACHER_PASSWORD (see README).
 */
function getResults(payload) {
  const pw = PropertiesService.getScriptProperties().getProperty("TEACHER_PASSWORD");
  if (!pw) throw new Error("TEACHER_PASSWORD is not set in Script properties yet.");
  if (String(payload.password || "") !== pw) {
    Utilities.sleep(1000); // slow down password guessing
    throw new Error("Wrong password.");
  }

  const res = setup();
  const last = res.getLastRow();
  const nSec = Object.keys(SECS).length;
  const okStart = FIXED.length + nSec;         // 0-based index of the first "✓" column
  const ansStart = okStart + ORDER.length;      // 0-based index of the first "ans" column
  const rows = last > 1 ? res.getRange(2, 1, last - 1, EMAIL_COL + TAIL.length - 1).getValues() : [];
  const unq = v => typeof v === "string" && v.charAt(0) === "'" ? v.slice(1) : v; // undo safe_()

  const subs = rows.filter(r => r[1] !== "" || r[2] !== "").map(r => {
    const ok = {}, ans = {};
    ORDER.forEach((id, i) => { ok[id] = Number(r[okStart + i]) === 1; ans[id] = String(unq(r[ansStart + i])); });
    const sections = {};
    Object.keys(SECS).forEach((k, i) => { sections[k] = r[FIXED.length + i]; });
    return {
      time: r[0] instanceof Date ? r[0].toISOString() : String(r[0]),
      studentNo: String(unq(r[1])), name: String(unq(r[2])), email: String(r[EMAIL_COL - 1] || ""),
      attempt: Number(r[3]), score: Number(r[4]), total: Number(r[5]),
      sections: sections, ok: ok, answers: ans,
      minutes: r[EMAIL_COL] === "" ? null : Number(r[EMAIL_COL + 1]),
      leaves: r[EMAIL_COL + 2] === "" ? null : Number(r[EMAIL_COL + 2]),
      awaySec: r[EMAIL_COL + 3] === "" ? null : Number(r[EMAIL_COL + 3]),
      pastes: r[EMAIL_COL + 4] === "" ? null : Number(r[EMAIL_COL + 4])
    };
  });

  const key = {}, secTotals = {};
  ORDER.forEach(id => {
    key[id] = KEY[id].display;
    const s = id.slice(0, 2); secTotals[s] = (secTotals[s] || 0) + 1;
  });
  return { order: ORDER, key: key, secs: SECS, secTotals: secTotals, limitMin: limitMin_(), submissions: subs };
}
