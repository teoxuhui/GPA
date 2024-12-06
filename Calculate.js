const gradeToPoint = {
    A: 4,
    B: 3,
    C: 2,
    D: 1,
};

export const calculateGPA = (data) => {
    if (!data || data.length === 0) {
        return null;
    }

    const totalPoints = data.reduce((acc, item) => {
        const points = gradeToPoint[item.grade.toUpperCase()] || 0;
        return acc + points;
    }, 0);

    return totalPoints / data.length;
};

export const calculateBetterGPA = (data) => {
    if (!data || data.length === 0) {
        return null;
    }

    const filteredData = data.filter((item) => item.bgColor === 'green');

    if (filteredData.length === 0) {
        return null;
    }

    const totalPoints = filteredData.reduce((acc, item) => {
        const points = gradeToPoint[item.grade.toUpperCase()] || 0;
        return acc + points;
    }, 0);

    return totalPoints / filteredData.length;
};
