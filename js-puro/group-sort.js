function groupAndSortByMonthYear(data) {
    const grouped = data.reduce((acc, { date, items }) => {
        // Extraer el mes y año de cada fecha, en formato MM/YYYY
        const monthYear = date.toLocaleDateString('en-US', {
            month: '2-digit',
            year: 'numeric'
        });

        // Inicializar el array para ese mes/año si no existe
        if (!acc[monthYear]) {
            acc[monthYear] = [];
        }

        // agregar todos los items al array correspondiente
        acc[monthYear] = acc[monthYear].concat(items.map(item => ({ ...item, date })));

        return acc;
    }, {});

    // Ordenar cada grupo de items por fecha de forma ascendente
    Object.keys(grouped).forEach(key => {
        grouped[key].sort((a, b) => a.date - b.date);
    });

    return grouped;
}

// Ejemplo de uso: (ver imagen en el directorio)
const data = [
    { date: new Date(2020, 1, 15), items: [{ name: "Item1" }, { name: "Item2" }] },
    { date: new Date(2020, 1, 20), items: [{ name: "Item3" }] },
    { date: new Date(2020, 2, 10), items: [{ name: "Item4" }, { name: "Item5" }] },
    { date: new Date(2020, 1, 5), items: [{ name: "Item7" }] },
    { date: new Date(2023, 1, 5), items: [{ name: "Item8" }] },
    { date: new Date(2024, 10, 5), items: [{ name: "Item9" }] }, 
];

const groupedItems = groupAndSortByMonthYear(data);
console.log(groupedItems);