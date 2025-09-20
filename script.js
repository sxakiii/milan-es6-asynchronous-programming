class Student {
  constructor({ id, name, age, course }) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.course = course;
  }

  introduce() {
    return `Hi, my name is ${this.name}, I am ${this.age} years old, and I am enrolled in ${this.course}.`;
  }
}

class Instructor {
  constructor({ id, name, subject }) {
    this.id = id;
    this.name = name;
    this.subject = subject;
  }

  teach() {
    return `I am ${this.name} and I teach ${this.subject}.`;
  }
}

function el(tag, text = '', cls = '') {
  const n = document.createElement(tag);
  if (text) n.textContent = text;
  if (cls) n.className = cls;
  return n;
}

function fetchWithThen(path = 'data/students.json') {
  return fetch(path)
    .then(res => {
      if (!res.ok) throw new Error(`Network response was not ok: ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log('--- fetchWithThen (Promise .then) ---');
      console.log(data);
      return data;
    })
    .catch(err => {
      console.error('Error in fetchWithThen:', err);
      throw err;
    });
}

async function fetchWithAsync(path = 'data/students.json') {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Network response was not ok: ${res.status}`);
    const data = await res.json();
    console.log('--- fetchWithAsync (Async/Await) ---');
    console.log(data);
    return data;
  } catch (err) {
    console.error('Error in fetchWithAsync:', err);
    throw err;
  }
}

function renderAll(data) {
  const output = document.getElementById('output');
  output.innerHTML = '';

  const studentsSection = el('div', '', 'section');
  studentsSection.appendChild(el('h3', 'Students:'));
  data.students.forEach(s => {
    const isOlder = s.age > 21;
    const text = `${s.name} (${s.age}) - ${s.course}${isOlder ? ' *' : ''}`;
    const div = el('div', text, isOlder ? 'student highlight' : 'student');
    studentsSection.appendChild(div);
  });
  output.appendChild(studentsSection);

  const coursesSection = el('div', '', 'section');
  coursesSection.appendChild(el('h3', 'Courses:'));
  data.courses.forEach(c => {
    const text = `${c.title}: ${c.description}`;
    coursesSection.appendChild(el('div', text, 'course'));
  });
  output.appendChild(coursesSection);

  const instrSection = el('div', '', 'section');
  instrSection.appendChild(el('h3', 'Instructors:'));
  data.instructors.forEach(i => {
    const text = `${i.name} - ${i.subject}`;
    instrSection.appendChild(el('div', text, 'instructor'));
  });
  output.appendChild(instrSection);
}

fetchWithThen()
  .then(data => {
    renderAll(data);
  })
  .catch(err => {
    const out = document.getElementById('output');
    out.textContent = 'Failed to load data (see console).';
  });

(async function demoAsync() {
  try {
    await fetchWithAsync();
  } catch (err) {}

})();
