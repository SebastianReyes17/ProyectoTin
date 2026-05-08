const g = 9.81;

// Factorial
function f(n){

    let r = 1;

    for(let i = 1; i <= n; i++){

        r *= i;
    }

    return r;
}

// Taylor
function seno(x,n){

    let s = 0;

    for(let i = 0; i < n; i++){

        s += ((-1)**i)*(x**(2*i+1))/f(2*i+1);
    }

    return s;
}

// Euler
function ejecutar(){

    let theta = parseFloat(theta0.value);

    let omega = parseFloat(omega0.value);

    let L = parseFloat(L1.value);

    let h = parseFloat(h1.value);

    let tiempo = parseFloat(tiempo1.value);

    let n = parseInt(nTaylor.value);

    tabla.innerHTML = "";

    let t = 0;

    while(t <= tiempo){

        let error =
        Math.abs(Math.sin(theta)-seno(theta,n));

        tabla.innerHTML += `
        <tr>
            <td>${t.toFixed(2)}</td>
            <td>${theta.toFixed(4)}</td>
            <td>${omega.toFixed(4)}</td>
            <td>${error.toFixed(8)}</td>
        </tr>
        `;

        omega =
        omega + h * (-(g/L) * seno(theta,n));

        theta =
        theta + h * omega;

        t += h;
    }

    redondeo.innerHTML =
    "0.1 + 0.2 = " + (0.1 + 0.2);
}
