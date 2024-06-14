// Grade points mapping
const grade_points = {
    "O": 10,
    "A+": 9,
    "A": 8,
    "B+": 7,
    "B": 6,
    "C": 5.5,
    "W": 0,
    "F": 0,
    "Ab": 0,
    "I": 0,
    "*": 0
};

// Function to calculate GPA
function calculateGPA() {
    console.log('calculateGPA function called');
    const table = document.getElementById('table1');
    if (!table) {
        console.error('Table with id "table1" not found');
        return;
    }

    console.log('Table found');
    const rows = table.getElementsByTagName('tr');
    let totalCredits = 0;
    let totalPoints = 0;

    for (let i = 1; i < rows.length; i++) { // Start from 1 to skip the header row
        const cells = rows[i].getElementsByTagName('td');
        if (cells.length >= 8) {
            const credit = parseFloat(cells[4].innerText);
            const grade = cells[7].innerText.trim();
            console.log(`Row ${i}: Credit = ${credit}, Grade = ${grade}`);

            if (!isNaN(credit)) {
                totalCredits += credit;
                const gradePoint = grade_points[grade] || 0;
                totalPoints += credit * gradePoint;
            }
        }
    }

    const gpa = totalPoints / totalCredits;
    console.log(`Total Credits: ${totalCredits}, Total Points: ${totalPoints}, GPA: ${gpa.toFixed(2)}`);

    const newRow = table.insertRow();
    const cell1 = newRow.insertCell(0);
    cell1.colSpan = 9; // Adjust the colspan to cover all columns
    cell1.style.textAlign = 'center';
    cell1.style.fontSize = '20px'; // Increase font size
    cell1.style.fontWeight = 'bold'; // Make the text bold
    cell1.innerHTML = `GPA = <span style="color: red;">${gpa.toFixed(2)}</span>`;
    console.log('GPA row added to the table');
}

// Automatically run calculateGPA when the content script is loaded
window.addEventListener('load', () => {
    console.log('Window loaded, checking for table1');
    const interval = setInterval(() => {
        if (document.getElementById('table1')) {
            clearInterval(interval);
            calculateGPA();
        }
    }, 1000);
});
