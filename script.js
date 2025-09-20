class Student {
    constructor(id, name, age, course) {
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
    constructor(id, name, subject) {
        this.id = id;
        this.name = name;
        this.subject = subject;
    }

    teach() {
        return `I am ${this.name} and I teach ${this.subject}.`;
    }
}

const student1 = new Student(1, "Ana", 20, "Computer Science");
const student2 = new Student(2, "Mark", 22, "Information Technology");
const student3 = new Student(3, "John", 19, "Software Engineering");
const student4 = new Student(4, "Maria", 23, "Data Science");
const student5 = new Student(5, "James", 21, "Cybersecurity");

const instructor1 = new Instructor(1, "Maria Santos", "Data Science Fundamentals");
const instructor2 = new Instructor(2, "John Rey Silverio", "Modern JavaScript & Next.js Prerequisites");
const instructor3 = new Instructor(3, "Carlos Dela Cruz", "Cybersecurity and Networks");


document.getElementById('student-introductions').textContent = 
    student1.introduce() + '\n' + 
    student2.introduce() + '\n' + 
    student3.introduce() + '\n' + 
    student4.introduce() + '\n' + 
    student5.introduce();


document.getElementById('instructor-teaching').textContent = 
    instructor1.teach() + '\n' + 
    instructor2.teach() + '\n' + 
    instructor3.teach();


function fetchWithPromise() {
    return new Promise((resolve) => {
  
        setTimeout(() => {
            fetch('data.json')
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => {
                    console.error('Error loading data.json:', error);
                   
                    resolve({
                        "students": [
                            {"id": 1, "name": "Ana", "age": 20, "course": "Computer Science"},
                            {"id": 2, "name": "Mark", "age": 22, "course": "Information Technology"},
                            {"id": 3, "name": "John", "age": 19, "course": "Software Engineering"},
                            {"id": 4, "name": "Maria", "age": 23, "course": "Data Science"},
                            {"id": 5, "name": "James", "age": 21, "course": "Cybersecurity"}
                        ],
                        "courses": [
                            {"title": "Computer Science", "description": "Study of algorithms, programming, and computing systems."},
                            {"title": "Information Technology", "description": "Focus on managing and deploying computer systems and networks."},
                            {"title": "Software Engineering", "description": "Application of engineering principles to software development."},
                            {"title": "Data Science", "description": "Exploration of data analysis, visualization, and machine learning."},
                            {"title": "Cybersecurity", "description": "Protection of systems, networks, and programs from cyber threats."}
                        ],
                        "instructors": [
                            {"id": 1, "name": "John Rey Silverio", "subject": "Modern JavaScript & Next.js Prerequisites"},
                            {"id": 2, "name": "Maria Santos", "subject": "Data Science Fundamentals"},
                            {"id": 3, "name": "Carlos Dela Cruz", "subject": "Cybersecurity and Networks"}
                        ]
                    });
                });
        }, 1000);
    });
}


async function fetchWithAsyncAwait() {
    try {
   
        const response = await fetch('data.json');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading data.json:', error);
   
        return {
            "students": [
                {"id": 1, "name": "Ana", "age": 20, "course": "Computer Science"},
                {"id": 2, "name": "Mark", "age": 22, "course": "Information Technology"},
                {"id": 3, "name": "John", "age": 19, "course": "Software Engineering"},
                {"id": 4, "name": "Maria", "age": 23, "course": "Data Science"},
                {"id": 5, "name": "James", "age": 21, "course": "Cybersecurity"}
            ],
            "courses": [
                {"title": "Computer Science", "description": "Study of algorithms, programming, and computing systems."},
                {"title": "Information Technology", "description": "Focus on managing and deploying computer systems and networks."},
                {"title": "Software Engineering", "description": "Application of engineering principles to software development."},
                {"title": "Data Science", "description": "Exploration of data analysis, visualization, and machine learning."},
                {"title": "Cybersecurity", "description": "Protection of systems, networks, and programs from cyber threats."}
            ],
            "instructors": [
                {"id": 1, "name": "John Rey Silverio", "subject": "Modern JavaScript & Next.js Prerequisites"},
                {"id": 2, "name": "Maria Santos", "subject": "Data Science Fundamentals"},
                {"id": 3, "name": "Carlos Dela Cruz", "subject": "Cybersecurity and Networks"}
            ]
        };
    }
}

fetchWithPromise()
    .then(data => {
        document.getElementById('promise-output').textContent = 
            'Data fetched successfully with Promise:\n' + 
            JSON.stringify(data, null, 2);
    })
    .catch(error => {
        document.getElementById('promise-output').textContent = 
            'Error: ' + error.message;
    });

fetchWithAsyncAwait().then(data => {
    document.getElementById('async-output').textContent = 
        'Data fetched successfully with Async/Await:\n' + 
        JSON.stringify(data, null, 2);
    
  
    displayData(data);
});

function displayData(data) {

    const studentsList = document.getElementById('students-list');
    data.students.forEach(student => {
        const li = document.createElement('li');
        let text = `${student.name} (${student.age}) - ${student.course}`;
        if (student.age > 21) {
            text = `<span class="highlight">${text} *</span>`;
        }
        li.innerHTML = text;
        studentsList.appendChild(li);
    });

    const coursesList = document.getElementById('courses-list');
    data.courses.forEach(course => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${course.title}:</strong> ${course.description}`;
        coursesList.appendChild(li);
    });

    const instructorsList = document.getElementById('instructors-list');
    data.instructors.forEach(instructor => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${instructor.name}</strong> - ${instructor.subject}`;
        instructorsList.appendChild(li);
    });

    const studentCourseList = document.getElementById('student-course-list');
    data.students.forEach(student => {
        const course = data.courses.find(c => c.title === student.course);
        const li = document.createElement('li');
        let text = `${student.name} → ${student.course}`;
        if (course) {
            text += ` → ${course.description}`;
        }
        if (student.age > 21) {
            text = `<span class="highlight">${text} *</span>`;
        } else {
            text = `${text}`;
        }
        li.innerHTML = text;
        studentCourseList.appendChild(li);
    });

    const courseInstructorMap = {
        "Computer Science": "John Rey Silverio",
        "Information Technology": "John Rey Silverio",
        "Software Engineering": "John Rey Silverio",
        "Data Science": "Maria Santos",
        "Cybersecurity": "Carlos Dela Cruz"
    };

    const courseInstructorList = document.getElementById('course-instructor-list');
    data.courses.forEach(course => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${course.title}</strong> → Taught by ${courseInstructorMap[course.title] || "Not assigned"}`;
        courseInstructorList.appendChild(li);
    });
}
