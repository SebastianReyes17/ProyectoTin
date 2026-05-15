const g = 9.81;
const L = 1;

// Serie de Taylor para seno
function senoTaylor(x, n = 10) {
    let seno = 0;
    for (let i = 0; i < n; i++) {
        let signo = Math.pow(-1, i);
        let numerador = Math.pow(x, (2 * i) + 1);
        let denominador = factorial((2 * i) + 1);
        seno += signo * (numerador / denominador);
    }
    return seno;
}

// Factorial
function factorial(n) {
    let resultado = 1;
    for (let i = 1; i <= n; i++) {
        resultado *= i;
    }
    return resultado;
}

// Error absoluto
function errorAbsoluto(real, aproximado) {
    return Math.abs(real - aproximado);
}

// Error relativo porcentual
function errorRelativo(real, aproximado) {
    return (errorAbsoluto(real, aproximado) / Math.abs(real)) * 100;
}

// Error aproximado porcentual
function errorAproximado(actual, anterior) {
    return Math.abs((actual - anterior) / actual) * 100;
}

let chart;

function simular() {
    let theta = parseFloat(document.getElementById("angulo").value);
    // Convertir a radianes
    theta = theta * (Math.PI / 180);
    let omega = parseFloat(document.getElementById("velocidad").value);
    const h = parseFloat(document.getElementById("h").value);
    const tiempoTotal = parseFloat(document.getElementById("tiempo").value);
    let tiempo = 0;
    let tiempos = [];
    let angulos = [];
    let html = `
        <h2>Resultados</h2>
        <table border="1" cellpadding="5">
        <tr>
            <th>Tiempo</th>
            <th>Ángulo</th>
            <th>Velocidad</th>
            <th>Error Redondeo</th>
        </tr>
    `;
    let thetaAnterior = theta;
    while (tiempo <= tiempoTotal) {
        tiempos.push(tiempo);
        angulos.push(theta);
        // Euler explícito
        let aceleracion = -(g / L) * senoTaylor(theta);
        omega = omega + (h * aceleracion);
        theta = theta + (h * omega);
        // Error de redondeo IEEE 754
        let thetaRedondeado = parseFloat(theta.toFixed(6));
        let errorRedondeo = errorAbsoluto(theta, thetaRedondeado);
        // Error aproximado porcentual
        let errorAprox = errorAproximado(theta, thetaAnterior);
        html += `
            <tr>
                <td>${tiempo.toFixed(2)}</td>
                <td>${theta.toFixed(6)}</td>
                <td>${omega.toFixed(6)}</td>
                <td>${errorRedondeo}</td>
            </tr>
        `;
        thetaAnterior = theta;
        tiempo += h;
    }
    html += "</table>";
    document.getElementById("resultados").innerHTML = html;
    // Gráfica
    const ctx = document.getElementById("grafica");
    if (chart) {
        chart.destroy();
    }
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: tiempos,
            datasets: [{
                label: 'Ángulo del Péndulo',
                data: angulos,
                borderColor: '#000000',
                borderWidth: 1,
                pointRadius: 0,
                tension: 0
            }]
        },
        options: {
            animation: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        color: '#cccccc',
                        tickColor: '#000000'
                    },
                    ticks: {
                        color: '#000000'
                    }
                },
                y: {
                    grid: {
                        color: '#cccccc',
                        tickColor: '#000000'
                    },
                    ticks: {
                        color: '#000000'
                    }
                }
            }
        }
    });
}